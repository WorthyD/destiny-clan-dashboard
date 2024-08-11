import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { SealsDashboardComponent } from './seals-dashboard.component';
import { SealsService } from '@dcd/seals/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('SealsDashboardComponent', () => {
  let component: SealsDashboardComponent;
  let fixture: ComponentFixture<SealsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      providers: [{ provide: SealsService, useValue: {} }],
      declarations: [SealsDashboardComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(SealsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
