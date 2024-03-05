# CourseUp WSS

This server is used for user authentication for the frontend. Ideally when finished, users will be able to sign in to CourseUp with an account, and an `express.js` session will be created. Users will be given a session ID which hopefully the `next.js` frontend will be able to use to render authenticated data.

Websockets will come in to deliver live updates from this running server to the user's `Global Context Provider`, hence the `'WSS'` in `CourseUp WSS`.

# Developing

`CourseUp WSS` runs in a docker container just like the PostgreSQL image created with the `docker compose up -d` command. It would be cumbersome to constantly delete the wss image and redeploy through docker compose each time you make changes so in the root of the CourseUp repository, you can launch a dev environment of the wss server with the following command:

```shell
npm run wss
```

This dev environment will hot-reload with any changes you make to make development a little bit easier.

# Database Commands Guide

Developing `CourseUp WSS` will likely need an active local instance of the database to be running. This guide goes over how to get the PostgreSQL database setup and running in docker for wss development.

**Note:** all commands in this guide are expected to be run in the root of the courseup project directory.

## Creating The Docker Image And Volume

The first and most important step to do is to make sure that the `courseup-postgresql` image and volume are created and available on your machine. To do this, in the ensure that you have run `docker compose up -d` at least once, this creates the image and volume that you need.

After running this command you will notice that you have two running containers, `courseup-postgresql` and `courseup-wss`. This isn't good because we want to run wss outside of the docker container so it is easier to develop changes. Stop these containers by running `docker compose down`.

You now have all pre-requisite docker _things_ setup!

## NPM Commands

To make a standalone `courseup-postgresql` container that is decoupled from `courseup-wss`, run `npm run db:buildStandalone`.

To start and stop this container, you can use the following commands:

- Start: `npm run db:launchStandalone`
- Stop: `npm run db:stopStandalone`

If you want to launch the entire service again with `docker compose up -d`, ensure the standalone container is not active.

If you wish to remove this container entirely, you can use `npm run db:cleanupStandalone`

**Note:** this standalone container shares the same volume as the container coupled with the `courseup-wss` container, this is useful as it means that no matter what way you are running your database locally, the data and any changes you make will remain the same across both methods.

## Migration & Seeding The Database

To populate the database with the latest course data and migrations, ensure it is running (coupled or decoupled) and run the following command:

```sh
npx prisma migrate deploy && npx prisma db seed
```
