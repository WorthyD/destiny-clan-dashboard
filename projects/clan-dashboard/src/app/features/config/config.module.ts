import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { ClanConfigComponent } from './clan-config/clan-config.component';



@NgModule({
  declarations: [
    ConfigComponent,
    ClanConfigComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ConfigModule { }
