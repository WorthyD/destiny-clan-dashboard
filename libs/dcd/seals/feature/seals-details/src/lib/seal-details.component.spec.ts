import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SealDetailsComponent } from './seal-details.component';
import { SealsService } from '@dcd/seals/data-access';

describe('SealDetailsComponent', () => {
  let component: SealDetailsComponent;
  let fixture: ComponentFixture<SealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [provideMockStore(), { provide: SealsService, useValue: {} }],
      declarations: [SealDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
