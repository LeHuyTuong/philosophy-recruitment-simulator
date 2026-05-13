import type { Candidate, Industry } from './types';
export { Candidate, Industry, industryList } from './types';
import { candidates as itCandidates } from './it';
import { candidates as marketingCandidates } from './marketing';
import { candidates as accountingCandidates } from './accounting';
import { candidates as businessCandidates } from './business';
import { candidates as designCandidates } from './design';
import { candidates as educationCandidates } from './education';

export const candidatePool: Record<Industry, Candidate[]> = {
  it: itCandidates,
  marketing: marketingCandidates,
  accounting: accountingCandidates,
  business: businessCandidates,
  design: designCandidates,
  education: educationCandidates,
};
