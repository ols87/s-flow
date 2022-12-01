import { StreamModalComponent } from '../StreamModal';

describe('StreamModalComponent', () => {
  beforeEach(() => {
    cy.mount(<StreamModalComponent id="testme" />);
  });

  it('shows content', () => {
    cy.grab('stream-modal-content').should((element) => {
      expect(element.text().length).to.be.at.least(20);
    });
  });

  it('shows buttons', () => {
    cy.grab('stream-modal-vesting').should('exist').and('have.text', 'Vesting');
    cy.grab('stream-modal-payment').should('exist').and('have.text', 'Payment');
  });
});
