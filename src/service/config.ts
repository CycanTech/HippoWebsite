export const BASE_URL = 'http://blockstatics.cycan.network'

export interface Response<T = any> {
  code: number | null
  data: T
  msg?: string | null
  success: boolean
}
