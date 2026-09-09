CREATE TYPE "public"."hfm_verification_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'completed', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."subscription_provider" AS ENUM('stripe', 'telegram_stars', 'usdt_manual', 'hfm_ib');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'cancelled', 'expired', 'pending');--> statement-breakpoint
CREATE TYPE "public"."user_tier" AS ENUM('scout', 'ranger', 'operator', 'rambo');--> statement-breakpoint
CREATE TABLE "hfm_ib_verifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"refid_used" varchar(40),
	"hfm_account_id" varchar(80),
	"proof_url" text,
	"status" "hfm_verification_status" DEFAULT 'pending' NOT NULL,
	"reviewer_note" text,
	"submitted_at" timestamp DEFAULT now(),
	"reviewed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"subscription_id" integer,
	"amount_usd" integer NOT NULL,
	"provider" "subscription_provider" NOT NULL,
	"provider_ref" varchar(255),
	"status" "payment_status" DEFAULT 'pending' NOT NULL,
	"metadata" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"tier" "user_tier" NOT NULL,
	"status" "subscription_status" DEFAULT 'pending' NOT NULL,
	"provider" "subscription_provider" NOT NULL,
	"provider_ref" varchar(255),
	"amount_usd" integer,
	"interval" varchar(20),
	"started_at" timestamp DEFAULT now(),
	"expires_at" timestamp,
	"cancelled_at" timestamp,
	"metadata" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegram_id" varchar(64),
	"email" varchar(255),
	"name" varchar(120),
	"username" varchar(120),
	"current_tier" "user_tier" DEFAULT 'scout' NOT NULL,
	"is_admin" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "hfm_ib_verifications" ADD CONSTRAINT "hfm_ib_verifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "public"."subscriptions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;