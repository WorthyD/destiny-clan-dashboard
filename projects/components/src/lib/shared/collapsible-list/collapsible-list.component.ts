import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'lib-collapsible-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './collapsible-list.component.html',
  styleUrls: ['./collapsible-list.component.scss']
})
export class CollapsibleListComponent {
  @Input() title: string;
  @Input() items: any[];
  @Input() itemTemplate: TemplateRef<any>;
  //@Output() viewActivity = new EventEmitter<number>();
}
