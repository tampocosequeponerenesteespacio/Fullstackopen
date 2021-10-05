import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/addBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser') //SHOULD BE loggedBlogUser but...
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      
    }
  }, [])

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const addedBlog = await blogService.create(newBlog)
    setBlogs(blogs.concat(addedBlog))
    setErrorMessage('Blog added to the list')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    blogService.setToken(null)
    setErrorMessage('Logged out!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username and/or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log(user);
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='show'>
        <LoginForm 
        username={username} 
        password={password} 
        handleLogin={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <AddBlogForm createBlog={addBlog} />
    </Togglable>
    )
  }

  return (
    <div>
    <Notification message={errorMessage} />
    { user === null ? (
      <div>
      <h2>Log in to application</h2>
      {loginForm()}
      </div>
      ) : (
      <div>
      
      <button onClick={handleLogout}>logout</button>         
      <h2>Blogs</h2>
      {blogForm()}
      {blogs
      .sort( (a,b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      )}
      </div>
      )
    }
    </div>  
    
  )
}

export default App