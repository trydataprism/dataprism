import { pgTable, text, timestamp, boolean, integer, decimal, pgEnum, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./auth";

// Enums
export const planType = pgEnum('plan_type', [
  'FREE',
  'HOBBY', 
  'PRO',
  'SCALE',
  'ENTERPRISE'
]);

export const subscriptionStatus = pgEnum('subscription_status', [
  'ACTIVE',
  'CANCELED',
  'PAST_DUE',
  'UNPAID',
  'INCOMPLETE',
  'TRIALING'
]);

export const paymentMethodType = pgEnum('payment_method_type', [
  'CARD',
  'BANK_ACCOUNT',
  'PAYPAL',
  'CRYPTO'
]);

export const paymentMethodStatus = pgEnum('payment_method_status', [
  'ACTIVE',
  'INACTIVE',
  'EXPIRED',
  'FAILED'
]);

export const billingInterval = pgEnum('billing_interval', [
  'MONTHLY',
  'YEARLY'
]);

// Tables
export const plans = pgTable('plans', {
  id: text('id').primaryKey().notNull(),
  name: text('name').notNull(),
  displayName: text('display_name').notNull(),
  description: text('description'),
  type: planType('type').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: text('currency').default('USD').notNull(),
  billingInterval: billingInterval('billing_interval').default('MONTHLY').notNull(),
  
  // Limits
  maxWebsites: integer('max_websites'), // null = unlimited
  maxEvents: integer('max_events'), // Monthly event limit
  maxTeamMembers: integer('max_team_members'),
  dataRetentionMonths: integer('data_retention_months').default(12).notNull(),
  
  // AI Features
  aiCreditsPerDay: integer('ai_credits_per_day').default(0).notNull(),
  aiCreditsPerMonth: integer('ai_credits_per_month').default(0).notNull(),
  
  // Features
  features: text('features').array(), // JSON array of feature flags
  hasCustomDomain: boolean('has_custom_domain').default(false).notNull(),
  hasApiAccess: boolean('has_api_access').default(false).notNull(),
  hasWhiteLabel: boolean('has_white_label').default(false).notNull(),
  hasPrioritySupport: boolean('has_priority_support').default(false).notNull(),
  
  isActive: boolean('is_active').default(true).notNull(),
  isPopular: boolean('is_popular').default(false).notNull(),
  sortOrder: integer('sort_order').default(0).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('plans_name_unique').on(table.name),
  index('plans_type_idx').on(table.type),
  index('plans_is_active_idx').on(table.isActive),
  index('plans_sort_order_idx').on(table.sortOrder),
]);

export const subscriptions = pgTable('subscriptions', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  planId: text('plan_id')
    .notNull()
    .references(() => plans.id, { onDelete: 'restrict' }),
  status: subscriptionStatus('status').default('ACTIVE').notNull(),
  
  // Billing periods
  currentPeriodStart: timestamp('current_period_start', { mode: 'string' }).notNull(),
  currentPeriodEnd: timestamp('current_period_end', { mode: 'string' }).notNull(),
  
  // Stripe integration
  stripeSubscriptionId: text('stripe_subscription_id'),
  stripeCustomerId: text('stripe_customer_id'),
  stripeProductId: text('stripe_product_id'),
  stripePriceId: text('stripe_price_id'),
  
  // Cancellation
  canceledAt: timestamp('canceled_at', { mode: 'string' }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false).notNull(),
  cancelationReason: text('cancelation_reason'),
  
  // Trial
  trialStart: timestamp('trial_start', { mode: 'string' }),
  trialEnd: timestamp('trial_end', { mode: 'string' }),
  
  // Metadata
  metadata: text('metadata'), // JSON for additional data
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('subscriptions_user_id_idx').on(table.userId),
  index('subscriptions_plan_id_idx').on(table.planId),
  index('subscriptions_status_idx').on(table.status),
  index('subscriptions_stripe_subscription_id_idx').on(table.stripeSubscriptionId),
  index('subscriptions_current_period_end_idx').on(table.currentPeriodEnd),
]);

export const usage = pgTable('usage', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  month: integer('month').notNull(), // 1-12
  year: integer('year').notNull(),
  
  // Usage metrics
  websiteCount: integer('website_count').default(0).notNull(),
  eventCount: integer('event_count').default(0).notNull(),
  pageViewCount: integer('page_view_count').default(0).notNull(),
  sessionCount: integer('session_count').default(0).notNull(),
  
  // AI usage
  aiCreditsUsed: integer('ai_credits_used').default(0).notNull(),
  aiQueriesCount: integer('ai_queries_count').default(0).notNull(),
  
  // Team usage
  teamMemberCount: integer('team_member_count').default(0).notNull(),
  
  // Overage charges
  overage: decimal('overage', { precision: 10, scale: 2 }).default('0.00').notNull(),
  overageDetails: text('overage_details'), // JSON breakdown
  
  resetAt: timestamp('reset_at', { mode: 'string' }).notNull(), // When usage resets
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  uniqueIndex('usage_user_month_year_unique').on(table.userId, table.month, table.year),
  index('usage_user_id_idx').on(table.userId),
  index('usage_year_month_idx').on(table.year, table.month),
]);

export const paymentMethods = pgTable('payment_methods', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  type: paymentMethodType('type').notNull(),
  status: paymentMethodStatus('status').default('ACTIVE').notNull(),
  
  // Card details (encrypted/tokenized)
  last4: text('last4'),
  brand: text('brand'), // visa, mastercard, etc.
  expiryMonth: integer('expiry_month'),
  expiryYear: integer('expiry_year'),
  
  // Stripe integration
  stripePaymentMethodId: text('stripe_payment_method_id'),
  stripeCustomerId: text('stripe_customer_id'),
  
  // Billing address
  billingName: text('billing_name'),
  billingEmail: text('billing_email'),
  billingAddress: text('billing_address'), // JSON
  
  isDefault: boolean('is_default').default(false).notNull(),
  
  createdAt: timestamp('created_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', { mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
}, (table) => [
  index('payment_methods_user_id_idx').on(table.userId),
  index('payment_methods_stripe_payment_method_id_idx').on(table.stripePaymentMethodId),
  index('payment_methods_is_default_idx').on(table.isDefault),
]);