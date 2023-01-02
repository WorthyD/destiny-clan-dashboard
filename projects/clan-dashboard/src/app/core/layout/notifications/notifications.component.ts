// TODO: Rename this component to sync
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatCardModule } from '@angular/material/card';
interface Notification {
  title: string;
  data: {
    total?: number;
    progress: number;
    complete?: number;
  };
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, OverlayModule, MatButtonModule, MatProgressBarModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  isOpen = false;

  @Input() notifications: Notification[];
  constructor() {}
  sync() {
    this.isOpen = !this.isOpen;
  }
}
