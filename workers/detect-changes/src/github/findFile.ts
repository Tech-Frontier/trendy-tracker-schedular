import { Octokit } from '@octokit/rest';

interface FindFileOptions {
  path: string;
}

interface GithubContext {
  owner: string;
  repo: string;
  octokit: Octokit
}

export async function findFile({ path }: FindFileOptions, context: GithubContext) {
  const { owner, repo, octokit } = context;

  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    return response as { data: { type: string; sha: string; content: string }};
  } catch (error: any) {
    return null;
  }
}
