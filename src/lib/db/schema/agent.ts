// Agents Table
import {relations} from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, serial, pgEnum, date } from 'drizzle-orm/pg-core';
import {agencies} from "@/lib/db/schema/agencies";
import {properties} from "@/lib/db/schema/properties";
import {users} from "@/lib/db/schema/users";

export const agents = pgTable('agents', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    agencyId: integer('agency_id').references(() => agencies.id).notNull(),
    firstName: varchar('first_name', { length: 100 }).notNull(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 50 }),
    photoUrl: text('photo_url'),
    bio: text('bio'),
    licenseNumber: varchar('license_number', { length: 100 }),
    specialtyAreas: jsonb('specialty_areas').$type<string[]>(), // ["residential", "commercial", "luxury"]
    yearsExperience: integer('years_experience'),
    dateStarted: date(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const agentsRelations = relations(agents, ({ one, many }) => ({
    user: one(users, {
        fields: [agents.userId],
        references: [users.id],
    }),
    agency: one(agencies, {
        fields: [agents.agencyId],
        references: [agencies.id],
    }),
    properties: many(properties),
    // inquiries: many(inquiries),
}));