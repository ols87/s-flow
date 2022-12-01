import { MountOptions, MountReturn } from 'cypress/react';
import { RecoilRoot } from 'recoil';
import { mount } from 'cypress/react18';
import '../../styles/globals.css';
import './commands';
import { recoil } from './recoil';
declare global {
  namespace Cypress {
    interface Chainable {
      grab(value: string, args?: any): Chainable<JQuery<Element>>;
      mount(component: React.ReactNode): Cypress.Chainable<MountReturn>;
    }

    type DOM = Chainable<JQuery<Element>>;
  }
}

Cypress.Commands.add('mount', (component) => {
  const wrapped = recoil(component);

  return mount(wrapped);
});

Cypress.Commands.add('grab', (label: string, args?: any) => {
  args = args || {};

  return cy.get(`[data-test${args.startsWith ? '^' : ''}=${label}]`, args);
});
