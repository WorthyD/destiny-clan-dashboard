import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansRosterComponent } from './clans-roster.component';
import { ClansRosterService } from '@dcd/clans-roster/data-access';
import { BungieDatePipe, BungieDateTimePipe } from '@dcd/shared/utils/pipes';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClansRosterComponent', () => {
  let component: ClansRosterComponent;
  let fixture: ComponentFixture<ClansRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansRosterComponent],
      providers: [
        BungieDatePipe,
        BungieDateTimePipe,
        {
          provide: ClansRosterService,
          useValue: { clanRosterItems$: of(null) }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
