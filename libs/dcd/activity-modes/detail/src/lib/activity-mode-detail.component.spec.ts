import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModeDetailComponent } from './activity-mode-detail.component';

describe('ActivityModeDetailComponent', () => {
  let component: ActivityModeDetailComponent;
  let fixture: ComponentFixture<ActivityModeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityModeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
