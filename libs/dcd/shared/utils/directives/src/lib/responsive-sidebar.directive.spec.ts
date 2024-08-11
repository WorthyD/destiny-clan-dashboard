//TODO: This is going to be harder. Hold off for now.
import { Router } from '@angular/router';
import { ResponsiveSidebarDirective } from './responsive-sidebar.directive';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

describe('ResponsiveSidebarDirective', () => {
  it('should create an instance', () => {
    const directive = new ResponsiveSidebarDirective(
      null as unknown as Router,
      null as unknown as BreakpointObserver,
      null as unknown as MatSidenav
    );
    expect(directive).toBeTruthy();
  });
});
