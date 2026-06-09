import { describe, it, expect, beforeEach } from 'vitest'
import useStore from './index'

describe('useStore', () => {
  beforeEach(() => {
    useStore.setState({ formData: [] })
  })

  it('should have empty formData initially', () => {
    const state = useStore.getState()
    expect(state.formData).toEqual([])
  })

  it('should add submission', () => {
    const {addFormData} = useStore.getState()
    addFormData({
      name: 'Test',
      age: 25,
      email: 'test@test.com',
      gender: 'male',
      terms: true,
      image: 'base64string',
      password: '123',
      confirmPassword: '123',
      country: 'Russia',
    })
    const {formData} = useStore.getState()
    expect(formData).toHaveLength(1)
    expect(formData[0].name).toBe('Test')
  })
})
