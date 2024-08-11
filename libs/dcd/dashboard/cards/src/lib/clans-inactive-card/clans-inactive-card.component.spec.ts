import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansInactiveCardComponent } from './clans-inactive-card.component';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
import { of } from 'rxjs';

describe('ClansInactiveCardComponent', () => {
  let component: ClansInactiveCardComponent;
  let fixture: ComponentFixture<ClansInactiveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansInactiveCardComponent],
      providers: [{ provide: ClansDetailsService, useValue: { inactiveMemberList$: of(null) } }]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansInactiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
