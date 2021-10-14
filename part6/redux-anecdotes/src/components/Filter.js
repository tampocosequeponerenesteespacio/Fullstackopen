import React from 'react'
import { connect } from 'react-redux'
import { handleFilter } from '../reducers/filterReducer'




const Filter = ({handleFilter}) => {
  

  const filterAnecdotes = (event) => {
    handleFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={filterAnecdotes} />
    </div>
  )
}

export default connect(null, {handleFilter})(Filter)