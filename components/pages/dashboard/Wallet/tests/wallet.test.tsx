import { DashWalletComponent } from '../Wallet';

interface DropdownValues {
  id: string;
  activeItem: string;
  lastItem: string;
}

describe('Streams Component', () => {
  const testDropdown = (values: DropdownValues) => {
    const { id, activeItem, lastItem } = values;
    const button = cy.grab(`dropdown-button-${id}`);
    button.contains(activeItem).click();
    cy.grab(`dropdown-item-${id}`).last().contains(lastItem).click({ force: true });
    button.contains(lastItem);
  };

  beforeEach(() => {
    cy.mount(<DashWalletComponent />);
    cy.grab('wallet-card', { startsWith: true }).should('have.length', 4);
  });

  it('has withdraw button', () => {
    cy.grab('wallet-balance-button').should('exist');
  });

  it('has user dropdown', () => {
    testDropdown({
      id: 'unlockable-user',
      activeItem: 'Recipient',
      lastItem: 'All',
    });
  });

  it('has range dropdown', () => {
    testDropdown({
      id: 'unlockable-range',
      activeItem: '2 Weeks',
      lastItem: '1 Year',
    });
  });

  it('has payment link', () => {
    cy.grab('wallet-unlocks-link').should('exist');
  });
});
