import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/addBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { handleNotification } from './reducers/notificationReducer'
import { createBlog, initBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'



const App = () => {
  
  
  
  const dispatch = useDispatch()
  const errorMessage = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  
  
  

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs(blogs))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser') //SHOULD BE loggedBlogUser but...
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
      
    }
  }, [])

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
    dispatch(handleNotification('Blog added to the list',5))
    
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(setUser(null))
    blogService.setToken(null)
    dispatch(handleNotification('Logged out',5))
  }

  

  const loginForm = () => {
    return (
      <Togglable buttonLabel='show'>
        <LoginForm />
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
    <div style={{margin: '10px'}}>
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
        <Blog key={blog.id} blog={blog} blogs={blogs} />
      )}
      </div>
      )
    }
    </div>  
    
  )
}

export default App