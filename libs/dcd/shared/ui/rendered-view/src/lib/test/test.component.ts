import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  @Input() test: string = 'default';
  constructor() {}

}
