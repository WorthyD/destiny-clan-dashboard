import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardDetailsComponent } from './activity-card-details.component';

describe('ActivityCardDetailsComponent', () => {
  let component: ActivityCardDetailsComponent;
  let fixture: ComponentFixture<ActivityCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActivityCardDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
