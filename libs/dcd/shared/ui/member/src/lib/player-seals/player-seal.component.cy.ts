import { TestBed } from '@angular/core/testing';
import { PlayerSealComponent } from './player-seal.component';

describe(PlayerSealComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(PlayerSealComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(PlayerSealComponent);
  });
});
