import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playtime'
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
@Pipe({
  name: 'playtimems'
})
export class PlaytimeMillisecondsPipe implements PipeTransform {
  transform(input: number): string {
    if (input === 0) {
      return '';
    }
    let totalSeconds = input / 1000;
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    totalSeconds %= 3600;
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');

    return hours + ':' + minutes + ':' + seconds;
  }
}
