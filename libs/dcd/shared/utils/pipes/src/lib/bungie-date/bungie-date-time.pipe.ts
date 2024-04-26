import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bungieDateTime',
  standalone: true
})
export class BungieDateTimePipe extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  override transform(value: Date | string | number, format?: string, timezone?: string, locale?: string): string | null;
  override transform(value: null | undefined, format?: string, timezone?: string, locale?: string): null;
  override transform(value: Date | string | number | null | undefined, format?: string, timezone?: string, locale?: string): string | null {
    return super.transform(value, 'yyyy-MM-dd h:mm a') || '';
  }
}
