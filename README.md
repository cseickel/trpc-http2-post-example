This is a minimal reproduction of a bug submitted to the TRPC repo:

**Response not written to POST requests on HTTP2 connection**

# Bug Explanation

This provides two servers, one with http2 and one with http. The http2 server will not return any data from a mutation, while the http server will. To test it:

```bash
npm i
npm run dev
```

Go to http://localhost:3000 and change the name via the input. You will see no change in the page because nothing will be returned from the mutation.

Now go to `client/src/App.tsx` and change server `url` to `http://localhost:8080` and try to change the name again. This time you will see the greeting change and below the input it will say the old name and the new name.

This example take from: https://github.com/trpc/trpc/tree/next/examples/minimal-react
