import { App } from '../../src/App'
import * as React from 'react'

describe('App.cy.ts', () => {
  it('displays text', () => {
    cy.mount(<App />)
    cy.get('h1').should('have.text', 'Hello World')
  })
})