import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bungieDate',
  standalone: true
})
export class BungieDatePipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }
  isValidDate(d: any) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  override transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
  override transform(value: null | undefined, format?: string, timezone?: string, locale?: string): null;
  override transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string): string | null {
    if (value === null || value === undefined) {
      return '';
    }
    const d2 = new Date(value);

    return super.transform(d2, 'yyyy-MM-dd');
  }
}
