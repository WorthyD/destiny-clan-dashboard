import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansRecentlyActiveCardComponent } from './clans-recently-active-card.component';

describe('ClansRecentlyActiveCardComponent', () => {
  let component: ClansRecentlyActiveCardComponent;
  let fixture: ComponentFixture<ClansRecentlyActiveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansRecentlyActiveCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansRecentlyActiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
