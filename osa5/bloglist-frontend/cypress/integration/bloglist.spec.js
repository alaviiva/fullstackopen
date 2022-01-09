// bloglist.js created with Cypress
//
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Ville Kebab',
      username: 'ville',
      password: 'passu'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })


  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ville')
      cy.get('#password').type('passu')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.contains('ville logged in')
    })

    it('fails with wrong credentials', function() {
        cy.get('#username').type('kala')
        cy.get('#password').type('kala')
        cy.get('#login-button').click()
        cy.contains('wrong credentials')
    })
  })
})
