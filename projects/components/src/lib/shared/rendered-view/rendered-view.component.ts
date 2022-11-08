import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RenderedView } from '../../data/viewer';

@Component({
  selector: 'lib-rendered-view',
  templateUrl: './rendered-view.component.html',
  imports: [CommonModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderedViewComponent {
  views: Observable<RenderedView[]>;

  @Input() text: string;

  @Input() childrenViews: RenderedView[] = [];
}
