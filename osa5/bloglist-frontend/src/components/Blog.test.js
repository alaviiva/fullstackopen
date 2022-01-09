import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import BlogList from './Blog'

test('renders content', () => {
  const blog = [{
    title: 'Blog testing',
    author: 'Timppa',
    url: 'kissa.kala/test',
    likes: 3,
    id: 'abc',
    user: {username: 'test'}
  }]

  const user = {username: 'test'}
  const k = () => 'k'
  const component = render(
    <BlogList blogs={blog} update={k} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Blog testing - Timppa'
  )
  expect(component.container).not.toHaveTextContent(
    'kissa.kala/test'
  )
})
