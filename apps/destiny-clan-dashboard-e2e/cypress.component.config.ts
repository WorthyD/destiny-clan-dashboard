export const defaultConfig: Cypress.ConfigOptions = {
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: '',
          sourceRoot: 'apps/destiny-clan-dashboard',
          buildOptions: {
            outputPath: 'dist/apps/destiny-clan-dashboard',
            index: 'apps/destiny-clan-dashboard/src/index.html',
            main: 'apps/destiny-clan-dashboard/src/main.ts',
            polyfills: 'apps/destiny-clan-dashboard/src/polyfills.ts',
            tsConfig: 'apps/destiny-clan-dashboard/tsconfig.app.json',
            inlineStyleLanguage: 'scss',
            assets: ['apps/destiny-clan-dashboard/src/favicon.ico', 'apps/destiny-clan-dashboard/src/assets'],
            styles: ['apps/destiny-clan-dashboard/src/styles.scss'],
            scripts: [],
            buildOptimizer: false,
            optimization: false,
            vendorChunk: true,
            extractLicenses: false,
            sourceMap: true,
            namedChunks: true
          }
        }
      }
    }
  }
};
