// @ts-expect-error https://thymikee.github.io/jest-preset-angular/docs/getting-started/test-environment
// eslint-disable-next-line functional/immutable-data
globalThis.ngJest = {
  testEnvironmentOptions: {
    errorOnUnknownElements: true,
    errorOnUnknownProperties: true
  }
};
import 'jest-preset-angular/setup-jest';
