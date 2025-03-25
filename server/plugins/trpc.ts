import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../trpc';

export default function (nitroApp) {
  const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: '/api/trpc',
      }),
    ],
  });

  nitroApp.h3App.use('/api/trpc', async (event) => {
    const { method, url } = event;
    const path = url.split('/').slice(3).join('/');
    
    try {
      const result = await client.$query(path, {});
      return result;
    } catch (error) {
      console.error('tRPC error:', error);
      throw createError({
        statusCode: 500,
        message: 'Internal Server Error',
      });
    }
  });
} 