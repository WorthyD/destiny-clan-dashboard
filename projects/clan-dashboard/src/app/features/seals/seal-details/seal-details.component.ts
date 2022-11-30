import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SealsService } from '../data-access/seals.service';

@Component({
  selector: 'app-seal-details',
  templateUrl: './seal-details.component.html',
  styleUrls: ['./seal-details.component.scss']
})
export class SealDetailsComponent {
  constructor(private route: ActivatedRoute, private sealsService: SealsService) {}

  sealDetails$ = this.route.paramMap.pipe(switchMap((params) => {
      console.log('switchmap', params.get('hash'));
      return this.sealsService.getSealDetails$(params.get('hash'));
  }));
}
