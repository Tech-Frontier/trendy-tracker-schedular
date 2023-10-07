import { findFile, createOrUpdateFile } from '../github/index';
import { octokit, RECRUIT_STORAGE } from './constant';

interface GetRecruitListOptions {
  id: string;
}

export interface RecruitInfo {
  url: string;
  status: 'active' | 'deactive'
  hash: string;
}

interface GetRecruitListResponse {
  data: RecruitInfo[];
  type: string;
  sha: string;
  content: string;
}

export async function getRecruitList({ id }: GetRecruitListOptions): Promise<GetRecruitListResponse> {
  const context = { octokit, ...RECRUIT_STORAGE };
  const filename = `RecruitList/${id}.json`;
  const response = await findFile({ path: filename }, context);

  if (response == null) {
    const response = await createOrUpdateFile({
      path: filename,
      content: Buffer.from(`[]`).toString('base64'),
    }, context);

    return { data: [], type: 'file', sha: response.data.content!.sha!, content: '[]' };
  }

  try {
    return {
      data: JSON.parse(Buffer.from(response?.data.content.trim(), "base64").toString('utf-8')),
      type: response.data.type,
      sha: response.data.sha,
      content: response.data.content,
    };
  } catch {
    throw new Error(`${filename}이 올바른 JSON 이 아닙니다.`);
  }
}
