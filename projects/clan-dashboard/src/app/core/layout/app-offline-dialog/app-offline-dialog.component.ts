import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AppConfig } from '../../config/app-config';
@Component({
  selector: 'app-app-offline-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './app-offline-dialog.component.html',
  styleUrls: ['./app-offline-dialog.component.scss']
})
export class AppOfflineDialogComponent {
  constructor(public dialogRef: MatDialogRef<AppOfflineDialogComponent>, private appConfig: AppConfig) {}
  onNoClick(): void {
    window.sessionStorage.setItem(this.appConfig.constants.D2DASHBOARD_ACKNOWLEDGE_OFFLINE, 'true');
    this.dialogRef.close();
  }
}
