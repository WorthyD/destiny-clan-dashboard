import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxRoutingModule } from './sandbox-shell-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [CommonModule, SandboxRoutingModule, RouterModule]
})
export class SandboxShellModule {}
