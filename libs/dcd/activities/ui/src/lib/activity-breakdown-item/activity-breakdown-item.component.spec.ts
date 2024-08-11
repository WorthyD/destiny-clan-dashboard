import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBreakdownItemComponent } from './activity-breakdown-item.component';

describe('ActivityBreakdownItemComponent', () => {
  let component: ActivityBreakdownItemComponent;
  let fixture: ComponentFixture<ActivityBreakdownItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActivityBreakdownItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityBreakdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
