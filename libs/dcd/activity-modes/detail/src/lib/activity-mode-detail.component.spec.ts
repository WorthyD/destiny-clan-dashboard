import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivityModeDetailComponent } from './activity-mode-detail.component';
import { ActivityModeService } from '@dcd/activity-modes/data-access';

describe('ActivityModeDetailComponent', () => {
  let component: ActivityModeDetailComponent;
  let fixture: ComponentFixture<ActivityModeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityModeDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivityModeService,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityModeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
