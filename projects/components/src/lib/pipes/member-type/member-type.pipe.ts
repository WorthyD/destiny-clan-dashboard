import { Pipe, PipeTransform } from '@angular/core';
import { MembershipTypes } from '@destiny/data/models/enums';

@Pipe({
  name: 'memberType'
})
export class MemberTypePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case MembershipTypes.Xbox:
        return 'xbox';
      case MembershipTypes.Psn:
        return 'playstation';
      case MembershipTypes.Steam:
        return 'steam';
      case MembershipTypes.Stadia:
        return 'stadia';
      default:
        return '';
    }
  }
}
