import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bungieDate'
})
export class BungieDatePipe extends DatePipe implements PipeTransform {

  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }
  isValidDate(d:any) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  override transform(date: Date | string): any {
    if (date === null){
    return '';
    }
    const d2 = new Date(date)

    return super.transform(d2, 'yyyy-MM-dd');
  }
}
