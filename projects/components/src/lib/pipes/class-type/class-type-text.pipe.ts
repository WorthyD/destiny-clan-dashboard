import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'classTypeText',
})
export class ClassTypeTextPipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 0:
                return 'Titan';
            case 1:
                return 'Hunter';
            case 2:
                return 'Warlock';
        }
        return '';
    }
}
