import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonChartLoaderComponent } from './skeleton-chart-loader.component';

describe('SkeletonChartLoaderComponent', () => {
  let component: SkeletonChartLoaderComponent;
  let fixture: ComponentFixture<SkeletonChartLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SkeletonChartLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonChartLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
