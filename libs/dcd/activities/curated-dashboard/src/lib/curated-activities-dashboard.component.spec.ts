import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CuratedActivitiesDashboardComponent } from './curated-activities-dashboard.component';
import { ActivitiesService } from '@dcd/activities/data-access';

describe('ActivitiesDashboardComponent', () => {
  let component: CuratedActivitiesDashboardComponent;
  let fixture: ComponentFixture<CuratedActivitiesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CuratedActivitiesDashboardComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivitiesService,
          useValue: {
            getCuratedActivities: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CuratedActivitiesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
