import { initTRPC } from '@trpc/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const t = initTRPC.create();

const router = t.router;
const publicProcedure = t.procedure;

const appRouter = router({
  posts: router({
    getAll: publicProcedure.query(async () => {
      return prisma.posts.findMany({
        include: {
          author: true,
          category: true,
        },
      });
    }),
    getById: publicProcedure
      .input(z.object({ id: z.string().uuid() }))
      .query(async ({ input }) => {
        return prisma.posts.findUnique({
          where: { id: input.id },
          include: {
            author: true,
            category: true,
          },
        });
      }),
  }),
});

export type AppRouter = typeof appRouter;

export default appRouter; 