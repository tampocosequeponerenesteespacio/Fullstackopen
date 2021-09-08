import React from 'react'

const PersonsList = (props) => {
    return (
      <ul>
        { props.filter().map( persons => <li key={persons.name}>{persons.name} : {persons.phone}</li>)}
      </ul>
    )
  }

export default PersonsList