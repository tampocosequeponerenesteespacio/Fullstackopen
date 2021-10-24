import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'INIT_BLOGS':
            return action.data
        case 'LIKE_BLOG':
            return (state.map(b => b.id !== action.data.id ? b : action.data.returnedBlog ))
        case 'DELETE_BLOG':
            return (state.filter(b => b.id !== action.data.id ))
        default:
            return state

    }
}

export const initBlogs = (blogs) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = content => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
    }
  }

export const deleteBlog = (id) => {
    return async dispatch => {
        const returnedblog = await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: {id}
        })
    }
}
  

export const likeBlog = (id, newBlog) => {
    return async dispatch => {
        const returnedBlog = await blogService.update(id, newBlog)
        dispatch({
            type: 'LIKE_BLOG',
            data: {returnedBlog, id}
        })
    }
}




export default blogsReducer