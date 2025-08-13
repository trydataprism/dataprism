CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'USER', 'EARLY_ADOPTER', 'BETA_TESTER');--> statement-breakpoint
CREATE TYPE "public"."user_status" AS ENUM('ACTIVE', 'SUSPENDED', 'INACTIVE', 'DELETED');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('PENDING', 'VERIFIED', 'FAILED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'EXPIRED', 'REVOKED');--> statement-breakpoint
CREATE TYPE "public"."website_member_role" AS ENUM('OWNER', 'ADMIN', 'EDITOR', 'VIEWER');--> statement-breakpoint
CREATE TYPE "public"."billing_interval" AS ENUM('MONTHLY', 'YEARLY');--> statement-breakpoint
CREATE TYPE "public"."payment_method_status" AS ENUM('ACTIVE', 'INACTIVE', 'EXPIRED', 'FAILED');--> statement-breakpoint
CREATE TYPE "public"."payment_method_type" AS ENUM('CARD', 'BANK_ACCOUNT', 'PAYPAL', 'CRYPTO');--> statement-breakpoint
CREATE TYPE "public"."plan_type" AS ENUM('FREE', 'HOBBY', 'PRO', 'SCALE', 'ENTERPRISE');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('ACTIVE', 'CANCELED', 'PAST_DUE', 'UNPAID', 'INCOMPLETE', 'TRIALING');--> statement-breakpoint
CREATE TYPE "public"."tracking_mode" AS ENUM('STANDARD', 'STRICT', 'PRIVACY_FOCUSED');--> statement-breakpoint
CREATE TYPE "public"."website_status" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION', 'DELETED');--> statement-breakpoint
CREATE TYPE "public"."device_type" AS ENUM('DESKTOP', 'MOBILE', 'TABLET', 'TV', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('CLICK', 'DOWNLOAD', 'SIGNUP', 'LOGIN', 'LOGOUT', 'PURCHASE', 'FORM_SUBMIT', 'VIDEO_PLAY', 'SCROLL', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."session_end_reason" AS ENUM('TIMEOUT', 'USER_EXIT', 'PAGE_CLOSE', 'NEW_SESSION', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."campaign_status" AS ENUM('ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."device_category" AS ENUM('DESKTOP', 'MOBILE', 'TABLET', 'TV', 'WEARABLE', 'UNKNOWN');--> statement-breakpoint
CREATE TYPE "public"."funnel_goal_type" AS ENUM('COMPLETION', 'STEP_CONVERSION', 'TIME_TO_CONVERT', 'REVENUE');--> statement-breakpoint
CREATE TYPE "public"."funnel_step_type" AS ENUM('PAGE_VIEW', 'EVENT', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."goal_status" AS ENUM('ACTIVE', 'PAUSED', 'COMPLETED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."goal_type" AS ENUM('PAGE_VIEW', 'EVENT', 'CUSTOM', 'REVENUE', 'DURATION');--> statement-breakpoint
CREATE TYPE "public"."ai_model" AS ENUM('GPT_4', 'GPT_4_TURBO', 'GPT_3_5_TURBO', 'CLAUDE_3_SONNET', 'CLAUDE_3_HAIKU', 'GEMINI_PRO');--> statement-breakpoint
CREATE TYPE "public"."ai_query_status" AS ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'TIMEOUT');--> statement-breakpoint
CREATE TYPE "public"."ai_query_type" AS ENUM('ANALYTICS_INSIGHT', 'DATA_EXPLANATION', 'REPORT_GENERATION', 'TREND_ANALYSIS', 'RECOMMENDATION', 'CUSTOM_QUERY');--> statement-breakpoint
CREATE TYPE "public"."ai_token_status" AS ENUM('ACTIVE', 'EXPIRED', 'USED', 'RESERVED');--> statement-breakpoint
CREATE TYPE "public"."ai_token_type" AS ENUM('DAILY_CREDITS', 'BONUS_CREDITS', 'PURCHASED_CREDITS', 'PROMOTIONAL_CREDITS');--> statement-breakpoint
CREATE TYPE "public"."alert_frequency" AS ENUM('IMMEDIATE', 'HOURLY', 'DAILY', 'WEEKLY', 'ONCE');--> statement-breakpoint
CREATE TYPE "public"."alert_severity" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');--> statement-breakpoint
CREATE TYPE "public"."alert_status" AS ENUM('ACTIVE', 'PAUSED', 'TRIGGERED', 'RESOLVED', 'ARCHIVED');--> statement-breakpoint
CREATE TYPE "public"."alert_type" AS ENUM('TRAFFIC_SPIKE', 'TRAFFIC_DROP', 'GOAL_COMPLETION', 'CONVERSION_RATE_CHANGE', 'HIGH_BOUNCE_RATE', 'PAGE_LOAD_SLOW', 'ERROR_RATE_HIGH', 'NEW_REFERRER', 'UNUSUAL_LOCATION', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."notification_status" AS ENUM('PENDING', 'SENT', 'DELIVERED', 'FAILED', 'BOUNCED');--> statement-breakpoint
CREATE TYPE "public"."notification_type" AS ENUM('EMAIL', 'PUSH', 'IN_APP', 'WEBHOOK', 'SMS', 'SLACK', 'DISCORD');--> statement-breakpoint
CREATE TYPE "public"."error_level" AS ENUM('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL');--> statement-breakpoint
CREATE TYPE "public"."error_type" AS ENUM('JAVASCRIPT', 'NETWORK', 'CONSOLE', 'UNHANDLED_REJECTION', 'RESOURCE_LOAD', 'PERFORMANCE', 'CUSTOM');--> statement-breakpoint
CREATE TYPE "public"."performance_metric_type" AS ENUM('PAGE_LOAD', 'FIRST_CONTENTFUL_PAINT', 'LARGEST_CONTENTFUL_PAINT', 'FIRST_INPUT_DELAY', 'CUMULATIVE_LAYOUT_SHIFT', 'TIME_TO_INTERACTIVE');--> statement-breakpoint
CREATE TYPE "public"."cohort_period" AS ENUM('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY');--> statement-breakpoint
CREATE TYPE "public"."conversion_path_status" AS ENUM('IN_PROGRESS', 'COMPLETED', 'ABANDONED', 'EXPIRED');--> statement-breakpoint
CREATE TYPE "public"."retention_metric_type" AS ENUM('USER_RETENTION', 'REVENUE_RETENTION', 'FEATURE_RETENTION', 'ENGAGEMENT_RETENTION');--> statement-breakpoint
CREATE TYPE "public"."touchpoint_type" AS ENUM('ORGANIC_SEARCH', 'PAID_SEARCH', 'SOCIAL_MEDIA', 'EMAIL', 'DIRECT', 'REFERRAL', 'DISPLAY', 'VIDEO', 'AFFILIATE', 'OTHER');--> statement-breakpoint
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
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"token_type" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"device" text,
	"browser" text,
	"os" text,
	"country" text,
	"city" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"last_accessed_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"first_name" text,
	"last_name" text,
	"status" "user_status" DEFAULT 'ACTIVE' NOT NULL,
	"role" "user_role" DEFAULT 'USER' NOT NULL,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"language" text DEFAULT 'en' NOT NULL,
	"last_login_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"type" text NOT NULL,
	"status" "verification_status" DEFAULT 'PENDING' NOT NULL,
	"attempts" text DEFAULT '0' NOT NULL,
	"max_attempts" text DEFAULT '3' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
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
CREATE TABLE "payment_methods" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "payment_method_type" NOT NULL,
	"status" "payment_method_status" DEFAULT 'ACTIVE' NOT NULL,
	"last4" text,
	"brand" text,
	"expiry_month" integer,
	"expiry_year" integer,
	"stripe_payment_method_id" text,
	"stripe_customer_id" text,
	"billing_name" text,
	"billing_email" text,
	"billing_address" text,
	"is_default" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plans" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"display_name" text NOT NULL,
	"description" text,
	"type" "plan_type" NOT NULL,
	"price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'USD' NOT NULL,
	"billing_interval" "billing_interval" DEFAULT 'MONTHLY' NOT NULL,
	"max_websites" integer,
	"max_events" integer,
	"max_team_members" integer,
	"data_retention_months" integer DEFAULT 12 NOT NULL,
	"ai_credits_per_day" integer DEFAULT 0 NOT NULL,
	"ai_credits_per_month" integer DEFAULT 0 NOT NULL,
	"features" text[],
	"has_custom_domain" boolean DEFAULT false NOT NULL,
	"has_api_access" boolean DEFAULT false NOT NULL,
	"has_white_label" boolean DEFAULT false NOT NULL,
	"has_priority_support" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plan_id" text NOT NULL,
	"status" "subscription_status" DEFAULT 'ACTIVE' NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"stripe_subscription_id" text,
	"stripe_customer_id" text,
	"stripe_product_id" text,
	"stripe_price_id" text,
	"canceled_at" timestamp,
	"cancel_at_period_end" boolean DEFAULT false NOT NULL,
	"cancelation_reason" text,
	"trial_start" timestamp,
	"trial_end" timestamp,
	"metadata" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usage" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"website_count" integer DEFAULT 0 NOT NULL,
	"event_count" integer DEFAULT 0 NOT NULL,
	"page_view_count" integer DEFAULT 0 NOT NULL,
	"session_count" integer DEFAULT 0 NOT NULL,
	"ai_credits_used" integer DEFAULT 0 NOT NULL,
	"ai_queries_count" integer DEFAULT 0 NOT NULL,
	"team_member_count" integer DEFAULT 0 NOT NULL,
	"overage" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"overage_details" text,
	"reset_at" timestamp NOT NULL,
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
	"respect_dnt" boolean DEFAULT true NOT NULL,
	"enable_cookie_consent" boolean DEFAULT true NOT NULL,
	"tracking_id" text NOT NULL,
	"public_key" text NOT NULL,
	"secret_key" text NOT NULL,
	"status" "website_status" DEFAULT 'PENDING_VERIFICATION' NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"is_verified" boolean DEFAULT false NOT NULL,
	"verified_at" timestamp,
	"custom_domain" text,
	"custom_logo" text,
	"custom_css" text,
	"session_timeout" text DEFAULT '30' NOT NULL,
	"bounce_rate" text DEFAULT '0' NOT NULL,
	"exclude_ips" text[],
	"exclude_paths" text[],
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
	"event_category" text,
	"event_label" text,
	"path" text NOT NULL,
	"hostname" text NOT NULL,
	"properties" text,
	"value" numeric(10, 2),
	"element_id" text,
	"element_class" text,
	"element_tag" text,
	"element_text" text,
	"x_position" integer,
	"y_position" integer,
	"device" "device_type",
	"browser" text,
	"os" text,
	"ip_address" text,
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
	"hostname" text NOT NULL,
	"search" text,
	"hash" text,
	"referrer" text,
	"referrer_domain" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_content" text,
	"utm_term" text,
	"device" "device_type",
	"browser" text,
	"browser_version" text,
	"os" text,
	"os_version" text,
	"user_agent" text,
	"country" text,
	"country_code" text,
	"region" text,
	"region_code" text,
	"city" text,
	"timezone" text,
	"screen_resolution" text,
	"viewport_size" text,
	"load_time" integer,
	"ip_address" text,
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
	"duration" integer,
	"page_views" integer DEFAULT 0 NOT NULL,
	"events" integer DEFAULT 0 NOT NULL,
	"bounced" boolean DEFAULT false NOT NULL,
	"entry_page" text NOT NULL,
	"exit_page" text,
	"device" "device_type",
	"browser" text,
	"os" text,
	"country" text,
	"region" text,
	"city" text,
	"referrer" text,
	"referrer_domain" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"utm_content" text,
	"utm_term" text,
	"end_reason" "session_end_reason",
	"ip_address" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "device_info" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"device_hash" text NOT NULL,
	"category" "device_category" NOT NULL,
	"browser" text NOT NULL,
	"browser_version" text,
	"browser_engine" text,
	"os" text NOT NULL,
	"os_version" text,
	"screen_resolution" text,
	"color_depth" integer,
	"pixel_ratio" text,
	"has_javascript" boolean DEFAULT true NOT NULL,
	"has_cookies" boolean DEFAULT true NOT NULL,
	"has_local_storage" boolean DEFAULT true NOT NULL,
	"has_session_storage" boolean DEFAULT true NOT NULL,
	"is_bot" boolean DEFAULT false NOT NULL,
	"bot_name" text,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"total_page_views" integer DEFAULT 0 NOT NULL,
	"first_seen_at" timestamp NOT NULL,
	"last_seen_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location_data" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"country" text NOT NULL,
	"country_code" text NOT NULL,
	"region" text,
	"region_code" text,
	"city" text,
	"latitude" text,
	"longitude" text,
	"timezone" text,
	"continent" text,
	"continent_code" text,
	"postal_code" text,
	"isp" text,
	"organization" text,
	"connection_type" text,
	"total_visitors" integer DEFAULT 0 NOT NULL,
	"total_sessions" integer DEFAULT 0 NOT NULL,
	"total_page_views" integer DEFAULT 0 NOT NULL,
	"first_seen_at" timestamp NOT NULL,
	"last_seen_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrer_domains" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"domain" text NOT NULL,
	"normalized_domain" text NOT NULL,
	"category" text,
	"subcategory" text,
	"platform" text,
	"title" text,
	"description" text,
	"favicon" text,
	"is_spam" boolean DEFAULT false NOT NULL,
	"is_bot" boolean DEFAULT false NOT NULL,
	"trust_score" integer,
	"total_referrals" integer DEFAULT 0 NOT NULL,
	"unique_visitors" integer DEFAULT 0 NOT NULL,
	"first_seen_at" timestamp NOT NULL,
	"last_seen_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "utm_campaigns" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"source" text NOT NULL,
	"medium" text NOT NULL,
	"campaign" text NOT NULL,
	"content" text,
	"term" text,
	"name" text NOT NULL,
	"description" text,
	"status" "campaign_status" DEFAULT 'ACTIVE' NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"budget" text,
	"goals" text,
	"total_clicks" integer DEFAULT 0 NOT NULL,
	"total_impressions" integer DEFAULT 0 NOT NULL,
	"total_conversions" integer DEFAULT 0 NOT NULL,
	"tags" text[],
	"metadata" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "funnel_definitions" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"created_by" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"steps" text NOT NULL,
	"step_count" integer NOT NULL,
	"filters" text,
	"time_window" integer DEFAULT 30 NOT NULL,
	"attribution_model" text DEFAULT 'first_touch' NOT NULL,
	"total_entries" integer DEFAULT 0 NOT NULL,
	"total_completions" integer DEFAULT 0 NOT NULL,
	"completion_rate" numeric(5, 4) DEFAULT '0.0000' NOT NULL,
	"average_time_to_complete" integer,
	"step_metrics" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "funnel_goals" (
	"id" text PRIMARY KEY NOT NULL,
	"funnel_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"goal_type" "funnel_goal_type" NOT NULL,
	"target_value" text,
	"target_step" integer,
	"warning_threshold" numeric(5, 4),
	"critical_threshold" numeric(5, 4),
	"current_value" numeric(10, 4) DEFAULT '0.0000' NOT NULL,
	"last_calculated_at" timestamp,
	"enable_alerts" boolean DEFAULT true NOT NULL,
	"last_alert_sent_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "goals" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"created_by" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"type" "goal_type" NOT NULL,
	"status" "goal_status" DEFAULT 'ACTIVE' NOT NULL,
	"target" text NOT NULL,
	"target_value" numeric(10, 2),
	"conditions" text,
	"filters" text,
	"value" numeric(10, 2),
	"currency" text DEFAULT 'USD',
	"track_revenue" boolean DEFAULT false NOT NULL,
	"allow_multiple_conversions" boolean DEFAULT true NOT NULL,
	"attribution_window" integer DEFAULT 30 NOT NULL,
	"total_conversions" integer DEFAULT 0 NOT NULL,
	"total_revenue" numeric(10, 2) DEFAULT '0.00' NOT NULL,
	"conversion_rate" numeric(5, 4) DEFAULT '0.0000' NOT NULL,
	"first_conversion_at" timestamp,
	"last_conversion_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "ai_tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token_type" "ai_token_type" NOT NULL,
	"status" "ai_token_status" DEFAULT 'ACTIVE' NOT NULL,
	"amount" integer NOT NULL,
	"used_amount" integer DEFAULT 0 NOT NULL,
	"remaining_amount" integer NOT NULL,
	"expires_at" timestamp,
	"is_expired" boolean DEFAULT false NOT NULL,
	"source" text,
	"source_id" text,
	"description" text,
	"cost" numeric(10, 2),
	"currency" text DEFAULT 'USD',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ai_usage" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"website_id" text,
	"query_type" "ai_query_type" NOT NULL,
	"query" text NOT NULL,
	"response" text,
	"status" "ai_query_status" DEFAULT 'PENDING' NOT NULL,
	"model" "ai_model" NOT NULL,
	"tokens_used" integer DEFAULT 0 NOT NULL,
	"prompt_tokens" integer DEFAULT 0 NOT NULL,
	"completion_tokens" integer DEFAULT 0 NOT NULL,
	"processing_time_ms" integer,
	"session_id" text,
	"conversation_id" text,
	"parent_query_id" text,
	"request_metadata" text,
	"user_agent" text,
	"ip_address" text,
	"user_rating" integer,
	"user_feedback" text,
	"is_helpful" boolean,
	"error_code" text,
	"error_message" text,
	"retry_count" integer DEFAULT 0 NOT NULL,
	"analytics_context" text,
	"date_range" text,
	"filters" text,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"completed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "alerts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"website_id" text,
	"name" text NOT NULL,
	"description" text,
	"alert_type" "alert_type" NOT NULL,
	"severity" "alert_severity" DEFAULT 'MEDIUM' NOT NULL,
	"status" "alert_status" DEFAULT 'ACTIVE' NOT NULL,
	"metric" text NOT NULL,
	"operator" text NOT NULL,
	"threshold" numeric(10, 4) NOT NULL,
	"comparison_period" text DEFAULT 'previous_period' NOT NULL,
	"time_window" integer DEFAULT 60 NOT NULL,
	"frequency" "alert_frequency" DEFAULT 'IMMEDIATE' NOT NULL,
	"filters" text,
	"conditions" text,
	"notification_types" "notification_type"[] DEFAULT '{"EMAIL"}' NOT NULL,
	"recipients" text[],
	"webhook_url" text,
	"slack_channel" text,
	"cooldown_period" integer DEFAULT 60 NOT NULL,
	"max_alerts_per_day" integer DEFAULT 10 NOT NULL,
	"trigger_count" integer DEFAULT 0 NOT NULL,
	"last_triggered_at" timestamp,
	"last_triggered_value" numeric(10, 4),
	"auto_resolve" boolean DEFAULT true NOT NULL,
	"resolved_at" timestamp,
	"resolved_by" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"alert_id" text,
	"type" "notification_type" NOT NULL,
	"status" "notification_status" DEFAULT 'PENDING' NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"data" text,
	"recipient" text NOT NULL,
	"delivery_attempts" integer DEFAULT 0 NOT NULL,
	"max_delivery_attempts" integer DEFAULT 3 NOT NULL,
	"scheduled_for" timestamp,
	"sent_at" timestamp,
	"delivered_at" timestamp,
	"read_at" timestamp,
	"error_code" text,
	"error_message" text,
	"metadata" text,
	"external_id" text,
	"is_read" boolean DEFAULT false NOT NULL,
	"is_archived" boolean DEFAULT false NOT NULL,
	"clicked_at" timestamp,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "error_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"session_id" text NOT NULL,
	"level" "error_level" NOT NULL,
	"type" "error_type" NOT NULL,
	"message" text NOT NULL,
	"stack" text,
	"source" text,
	"lineno" integer,
	"colno" integer,
	"path" text NOT NULL,
	"hostname" text NOT NULL,
	"user_agent" text,
	"browser" text,
	"browser_version" text,
	"os" text,
	"os_version" text,
	"device" text,
	"user_id" text,
	"custom_data" text,
	"tags" text[],
	"fingerprint" text NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"is_resolved" boolean DEFAULT false NOT NULL,
	"resolved_at" timestamp,
	"resolved_by" text,
	"ip_address" text,
	"timestamp" timestamp NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
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
	"entry_time" timestamp NOT NULL,
	"last_activity" timestamp NOT NULL,
	"page_views" integer DEFAULT 1 NOT NULL,
	"device" text,
	"browser" text,
	"os" text,
	"country" text,
	"country_code" text,
	"city" text,
	"referrer" text,
	"referrer_domain" text,
	"utm_source" text,
	"utm_medium" text,
	"utm_campaign" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"average_load_time" integer,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"expires_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cohort_analysis" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"cohort_period" "cohort_period" NOT NULL,
	"cohort_date" timestamp NOT NULL,
	"cohort_size" integer NOT NULL,
	"period_0_retention" numeric(5, 4) DEFAULT '1.0000' NOT NULL,
	"period_1_retention" numeric(5, 4),
	"period_2_retention" numeric(5, 4),
	"period_3_retention" numeric(5, 4),
	"period_4_retention" numeric(5, 4),
	"period_5_retention" numeric(5, 4),
	"period_6_retention" numeric(5, 4),
	"period_0_revenue" numeric(10, 2),
	"period_1_revenue" numeric(10, 2),
	"period_2_revenue" numeric(10, 2),
	"period_3_revenue" numeric(10, 2),
	"period_4_revenue" numeric(10, 2),
	"period_5_revenue" numeric(10, 2),
	"period_6_revenue" numeric(10, 2),
	"acquisition_channel" text,
	"device_type" text,
	"country" text,
	"average_sessions_per_user" numeric(5, 2),
	"average_page_views_per_user" numeric(5, 2),
	"average_revenue_per_user" numeric(10, 2),
	"last_calculated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "conversion_paths" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"visitor_id" text NOT NULL,
	"touchpoints" text NOT NULL,
	"touchpoint_count" integer NOT NULL,
	"first_touch_at" timestamp NOT NULL,
	"last_touch_at" timestamp NOT NULL,
	"conversion_time" integer,
	"status" "conversion_path_status" DEFAULT 'IN_PROGRESS' NOT NULL,
	"goal_id" text,
	"conversion_value" numeric(10, 2),
	"conversion_currency" text DEFAULT 'USD',
	"first_touch_channel" "touchpoint_type",
	"last_touch_channel" "touchpoint_type",
	"assisting_channels" "touchpoint_type"[],
	"session_count" integer DEFAULT 1 NOT NULL,
	"page_view_count" integer DEFAULT 0 NOT NULL,
	"event_count" integer DEFAULT 0 NOT NULL,
	"unique_devices" integer DEFAULT 1 NOT NULL,
	"device_types" text[],
	"countries" text[],
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "retention_stats" (
	"id" text PRIMARY KEY NOT NULL,
	"website_id" text NOT NULL,
	"date_from" timestamp NOT NULL,
	"date_to" timestamp NOT NULL,
	"metric_type" "retention_metric_type" NOT NULL,
	"segment" text,
	"segment_value" text,
	"day_1_retention" numeric(5, 4),
	"day_7_retention" numeric(5, 4),
	"day_14_retention" numeric(5, 4),
	"day_30_retention" numeric(5, 4),
	"day_60_retention" numeric(5, 4),
	"day_90_retention" numeric(5, 4),
	"total_users" integer NOT NULL,
	"returning_users" integer NOT NULL,
	"new_users" integer NOT NULL,
	"average_session_duration" integer,
	"average_page_views_per_session" numeric(5, 2),
	"bounce_rate" numeric(5, 4),
	"total_revenue" numeric(10, 2),
	"average_revenue_per_user" numeric(10, 2),
	"last_calculated_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
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
ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usage" ADD CONSTRAINT "usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
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
ALTER TABLE "funnel_definitions" ADD CONSTRAINT "funnel_definitions_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "funnel_definitions" ADD CONSTRAINT "funnel_definitions_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "funnel_goals" ADD CONSTRAINT "funnel_goals_funnel_id_funnel_definitions_id_fk" FOREIGN KEY ("funnel_id") REFERENCES "public"."funnel_definitions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "goals" ADD CONSTRAINT "goals_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_tokens" ADD CONSTRAINT "ai_tokens_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_resolved_by_user_id_fk" FOREIGN KEY ("resolved_by") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_alert_id_alerts_id_fk" FOREIGN KEY ("alert_id") REFERENCES "public"."alerts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "error_logs" ADD CONSTRAINT "error_logs_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "real_time_visitors" ADD CONSTRAINT "real_time_visitors_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cohort_analysis" ADD CONSTRAINT "cohort_analysis_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversion_paths" ADD CONSTRAINT "conversion_paths_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "retention_stats" ADD CONSTRAINT "retention_stats_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exports" ADD CONSTRAINT "exports_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exports" ADD CONSTRAINT "exports_website_id_websites_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "accounts_provider_account_unique" ON "account" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "accounts_user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "sessions_token_unique" ON "session" USING btree ("token");--> statement-breakpoint
CREATE INDEX "sessions_user_id_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "session" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "sessions_is_active_idx" ON "session" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "users_status_idx" ON "user" USING btree ("status");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "user" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_created_at_idx" ON "user" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "verifications_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "verifications_expires_at_idx" ON "verification" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "verifications_status_idx" ON "verification" USING btree ("status");--> statement-breakpoint
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
CREATE INDEX "payment_methods_user_id_idx" ON "payment_methods" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "payment_methods_stripe_payment_method_id_idx" ON "payment_methods" USING btree ("stripe_payment_method_id");--> statement-breakpoint
CREATE INDEX "payment_methods_is_default_idx" ON "payment_methods" USING btree ("is_default");--> statement-breakpoint
CREATE UNIQUE INDEX "plans_name_unique" ON "plans" USING btree ("name");--> statement-breakpoint
CREATE INDEX "plans_type_idx" ON "plans" USING btree ("type");--> statement-breakpoint
CREATE INDEX "plans_is_active_idx" ON "plans" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "plans_sort_order_idx" ON "plans" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX "subscriptions_user_id_idx" ON "subscriptions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "subscriptions_plan_id_idx" ON "subscriptions" USING btree ("plan_id");--> statement-breakpoint
CREATE INDEX "subscriptions_status_idx" ON "subscriptions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "subscriptions_stripe_subscription_id_idx" ON "subscriptions" USING btree ("stripe_subscription_id");--> statement-breakpoint
CREATE INDEX "subscriptions_current_period_end_idx" ON "subscriptions" USING btree ("current_period_end");--> statement-breakpoint
CREATE UNIQUE INDEX "usage_user_month_year_unique" ON "usage" USING btree ("user_id","month","year");--> statement-breakpoint
CREATE INDEX "usage_user_id_idx" ON "usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "usage_year_month_idx" ON "usage" USING btree ("year","month");--> statement-breakpoint
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
CREATE INDEX "events_visitor_id_idx" ON "events" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "events_session_id_idx" ON "events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "events_timestamp_idx" ON "events" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "events_event_type_idx" ON "events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "events_event_name_idx" ON "events" USING btree ("event_name");--> statement-breakpoint
CREATE INDEX "events_path_idx" ON "events" USING btree ("path");--> statement-breakpoint
CREATE INDEX "events_event_category_idx" ON "events" USING btree ("event_category");--> statement-breakpoint
CREATE INDEX "events_website_timestamp_idx" ON "events" USING btree ("website_id","timestamp");--> statement-breakpoint
CREATE INDEX "events_website_type_idx" ON "events" USING btree ("website_id","event_type");--> statement-breakpoint
CREATE INDEX "events_session_timestamp_idx" ON "events" USING btree ("session_id","timestamp");--> statement-breakpoint
CREATE INDEX "page_views_website_id_idx" ON "page_views" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "page_views_visitor_id_idx" ON "page_views" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "page_views_session_id_idx" ON "page_views" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "page_views_timestamp_idx" ON "page_views" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "page_views_path_idx" ON "page_views" USING btree ("path");--> statement-breakpoint
CREATE INDEX "page_views_referrer_domain_idx" ON "page_views" USING btree ("referrer_domain");--> statement-breakpoint
CREATE INDEX "page_views_country_idx" ON "page_views" USING btree ("country");--> statement-breakpoint
CREATE INDEX "page_views_device_idx" ON "page_views" USING btree ("device");--> statement-breakpoint
CREATE INDEX "page_views_utm_source_idx" ON "page_views" USING btree ("utm_source");--> statement-breakpoint
CREATE INDEX "page_views_website_timestamp_idx" ON "page_views" USING btree ("website_id","timestamp");--> statement-breakpoint
CREATE INDEX "page_views_website_path_idx" ON "page_views" USING btree ("website_id","path");--> statement-breakpoint
CREATE INDEX "page_views_session_timestamp_idx" ON "page_views" USING btree ("session_id","timestamp");--> statement-breakpoint
CREATE INDEX "user_sessions_website_id_idx" ON "user_sessions" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "user_sessions_visitor_id_idx" ON "user_sessions" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "user_sessions_start_time_idx" ON "user_sessions" USING btree ("start_time");--> statement-breakpoint
CREATE INDEX "user_sessions_end_time_idx" ON "user_sessions" USING btree ("end_time");--> statement-breakpoint
CREATE INDEX "user_sessions_bounced_idx" ON "user_sessions" USING btree ("bounced");--> statement-breakpoint
CREATE INDEX "user_sessions_country_idx" ON "user_sessions" USING btree ("country");--> statement-breakpoint
CREATE INDEX "user_sessions_device_idx" ON "user_sessions" USING btree ("device");--> statement-breakpoint
CREATE INDEX "user_sessions_referrer_domain_idx" ON "user_sessions" USING btree ("referrer_domain");--> statement-breakpoint
CREATE UNIQUE INDEX "device_info_website_device_hash_unique" ON "device_info" USING btree ("website_id","device_hash");--> statement-breakpoint
CREATE INDEX "device_info_website_id_idx" ON "device_info" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "device_info_category_idx" ON "device_info" USING btree ("category");--> statement-breakpoint
CREATE INDEX "device_info_browser_idx" ON "device_info" USING btree ("browser");--> statement-breakpoint
CREATE INDEX "device_info_os_idx" ON "device_info" USING btree ("os");--> statement-breakpoint
CREATE INDEX "device_info_is_bot_idx" ON "device_info" USING btree ("is_bot");--> statement-breakpoint
CREATE UNIQUE INDEX "location_data_website_country_region_city_unique" ON "location_data" USING btree ("website_id","country","region","city");--> statement-breakpoint
CREATE INDEX "location_data_website_id_idx" ON "location_data" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "location_data_country_idx" ON "location_data" USING btree ("country");--> statement-breakpoint
CREATE INDEX "location_data_country_code_idx" ON "location_data" USING btree ("country_code");--> statement-breakpoint
CREATE INDEX "location_data_region_idx" ON "location_data" USING btree ("region");--> statement-breakpoint
CREATE INDEX "location_data_city_idx" ON "location_data" USING btree ("city");--> statement-breakpoint
CREATE INDEX "location_data_continent_idx" ON "location_data" USING btree ("continent");--> statement-breakpoint
CREATE UNIQUE INDEX "referrer_domains_website_domain_unique" ON "referrer_domains" USING btree ("website_id","domain");--> statement-breakpoint
CREATE INDEX "referrer_domains_website_id_idx" ON "referrer_domains" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "referrer_domains_normalized_domain_idx" ON "referrer_domains" USING btree ("normalized_domain");--> statement-breakpoint
CREATE INDEX "referrer_domains_category_idx" ON "referrer_domains" USING btree ("category");--> statement-breakpoint
CREATE INDEX "referrer_domains_platform_idx" ON "referrer_domains" USING btree ("platform");--> statement-breakpoint
CREATE INDEX "referrer_domains_is_spam_idx" ON "referrer_domains" USING btree ("is_spam");--> statement-breakpoint
CREATE UNIQUE INDEX "utm_campaigns_website_source_medium_campaign_unique" ON "utm_campaigns" USING btree ("website_id","source","medium","campaign");--> statement-breakpoint
CREATE INDEX "utm_campaigns_website_id_idx" ON "utm_campaigns" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "utm_campaigns_source_idx" ON "utm_campaigns" USING btree ("source");--> statement-breakpoint
CREATE INDEX "utm_campaigns_medium_idx" ON "utm_campaigns" USING btree ("medium");--> statement-breakpoint
CREATE INDEX "utm_campaigns_campaign_idx" ON "utm_campaigns" USING btree ("campaign");--> statement-breakpoint
CREATE INDEX "utm_campaigns_status_idx" ON "utm_campaigns" USING btree ("status");--> statement-breakpoint
CREATE INDEX "funnel_definitions_website_id_idx" ON "funnel_definitions" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "funnel_definitions_created_by_idx" ON "funnel_definitions" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "funnel_definitions_is_active_idx" ON "funnel_definitions" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "funnel_definitions_website_id_deleted_at_idx" ON "funnel_definitions" USING btree ("website_id","deleted_at");--> statement-breakpoint
CREATE INDEX "funnel_goals_funnel_id_idx" ON "funnel_goals" USING btree ("funnel_id");--> statement-breakpoint
CREATE INDEX "funnel_goals_goal_type_idx" ON "funnel_goals" USING btree ("goal_type");--> statement-breakpoint
CREATE INDEX "funnel_goals_is_active_idx" ON "funnel_goals" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "goals_website_id_idx" ON "goals" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "goals_created_by_idx" ON "goals" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX "goals_type_idx" ON "goals" USING btree ("type");--> statement-breakpoint
CREATE INDEX "goals_status_idx" ON "goals" USING btree ("status");--> statement-breakpoint
CREATE INDEX "goals_is_active_idx" ON "goals" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "goals_website_id_deleted_at_created_at_idx" ON "goals" USING btree ("website_id","deleted_at","created_at");--> statement-breakpoint
CREATE INDEX "ai_tokens_user_id_idx" ON "ai_tokens" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ai_tokens_token_type_idx" ON "ai_tokens" USING btree ("token_type");--> statement-breakpoint
CREATE INDEX "ai_tokens_status_idx" ON "ai_tokens" USING btree ("status");--> statement-breakpoint
CREATE INDEX "ai_tokens_expires_at_idx" ON "ai_tokens" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "ai_tokens_is_expired_idx" ON "ai_tokens" USING btree ("is_expired");--> statement-breakpoint
CREATE INDEX "ai_usage_user_id_idx" ON "ai_usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ai_usage_website_id_idx" ON "ai_usage" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "ai_usage_created_at_idx" ON "ai_usage" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "ai_usage_query_type_idx" ON "ai_usage" USING btree ("query_type");--> statement-breakpoint
CREATE INDEX "ai_usage_status_idx" ON "ai_usage" USING btree ("status");--> statement-breakpoint
CREATE INDEX "ai_usage_model_idx" ON "ai_usage" USING btree ("model");--> statement-breakpoint
CREATE INDEX "ai_usage_session_id_idx" ON "ai_usage" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "ai_usage_conversation_id_idx" ON "ai_usage" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "ai_usage_parent_query_id_idx" ON "ai_usage" USING btree ("parent_query_id");--> statement-breakpoint
CREATE INDEX "alerts_user_id_idx" ON "alerts" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "alerts_website_id_idx" ON "alerts" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "alerts_alert_type_idx" ON "alerts" USING btree ("alert_type");--> statement-breakpoint
CREATE INDEX "alerts_status_idx" ON "alerts" USING btree ("status");--> statement-breakpoint
CREATE INDEX "alerts_severity_idx" ON "alerts" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "alerts_is_active_idx" ON "alerts" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "alerts_last_triggered_at_idx" ON "alerts" USING btree ("last_triggered_at");--> statement-breakpoint
CREATE INDEX "notifications_user_id_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_alert_id_idx" ON "notifications" USING btree ("alert_id");--> statement-breakpoint
CREATE INDEX "notifications_type_idx" ON "notifications" USING btree ("type");--> statement-breakpoint
CREATE INDEX "notifications_status_idx" ON "notifications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "notifications_is_read_idx" ON "notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "notifications_is_archived_idx" ON "notifications" USING btree ("is_archived");--> statement-breakpoint
CREATE INDEX "notifications_created_at_idx" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notifications_sent_at_idx" ON "notifications" USING btree ("sent_at");--> statement-breakpoint
CREATE INDEX "error_logs_website_id_idx" ON "error_logs" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "error_logs_visitor_id_idx" ON "error_logs" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "error_logs_session_id_idx" ON "error_logs" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "error_logs_timestamp_idx" ON "error_logs" USING btree ("timestamp");--> statement-breakpoint
CREATE INDEX "error_logs_level_idx" ON "error_logs" USING btree ("level");--> statement-breakpoint
CREATE INDEX "error_logs_type_idx" ON "error_logs" USING btree ("type");--> statement-breakpoint
CREATE INDEX "error_logs_fingerprint_idx" ON "error_logs" USING btree ("fingerprint");--> statement-breakpoint
CREATE INDEX "error_logs_path_idx" ON "error_logs" USING btree ("path");--> statement-breakpoint
CREATE INDEX "error_logs_is_resolved_idx" ON "error_logs" USING btree ("is_resolved");--> statement-breakpoint
CREATE UNIQUE INDEX "real_time_visitors_website_visitor_unique" ON "real_time_visitors" USING btree ("website_id","visitor_id");--> statement-breakpoint
CREATE INDEX "real_time_visitors_website_id_idx" ON "real_time_visitors" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "real_time_visitors_session_id_idx" ON "real_time_visitors" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "real_time_visitors_last_activity_idx" ON "real_time_visitors" USING btree ("last_activity");--> statement-breakpoint
CREATE INDEX "real_time_visitors_is_active_idx" ON "real_time_visitors" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "real_time_visitors_expires_at_idx" ON "real_time_visitors" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "real_time_visitors_current_path_idx" ON "real_time_visitors" USING btree ("current_path");--> statement-breakpoint
CREATE INDEX "real_time_visitors_country_idx" ON "real_time_visitors" USING btree ("country");--> statement-breakpoint
CREATE UNIQUE INDEX "cohort_analysis_website_period_date_unique" ON "cohort_analysis" USING btree ("website_id","cohort_period","cohort_date");--> statement-breakpoint
CREATE INDEX "cohort_analysis_website_id_idx" ON "cohort_analysis" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "cohort_analysis_cohort_date_idx" ON "cohort_analysis" USING btree ("cohort_date");--> statement-breakpoint
CREATE INDEX "cohort_analysis_cohort_period_idx" ON "cohort_analysis" USING btree ("cohort_period");--> statement-breakpoint
CREATE INDEX "cohort_analysis_acquisition_channel_idx" ON "cohort_analysis" USING btree ("acquisition_channel");--> statement-breakpoint
CREATE INDEX "conversion_paths_website_id_idx" ON "conversion_paths" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "conversion_paths_visitor_id_idx" ON "conversion_paths" USING btree ("visitor_id");--> statement-breakpoint
CREATE INDEX "conversion_paths_status_idx" ON "conversion_paths" USING btree ("status");--> statement-breakpoint
CREATE INDEX "conversion_paths_first_touch_at_idx" ON "conversion_paths" USING btree ("first_touch_at");--> statement-breakpoint
CREATE INDEX "conversion_paths_first_touch_channel_idx" ON "conversion_paths" USING btree ("first_touch_channel");--> statement-breakpoint
CREATE INDEX "conversion_paths_last_touch_channel_idx" ON "conversion_paths" USING btree ("last_touch_channel");--> statement-breakpoint
CREATE INDEX "conversion_paths_goal_id_idx" ON "conversion_paths" USING btree ("goal_id");--> statement-breakpoint
CREATE UNIQUE INDEX "retention_stats_website_date_metric_segment_unique" ON "retention_stats" USING btree ("website_id","date_from","date_to","metric_type","segment");--> statement-breakpoint
CREATE INDEX "retention_stats_website_id_idx" ON "retention_stats" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "retention_stats_date_from_idx" ON "retention_stats" USING btree ("date_from");--> statement-breakpoint
CREATE INDEX "retention_stats_metric_type_idx" ON "retention_stats" USING btree ("metric_type");--> statement-breakpoint
CREATE INDEX "retention_stats_segment_idx" ON "retention_stats" USING btree ("segment");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."daily_website_stats" AS (select "website_id", DATE("timestamp") as "date", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" group by "page_views"."website_id", DATE("page_views"."timestamp"));--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."device_stats" AS (select "website_id", "device", "browser", "os", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."device", "page_views"."browser", "page_views"."os");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."event_stats" AS (select "website_id", "event_type", "event_name", "event_category", COUNT("id") as "event_count", COUNT(DISTINCT "visitor_id") as "unique_visitors", SUM("value") as "total_value", ROUND(AVG("value"), 2) as "avg_value" from "events" where "events"."timestamp" >= NOW() - INTERVAL '30 days' group by "events"."website_id", "events"."event_type", "events"."event_name", "events"."event_category");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."geo_stats" AS (select "website_id", "country", "country_code", "region", "city", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."country", "page_views"."country_code", "page_views"."region", "page_views"."city");--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."hourly_website_stats" AS (select "website_id", DATE_TRUNC('hour', "timestamp") as "hour", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" group by "page_views"."website_id", DATE_TRUNC('hour', "page_views"."timestamp"));--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."popular_pages" AS (select "website_id", "path", "title", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."path", "page_views"."title" order by COUNT("page_views"."id") DESC);--> statement-breakpoint
CREATE MATERIALIZED VIEW "public"."top_referrers" AS (select "website_id", "referrer_domain", COUNT("id") as "page_views", COUNT(DISTINCT "visitor_id") as "unique_visitors", COUNT(DISTINCT "session_id") as "sessions" from "page_views" where "page_views"."referrer_domain" IS NOT NULL AND "page_views"."timestamp" >= NOW() - INTERVAL '30 days' group by "page_views"."website_id", "page_views"."referrer_domain" order by COUNT("page_views"."id") DESC);