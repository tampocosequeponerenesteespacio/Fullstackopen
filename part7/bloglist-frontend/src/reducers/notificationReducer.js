const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data.msg
        case 'HIDE':
            return null
        default:
            return state
    }

}

let timeout = null

export const handleNotification = (msg, seconds) => {
    clearTimeout(timeout)
    
    return async dispatch => {
       dispatch({
        type: 'SHOW',
        data: {msg} 
       })
       timeout = setTimeout( () => dispatch(hideNotification()),seconds*1000)
    
    }
}

export const hideNotification = () => {
    return ({
        type: 'HIDE'        
    })
}



export default notificationReducer