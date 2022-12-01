import { ModalComponent } from '../Modal';

const model = {
  id: 'test',
  trigger: {
    element: 'modal-button',
    text: 'Click Me',
  },
  title: 'Test Title',
  body: 'Hello Test',
};

export const ModalButton = () => <button data-test={model.trigger.element}>Click Me</button>;

describe('ModalComponent', () => {
  let button: Cypress.DOM;

  const grab = (element: string) => {
    return cy.grab(`modal-${element}-${model.id}`, { force: true });
  };

  beforeEach(() => {
    cy.mount(<ModalComponent id={model.id} trigger={<ModalButton />} title={model.title} body={model.body} />);
    button = cy.grab(model.trigger.element);
  });

  it('trigger opens modal', () => {
    button.should('exist').and('have.text', model.trigger.text);
    button.click();

    grab('container').should('exist');
  });

  it('has backdrop', () => {
    button.click();
    grab('backdrop').should('exist');
  });

  it('has panel', () => {
    button.click();
    grab('wrapper').should('exist');
    grab('panel').should('exist');
  });

  it('has title and body', () => {
    button.click();
    grab('title').should('exist');
    grab('body').should('exist');
  });
});
