import { createOrUpdateFile } from '../github/index';
import { octokit,  RECRUIT_STORAGE } from './constant';
import { getRecruitList } from './getRecruitList';

interface DeactiveRecruitOptions {
  id: string;
  url: string;
}

export async function deactiveRecruit({ id, url }: DeactiveRecruitOptions): Promise<void> {
  const context = { octokit, ...RECRUIT_STORAGE };
  const filename = `RecruitList/${id}.json`;
  const { sha, data: prevRecruitList } = await getRecruitList({ id });

  const target = prevRecruitList.find(x => x.url === url);
  const content = JSON.stringify([
    ...prevRecruitList.filter(x => x.url !== url),
    { ...target, status: 'deactive' }
  ], null, 2);

  await new Promise((r) => setTimeout(r, 500));

  await createOrUpdateFile({
    path: filename,
    content: Buffer.from(content).toString('base64'),
    sha
  }, context);
}
