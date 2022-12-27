import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesDashboardComponent } from './activities-dashboard.component';

describe('ActivitiesDashboardComponent', () => {
  let component: ActivitiesDashboardComponent;
  let fixture: ComponentFixture<ActivitiesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivitiesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitiesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
