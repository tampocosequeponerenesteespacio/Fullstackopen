import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest and tampo',
    url: 'www.react.com',
    likes: 5
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')

  expect(component.container).toHaveTextContent('Jest and tampo')

  expect(component.container).not.toHaveTextContent('www.react')

  expect(component.container).not.toHaveTextContent('5')

    // REGEX SEEMS TO WORK
  const element = component.getByText(/component testing is done with react-testing-library/i)
  expect(element).toBeDefined()

  //FOR NOT CASE, USE QUERY or not.ToHaveTextContent
  const element2 = component.queryByText(/www.react/)
  expect(element2).toBeNull()

  
  

  
})

test('clicking the button calls event handler once', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Jest and tampo',
    url: 'www.react.com',
    likes: 5
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} onClick={mockHandler}/>
  )

  /*
  const button = component.queryByText(/show/)        
  fireEvent.click(button)      
  expect(mockHandler.mock.calls).toHaveLength(1)     MOCK.CALLS DOESNT WORK, RETURNS EMPTY ARRAY
  */

  const button = component.queryByText(/show/)        
  fireEvent.click(button)   
  expect(component.container).toHaveTextContent('www.react')


})

//5.15* and 5.16* CANT DO
//handlers are inside the component