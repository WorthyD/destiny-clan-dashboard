import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansInactiveCardComponent } from './clans-inactive-card.component';

describe('ClansInactiveCardComponent', () => {
  let component: ClansInactiveCardComponent;
  let fixture: ComponentFixture<ClansInactiveCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansInactiveCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansInactiveCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
