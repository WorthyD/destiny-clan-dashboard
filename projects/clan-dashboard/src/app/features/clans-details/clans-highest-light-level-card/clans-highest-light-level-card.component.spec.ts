import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansHighestLightLevelCardComponent } from './clans-highest-light-level-card.component';

describe('ClansHighestLightLevelCardComponent', () => {
  let component: ClansHighestLightLevelCardComponent;
  let fixture: ComponentFixture<ClansHighestLightLevelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansHighestLightLevelCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansHighestLightLevelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
