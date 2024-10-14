import { inject, TestBed } from '@angular/core/testing';
import { BungieInfoComponent } from './bungie-info.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { registerIcons, RegisterIconsService } from '@dcd/shared/ui/icons';
import { BungieDatePipe, DateAgoPipe } from '@dcd/shared/utils/pipes';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { getFakeStaticBungieInfo } from '@dcd/shared/mocks';
import { provideHttpClient } from '@angular/common/http';

describe(BungieInfoComponent.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
      imports: []
    });
    TestBed.overrideComponent(BungieInfoComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });
  it('shows loading', () => {
    cy.mount(BungieInfoComponent, {
      componentProperties: {
        isLoading: true
      }
    });
    cy.get('[data-cy="bungie-info-loading"]').should('be.visible');
    cy.get('[data-cy="bungie-info-about"]').should('not.exist');
  });
  it('displays info', () => {
    cy.mount(BungieInfoComponent, {
      componentProperties: {
        isLoading: false,
        bungieInfo: getFakeStaticBungieInfo()
      }
    }).then(() => {
      const mir = TestBed.inject(MatIconRegistry);
      const sanitizer = TestBed.inject(DomSanitizer);
      registerIcons(mir, sanitizer);
      cy.get('[data-cy="bungie-info-about"]').should('be.visible');
      cy.get('[data-cy="bungie-info-loading"]').should('not.exist');
    });

  });
});
