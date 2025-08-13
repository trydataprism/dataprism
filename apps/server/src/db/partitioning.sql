-- PostgreSQL Table Partitioning for Analytics Tables
-- This script sets up monthly partitioning for high-volume analytics tables

-- 1. Convert page_views table to partitioned table
-- First, we need to create a new partitioned table and migrate data

-- Create partitioned page_views table
CREATE TABLE IF NOT EXISTS page_views_partitioned (
    LIKE page_views INCLUDING ALL
) PARTITION BY RANGE (timestamp);

-- Create partitions for the last 12 months and next 6 months
DO $$
DECLARE
    start_date DATE;
    end_date DATE;
    partition_name TEXT;
    month_start DATE;
    month_end DATE;
BEGIN
    -- Start from 12 months ago
    start_date := DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months');
    -- Go to 6 months in the future
    end_date := DATE_TRUNC('month', CURRENT_DATE + INTERVAL '6 months');
    
    month_start := start_date;
    
    WHILE month_start < end_date LOOP
        month_end := month_start + INTERVAL '1 month';
        partition_name := 'page_views_' || TO_CHAR(month_start, 'YYYY_MM');
        
        EXECUTE format(
            'CREATE TABLE IF NOT EXISTS %I PARTITION OF page_views_partitioned 
             FOR VALUES FROM (%L) TO (%L)',
            partition_name,
            month_start,
            month_end
        );
        
        -- Create indexes on each partition
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS %I ON %I (website_id, timestamp)',
            partition_name || '_website_timestamp_idx',
            partition_name
        );
        
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS %I ON %I (session_id, timestamp)',
            partition_name || '_session_timestamp_idx',
            partition_name
        );
        
        month_start := month_end;
    END LOOP;
END $$;

-- 2. Convert events table to partitioned table
CREATE TABLE IF NOT EXISTS events_partitioned (
    LIKE events INCLUDING ALL
) PARTITION BY RANGE (timestamp);

-- Create partitions for events table
DO $$
DECLARE
    start_date DATE;
    end_date DATE;
    partition_name TEXT;
    month_start DATE;
    month_end DATE;
BEGIN
    start_date := DATE_TRUNC('month', CURRENT_DATE - INTERVAL '12 months');
    end_date := DATE_TRUNC('month', CURRENT_DATE + INTERVAL '6 months');
    
    month_start := start_date;
    
    WHILE month_start < end_date LOOP
        month_end := month_start + INTERVAL '1 month';
        partition_name := 'events_' || TO_CHAR(month_start, 'YYYY_MM');
        
        EXECUTE format(
            'CREATE TABLE IF NOT EXISTS %I PARTITION OF events_partitioned 
             FOR VALUES FROM (%L) TO (%L)',
            partition_name,
            month_start,
            month_end
        );
        
        -- Create indexes on each partition
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS %I ON %I (website_id, timestamp)',
            partition_name || '_website_timestamp_idx',
            partition_name
        );
        
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS %I ON %I (session_id, timestamp)',
            partition_name || '_session_timestamp_idx',
            partition_name
        );
        
        EXECUTE format(
            'CREATE INDEX IF NOT EXISTS %I ON %I (website_id, event_type)',
            partition_name || '_website_type_idx',
            partition_name
        );
        
        month_start := month_end;
    END LOOP;
END $$;

-- 3. Create automatic partition management function
CREATE OR REPLACE FUNCTION create_monthly_partitions()
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    table_name TEXT;
    start_date DATE;
    end_date DATE;
    partition_name TEXT;
