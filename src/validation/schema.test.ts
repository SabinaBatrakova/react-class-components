import { describe, it, expect } from 'vitest'
import { formSchema } from './schema'

describe('formSchema', () => {
  it('should validate correct data', () => {
    const result = formSchema.safeParse({
      name: 'Sabina',
      age: 25,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      image: 'base64string',
      password: '123',
      confirmPassword: '123',
      country: 'Montenegro',
    })
    expect(result.success).toBe(true)
  })
  it('should fail when name starts with lowercase', () => {
    const result = formSchema.safeParse({
      name: 'sabina',
      age: 25,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      image: 'base64string',
      password: '123',
      confirmPassword: '123',
      country: 'Montenegro',
    })
    expect(result.success).toBe(false)
  })
  it('should fail when email is invalid', () => {
    const result = formSchema.safeParse({
      name: 'Sabina',
      age: 25,
      email: 'invalid-email',
      gender: 'male',
      terms: true,
      image: 'base64string',
      password: '123',
      confirmPassword: '123',
      country: 'Montenegro',
    })
    expect(result.success).toBe(false)
  })

  it('should fail when passwords do not match', () => {
    const result = formSchema.safeParse({
      name: 'Sabina',
      age: 25,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      image: 'base64string',
      password: '123',
      confirmPassword: '456',
      country: 'Montenegro',
    })
    expect(result.success).toBe(false)
  })
  it('should fail when age is negative', () => {
    const result = formSchema.safeParse({
      name: 'Sabina',
      age: -1,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      image: 'base64string',
      password: '123',
      confirmPassword: '123',
      country: 'Russia',
    })
    expect(result.success).toBe(false)
  })
})
