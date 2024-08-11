import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansRecentlyActiveCardComponent } from './clans-recently-active-card.component';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
import { of } from 'rxjs';

describe('ClansRecentlyActiveCardComponent', () => {
  let component: ClansRecentlyActiveCardComponent;
  let fixture: ComponentFixture<ClansRecentlyActiveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansRecentlyActiveCardComponent],
      providers: [
        {
          provide: ClansDetailsService,
          useValue: {
            lastLoginMembers$: of(null)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansRecentlyActiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
