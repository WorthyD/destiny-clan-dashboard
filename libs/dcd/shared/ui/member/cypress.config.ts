import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
import { defineConfig } from 'cypress';
import { defaultConfig } from '../../../../../apps/destiny-clan-dashboard-e2e/cypress.component.config';

// export default defineConfig(defaultConfig);
//import { nxComponentTestingPreset } from '@nx/angular/plugins/component-testing';
// import { defineConfig } from 'cypress';
// import {defaultConfig} from '../../../../../apps/destiny-clan-dashboard-e2e/cypress.component.config';

export default defineConfig({
  component: {
    //   devServer: {
    //     options: {
    //       projectConfig: {
    //         buildOptions: {}
    //       }
    //     }
    //   },
    ...nxComponentTestingPreset(__filename)
  }
});
