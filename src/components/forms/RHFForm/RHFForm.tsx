import { useForm } from 'react-hook-form'
import { formSchema } from '../../../validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { convertToBase64 } from '../../../utils/convertToBase64'
import useStore from '../../../store'
import type { FormData } from '../../../types'

interface ReactHookFormProps {
  onClose: () => void
}

export function ReactHookForm({ onClose }: ReactHookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'all',
  })
  const addFormData = useStore((state) => state.addFormData)

  async function onSubmit(data: FormData) {
    const imageFile = (data.image as unknown as FileList)[0]
    const image = await convertToBase64(imageFile)
    addFormData({ ...data, image })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register('name')} type="text" />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="age">Age</label>
        <input
          id="age"
          {...register('age', { setValueAs: (v: string) => parseInt(v) })}
          type="number"
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" {...register('email')} type="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="gender">Gender</label>
        <select id="gender" {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input id="country" {...register('country')} type="text" />
        {errors.country && <p>{errors.country.message}</p>}
      </div>
      <div>
        <label htmlFor="image">Image</label>
        <input id="image" {...register('image')} type="file" />
        {errors.image && <p>{errors.image.message}</p>}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" {...register('password')} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">ConfirmPassword</label>
        <input
          id="confirmPassword"
          {...register('confirmPassword')}
          type="password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      <div>
        <label htmlFor="terms">Terms</label>
        <input id="terms" {...register('terms')} type="checkbox" />
        {errors.terms && <p>{errors.terms.message}</p>}
      </div>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  )
}
