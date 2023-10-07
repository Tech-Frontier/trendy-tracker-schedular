import { createOrUpdateFile } from '../github/index';
import { octokit,  RECRUIT_STORAGE } from './constant';
import { getRecruitList } from './getRecruitList';

interface AddRecruitOptions {
  id: string;
  url: string;
  hash: string;
  status: string;
}

export async function addRecruit({ id, url, hash, status }: AddRecruitOptions): Promise<void> {
  const context = { octokit, ...RECRUIT_STORAGE };
  const filename = `RecruitList/${id}.json`;
  const { sha, data: prevRecruitList } = await getRecruitList({ id });

  const content = JSON.stringify([
    ...prevRecruitList.filter(x => x.url !== url),
    {
      url, hash, status
    }
  ], null, 2);

  await createOrUpdateFile({
    path: filename,
    content: Buffer.from(content).toString('base64'),
    sha
  }, context);
}
