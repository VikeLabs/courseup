// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { toHaveNoViolations } from 'jest-axe';

import fetch from 'jest-fetch-mock';

expect.extend(toHaveNoViolations);

global.fetch = require('jest-fetch-mock');
fetch.mockResponse(JSON.stringify({ testing: true }));
