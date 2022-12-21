import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bungieDate'
})
export class BungieDatePipe extends DatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  override transform(date: Date | string): any {
    const d2 = new Date(date)
    return super.transform(d2, 'yyyy-MM-dd');
  }
}
