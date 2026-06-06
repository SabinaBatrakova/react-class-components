import { z } from 'zod'

export const formSchema = z
  .object({
    name: z.string().refine((val) => val[0] === val[0].toUpperCase(), {
      message: 'First letter must be uppercase',
    }),
    age: z.number().min(0, 'Age cannot be negative'),
    email: z.string().refine(
      (val) => {
        const parts = val.split('@')
        if (parts.length !== 2) return false
        if (parts[0].length === 0) return false
        if (!parts[1].includes('.')) return false
        return true
      },
      { message: 'Invalid email' }
    ),
    gender: z.string(),
    terms: z.boolean(),
    image: z.string(),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Password is required'),
    country: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
