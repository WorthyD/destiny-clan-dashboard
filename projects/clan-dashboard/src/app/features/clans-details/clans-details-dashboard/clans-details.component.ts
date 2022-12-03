import { Component, OnInit } from '@angular/core';
import { ClansDetailsService } from '../data-access/clans-details.service';

@Component({
  selector: 'app-clans-details',
  templateUrl: './clans-details.component.html',
  styleUrls: ['./clans-details.component.scss']
})
export class ClansDetailsComponent {
  constructor(private clansDetailsService: ClansDetailsService) {}
  clansInfo$ = this.clansDetailsService.clanInfo$;
}
