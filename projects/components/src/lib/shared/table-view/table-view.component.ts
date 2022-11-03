import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, shareReplay } from 'rxjs';
import { DataSource } from '../../data/data-source';
import { Filterer } from '../../data/filterer';
import { Grouper } from '../../data/grouper';
import { Sorter } from '../../data/sorter';
import { RenderedView, Viewer, ViewLabel } from '../../data/viewer';
//import { PageEvent } from '@angular/material/paginator';

export interface Item {
  id: string;
  assignees: string[];
  body: string;
  title: string;
  comments: number;
  labels: string[];
  number: number;
  state: string;
  reporter: string;
  created: string;
  closed: string;
  updated: string;
  // reactions: Reactions;
  pr: boolean;
  url: string;
  //  statuses: ItemStatus[];
  dbAdded?: string;
  dbModified?: string;
}


interface TablePage {
  index: number;
  size: number;
}

@Component({
  selector: 'lib-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableViewComponent implements OnInit {
  displayedColumns: Observable<string[]>;

  views: ViewLabel[];

  renderedHtml: Observable<Map<Item, Map<string, Observable<RenderedView>>>>;

  @Input() filterer: Filterer;

  @Input() viewer: Viewer;

  @Input() grouper: Grouper;

  @Input() sorter: Sorter;

  @Input() dataSource: DataSource;

  @Input() loading: boolean;

  itemCount: Observable<number>;

  page: BehaviorSubject<TablePage> = new BehaviorSubject({ size: 20, index: 0 });

  renderedData: Observable<Item[]>;
  constructor() {}

  ngOnInit(): void {
    // TODO: Cannot be in ngOnInit since the inputs may change
    const curatedData = this.dataSource.data.pipe(this.filterer.filter(), this.sorter.sort());
    this.renderedData = combineLatest(curatedData, this.page).pipe(
      map(([data, page]) => data.slice(page.index * page.size, page.index * page.size + page.size))
    );
    this.itemCount = curatedData.pipe(map((d) => d.length));

    this.views = this.viewer.getViews();
    this.displayedColumns = this.viewer.state.pipe(
      map((state) => {
        return this.views.map((v) => v.id).filter((v) => state.views.indexOf(v) !== -1);
      })
    );

    this.renderedHtml = this.renderedData.pipe(
      map((items) => {
        const renderedHtml = new Map<Item, Map<string, Observable<RenderedView>>>();
        items.forEach((item) => {
          const itemRenderedViews = new Map<string, Observable<RenderedView>>();
          this.views.forEach((view) => itemRenderedViews.set(view.id, this.viewer.getRenderedView(item, view.id)));
          renderedHtml.set(item, itemRenderedViews);
        });
        return renderedHtml;
      }),
      shareReplay(1)
    );
  }

  // setPage(event: PageEvent) {
  //   this.page.next({ index: event.pageIndex, size: event.pageSize });
  // }
}
