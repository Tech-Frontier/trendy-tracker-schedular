import { Octokit } from '@octokit/rest';

const { CRECO_STORAGE_PAT = '' } = process.env;

if (CRECO_STORAGE_PAT === '') {
  throw new Error(`CRECO_STORAGE_PAT 가 주어지지 않았습니다.`);
}

const octokit = new Octokit({
  auth: CRECO_STORAGE_PAT,
});

const RECRUIT_STORAGE = {
  owner: 'Tech-Frontier',
  repo: 'trendy-tracker-recruit-storage',
};

export {
  octokit,
  RECRUIT_STORAGE,
};
