import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityBreakdownListComponent } from './activity-breakdown-list.component';
import { ActivitiesService } from '@dcd/activities/data-access';

describe('ActivityBreakdownListComponent', () => {
  let component: ActivityBreakdownListComponent;
  let fixture: ComponentFixture<ActivityBreakdownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityBreakdownListComponent],
      providers: [{ provide: ActivitiesService, useValue: {} }]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityBreakdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
