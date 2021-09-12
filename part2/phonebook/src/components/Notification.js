import React from 'react'

const Notification = ({ message }) => {
    const notificationStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    }
    if (message === null) {
      return null
    }
  
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }


export default Notification