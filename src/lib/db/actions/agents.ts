// ============================================================================
// Agent Actions
// ============================================================================

import { db } from '@/lib/db';
import {agents, agencies} from "@/lib/db/schema";
import { eq } from 'drizzle-orm';

export type AgentWithAgency = {
    agent: typeof agents.$inferSelect;
    agency: typeof agencies.$inferSelect | null;
};

type AgentSuccess = {
    success: true;
    data: AgentWithAgency;
};

type AgentError = {
    success: false;
    error: string;
};

export type AgentActionResult = AgentSuccess | AgentError;

/**
 * Get agent by ID with their related agency
 */
export async function getAgentByIdAction(
    agentId: number
): Promise<AgentActionResult> {
    try {
        const agentResult = await db
            .select({
                agent: agents,
                agency: agencies,
            })
            .from(agents)
            .leftJoin(agencies, eq(agents.agencyId, agencies.id))
            .where(eq(agents.id, agentId))
            .limit(1);

        if (agentResult.length === 0) {
            return {
                success: false,
                error: 'Agent not found',
            };
        }

        const { agent, agency } = agentResult[0];

        return {
            success: true,
            data: {
                agent,
                agency,
            },
        };
    } catch (error) {
        console.error('Error in getAgentByIdAction:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch agent',
        };
    }
}

/**
 * Get agent by ID (slug-friendly version)
 */
export async function getAgentAction(
    id: string | number
): Promise<AgentActionResult> {
    const agentId = typeof id === 'string' ? parseInt(id) : id;

    if (isNaN(agentId)) {
        return {
            success: false,
            error: 'Invalid agent ID',
        };
    }

    return getAgentByIdAction(agentId);
}