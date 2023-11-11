import dotenv from 'dotenv';
dotenv.config();

import { ttapi } from './client';

export async function healthCheck(): Promise<any> {
  const { data } = await ttapi.get(`/api/appInfo/health-check`);
  console.log(data);
  return data;
}
