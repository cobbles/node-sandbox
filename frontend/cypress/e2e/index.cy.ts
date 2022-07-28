describe('Home Page', () => {
    it('displays welcome text', () => {
        cy.visit('/')
        cy.get('h1').should('have.text', 'Hello World')
    })
})
