import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playtime',
  standalone: true
})
export class PlaytimePipe implements PipeTransform {
  transform(input: number, showSeconds: boolean = true): string {
    let totalSeconds = input;
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    totalSeconds %= 3600;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = showSeconds ? ':' + String(Math.floor(totalSeconds % 60)).padStart(2, '0') : '';

    return hours + ':' + minutes + seconds;
  }
}
