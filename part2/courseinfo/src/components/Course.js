import React from "react";

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const sum = course.parts.reduce( (sum, p) => sum + p.exercises , 0) 
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part.name} {props.part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => { 
    return (
    <div>
      { course.parts.map( (p) => <Part key={p.id} part={p} /> ) }
    </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
        <Header course={course} />
        <div>
          <Content course={course} />
          <b><Total course={course} /></b>
        </div>
      </div>
    )
  
  }

export default Course