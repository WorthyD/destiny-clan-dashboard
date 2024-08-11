import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModeCardDetailsComponent } from './activity-mode-card-details.component';
import { RouterTestingModule } from '@angular/router/testing';
describe('ActivityCardDetailsComponent', () => {
  let component: ActivityModeCardDetailsComponent;
  let fixture: ComponentFixture<ActivityModeCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActivityModeCardDetailsComponent ,RouterTestingModule]
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
