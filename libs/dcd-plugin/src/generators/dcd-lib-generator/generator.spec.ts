import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { dcdLibGeneratorGenerator } from './generator';
import { DcdLibGeneratorGeneratorSchema } from './schema';

describe('dcd-lib-generator generator', () => {
  let tree: Tree;
  const options: DcdLibGeneratorGeneratorSchema = { name: 'dcd/shared/ui/class-item' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await dcdLibGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'dcd-shared-ui-class-item');
    console.log(tree);
    expect(config).toBeDefined();
  });
});
