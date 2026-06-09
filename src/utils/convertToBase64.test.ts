import { describe, it, expect } from "vitest";
import { convertToBase64 } from "./convertToBase64";

describe('convertToBase64', () => {
it('should convert file to base64 string', async () => {
  const file = new File(['content'], 'test.png', {type: 'image/png'})
  const result = await convertToBase64(file)
  expect(result).toContain('data:')
  expect(typeof result).toBe('string')
})
})