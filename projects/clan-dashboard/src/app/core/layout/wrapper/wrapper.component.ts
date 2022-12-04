import { Component, OnInit } from '@angular/core';
import { getAllNotifications } from '@core/store/notifications';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ClanUpdaterService } from '../../services/clan-updater.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  constructor(private clanUpdaterService: ClanUpdaterService, private store: Store) {}
  loading: boolean = false;

  notifications$ = this.store.select(getAllNotifications);

  ngOnInit(): void {
    this.loading = true;
    this.clanUpdaterService
      .update()
      .pipe(take(1))
      .subscribe((x) => (this.loading = false));
  }
}
