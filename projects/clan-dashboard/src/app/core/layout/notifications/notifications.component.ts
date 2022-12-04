import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  @Input() notifications: Notification[];
}
