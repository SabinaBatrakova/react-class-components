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
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : '',
        age: fieldErrors.age ? fieldErrors.age[0] : '',
        email: fieldErrors.email ? fieldErrors.email[0] : '',
        gender: fieldErrors.gender ? fieldErrors.gender[0] : '',
        terms: fieldErrors.terms ? fieldErrors.terms[0] : '',
        password: fieldErrors.password ? fieldErrors.password[0] : '',
        confirmPassword: fieldErrors.confirmPassword
          ? fieldErrors.confirmPassword[0]
          : '',
        country: fieldErrors.country ? fieldErrors.country[0] : '',
        image: fieldErrors.image ? fieldErrors.image[0] : '',
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
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" />
        {errors.name && <p>{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input id="age" name="age" type="number" />
        {errors.age && <p>{errors.age}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p>{errors.gender}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" name="country" type="text" />
        {errors.country && <p>{errors.country}</p>}
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input id="image" name="image" type="file" />
        {errors.image && <p>{errors.image}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">ConfirmPassword</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>
      <div>
        <label htmlFor="terms">Terms</label>
        <input id="terms" name="terms" type="checkbox" />
        {errors.terms && <p>{errors.terms}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}
