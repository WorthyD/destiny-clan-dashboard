const packageJson = require('../../../../package.json');
import { secretKeys } from './secrets';

export const environment = {
  production: true,
  apiKey: secretKeys.apiKey,
  appVersion: packageJson.version
};
