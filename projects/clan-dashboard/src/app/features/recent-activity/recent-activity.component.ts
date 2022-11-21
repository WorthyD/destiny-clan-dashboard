import { Component, OnInit } from '@angular/core';
import { RecentActivityService } from './data-access/recent-activity.service';

@Component({
  selector: 'app-recent-activity-viewer',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {
  constructor(private recentActivityService: RecentActivityService) {}

  ngOnInit(): void {
    this.recentActivityService.clanProfiles$.subscribe((x) => {
      console.log('final', x);
    });
  }
}
