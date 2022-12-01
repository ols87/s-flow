import { DropdownComponent } from '../Dropdown';

const items = [1, 2, 3, 4];

describe('DropdownComponent', () => {
  const grab = (element: string) => {
    return cy.grab(`dropdown-${element}-test`);
  };

  beforeEach(() => {
    cy.mount(<DropdownComponent id="test" items={items} />);
  });

  it('has dropdown', () => {
    grab('wrapper').should('exist');
    grab('button').should('exist');
  });

  it('shows items', () => {
    grab('button').click();
    grab('item').should('have.length', items.length);
  });

  it('sets item', () => {
    const lastItem = items[items.length - 1];
    grab('button').click();
    grab('item').last().click({ force: true });
    grab('button').contains(lastItem);
  });
});
