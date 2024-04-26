import { Pipe, PipeTransform } from '@angular/core';
import { DestinyComponentsCollectiblesDestinyCollectibleComponent } from 'bungie-api-angular';
import { hasItem } from './has-item';

@Pipe({
  name: 'inCollections',
  standalone: true
})
export class InCollectionsPipe implements PipeTransform {
  transform(value: DestinyComponentsCollectiblesDestinyCollectibleComponent): unknown {
    return hasItem(value);
  }
}
