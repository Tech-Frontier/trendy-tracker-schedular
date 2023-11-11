import { fetchRecruitListByCompany } from './fetchRecruitList';
import { healthCheck } from './healthCheck';
import { registerRecruit } from './registerRecruit';
import { removeRecruit } from './removeRecruit';

export const TTAPI = {
  fetchRecruitListByCompany,
  registerRecruit,
  removeRecruit,
  healthCheck,
};
