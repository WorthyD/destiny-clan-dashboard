import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { RenderedView } from './rendered-view.interface';

@Component({
  selector: 'lib-rendered-view',
  templateUrl: './rendered-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderedViewComponent {
  views: Observable<RenderedView[]>;

  @Input() text: string;

  @Input() childrenViews: RenderedView[] = [];
}
