import { Component, OnInit } from '@angular/core';
import { ClansDetailsService } from './clans-details.service';

@Component({
  selector: 'app-clans-details',
  templateUrl: './clans-details.component.html',
  styleUrls: ['./clans-details.component.scss']
})
export class ClansDetailsComponent implements OnInit {
  constructor(private clansDetailsService: ClansDetailsService) {}

  ngOnInit(): void {}
}
