import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import {agents} from "@/lib/db/schema/agent";
import {properties} from "@/lib/db/schema/properties";

// Enums
export const inquiryStatusEnum = pgEnum('inquiry_status', ['new', 'contacted', 'in_progress', 'closed']);
export const inquiryTypeEnum = pgEnum('inquiry_type', ['viewing', 'more_info', 'offer', 'general']);

// Agencies Table
export const agencies = pgTable('agencies', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }),
    address: text('address'),
    city: varchar('city', { length: 100 }),
    state: varchar('state', { length: 50 }),
    zip: varchar('zip', { length: 20 }),
    logoUrl: text('logo_url'),
    brandColor: varchar('brand_color', { length: 7 }), // hex color #RRGGBB
    website: text('website'),
    description: text('description'),
    licenseNumber: varchar('license_number', { length: 100 }),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const agenciesRelations = relations(agencies, ({ many }) => ({
    agents: many(agents),
    properties: many(properties),
}));


// // Inquiries Table
// export const inquiries = pgTable('inquiries', {
//     id: serial('id').primaryKey(),
//     propertyId: integer('property_id').references(() => properties.id).notNull(),
//     agentId: integer('agent_id').references(() => agents.id).notNull(),
//
//     // Contact Info
//     name: varchar('name', { length: 255 }).notNull(),
//     email: varchar('email', { length: 255 }).notNull(),
//     phone: varchar('phone', { length: 50 }),
//
//     // Inquiry Details
//     message: text('message').notNull(),
//     inquiryType: inquiryTypeEnum('inquiry_type').default('more_info').notNull(),
//     preferredContactMethod: varchar('preferred_contact_method', { length: 20 }), // "email", "phone", "text"
//
//     // Status & Tracking
//     status: inquiryStatusEnum('status').default('new').notNull(),
//     agentRespondedAt: timestamp('agent_responded_at'),
//     notes: text('notes'), // internal agent notes
//
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//     updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });



// export const inquiriesRelations = relations(inquiries, ({ one }) => ({
//     property: one(properties, {
//         fields: [inquiries.propertyId],
//         references: [properties.id],
//     }),
//     agent: one(agents, {
//         fields: [inquiries.agentId],
//         references: [agents.id],
//     }),
// }));

