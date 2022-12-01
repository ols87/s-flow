declare global {
  namespace Cypress {
    interface Chainable {
      grab(value: string, args?: any): Chainable<JQuery<Element>>;
      mount(component: React.ReactNode): Cypress.Chainable<MountReturn>;
    }

    type element = Chainable<JQuery<Element>>;
    s;
  }
}
