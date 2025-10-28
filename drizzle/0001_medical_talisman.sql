ALTER TABLE "properties" ADD COLUMN "is_residential" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "sold_price" numeric(12, 2);--> statement-breakpoint
ALTER TABLE "properties" DROP COLUMN "residential";