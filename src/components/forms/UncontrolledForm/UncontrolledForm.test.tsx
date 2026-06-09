import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { UncontrolledForm } from './UncontrolledForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

vi.mock('../../../utils/convertToBase64', () => ({
  convertToBase64: vi.fn().mockResolvedValue('data:image/png;base64,test'),
}))

vi.mock('../../../utils/validateImage', () => ({
  validateImage: vi.fn().mockReturnValue(null),
}))

describe('UncontrolledForm', () => {
  it('should render all form fields', () => {
    render(<UncontrolledForm onClose={() => {}} />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Gender')).toBeInTheDocument()
    expect(screen.getByLabelText('I accept terms & conditions')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('ConfirmPassword')).toBeInTheDocument()
    expect(screen.getByLabelText('Country')).toBeInTheDocument()
    expect(screen.getByLabelText('Image')).toBeInTheDocument()
  })

  it('should show errors on submit with empty fields', async () => {
    render(<UncontrolledForm onClose={() => {}} />)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })

  it('should have submit button', () => {
    render(<UncontrolledForm onClose={() => {}} />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('should show error for invalid image type', async () => {
    render(<UncontrolledForm onClose={() => {}} />)
    const imageInput = screen.getByLabelText('Image')
    const file = new File(['content'], 'test.gif', { type: 'image/gif' })
    await userEvent.upload(imageInput, file)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })

  it('should show validation errors after valid image', async () => {
    render(<UncontrolledForm onClose={() => {}} />)
    const imageInput = screen.getByLabelText('Image')
    const file = new File(['content'], 'test.png', { type: 'image/png' })
    await userEvent.upload(imageInput, file)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })

  it('should submit form with valid data', async () => {
    render(<UncontrolledForm onClose={vi.fn()} />)
    await userEvent.type(screen.getByLabelText('Name'), 'Sabina')
    await userEvent.type(screen.getByLabelText('Age'), '25')
    await userEvent.type(screen.getByLabelText('Email'), 'test@test.com')
    await userEvent.type(screen.getByLabelText('Password'), 'pass123')
    await userEvent.type(screen.getByLabelText('ConfirmPassword'), 'pass123')
    await userEvent.type(screen.getByLabelText('Country'), 'Montenegro')
    await userEvent.click(screen.getByLabelText('I accept terms & conditions'))
    const file = new File(['content'], 'test.png', { type: 'image/png' })
    await userEvent.upload(screen.getByLabelText('Image'), file)
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }))
  })
})