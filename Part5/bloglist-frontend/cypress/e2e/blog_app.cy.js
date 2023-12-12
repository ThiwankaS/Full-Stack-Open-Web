describe('Blog app testing',() => {
  beforeEach(() => {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      username : 'mluukkai',
      name     : 'Matti Luukkalainen',
      password : 'salainen'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('http://localhost:5173/')
  })
  it('Login form is shown',() => {
    cy.contains('blogs')
    cy.contains('Login')
  })
  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkalainen logged in')
    })
    it('fails with wrong credentials', () => {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.contains('wrong username or passwrod')
    })
  })
})