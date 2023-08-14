import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PipesModule } from '../../pipes/pipes.module';

@Component({
  selector: 'lib-member-type-icon',
  standalone: true,
  imports: [PipesModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<mat-icon [svgIcon]="type | memberType" class="ico-{{ type | memberType }}"></mat-icon>`,
  encapsulation: ViewEncapsulation.None
})
export class MemberTypeIconComponent {
  @Input()
  type;
}
