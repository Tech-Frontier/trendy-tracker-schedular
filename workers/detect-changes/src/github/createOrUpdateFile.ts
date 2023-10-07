import { Octokit } from '@octokit/rest';

interface CreateOrUpdateFileOptions {
  path: string;
  content: string;
  sha?: string;
}

interface GithubContext {
  owner: string;
  repo: string;
  octokit: Octokit
}

export async function createOrUpdateFile({ path, content, sha }: CreateOrUpdateFileOptions, context: GithubContext) {
  const { owner, repo, octokit } = context;

  return await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `[${sha == null ? 'create' : 'update'}] ${path} ${new Date().toISOString()}`,
    content,
    sha,
  });
}

