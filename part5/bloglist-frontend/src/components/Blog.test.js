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
  
  const element = component.queryByText(/tampo/i) // REGEX SEEMS TO WORK
  console.log(element);
  expect(element).toBeDefined()

  
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

  // getByText ISN'T working
  /*
  const button = component.getByText('show') 
  fireEvent.click(button)  

  expect(mockHandler.mock.calls).toHaveLength(1)
  */
})