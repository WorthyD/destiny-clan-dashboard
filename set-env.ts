var fs = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './apps/destiny-clan-dashboard/src/environments/secrets.ts';

const envConfigFile = `export const secretKeys = {
  apiKey: '${process.env['API_KEY']}',
};
`;

fs.writeFile(targetPath, envConfigFile, function (err: any) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(`Angular environment.ts file generated correctly at ${targetPath} \n`);
  }
});
