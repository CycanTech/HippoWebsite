import http from './index'
import { AxiosResponse } from 'axios'
import { Response } from './config'

export interface Project {
  id: number
  projectName: string
  remark?: string
}

export default async function getProjects(): Promise<Project[]> {
  const res: AxiosResponse<Response<Project[]>> = await http.get('/openApi/projects')
  return res.data.data
}
