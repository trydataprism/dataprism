CREATE TYPE "public"."verification_status" AS ENUM('PENDING', 'VERIFIED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."verification_type" AS ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'REVOKED');--> statement-breakpoint
CREATE TYPE "public"."website_member_role" AS ENUM('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');--> statement-breakpoint
CREATE TYPE "public"."tracking_mode" AS ENUM('STANDARD', 'PRIVACY_FOCUSED');--> statement-breakpoint
CREATE TYPE "public"."website_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION', 'DELETED');--> statement-breakpoint
CREATE TYPE "public"."device_type" AS ENUM('DESKTOP', 'MOBILE', 'TABLET', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('CLICK', 'FORM_SUBMIT', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."device_category" AS ENUM('DESKTOP', 'MOBILE', 'TABLET', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."alert_type" AS ENUM('TRAFFIC_SPIKE', 'TRAFFIC_DROP', 'ERROR_RATE_HIGH', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('EMAIL', 'IN_APP');--> statement-breakpoint
CREATE TYPE "public"."error_level" AS ENUM('ERROR', 'WARNING', 'INFO');--> statement-breakpoint
CREATE TYPE "public"."cache_period" AS ENUM('REAL_TIME', 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY');--> statement-breakpoint
CREATE TYPE "public"."cache_status" AS ENUM('VALID', 'EXPIRED', 'BUILDING', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."export_format" AS ENUM('CSV', 'JSON', 'XLSX', 'PDF', 'XML');--> statement-breakpoint
CREATE TYPE "public"."export_status" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'EXPIRED', 'CANCELED');--> statement-breakpoint
CREATE TYPE "public"."export_type" AS ENUM('FULL_DATA', 'FILTERED_DATA', 'DASHBOARD_DATA', 'CUSTOM_REPORT', 'FUNNEL_DATA', 'GOAL_DATA');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"password" text,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"newsletter" boolean DEFAULT false NOT NULL,
	"referral_source" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"email" text NOT NULL,
	"code" text NOT NULL,
	"type" "verification_type" NOT NULL,
	"status" "verification_status" DEFAULT 'PENDING' NOT NULL,
	"attempts" integer DEFAULT 0 NOT NULL,
	"expires_at" timestamp NOT NULL,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_invitations" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"email" text NOT NULL,
	"role" "website_member_role" DEFAULT 'VIEWER' NOT NULL,
	"permissions" text[],
	"invited_by" text NOT NULL,
	"status" "invitation_status" DEFAULT 'PENDING' NOT NULL,
	"token" text NOT NULL,
	"message" text,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"accepted_by" text,
	"revoked_at" timestamp,
	"revoked_by" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_members" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"user_id" text NOT NULL,
	"role" "website_member_role" DEFAULT 'VIEWER' NOT NULL,
	"permissions" text[],
	"invited_by" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_accessed_at" timestamp,
	"joined_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "websites" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"domain" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"favicon" text,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"tracking_mode" "tracking_mode" DEFAULT 'STANDARD' NOT NULL,
	"tracking_id" text NOT NULL,
	"public_key" text NOT NULL,
	"secret_key" text NOT NULL,
	"status" "website_status" DEFAULT 'PENDING_VERIFICATION' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"session_timeout" integer DEFAULT 30 NOT NULL,
	"bounce_rate" integer DEFAULT 0 NOT NULL,
	"exclude_ips" text[],
	"exclude_paths" text[],
	"allowed_domains" text[],
	"bot_filtering" boolean DEFAULT true NOT NULL,
	"spam_filtering" boolean DEFAULT true NOT NULL,
	"settings" text,
	"metadata" text,
	"last_event_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"session_id" text NOT NULL,
	"event_type" "event_type" NOT NULL,
	"event_name" text NOT NULL,
	"path" text NOT NULL,
	"properties" text,
	"timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "page_views" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"session_id" text NOT NULL,
	"path" text NOT NULL,
	"title" text,
	"referrer" text,
	"device" "device_type",
	"browser" text,
	"os" text,
	"country" text,
	"timestamp" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone,
	"page_views" integer DEFAULT 0 NOT NULL,
	"bounced" boolean DEFAULT false NOT NULL,
	"entry_page" text NOT NULL,
	"exit_page" text,
	"device" "device_type",
	"browser" text,
	"os" text,
	"country" text,
	"referrer" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device_info" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"category" "device_category" NOT NULL,
	"browser" text NOT NULL,
	"os" text NOT NULL,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location_data" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"country" text NOT NULL,
	"region" text,
	"city" text,
	"total_visitors" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrer_domains" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"domain" text NOT NULL,
	"category" text,
	"total_referrals" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "utm_campaigns" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"source" text NOT NULL,
	"medium" text NOT NULL,
	"campaign" text NOT NULL,
	"name" text NOT NULL,
	"total_visitors" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"website_id" text,
	"name" text NOT NULL,
	"alert_type" "alert_type" NOT NULL,
	"metric" text NOT NULL,
	"threshold" integer NOT NULL,
	"notification_types" "notification_type"[] DEFAULT '{"EMAIL"}' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_triggered_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"alert_id" text,
	"type" "notification_type" NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"is_read" boolean DEFAULT false NOT NULL,
	"sent_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "error_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"session_id" text NOT NULL,
	"level" "error_level" NOT NULL,
	"message" text NOT NULL,
	"source" text,
	"path" text NOT NULL,
	"browser" text,
	"os" text,
	"timestamp" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "real_time_visitors" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"session_id" text NOT NULL,
	"current_path" text NOT NULL,
	"current_title" text,
	"entry_path" text NOT NULL,
	"last_activity" timestamp NOT NULL,
	"page_views" integer DEFAULT 1 NOT NULL,
	"device" text,
	"browser" text,
	"country" text,
	"referrer" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exports" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"website_id" text,
	"name" text NOT NULL,
	"description" text,
	"export_type" "export_type" NOT NULL,
	"format" "export_format" NOT NULL,
	"status" "export_status" DEFAULT 'PENDING' NOT NULL,
	"date_from" timestamp NOT NULL,
	"date_to" timestamp NOT NULL,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"filters" text,
	"columns" text,
	"group_by" text,
	"sort_by" text,
	"limit" integer,
	"total_rows" integer,
	"processed_rows" integer DEFAULT 0 NOT NULL,
	"estimated_time_remaining" integer,
	"file_url" text,
	"file_name" text,
	"file_size" integer,
	"file_mime_type" text,
	"download_count" integer DEFAULT 0 NOT NULL,
	"last_downloaded_at" timestamp,
	"expires_at" timestamp,
	"auto_delete" boolean DEFAULT true NOT NULL,
	"error_message" text,
	"error_code" text,
	"retry_count" integer DEFAULT 0 NOT NULL,
	"max_retries" integer DEFAULT 3 NOT NULL,
	"metadata" text,
	"started_at" timestamp,
	"completed_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_invitations" ADD CONSTRAINT "website_invitations_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_invitations" ADD CONSTRAINT "website_invitations_invited_by_user_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_invitations" ADD CONSTRAINT "website_invitations_accepted_by_user_id_fk" FOREIGN KEY ("accepted_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_invitations" ADD CONSTRAINT "website_invitations_revoked_by_user_id_fk" FOREIGN KEY ("revoked_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_members" ADD CONSTRAINT "website_members_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_members" ADD CONSTRAINT "website_members_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "website_members" ADD CONSTRAINT "website_members_invited_by_user_id_fk" FOREIGN KEY ("invited_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "websites" ADD CONSTRAINT "websites_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_session_id_user_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."user_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "page_views" ADD CONSTRAINT "page_views_session_id_user_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."user_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_sessions" ADD CONSTRAINT "user_sessions_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "device_info" ADD CONSTRAINT "device_info_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_data" ADD CONSTRAINT "location_data_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referrer_domains" ADD CONSTRAINT "referrer_domains_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "utm_campaigns" ADD CONSTRAINT "utm_campaigns_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_alert_id_alerts_id_fk" FOREIGN KEY ("alert_id") REFERENCES "public"."alerts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "error_logs" ADD CONSTRAINT "error_logs_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_time_visitors" ADD CONSTRAINT "real_time_visitors_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exports" ADD CONSTRAINT "exports_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exports" ADD CONSTRAINT "exports_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_account_unique" ON "account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_unique" ON "session" USING btree ("token");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "session" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "user" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "verifications_email_idx" ON "verification" USING btree ("email");--> statement-breakpoint
CREATE INDEX "verifications_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "verifications_code_idx" ON "verification" USING btree ("code");--> statement-breakpoint
CREATE INDEX "verifications_expires_at_idx" ON "verification" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "verifications_type_status_idx" ON "verification" USING btree ("type","status");--> statement-breakpoint
CREATE UNIQUE INDEX "website_invitations_website_email_unique" ON "website_invitations" USING btree ("website_id","email");--> statement-breakpoint
CREATE INDEX "website_invitations_website_id_idx" ON "website_invitations" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "website_invitations_email_idx" ON "website_invitations" USING btree ("email");--> statement-breakpoint
CREATE INDEX "website_invitations_status_idx" ON "website_invitations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "website_invitations_expires_at_idx" ON "website_invitations" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "website_invitations_invited_by_idx" ON "website_invitations" USING btree ("invited_by");--> statement-breakpoint
CREATE UNIQUE INDEX "website_members_website_user_unique" ON "website_members" USING btree ("website_id","user_id");--> statement-breakpoint
CREATE INDEX "website_members_website_id_idx" ON "website_members" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "website_members_user_id_idx" ON "website_members" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "website_members_role_idx" ON "website_members" USING btree ("role");--> statement-breakpoint
CREATE INDEX "website_members_is_active_idx" ON "website_members" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "websites_user_domain_unique" ON "websites" USING btree ("user_id","domain");--> statement-breakpoint
CREATE UNIQUE INDEX "websites_tracking_id_unique" ON "websites" USING btree ("tracking_id");--> statement-breakpoint
CREATE UNIQUE INDEX "websites_public_key_unique" ON "websites" USING btree ("public_key");--> statement-breakpoint
CREATE UNIQUE INDEX "websites_secret_key_unique" ON "websites" USING btree ("secret_key");--> statement-breakpoint
CREATE INDEX "websites_user_id_idx" ON "websites" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "websites_domain_idx" ON "websites" USING btree ("domain");--> statement-breakpoint
CREATE INDEX "websites_status_idx" ON "websites" USING btree ("status");--> statement-breakpoint
CREATE INDEX "websites_is_active_idx" ON "websites" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "websites_is_verified_idx" ON "websites" USING btree ("is_verified");--> statement-breakpoint
CREATE INDEX "websites_created_at_idx" ON "websites" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "events_website_id_idx" ON "events" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "events_timestamp_idx" ON "events" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "events_website_timestamp_idx" ON "events" USING btree ("website_id","timestamp");--> statement-breakpoint
CREATE INDEX "page_views_website_id_idx" ON "page_views" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "page_views_timestamp_idx" ON "page_views" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "page_views_website_timestamp_idx" ON "page_views" USING btree ("website_id","timestamp");--> statement-breakpoint
CREATE INDEX "user_sessions_website_id_idx" ON "user_sessions" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "user_sessions_start_time_idx" ON "user_sessions" USING btree ("start_time");--> statement-breakpoint
CREATE UNIQUE INDEX "device_info_website_browser_os_unique" ON "device_info" USING btree ("website_id","browser","os");--> statement-breakpoint
CREATE INDEX "device_info_website_id_idx" ON "device_info" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "device_info_category_idx" ON "device_info" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "location_data_website_country_region_city_unique" ON "location_data" USING btree ("website_id","country","region","city");--> statement-breakpoint
CREATE INDEX "location_data_website_id_idx" ON "location_data" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "location_data_country_idx" ON "location_data" USING btree ("country");--> statement-breakpoint
CREATE UNIQUE INDEX "referrer_domains_website_domain_unique" ON "referrer_domains" USING btree ("website_id","domain");--> statement-breakpoint
CREATE INDEX "referrer_domains_website_id_idx" ON "referrer_domains" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "referrer_domains_category_idx" ON "referrer_domains" USING btree ("category");--> statement-breakpoint
CREATE UNIQUE INDEX "utm_campaigns_website_source_medium_campaign_unique" ON "utm_campaigns" USING btree ("website_id","source","medium","campaign");--> statement-breakpoint
CREATE INDEX "utm_campaigns_website_id_idx" ON "utm_campaigns" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "utm_campaigns_source_idx" ON "utm_campaigns" USING btree ("source");--> statement-breakpoint
CREATE INDEX "alerts_user_id_idx" ON "alerts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "alerts_website_id_idx" ON "alerts" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "alerts_alert_type_idx" ON "alerts" USING btree ("alert_type");--> statement-breakpoint
CREATE INDEX "alerts_is_active_idx" ON "alerts" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_type_idx" ON "notifications" USING btree ("type");--> statement-breakpoint
CREATE INDEX "notifications_is_read_idx" ON "notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "notifications_created_at_idx" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "error_logs_website_id_idx" ON "error_logs" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "error_logs_timestamp_idx" ON "error_logs" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "error_logs_level_idx" ON "error_logs" USING btree ("level");--> statement-breakpoint
CREATE UNIQUE INDEX "real_time_visitors_website_visitor_unique" ON "real_time_visitors" USING btree ("website_id","visitor_id");--> statement-breakpoint
CREATE INDEX "real_time_visitors_website_id_idx" ON "real_time_visitors" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "real_time_visitors_last_activity_idx" ON "real_time_visitors" USING btree ("last_activity");--> statement-breakpoint
CREATE INDEX "real_time_visitors_is_active_idx" ON "real_time_visitors" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "real_time_visitors_current_path_idx" ON "real_time_visitors" USING btree ("current_path");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."daily_website_stats" AS (select "website_id", DATE("timestamp") as "date", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" group by "page_views"."website_id", DATE("page_views"."timestamp"));--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."device_stats" AS (select "website_id", "device", "browser", "os", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."device", "page_views"."browser", "page_views"."os");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."event_stats" AS (select "website_id", "event_type", "event_name", COUNT("id") as "event_count", COUNT(DISTINCT "visitor_id") as "unique_visitors" from "events" where "events"."timestamp" >= NOW() - INTERVAL '30 days' group by "events"."website_id", "events"."event_type", "events"."event_name");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."geo_stats" AS (select "website_id", "country", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."country");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."hourly_website_stats" AS (select "website_id", DATE_TRUNC('hour', "timestamp") as "hour", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" group by "page_views"."website_id", DATE_TRUNC('hour', "page_views"."timestamp"));--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."popular_pages" AS (select "website_id", "path", "title", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."path", "page_views"."title" order by COUNT("page_views"."id") DESC);--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."top_referrers" AS (select "website_id", "referrer", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."referrer" IS NOT NULL AND "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."referrer" order by COUNT("page_views"."id") DESC);