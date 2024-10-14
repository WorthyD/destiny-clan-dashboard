import { TestBed } from '@angular/core/testing';
import { PlayerSealsComponent } from './player-seals.component';

describe(PlayerSealsComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(PlayerSealsComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(PlayerSealsComponent);
  });
});
