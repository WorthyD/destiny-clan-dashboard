import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivityModeDashboardComponent } from './activity-mode-dashboard.component';
import { ActivityModeService } from '@dcd/activity-modes/data-access';

describe('ActivityModeDashboardComponent', () => {
  let component: ActivityModeDashboardComponent;
  let fixture: ComponentFixture<ActivityModeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityModeDashboardComponent],
      providers: [
        {
          provide: ActivityModeService,
          useValue: {
            getGroupedActivityModes: jest.fn()
          }
        }
      ],

      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityModeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
