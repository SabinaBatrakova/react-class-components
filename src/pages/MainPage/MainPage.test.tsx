import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MainPage } from './index'
import { beforeEach } from 'vitest'
import useStore from '../../store'

describe('MainPage', () => {
  beforeEach(() => {
    useStore.setState({
      formData: [
        {
          name: 'Test User',
          age: 25,
          email: 'test@test.com',
          gender: 'male',
          terms: true,
          image: 'base64string',
          password: '123',
          confirmPassword: '123',
          country: 'Russia',
        },
      ],
    })
  })
  it('should render submissions', () => {
    render(<MainPage />)
    expect(screen.getByText('Submissions')).toBeInTheDocument()
  })
  
  it('should render card with submission data', () => {
    render(<MainPage />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Terms accepted')).toBeInTheDocument()
  })
})
