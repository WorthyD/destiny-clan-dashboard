import { TestBed } from '@angular/core/testing';
import { CharacterCardComponent } from './character-card.component';

describe(CharacterCardComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(CharacterCardComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(CharacterCardComponent, {
      componentProperties: {
        character: {},
        isLoading: false
      }
    });
  });
});
