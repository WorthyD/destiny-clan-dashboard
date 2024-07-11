import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentActivityComponent } from './recent-activity.component';
import { RecentActivityService } from '@dcd/roster-recent-activity/data-access';
import { BungieDateTimePipe, PlaytimePipe } from '@dcd/shared/utils/pipes';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('RecentActivityComponent', () => {
  let component: RecentActivityComponent;
  let fixture: ComponentFixture<RecentActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentActivityComponent],
      providers: [
        {
          provide: RecentActivityService,
          useValue: {}
        },
        PlaytimePipe,
        BungieDateTimePipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(RecentActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
