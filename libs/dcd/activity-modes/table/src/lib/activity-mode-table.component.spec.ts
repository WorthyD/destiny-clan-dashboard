import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivityModeTableComponent } from './activity-mode-table.component';
import { ActivityModeService } from '@dcd/activity-modes/data-access';
import { BungieDateTimePipe, PlaytimePipe } from '@dcd/shared/utils/pipes';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActivityModeTableComponent', () => {
  let component: ActivityModeTableComponent;
  let fixture: ComponentFixture<ActivityModeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityModeTableComponent],
      imports: [RouterTestingModule, ],
      providers: [
        PlaytimePipe,
        BungieDateTimePipe,
        {
          provide: ActivityModeService,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityModeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
