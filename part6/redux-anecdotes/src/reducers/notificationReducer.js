
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

export const handleNotification = (msg) => {
    return {
        type: 'SHOW',
        data: {msg}
    }
}

export default notificationReducer