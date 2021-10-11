import React from 'react'
import { useDispatch } from "react-redux"
import { handleFilter } from '../reducers/filterReducer'




const Filter = () => {
  const dispatch = useDispatch()

  const filterAnecdotes = (event) => {
    dispatch(handleFilter(event.target.value))
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

export default Filter