import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClanActivityBarChartComponent } from './clan-activity-bar-chart.component';

describe('ClanActivityBarChartComponent', () => {
  let component: ClanActivityBarChartComponent;
  let fixture: ComponentFixture<ClanActivityBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClanActivityBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClanActivityBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
