import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import userEvent from '@testing-library/user-event'
import { beforeEach, afterEach } from 'vitest'

describe('App', () => {
  beforeEach(() => {
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('id', 'modal-root')
    document.body.appendChild(modalRoot)
  })

  afterEach(() => {
    const modalRoot = document.getElementById('modal-root')
    if (modalRoot) document.body.removeChild(modalRoot)
  })

  it('should render Forms heading', () => {
    render(<App />)
    expect(screen.getByText('Forms')).toBeInTheDocument()
  })

  it('should render form buttons', () => {
    render(<App />)
    expect(screen.getByText('Open form')).toBeInTheDocument()
    expect(screen.getByText('Open RHR form')).toBeInTheDocument()
  })

  it('should open modal when button clicked', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Open form'))
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('should open RHF modal when button clicked', async () => {
    render(<App />)
    await userEvent.click(screen.getByText('Open RHR form'))
    expect(screen.getByText('Confirm Password')).toBeInTheDocument()
  })
  
  it('should close modal when ESC pressed', async () => {
  render(<App />)
  await userEvent.click(screen.getByText('Open form'))
  await userEvent.keyboard('{Escape}')
  expect(screen.queryByText('Submit')).not.toBeInTheDocument()
})
})
