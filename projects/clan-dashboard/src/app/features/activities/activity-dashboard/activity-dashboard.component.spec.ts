import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityDashboardComponent } from './activity-dashboard.component';

describe('ActivityDashboardComponent', () => {
  let component: ActivityDashboardComponent;
  let fixture: ComponentFixture<ActivityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
