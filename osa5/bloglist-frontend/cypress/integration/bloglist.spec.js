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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'ville', password: 'passu'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('[name="Title"]').type('Villen kebab')
      cy.get('[name="Author"]').type('Ville')
      cy.get('[name="Url"]').type('ville.kebab/blog')
      cy.get('[type="submit"]').click()
      cy.contains('a new blog Villen kebab by Ville added')
      cy.get('#bloglist').should('contain', 'Villen kebab')
    })

    describe('With created blogs', function() {
      beforeEach(function() {
          cy.contains('Create new blog').click()
          cy.get('[name="Title"]').type('Villen kebab')
          cy.get('[name="Author"]').type('Ville')
          cy.get('[name="Url"]').type('ville.kebab/blog')
          cy.get('[type="submit"]').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.contains('likes: 0')
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('A blog can be deleted', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('#bloglist').should('not.contain', 'Villen kebab')
      })
    })
  })
})
