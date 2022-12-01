import * as NextRouter from 'next/router';

import { NavLinkComponent } from '../NavLink';
import { NAV_MODEL } from '@components/common/Nav/models';

describe('NavLinkComponent', () => {
  let randomIndex = Math.floor(Math.random() * NAV_MODEL.length);

  const link = NAV_MODEL[randomIndex];
  const { label, icon, path } = link;

  beforeEach(() => {
    cy.mount(<NavLinkComponent link={link} />);
    cy.stub(NextRouter, 'useRouter').returns({ pathname: '/dashboard' });
  });

  it('has a label', () => {
    cy.grab('nav-link').contains(label);
  });

  it('has an icon', () => {
    cy.grab(`icon-${icon}`);
  });

  it('has a link', () => {
    cy.grab('nav-link').find('a').should('have.attr', 'href').and('include', path);
  });
});
