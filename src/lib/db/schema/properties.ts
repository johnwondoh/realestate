import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import {agents} from "@/lib/db/schema/agent";
import {agencies} from "@/lib/db/schema/agencies";
import {favorites} from "@/lib/db/schema/favorites";


// export const propertyStatusEnum = pgEnum('property_status', ['active', 'pending', 'sold', 'off_market']);
export const propertyCategoryEnum = pgEnum('property_category', ['residential', 'Commercial']);
export const propertyStatusEnum = pgEnum('property_status', ['buy', 'rent', 'sold']);
export const propertyTypeEnum = pgEnum('residential_property_type', [
    'house', 'condo', 'apartment', 'villa', 'retirement', 'Block Of Units', 'townhouse', 'land', 'multi_family',
    'office', 'retail', 'hospitality', 'multi-family', 'mixed_use', 'warehouses', 'plant'
]);

// Properties Table -- create commercial properties table later that has commercial attributes and link to this later
export const properties = pgTable('properties', {
    id: serial('id').primaryKey(),
    agentId: integer('agent_id').references(() => agents.id).notNull(),
    agencyId: integer('agency_id').references(() => agencies.id).notNull(),

    // Address
    address: varchar('address', { length: 255 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar('state', { length: 50 }).notNull(),
    zip: varchar('zip', { length: 20 }).notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 7 }),
    longitude: decimal('longitude', { precision: 10, scale: 7 }),

    // Basic Info
    minPrice: decimal('min_price', { precision: 12, scale: 2 }),
    maxPrice: decimal('max_price', { precision: 12, scale: 2 }),
    isAuction: boolean('is_auction').default(false).notNull(),
    bedrooms: integer('bedrooms').notNull(),
    bathrooms: decimal('bathrooms', { precision: 3, scale: 1 }).notNull(),
    sqft: integer('sqft'),
    lotSize: decimal('lot_size', { precision: 10, scale: 2 }), // in acres
    yearBuilt: integer('year_built'),
    propertyType: propertyTypeEnum('property_type').notNull(),

    // Details
    description: text('description'),
    features: jsonb('features').$type<string[]>(), // ["pool", "garage", "fireplace"]
    images: jsonb('images').$type<string[]>(), // array of image URLs
    virtualTourUrl: text('virtual_tour_url'),

    // check if commercial
    isResidential: boolean('residential').default(true).notNull(),

    // Status
    status: propertyStatusEnum('status').default('buy').notNull(),
    listedDate: timestamp('listed_date').defaultNow().notNull(),
    soldDate: timestamp('sold_date'),
    soldPrice: decimal('max_price', { precision: 12, scale: 2 }),

    // Metadata
    viewCount: integer('view_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});


export const propertiesRelations = relations(properties, ({ one, many }) => ({
    agent: one(agents, {
        fields: [properties.agentId],
        references: [agents.id],
    }),
    agency: one(agencies, {
        fields: [properties.agencyId],
        references: [agencies.id],
    }),
    // inquiries: many(inquiries),
    favorites: many(favorites),
}));

