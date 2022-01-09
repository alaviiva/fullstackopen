import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogList from './Blog'


describe('Blog list', () => {
  let component
  let mockHandler = jest.fn()

  beforeEach(() => {
    const blog = [{
      title: 'Blog testing',
      author: 'Timppa',
      url: 'kissa.kala/test',
      likes: 3,
      id: 'abc',
      user: {username: 'test'}
    }]

    const user = {username: 'test'}

    mockHandler = jest.fn()

    component = render(
      <BlogList blogs={blog} addLike={mockHandler} user={user} removeBlog={jest.fn()}/>
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Blog testing - Timppa'
    )
    expect(component.container).not.toHaveTextContent(
      'kissa.kala/test'
    )
  })

  test('clicking view-button shows more info', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'kissa.kala/test'
    )
    expect(component.container).toHaveTextContent(
      'likes: 3'
    )
  })

  test('clicking like-button adds likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const like = component.getByText('like')
    fireEvent.click(like)
    fireEvent.click(like)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
