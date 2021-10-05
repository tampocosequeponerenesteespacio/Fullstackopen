import React, {useState} from 'react'

import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeButtonStyle = {
    backgroundColor: '#f44336',
    border: 'none',
    margin: 4,
    color: 'white',
    cursor: 'pointer',
    borderRadius: 6
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
    const returnedBlog = await blogService.update(blog.id, newBlog)
    setBlogs(blogs.map(b => b.id !== blog.id ? b : returnedBlog ))
  }

  const handleRemove = async () => {
    if ( window.confirm('Remove blog?')) {
      const returnedBlog = await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id ))
    }
  }

  if (!showDetails) {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title}, {blog.author} <button onClick={handleDetails}>show</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={handleDetails}>hide</button></div> 
        <div>{blog.url}</div>
        <div>{blog.likes} <button onClick={handleLike}>like</button></div>
        <div>{blog.author}</div>
        <div><button style={removeButtonStyle} onClick={handleRemove}>remove</button></div>
      </div>
    )
  }
  
}

export default Blog