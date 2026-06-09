import { describe, it, expect } from 'vitest'
import { validateImage } from './validateImage'

describe('validateImage', () => {
  it('should return error for invalid file type', () => {
    const file = new File(['content'], 'test.gif', { type: 'image/gif' })
    expect(validateImage(file)).toBe('Only PNG or JPEG')
  })

  it('should return null for valid PNG file', () => {
    const file = new File(['content'], 'test.png', { type: 'image/png' })
    expect(validateImage(file)).toBeNull()
  })

  it('should return null for valid JPEG file', () => {
    const file = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
    expect(validateImage(file)).toBeNull()
  })

  it('should return error for file too large', () => {
    const largeContent = new Array(6 * 1024 * 1024).fill('a').join('')
    const file = new File([largeContent], 'test.png', { type: 'image/png' })
    expect(validateImage(file)).toBe('File size must be less than 5MB')
  })
})