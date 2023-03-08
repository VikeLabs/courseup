// polyfills some web APIs using Next.js' polyfills
require('next/dist/server/node-polyfill-fetch');
require('next/dist/server/node-polyfill-web-streams');
// loads the environment variables from .env.local and .env files
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd(), false, console, true);
