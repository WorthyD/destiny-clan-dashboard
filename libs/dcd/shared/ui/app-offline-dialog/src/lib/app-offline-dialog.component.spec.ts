import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppOfflineDialogComponent } from './app-offline-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AppConfigService } from '@dcd/shared/utils/app-config';

describe('AppOfflineDialogComponent', () => {
  let component: AppOfflineDialogComponent;
  let fixture: ComponentFixture<AppOfflineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppOfflineDialogComponent],
      providers: [
        {
          provide: MatDialogRef<AppOfflineDialogComponent>,
          useValue: {}
        },
        {
          provide: AppConfigService,
          useValue: {}
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppOfflineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
