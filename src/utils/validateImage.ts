import { ALLOWED_TYPES, MAX_FILE_SIZE } from './constans'

export function validateImage(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only PNG or JPEG'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must be less than 5MB'
  }
  return null
}