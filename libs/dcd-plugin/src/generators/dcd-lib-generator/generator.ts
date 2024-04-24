import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { DcdLibGeneratorGeneratorSchema } from './schema';
import { libraryGenerator as angularLibraryGenerator, UnitTestRunner } from '@nx/angular/generators';
import { Schema } from '@nx/angular/src/generators/library/schema';

export async function dcdLibGeneratorGenerator(tree: Tree, options: DcdLibGeneratorGeneratorSchema) {
  // const projectName2 = options.name.replace(/\//g, '-');
  // const pathArray = options.name.split('/');
  // const projectName = pathArray[pathArray.length - 1];
  // const pathArrayClone = [...pathArray];
  // pathArrayClone.pop();
  // const rootWOName = pathArrayClone;
  // // TODO: Add dcd
  // const projectRoot = `libs/${rootWOName}`;
  // const importPath = `@destiny-clan-dashboard/${options.name}`;

  const includeUnitTests = options.libType !== 'type:model';

  const projectName = options.name.replace(/\//g, '-');
  const projectRoot = `libs/dcd/${options.name}`;
  const importPath = `@dcd/${options.name}`;

  const ngOptions: Schema = {
    name: projectName,
    directory: projectRoot,
    importPath: importPath,
    tags: options.libType,
    skipModule: true,
    standalone: false,
    prefix:'dcd',
    unitTestRunner: includeUnitTests ? UnitTestRunner.Jest : UnitTestRunner.None,
    strict:true,
    style: 'scss',
    projectNameAndRootFormat: 'as-provided'
  };
  console.log(ngOptions);

  await angularLibraryGenerator(tree, ngOptions);

  await formatFiles(tree);
}

export default dcdLibGeneratorGenerator;
//nx g @nx/angular:library data-util --directory=libs/dcd/shared/data --importPath="@destiny-clan-dashboard/shared/data" --skip-module --standalone=false
