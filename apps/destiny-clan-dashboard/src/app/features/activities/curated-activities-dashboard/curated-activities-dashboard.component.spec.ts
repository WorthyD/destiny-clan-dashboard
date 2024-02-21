import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuratedActivitiesDashboardComponent } from './curated-activities-dashboard.component';

describe('ActivitiesDashboardComponent', () => {
  let component: CuratedActivitiesDashboardComponent;
  let fixture: ComponentFixture<CuratedActivitiesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuratedActivitiesDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuratedActivitiesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
