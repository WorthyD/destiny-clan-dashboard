import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'lib-member-type',
  template: `<mat-icon [svgIcon]="type | memberType" class="ico-{{type | memberType}}"></mat-icon>`,
  encapsulation: ViewEncapsulation.None
})
export class MemberTypeComponent  {
  @Input()
  type;
  constructor(){
  console.log('stuff');
  }


}
