import { Hono } from 'hono';
import { tracking } from './tracking';

const appRouter = new Hono();

// Mount tracking routes
appRouter.route('/tracking', tracking);

export { appRouter };
export type AppRouter = typeof appRouter;
