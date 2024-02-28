import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit';
import * as path from 'path';
import { DcdLibGeneratorGeneratorSchema } from './schema';

export async function dcdLibGeneratorGenerator(tree: Tree, options: DcdLibGeneratorGeneratorSchema) {
  const projectRoot = `libs/${options.name}`;
  const projectName = options.name.replace(/\//g, '-')
  addProjectConfiguration(tree, projectName, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {}
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default dcdLibGeneratorGenerator;
//nx g @nx/angular:library data-util --directory=libs/dcd/shared/data --importPath="@destiny-clan-dashboard/shared/data" --skip-module --standalone=false
