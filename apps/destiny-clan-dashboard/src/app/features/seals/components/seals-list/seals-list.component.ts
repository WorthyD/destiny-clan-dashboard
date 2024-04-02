// import { CommonModule } from '@angular/common';
// import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterModule } from '@angular/router';
// import { SealListItem } from '@features/seals/models/seal-list-item';
// import { MatCardModule } from '@angular/material/card';
// @Component({
//   selector: 'app-seals-list',
//   templateUrl: './seals-list.component.html',
//   styleUrls: ['./seals-list.component.scss'],
//   imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   standalone: true
// })
// export class SealsListComponent {
//   @Input() sealsList: SealListItem[];

//   trackByFn(index: number, sealListItem: SealListItem) {
//     return sealListItem.seal.hash;
//   }
// }
