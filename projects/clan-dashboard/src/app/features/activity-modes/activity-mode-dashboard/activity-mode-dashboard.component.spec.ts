import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModeDashboardComponent } from './activity-mode-dashboard.component';

describe('ActivityModeDashboardComponent', () => {
  let component: ActivityModeDashboardComponent;
  let fixture: ComponentFixture<ActivityModeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityModeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
