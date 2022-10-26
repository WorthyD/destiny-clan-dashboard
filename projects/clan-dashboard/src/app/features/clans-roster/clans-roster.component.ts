import { Component, OnInit } from '@angular/core';
import { ClansRosterService } from './clans-roster.service';

@Component({
  selector: 'app-clans-roster',
  templateUrl: './clans-roster.component.html',
  styleUrls: ['./clans-roster.component.scss']
})
export class ClansRosterComponent implements OnInit {
  constructor(private clansRosterService: ClansRosterService) {}
  stuff$ = this.clansRosterService.activeClanUpdateDates$;

  ngOnInit(): void {}
}
