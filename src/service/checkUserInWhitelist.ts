import http from './index'
import { AxiosResponse } from 'axios'
import { Response } from './config'

export default async function checkUserInWhitelist(params: {
  projectId: number
  userAdderss: string
}): Promise<boolean> {
  const res: AxiosResponse<Response<null>> = await http.get('/openApi/checkAddrees', { params })
  return res.data.success
}
