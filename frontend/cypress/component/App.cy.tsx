import { App } from '../../src/App'
import * as React from 'react'

describe('App.cy.ts', () => {
  it('displays welcome text no name', () => {
    cy.mount(<App />)
    cy.get('h1').should('have.text', 'Hello!')
  })
  it('displays welcome text long name', () => {
    cy.mount(<App name='Theodore' />)
    cy.get('h1').should('have.text', 'Hello! Theodore is a long name')
  })
})
