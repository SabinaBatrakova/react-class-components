import { useForm } from 'react-hook-form'
import { formSchema } from '../../../validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertToBase64 } from '../../../utils/convertToBase64'
import useStore from '../../../store'
import type { FormData } from '../../../types'
import { validateImage } from '../../../utils/validateImage'

interface ReactHookFormProps {
  onClose: () => void
}

export function ReactHookForm({ onClose }: ReactHookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  })
  const addFormData = useStore((state) => state.addFormData)

  async function onSubmit(data: FormData) {
    const imageFile = (data.image as unknown as FileList)[0]
    const image = await convertToBase64(imageFile)
    addFormData({ ...data, image })
    reset()
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          {...register('name')}
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="age" className="text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          id="age"
          {...register('age', { setValueAs: (v: string) => parseInt(v) })}
          type="number"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.age && (
          <p className="text-red-500 text-sm">{errors.age.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="gender" className="text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          {...register('gender')}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="country" className="text-sm font-medium text-gray-700">
          Country
        </label>
        <input
          id="country"
          {...register('country')}
          type="text"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="image" className="text-sm font-medium text-gray-700">
          Image
        </label>
        <input
          id="image"
          {...register('image', {
            validate: (value) => {
              const file = (value as unknown as FileList)[0]
              if (!file) return true
              return validateImage(file) ?? true
            },
          })}
          type="file"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          {...register('password')}
          type="password"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          {...register('confirmPassword')}
          type="password"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <input
          id="terms"
          {...register('terms')}
          type="checkbox"
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="terms" className="text-sm font-medium text-gray-700">
          I accept Terms & Conditions
        </label>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  )
}
