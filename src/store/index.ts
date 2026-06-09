import { create } from 'zustand'
import type { FormData } from '../types'

interface FormStore {
  formData: FormData[]
  addFormData: (formData: FormData) => void
  countries: string[]
}
const useStore = create<FormStore>((set) => ({
  formData: [],
  countries: ['Russia', 'Montenegro'],
  addFormData: (formData) =>
    set((state) => ({
      formData: [...state.formData, formData],
    })),
}))

export default useStore
