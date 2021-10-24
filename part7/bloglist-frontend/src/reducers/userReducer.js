import blogService from "../services/blogs"
import loginService from "../services/login"
import { handleNotification } from "./notificationReducer"

const userReducer = ( state = null, action ) => {
    switch (action.type) {
        case 'SET_USER':
            return action.data.user
        case 'LOGIN':
            return action.data.user
        default:
            return state
    }
}

export const setUser = (user) => {
    
    return {
      type: 'SET_USER',
      data: {user},
    }
}

export const handleLogin = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
            username, password
         })
        window.localStorage.setItem(
            'loggedNoteappUser', JSON.stringify(user)
         )
        blogService.setToken(user.token) 
        dispatch({
            type: 'LOGIN',
            data: {user}
            })
        }
        catch (error) {
            
            dispatch(handleNotification('Wrong username or password', 4))
        }
        
    }

}


export default userReducer

