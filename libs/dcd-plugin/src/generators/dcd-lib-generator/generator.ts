import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { DcdLibGeneratorGeneratorSchema } from './schema';
import { libraryGenerator as angularLibraryGenerator } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';

export async function dcdLibGeneratorGenerator(tree: Tree, options: DcdLibGeneratorGeneratorSchema) {
  const projectName2 = options.name.replace(/\//g, '-');
  const pathArray = options.name.split('/');
  const projectName = pathArray[pathArray.length - 1];
  const pathArrayClone = [...pathArray];
  pathArrayClone.pop();
  const rootWOName = pathArrayClone;
  // TODO: Add dcd
  const projectRoot = `libs/${rootWOName}`;
  const importPath = `@destiny-clan-dashboard/${options.name}`;
  // addProjectConfiguration(tree, projectName, {
  //   root: projectRoot,
  //   projectType: 'library',
  //   sourceRoot: `${projectRoot}/src`,
  //   targets: {}
  // });

  // generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);


  // TODO: Update project name in project.json
  // TODO: Add confirmmation of utility type https://github.com/nrwl/nx/blob/5a74c02a49076a145cdba8d475b03193f317c889/packages/tao/src/shared/params.ts#L682-L748


  const ngOptions: Schema = {
    name: projectName,
    directory: projectRoot,
    importPath: importPath,
    tags: '',
    // simpleName: true,
    skipModule: true,
    standalone: false,
    style: 'scss',
//     projectNameAndRootFormat: 'derived',
  };
  console.log(ngOptions);

  await angularLibraryGenerator(tree, ngOptions);

  await formatFiles(tree);
}

export default dcdLibGeneratorGenerator;
//nx g @nx/angular:library data-util --directory=libs/dcd/shared/data --importPath="@destiny-clan-dashboard/shared/data" --skip-module --standalone=false
