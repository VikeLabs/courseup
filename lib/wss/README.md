# CourseUp WSS

This server is used for user authentication for the frontend. Ideally when finished, users will be able to sign in to CourseUp with an account, and an `express.js` session will be created. Users will be given a session ID which hopefully the `next.js` frontend will be able to use to render authenticated data.

Websockets will come in to deliver live updates from this running server to the user's `Global Context Provider`, hence the `'WSS'` in `CourseUp WSS`.

# Developing

`CourseUp WSS` runs in a docker container just like the PostgreSQL image created with the `docker compose up -d` command. It would be cumbersome to constantly delete the wss image and redeploy through docker compose each time you make changes so in the root of the CourseUp repository, you can launch a dev environment of the wss server with the following command:

```shell
npm run wss
```

This dev environment will hot-reload with any changes you make to make development a little bit easier.
