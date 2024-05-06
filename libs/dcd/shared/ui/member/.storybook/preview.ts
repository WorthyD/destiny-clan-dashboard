// eslint-disable-next-line @nx/enforce-module-boundaries
//export * from 'libs/storybook-host/.storybook/preview';
//export { decorators, parameters } from '../../../../../../.storybook/preview';
import * as preview from '../../../../../../.storybook/preview';

export const parameters = preview.parameters;
export const decorators = preview.decorators;
