import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivityTableComponent } from './activity-table.component';
import { ActivitiesService } from '@dcd/activities/data-access';

describe('ActivityTableComponent', () => {
  let component: ActivityTableComponent;
  let fixture: ComponentFixture<ActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityTableComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivitiesService,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
