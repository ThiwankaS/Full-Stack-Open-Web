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
    describe('After create a blog list',() =>{
      beforeEach(() => {
        cy.create({
          title : 'Testing like button with cypress',
          author : 'Thiwanka Somachandra',
          url : 'https://www.test.org/testing-with-cypress'
        })
      })
      it('- user can like a blog list', () => {
        cy.contains('Testing like button with cypress')
        cy.get('#show-button').click()
        cy.get('#like-element').should('contain','0')
        cy.get('#like-button').click()
        cy.get('#like-element').should('contain','1')
      })
      it('- user can delete a blog list', () => {
        cy.create({
          title : 'Testing remove button with cypress',
          author : 'Thiwanka Somachandra',
          url : 'https://www.test.org/testing-with-cypress'
        })
        cy.create({
          title : 'This will be romoved',
          author : 'Thiwanka Somachandra',
          url : 'https://www.test.org/testing-with-cypress'
        })
        cy.contains('Testing remove button with cypress')

        cy.contains('This will be romoved').parent().find('#show-button').as('the-show-button')
        cy.get('@the-show-button').click()
        cy.contains('This will be romoved').parent().find('#delete-button').as('the-delete-button')
        cy.get('@the-delete-button').click()
      })
    })
  })
})