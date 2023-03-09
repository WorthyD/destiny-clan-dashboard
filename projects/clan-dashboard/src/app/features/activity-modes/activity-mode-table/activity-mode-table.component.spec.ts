import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityModeTableComponent } from './activity-mode-table.component';

describe('ActivityModeTableComponent', () => {
  let component: ActivityModeTableComponent;
  let fixture: ComponentFixture<ActivityModeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityModeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityModeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
