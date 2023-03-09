import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModeCardDetailsComponent } from './activity-mode-card-details.component';

describe('ActivityCardDetailsComponent', () => {
  let component: ActivityModeCardDetailsComponent;
  let fixture: ComponentFixture<ActivityModeCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActivityModeCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModeCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
