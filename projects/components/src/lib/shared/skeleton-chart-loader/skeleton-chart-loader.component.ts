import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-skeleton-chart-loader',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `
      .skeleton-chart-loader {
        height: 400px;
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        &__chart-item {
          flex: 1 1 15%;
          display: block;
          position: relative;
          //text-align: center;
          //vertical-align: bottom;
          max-width: 20%;
          height: 100%;
          margin: 0 0.9% 0 0.9%;

          $i: 1;
          $ref: 20%, 25%, 40%, 45%, 65%, 50%, 45%, 55%, 65%, 75%, 85%;

          @for $i from 1 through length($ref) {
            $c: nth($ref, $i);

            &:nth-child(#{$i}) {
              height: $c;
            }
          }
        }
      }
    `
  ],
  template: `
    <div class="skeleton-chart-loader">
      <div
        class="skeleton-chart-loader__chart-item skeleton-item"
        *ngFor="let x of ['', '', '', '', '', '', '', '', '', '', '']"
      ></div>
    </div>
  `,
  //templateUrl: './skeleton-chart-loader.component.html',
  //styleUrls: ['./skeleton-chart-loader.component.scss']
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonChartLoaderComponent {}
