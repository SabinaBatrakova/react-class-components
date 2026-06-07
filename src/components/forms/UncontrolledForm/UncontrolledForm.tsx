import { convertToBase64 } from '../../../utils/convertToBase64'
import { formSchema } from '../../../validation/schema'
import useStore from '../../../store'
import { useState } from 'react'

interface UncontrolledFormProps {
  onClose: () => void
}

export function UncontrolledForm({ onClose }: UncontrolledFormProps) {
  const addFormData = useStore((state) => state.addFormData)
  const [errors, setErrors] = useState({
    name: '',
    age: '',
    email: '',
    gender: '',
    terms: '',
    password: '',
    confirmPassword: '',
    country: '',
    image: '',
  })

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const imageFile = formData.get('image') as File
    const image = await convertToBase64(imageFile)
    const ageValue = formData.get('age')
    const age = ageValue ? Number(ageValue) : NaN

    const data = {
      name: formData.get('name'),
      age: age,
      email: formData.get('email'),
      gender: formData.get('gender'),
      terms: formData.get('terms') === 'on',
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      country: formData.get('country'),
      image: image,
    }

    const result = formSchema.safeParse(data)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message
        }
      })
      setErrors({
        name: fieldErrors.name ?? '',
        age: fieldErrors.age ?? '',
        email: fieldErrors.email ?? '',
        gender: fieldErrors.gender ?? '',
        terms: fieldErrors.terms ?? '',
        password: fieldErrors.password ?? '',
        confirmPassword: fieldErrors.confirmPassword ?? '',
        country: fieldErrors.country ?? '',
        image: fieldErrors.image ?? '',
      })
      return
    }

    if (result.success) {
      addFormData(result.data)
      onClose()
    }
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
        <input id="name" name="name" type="text" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="age" className="text-sm font-medium text-gray-700">Age</label>
        <input id="age" name="age" type="number" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
        {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
        <input id="email" name="email" type="email" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
        <select id="gender" name="gender" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
        <input id="country" name="country" type="text" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary" />
        {errors.country && <p className="text-red-500 text-sm">{errors.country}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="image" className="text-sm font-medium text-gray-700">Image</label>
        <input id="image" name="image" type="file" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"/>
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
        <input id="password" name="password" type="password" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"/>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">ConfirmPassword</label>
        <input id="confirmPassword" name="confirmPassword" type="password" className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-primary"/>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <label htmlFor="terms" className="text-sm font-medium text-gray-700">I accept terms & conditions</label>
        <input id="terms" name="terms" type="checkbox" className="w-4 h-4 accent-primary" />
        {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
      </div>
      <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed">Submit</button>
    </form>
  )
}
