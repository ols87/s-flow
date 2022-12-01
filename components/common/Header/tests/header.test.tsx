import { HeaderComponent } from '../Header';

describe('HeaderComponent', () => {
  beforeEach(() => {
    cy.mount(<HeaderComponent />);
  });

  it('has header', () => {
    cy.grab('header').should('exist');
  });

  it('has logo', () => {
    cy.grab('header-logo').should('exist');
  });

  it('has stream button', () => {
    cy.grab('header-stream').should('exist');
  });

  it('has wallet button', () => {
    cy.grab('header-wallet');
  });
});
