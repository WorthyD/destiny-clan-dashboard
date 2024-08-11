import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOptionsComponent } from './display-options.component';

describe('DisplayOptionsComponent', () => {
  let component: DisplayOptionsComponent;
  let fixture: ComponentFixture<DisplayOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DisplayOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
