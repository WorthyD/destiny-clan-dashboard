import { TestBed } from '@angular/core/testing';
import { MemberTypeIconComponent } from './member-type-icon.component';

describe(MemberTypeIconComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(MemberTypeIconComponent, {
      add: {
        imports: [],
        providers: []
      }
    });
  });

  it('renders', () => {
    cy.mount(MemberTypeIconComponent, {
      componentProperties: {
        type: 0
      }
    });
  });
});
