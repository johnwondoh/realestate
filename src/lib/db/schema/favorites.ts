import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import {users} from "@/lib/db/schema/users";
import {properties} from "@/lib/db/schema/properties";

// Optional: Favorites Table
export const favorites = pgTable('favorites', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    propertyId: integer('property_id').references(() => properties.id).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const favoritesRelations = relations(favorites, ({ one }) => ({
    user: one(users, {
        fields: [favorites.userId],
        references: [users.id],
    }),
    property: one(properties, {
        fields: [favorites.propertyId],
        references: [properties.id],
    }),
}));