import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBreakdownListComponent } from './activity-breakdown-list.component';

describe('ActivityBreakdownListComponent', () => {
  let component: ActivityBreakdownListComponent;
  let fixture: ComponentFixture<ActivityBreakdownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityBreakdownListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityBreakdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
