import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { handleNotification } from '../reducers/notificationReducer'

import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 4,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 6
  }

  const dispatch = useDispatch()

  const removeButtonStyle = {
    backgroundColor: '#f44336',
    border: 'none',
    marginBottom: 4,
    color: 'white',
    cursor: 'pointer',
    borderRadius: 5,    
  }

  const [showDetails, setShowDetails] = useState(false)

  const handleDetails = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async () => {
    const likes = blog.likes + 1
    const newBlog = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes
    }
    dispatch(likeBlog(blog.id, newBlog))
    
  }

  const handleRemove = async () => {
    if ( window.confirm('Remove blog?')) {
      dispatch(deleteBlog(blog.id))
      dispatch(handleNotification('Blog removed',5))
      
      
    }
  }

  if (!showDetails) {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title}, {blog.author} <button className='show' onClick={handleDetails}>show</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={handleDetails}>hide</button></div> 
        <div>{blog.url}</div>
        <div>{blog.likes} <button className='like' onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
        <div><button className='remove' style={removeButtonStyle} onClick={handleRemove}>remove</button></div>
      </div>
    )
  }
  
}

export default Blog