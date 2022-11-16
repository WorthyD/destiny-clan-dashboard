import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @Input() test: string = 'default';
  constructor() {}

  ngOnInit(): void {}
}
