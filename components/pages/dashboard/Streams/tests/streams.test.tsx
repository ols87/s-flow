import { DashStreamsComponent } from '../Streams';
import { STREAMS_MODEL } from '../models/streams.model';

describe('StreamComponent', () => {
  beforeEach(() => {
    cy.mount(<DashStreamsComponent />);
    cy.grab('stream-cards').should('exist');
  });

  it('shows cards', () => {
    cy.grab('stream-card')
      .should('have.length', 6)
      .each((stream: JQuery<Element>, index: number) => {
        const { status, icon } = STREAMS_MODEL[index];

        cy.wrap(stream).contains(status);
        cy.grab(`stream-icon-${icon}`).should('exist');
      });
  });
});
