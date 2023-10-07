import { ttapi } from './client';

export async function removeRecruit({ recruitId }: { recruitId: number }) {
  const { data } = await ttapi.delete(`/api/recruit/delete/id/${recruitId}`);

  return data.msg;
}
