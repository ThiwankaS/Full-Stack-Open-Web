describe('Blog app testing',() => {
  beforeEach(() => {
    cy.request('POST','http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173/')
  })
  it('Login form is shown',() => {
    cy.contains('blogs')
    cy.contains('Login')
  })
})