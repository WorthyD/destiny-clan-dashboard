import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansActivityCardComponent } from './clans-activity-card.component';
import { ClansDetailsActivitiesService } from '@dcd/dashboard/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClansActivityCardComponent', () => {
  let component: ClansActivityCardComponent;
  let fixture: ComponentFixture<ClansActivityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansActivityCardComponent],
      providers: [
        {
          provide: ClansDetailsActivitiesService,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
