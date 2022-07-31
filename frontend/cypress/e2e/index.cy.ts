describe('Home Page', () => {
  it('displays welcome text no name', () => {
    cy.visit('/')
    cy.get('h1').should('have.text', 'Hello!')
  })

  it('displays welcome text short name', () => {
    cy.visit('/?name=Tom')
    cy.get('h1').should('have.text', 'Hello! Tom is a short name')
  })
})
