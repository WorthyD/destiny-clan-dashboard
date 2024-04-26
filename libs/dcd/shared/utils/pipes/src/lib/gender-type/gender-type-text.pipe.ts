import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderTypeText',
  standalone: true
})
export class GenderTypeTextPipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Male';
      case 1:
        return 'Female';
    }
    return '';
  }
}
