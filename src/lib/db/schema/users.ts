import { pgTable, text, varchar, integer, decimal, timestamp, boolean, jsonb, serial, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import {agents} from "@/lib/db/schema/agent";

import {favorites} from "@/lib/db/schema/favorites";


export const userRoleEnum = pgEnum('user_role', ['agent', 'admin', 'agency_admin']);

// Users Table (Authentication)
export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: userRoleEnum('role'),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
    agent: one(agents, {
        fields: [users.id],
        references: [agents.userId],
    }),
    favorites: many(favorites),
}));