# Clockwork - Backend Services
The Clockwork application backend REST API exists as a [Express](https://expressjs.com/) application deployed on [Google Cloud Platform's Cloud Functions](https://cloud.google.com/functions) service.
## Development
### Setup
#### Pre-requisites
In order to develop this application you will need to setup the development dependencies. It is assumed that you have:
- Node.js 12 
    - We recommend using a Node version manager available on your platform like [nvm](https://github.com/nvm-sh/nvm).
- Java Runtime Environment
    - This is required to run some of the emulators as part of Firebase Tools 

#### Install
1. Install Firebase Tools using `npm install -g firebase-tools`. 
    - This will install Firebase tools globally under your current Node/npm version.
2. Initialize the Firebase emulators using `npm run firebase:init`
    - This will initialize any emulators within Firebase used by the application.
    - **Note**: Firestore Emulator does not persist unless specified in arguments. 
3. Install Node dependencies using `npm ci`
    - **Note**: Avoid using `npm install` unless you are install/updating a dependency.

Once you're done that, you should be good to go!

### Developing
Once your development environment is setup, you will be able to use the following npm scripts configured.

#### Develop
This will run the Firestore emulator, the Express server and the tsoa generation script in parallel and live-reload when files change. 
```
npm start
```

#### Firebase
If you wish to run your application under the environement most closngly resembling production, you can run the following:
```
npm run firebase:serve
```
This will build the application into JavaScript, run the Firebase emulators for Firestore and Firebase Functions. Follow the console output to determine the port and path of the application. 

## Architecture
Since we utilize Cloud Functions to run a Express app, it is faster and easier to run the Express app through normal means rather than starting it with `firebase emulators:start --only functions`.

You can start the Express application and tsoa route generator with a single command using `npm run dev`. This will also rebuild the app when files change, making development quite fast and enjoyable.

### tsoa
[tsoa](https://tsoa-community.github.io/docs/) helps create "OpenAPI-compliant REST APIs using TypeScript and Node". As part of that process, tsoa generates Express routes from files that match `*.controller.ts`. This means that when a change is made to a controller, the tsoa generator must run. Developers can manually invoke the generator with `npx tsoa routes`. 

### Firebase
Since this Express app is meant to be utilized in a Firebase/Cloud Functions environment, it is important to test your changes inside the Firebase emulator prior to deployment to confirm there are no environment specific issues. While the development environment tries to address these issues, you may still run into some.

To test your changes for cloud functions within a Firebase context:
1. Build the application with `npm run build`.
2. Start the emulator with `firebase emulators:start --only functions`.
    - If you wish you start the entire application (including the frontend), omit `--only functions`.

### Architecture
In this section, the architecture and structure of the application code is explained. Please similarize yourself with the basic of the [model-view-controller](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) software design pattern. 

#### Service
Since "service" is not mentioned in most MVC type systems. we briefly explain the purpose of them.

We utilize the concept of a "service" in this application to faciliate any logic that doesn't fit in the model or controller. Since the controller faciliates how the REST API behaves such as the route and caching behaviour and the model facilitates the data we're handling, any logic that is required to accomplish what the controller needs etc. _should_ live in the service file. This might include tasks of fetching data from a database and what not.