BEGIN
    -- Create partitions for next 3 months for both tables
    FOR table_name IN SELECT unnest(ARRAY['page_views_partitioned', 'events_partitioned']) LOOP
        FOR i IN 1..3 LOOP
            start_date := DATE_TRUNC('month', CURRENT_DATE + (i || ' months')::INTERVAL);
            end_date := start_date + INTERVAL '1 month';
            
            IF table_name = 'page_views_partitioned' THEN
                partition_name := 'page_views_' || TO_CHAR(start_date, 'YYYY_MM');
            ELSE
                partition_name := 'events_' || TO_CHAR(start_date, 'YYYY_MM');
            END IF;
            
            -- Check if partition already exists
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.tables 
                WHERE table_name = partition_name
            ) THEN
                EXECUTE format(
                    'CREATE TABLE %I PARTITION OF %I 
                     FOR VALUES FROM (%L) TO (%L)',
                    partition_name,
                    table_name,
                    start_date,
                    end_date
                );
                
                -- Create indexes
                EXECUTE format(
                    'CREATE INDEX %I ON %I (website_id, timestamp)',
                    partition_name || '_website_timestamp_idx',
                    partition_name
                );
                
                EXECUTE format(
                    'CREATE INDEX %I ON %I (session_id, timestamp)',
                    partition_name || '_session_timestamp_idx',
                    partition_name
                );
                
                IF table_name = 'events_partitioned' THEN
                    EXECUTE format(
                        'CREATE INDEX %I ON %I (website_id, event_type)',
                        partition_name || '_website_type_idx',
                        partition_name
                    );
                END IF;
            END IF;
        END LOOP;
    END LOOP;
END $$;

-- 4. Create automatic old partition cleanup function
CREATE OR REPLACE FUNCTION cleanup_old_partitions(retention_months INTEGER DEFAULT 12)
RETURNS void
LANGUAGE plpgsql
AS $$
DECLARE
    partition_record RECORD;
    cutoff_date DATE;
BEGIN
    cutoff_date := DATE_TRUNC('month', CURRENT_DATE - (retention_months || ' months')::INTERVAL);
    
    -- Find and drop old partitions
    FOR partition_record IN
        SELECT schemaname, tablename
        FROM pg_tables
        WHERE tablename ~ '^(page_views|events)_\d{4}_\d{2}$'
        AND schemaname = 'public'
    LOOP
        -- Extract date from partition name
        DECLARE
            partition_date DATE;
            year_month TEXT;
        BEGIN
            year_month := substring(partition_record.tablename from '\d{4}_\d{2}$');
            partition_date := TO_DATE(year_month, 'YYYY_MM');
            
            IF partition_date < cutoff_date THEN
                EXECUTE format('DROP TABLE IF EXISTS %I', partition_record.tablename);
                RAISE NOTICE 'Dropped old partition: %', partition_record.tablename;
            END IF;
        END;
    END LOOP;
END $$;

-- 5. Create materialized view refresh function
CREATE OR REPLACE FUNCTION refresh_analytics_materialized_views()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Refresh all materialized views concurrently
    REFRESH MATERIALIZED VIEW CONCURRENTLY daily_website_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY hourly_website_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY popular_pages;
    REFRESH MATERIALIZED VIEW CONCURRENTLY top_referrers;
    REFRESH MATERIALIZED VIEW CONCURRENTLY device_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY geo_stats;
    REFRESH MATERIALIZED VIEW CONCURRENTLY event_stats;
END $$;

-- 6. Create scheduled jobs (requires pg_cron extension)
-- Uncomment if pg_cron is available:
-- SELECT cron.schedule('create-partitions', '0 0 1 * *', 'SELECT create_monthly_partitions();');
-- SELECT cron.schedule('cleanup-partitions', '0 2 1 * *', 'SELECT cleanup_old_partitions(12);');
-- SELECT cron.schedule('refresh-mv', '0 1 * * *', 'SELECT refresh_analytics_materialized_views();');

-- Instructions for manual execution:
-- 1. Run this script after creating your initial tables
-- 2. Set up a cron job to run create_monthly_partitions() monthly
-- 3. Set up a cron job to run cleanup_old_partitions() monthly
-- 4. Set up a cron job to run refresh_analytics_materialized_views() daily