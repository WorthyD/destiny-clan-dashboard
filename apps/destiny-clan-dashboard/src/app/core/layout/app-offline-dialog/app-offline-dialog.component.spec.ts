import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOfflineDialogComponent } from './app-offline-dialog.component';

describe('AppOfflineDialogComponent', () => {
  let component: AppOfflineDialogComponent;
  let fixture: ComponentFixture<AppOfflineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AppOfflineDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppOfflineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
