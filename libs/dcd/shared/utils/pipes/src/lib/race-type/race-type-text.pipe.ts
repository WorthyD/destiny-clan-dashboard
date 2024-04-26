import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'raceTypeText',
  standalone: true
})
export class RaceTypeTextPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Human';
      case 1:
        return 'Awoken';
      case 2:
        return 'Exo';
    }
    return '';
  }
}
