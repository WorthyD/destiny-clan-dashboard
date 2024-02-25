import { DeepPartial } from '@destiny-clan-dashboard/data/models';
import { baseConstants } from '../../../environments/constants';

export class AppConfig {
  readonly constants: DeepPartial<typeof baseConstants>;
  readonly apiKey: string;
  readonly appVersion: string;
  readonly production: boolean;
}
