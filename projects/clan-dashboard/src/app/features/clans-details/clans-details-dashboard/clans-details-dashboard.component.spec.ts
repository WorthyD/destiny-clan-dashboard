import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansDetailsDashboardComponent } from './clans-details-dashboard.component';

describe('ClansDetailsDashboardComponent', () => {
  let component: ClansDetailsDashboardComponent;
  let fixture: ComponentFixture<ClansDetailsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansDetailsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansDetailsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
