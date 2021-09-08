import React from 'react'

const Filter = (props) => {
    return (
      <div>
      <p>Filter show with</p>
      <input value={props.search} onChange={props.handle} />
      </div>
    )
  }

export default Filter