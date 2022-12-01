import { PaymentFormComponent } from '../Form';

const fileds = [
  'tokens',
  'amount',
  'frequency-counter',
  'frequency-period',
  'start-date',
  'start-time',
  'who-transfer',
  'who-cancel',
];

describe('PaymentFormComponent', () => {
  const grab = (element: string) => {
    return cy.grab(`payment-${element}`);
  };

  beforeEach(() => {
    cy.mount(<PaymentFormComponent />);
  });

  fileds.forEach((field: string) => {
    it(`has ${field}`, () => {
      grab(field).should('exist');
    });
  });
});
