import { NgModule } from '@angular/core';
// import { ClanSearchRoutingModule } from './clan-search-shell-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          // import('../clan-search-view/clan-search-view.module').then((module) => module.ClanSearchViewModule)
          import('@destiny-clan-dashboard/clan-search/feature/clan-search-view').then((module) => module.ClanSearchViewModule)
      },
      // {
      //   path: ':key',
      //   loadChildren: () =>
      //     import('../clan-search-curated-view/clan-search-curated-view.module').then(
      //       (module) => module.ClanSearchCuratedViewModule
      //     )
      // }
  ])
  ]
})
export class ClanSearchModule {}
