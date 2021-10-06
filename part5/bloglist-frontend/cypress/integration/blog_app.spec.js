describe('Blog app', function() {
  beforeEach(function() {
    
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      
      username: 'username1',
      password: 'password1'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in')
    cy.contains('show')
  })

  it('login form can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('show').click()
    cy.contains('username')
    cy.contains('password')
  })

  it('user can log in', function() {
    cy.contains('show').click()
    cy.get('#username').type('username1')
    cy.get('#password').type('password1')
    cy.get('#login-button').click()

    cy.contains('create new blog')
    
  })

  it('user cant log in with wrong credentials', function() {
    cy.contains('show').click()
    cy.get('#username').type('notusername')
    cy.get('#password').type('notpassword')
    cy.get('#login-button').click()

    cy.contains('Wrong')
    cy.get("html").should("not.contain", "logout");
    
  })

describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'username1', password: 'password1' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a log created by automatically')
      cy.get('#author').type('cypress')
      cy.get('#url').type('www.cy.org')
      cy.contains('Create').click()
      cy.contains('Blog added to the list')
      cy.contains('a log created by automatically')
      cy.contains('cypress')
    })
})

describe('when there is at least one blog', function() {
  beforeEach(function() {
    cy.login({ username: 'username1', password: 'password1' })
    cy.createBlog({ title:'First Blog', author:'Tampo', url:'www.cy.net' })
  })

    
    it('user can like a blog', function() {
      cy.get('.show').click()
      cy.get('.like').click()
      cy.contains('1')
      cy.get('.like').click()
    })

    it('user can like a blog when there is more than noe blog', function() {
      cy.createBlog({ title:'Second Blog', author:'Tampo', url:'www.cy.net' })
      cy.createBlog({ title:'Third Blog', author:'Tampo', url:'www.cy.net' })

      cy.contains('Second').contains('show').click()
      cy.contains('Second').parent().contains('like').click()
      cy.contains('Second').parent().contains('1')
      cy.contains('Second').parent().contains('like').click()
      cy.contains('Second').parent().contains('2')
      

    })

    it('user can delete post', function() {
      cy.get('.show').click()
      cy.get('.remove').click()
      cy.get("html").should("not.contain", "First Blog")

    })

    it.only('Blog ordered by likes', function() {
      cy.createBlog({ title:'Second Blog', author:'Tampo', url:'www.cy.net', likes:5 })
      cy.createBlog({ title:'Third Blog', author:'Tampo', url:'www.cy.net', likes: 10 })
      cy.contains('Tampo').parent().contains('show').click()
      cy.contains('Tampo').parent().contains('10')

   })

  })
  
  
})

