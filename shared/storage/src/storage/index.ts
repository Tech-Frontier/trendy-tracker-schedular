import { addRecruit } from './addRecruit';
import { deactiveRecruit } from './deactiveRecruit';
import { getRecruitList } from './getRecruitList';

export const STORAGE = {
  addRecruit,
  deactiveRecruit,
  getRecruitList
};

export type { RecruitInfo } from './getRecruitList';
