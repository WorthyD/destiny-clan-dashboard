import { TestBed } from '@angular/core/testing';
import { SeasonPassComponent } from './season-pass.component';

describe(SeasonPassComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(SeasonPassComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(SeasonPassComponent, {
      componentProperties: {
        subTitle: '',
        isLoading: false
      }
    });
  });
});
