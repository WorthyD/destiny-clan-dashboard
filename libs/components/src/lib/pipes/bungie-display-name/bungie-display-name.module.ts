import { NgModule } from '@angular/core';
import { BungieDisplayNamePipe } from './bungie-display-name.pipe';

@NgModule({
  declarations: [BungieDisplayNamePipe],
  exports: [BungieDisplayNamePipe],
  imports: []
})
export class BungieDisplayNameModule {}
