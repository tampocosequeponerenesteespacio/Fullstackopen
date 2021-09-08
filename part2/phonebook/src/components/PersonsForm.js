import React from 'react'

const PersonsForm = (props) => {
    return (
      
      <form onSubmit={props.onSubmit}>
        name: <input value={props.newName} onChange={props.handleNameChange} /> <br />
        phone: <input value={props.newNumber} onChange={props.handlePhoneChange} /> <br />
        <button type="submit">Add</button>
      </form>
      
    )
  }

export default PersonsForm