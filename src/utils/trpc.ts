import { createReactQueryHooks } from '@trpc/react';
import { AppRouter } from '@/backend/router';
import { inferProcedureOutput } from '@trpc/server';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}

export type inferQueryResponse<
    TRouteKey extends keyof AppRouter["_def"]["queries"]
    > = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>