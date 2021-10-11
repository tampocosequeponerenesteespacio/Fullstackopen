
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

export const handleNotification = (msg, seconds) => {
    return async dispatch => {
       dispatch({
        type: 'SHOW',
        data: {msg} 
       })
       setTimeout( () => dispatch(hideNotification()),seconds*1000)
    
    }
}

export const hideNotification = () => {
    return ({
        type: 'HIDE'        
    })
}



export default notificationReducer