CREATE TYPE "public"."inquiry_status" AS ENUM('new', 'contacted', 'in_progress', 'closed');--> statement-breakpoint
CREATE TYPE "public"."inquiry_type" AS ENUM('viewing', 'more_info', 'offer', 'general');--> statement-breakpoint
CREATE TYPE "public"."property_category" AS ENUM('residential', 'Commercial');--> statement-breakpoint
CREATE TYPE "public"."property_status" AS ENUM('buy', 'rent', 'sold');--> statement-breakpoint
CREATE TYPE "public"."residential_property_type" AS ENUM('house', 'condo', 'apartment', 'villa', 'retirement', 'Block Of Units', 'townhouse', 'land', 'multi_family', 'office', 'retail', 'hospitality', 'multi-family', 'mixed_use', 'warehouses', 'plant');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('agent', 'admin', 'agency_admin');--> statement-breakpoint
CREATE TABLE "agencies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"address" text,
	"city" varchar(100),
	"state" varchar(50),
	"zip" varchar(20),
	"logo_url" text,
	"brand_color" varchar(7),
	"website" text,
	"description" text,
	"license_number" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "agencies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"agency_id" integer NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"photo_url" text,
	"bio" text,
	"license_number" varchar(100),
	"specialty_areas" jsonb,
	"years_experience" integer,
	"dateStarted" date,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favorites" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"property_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"agent_id" integer NOT NULL,
	"agency_id" integer NOT NULL,
	"address" varchar(255) NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(50) NOT NULL,
	"zip" varchar(20) NOT NULL,
	"latitude" numeric(10, 7),
	"longitude" numeric(10, 7),
	"min_price" numeric(12, 2),
	"max_price" numeric(12, 2),
	"is_auction" boolean DEFAULT false NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" numeric(3, 1) NOT NULL,
	"sqft" integer,
	"lot_size" numeric(10, 2),
	"year_built" integer,
	"property_type" "residential_property_type" NOT NULL,
	"description" text,
	"features" jsonb,
	"images" jsonb,
	"virtual_tour_url" text,
	"residential" boolean DEFAULT true NOT NULL,
	"status" "property_status" DEFAULT 'buy' NOT NULL,
	"listed_date" timestamp DEFAULT now() NOT NULL,
	"sold_date" timestamp,
	"view_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"role" "user_role",
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agents" ADD CONSTRAINT "agents_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agency_id_agencies_id_fk" FOREIGN KEY ("agency_id") REFERENCES "public"."agencies"("id") ON DELETE no action ON UPDATE no action;