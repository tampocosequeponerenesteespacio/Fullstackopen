import React, { useState } from 'react'

const AddBlogForm = ({ createBlog }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitlechange = (event) => {
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })



    }

    

    
    return (
    <form className='blogForm' onSubmit={addBlog}>
      <div>
        Title
          <input
          id='title'
          type="text"
          value={newTitle}
          name="title"
          onChange={handleTitlechange}
        />
      </div>
      <div>
        Author
          <input
          id='author'
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        Url
          <input
          id='url'
          type="text"
          value={newUrl}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">Create</button>
    </form>
    )
}

export default AddBlogForm