import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { ClanUpdaterService } from '../../services/clan-updater.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  constructor(private clanUpdaterService: ClanUpdaterService) {}

  ngOnInit(): void {
    this.clanUpdaterService.update().pipe(take(1)).subscribe();
  }
}
