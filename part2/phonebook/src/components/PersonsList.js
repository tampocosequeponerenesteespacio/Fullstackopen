import React from 'react'

const PersonsList = (props) => {
    return (
      <ul>
        { props.filter().map( persons => <li key={persons.name}>{persons.name} : {persons.number} 
          <button type='button' name={persons.name} value={persons.id} onClick={props.handleDelete}>delete</button>
          </li>)}
        
      </ul>
    )
  }

export default PersonsList