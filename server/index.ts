/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { initTRPC } from '@trpc/server';
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import fs from 'fs';
import http2, { Http2ServerRequest, Http2ServerResponse } from 'http2';
import http from 'http';
import cors from 'cors';
import { z } from 'zod';

const t = initTRPC.create();

const publicProcedure = t.procedure;
const router = t.router;

let name = "tRPC user";

const appRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish(),
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? name}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
  changeName: publicProcedure
    .input(
      z
        .object({
          newName: z.string()
        })
    )
    .mutation(({ input }) => {
      const oldName = name;
      const newName = input.newName;
      name = newName;
      return {
        oldName,
        newName,
      };
    }),
});

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;

// create server
const handler = createHTTPHandler({
  middleware: cors(),
  router: appRouter,
  createContext() {
    console.log('context 3');
    return {};
  },
})    
// use a self signed certificate
const options = {
  key: fs.readFileSync("localhost.key"),
  cert: fs.readFileSync("localhost.crt"),
};
// @ts-ignore
const http2Server = http2.createSecureServer(options, (request: Http2ServerRequest, response: Http2ServerResponse) => {
  handler(request as any, response as any);
});
http2Server.listen(8443, () => {
  console.log(`🚀 HTTP2 Server is now running on https://localhost:8443`);
});

const httpServer = http.createServer(handler);
httpServer.listen(8080, () => {
  console.log(`🚀 HTTP1 Server is now running on http://localhost:8080`);
});
