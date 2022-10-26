const packageJson = require('../../../../package.json');
import { baseConstants } from './constants';
import { secretKeys } from './secrets';

export const environment = {
  constants: { ...baseConstants },
  production: true,
  apiKey: secretKeys.apiKey,
  appVersion: packageJson.version
};
