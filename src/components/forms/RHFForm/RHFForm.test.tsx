import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ReactHookForm } from './RHFForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('../../../utils/convertToBase64', () => ({
  convertToBase64: vi.fn().mockResolvedValue('data:image/png;base64,test'),
}))

vi.mock('../../../utils/validateImage', () => ({
  validateImage: vi.fn().mockReturnValue(null),
}))

describe('ReactHookForm', () => {
  it('should render all form fields', () => {
    render(<ReactHookForm onClose={() => {}} />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Gender')).toBeInTheDocument()
    expect(screen.getByLabelText('Country')).toBeInTheDocument()
    expect(screen.getByLabelText('Image')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(
      screen.getByLabelText('I accept Terms & Conditions')
    ).toBeInTheDocument()
  })

  it('should have disabled submit button initially', () => {
    render(<ReactHookForm onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
  })

  it('should show name error when invalid', async () => {
  render(<ReactHookForm onClose={() => {}} />)
  const nameInput = screen.getByLabelText('Name')
  await userEvent.type(nameInput, 'sabina')
  await userEvent.tab()
  expect(screen.getByText('First letter must be uppercase')).toBeInTheDocument()
})

it('should show email error when invalid', async () => {
  render(<ReactHookForm onClose={() => {}} />)
  const emailInput = screen.getByLabelText('Email')
  await userEvent.type(emailInput, 'invalidemail')
  await userEvent.tab()
  expect(screen.getByText('Invalid email')).toBeInTheDocument()
})

it('should submit form with valid data', async () => {
  const onClose = vi.fn()
  render(<ReactHookForm onClose={onClose} />)
  
  await userEvent.type(screen.getByLabelText('Name'), 'Sabina')
  await userEvent.type(screen.getByLabelText('Age'), '25')
  await userEvent.type(screen.getByLabelText('Email'), 'test@test.com')
  await userEvent.type(screen.getByLabelText('Password'), 'pass123')
  await userEvent.type(screen.getByLabelText('Confirm Password'), 'pass123')
  await userEvent.type(screen.getByLabelText('Country'), 'Montenegro')
  await userEvent.click(screen.getByLabelText('I accept Terms & Conditions'))
  
  const file = new File(['content'], 'test.png', { type: 'image/png' })
  await userEvent.upload(screen.getByLabelText('Image'), file)
  
  await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
  expect(onClose).toHaveBeenCalled()
})
})
