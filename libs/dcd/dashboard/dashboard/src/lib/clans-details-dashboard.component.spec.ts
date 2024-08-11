import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansDetailsDashboardComponent } from './clans-details-dashboard.component';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClansDetailsDashboardComponent', () => {
  let component: ClansDetailsDashboardComponent;
  let fixture: ComponentFixture<ClansDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansDetailsDashboardComponent],
      providers: [
        {
          provide: ClansDetailsService,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
