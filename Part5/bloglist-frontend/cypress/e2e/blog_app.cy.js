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
      cy.get('#notification')
        .should('contain','wrong username or passwrod')
        .should('have.css','color','rgb(255, 0, 0)')
        .should('have.css','border-style','solid')
    })
  })
  describe('When logged in',() => {
    beforeEach(() => {
      cy.login({ username : 'mluukkai', password : 'salainen' })
    })
    it('A blog can be created', () => {
      cy.contains('Create new blog list')
      cy.get('#toggalbe-button').click()
      cy.get('#title').type('Testing a blog list create with cypress')
      cy.get('#author').type('Thiwanka Somachandra')
      cy.get('#url').type('https://www.test.org/testing-with-cypress')
      cy.get('#create-button').click()

      cy.contains('previous list')
      cy.contains('Testing a blog list create with cypress')
    })
  })
})