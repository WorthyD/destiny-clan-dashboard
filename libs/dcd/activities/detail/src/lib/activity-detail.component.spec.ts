import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivitiesService } from '@dcd/activities/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActivityDetailComponent', () => {
  let component: ActivityDetailComponent;
  let fixture: ComponentFixture<ActivityDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivitiesService,
          useValue: {
            getCuratedActivities: jest.fn()
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
