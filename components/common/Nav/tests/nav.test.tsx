import * as NextRouter from 'next/router';

import { NavComponent } from '../Nav';
import { NAV_MODEL } from '../models/nav.model';

describe('NavComponent', () => {
  beforeEach(() => {
    cy.mount(<NavComponent />);
    cy.stub(NextRouter, 'useRouter').returns({ pathname: '/dashboard' });
  });

  it('shows links', () => {
    cy.grab('nav').should('exist');
    cy.grab('nav-links').should('exist');

    cy.grab('nav-link')
      .should('have.length', NAV_MODEL.length)
      .each((link: JQuery<Element>, index: number) => {
        const { label, icon, path } = NAV_MODEL[index];

        cy.wrap(link).contains(label);
        cy.wrap(link).find('a').should('have.attr', 'href').and('include', path);
        cy.grab(`icon-${icon}`).should('exist');
      });
  });
});
