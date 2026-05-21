export type JobDescription = {
  industry: string;
  title: string;
  companyContext: string;
  responsibilities: string[];
  mustHave: string[];
  niceToHave: string[];
  evaluationHint: string;
};

export const jobDescriptions: Record<string, JobDescription> = {
  marketing: {
    industry: 'marketing',
    title: 'Junior Performance Marketing Executive',
    companyContext:
      'Công ty đang cần tuyển junior phụ trách chạy quảng cáo, đọc số liệu và tối ưu chiến dịch nhỏ.',
    responsibilities: [
      'Setup campaign quảng cáo cơ bản',
      'Theo dõi các chỉ số CTR, CPC, conversion',
      'Viết và thử nghiệm nhiều biến thể nội dung quảng cáo',
      'Báo cáo hiệu quả chiến dịch hằng tuần',
    ],
    mustHave: ['Google Ads', 'Facebook Ads', 'Analytics', 'Content Marketing', 'Copywriting', 'A/B Testing'],
    niceToHave: ['SEO', 'TikTok Growth', 'CRM Marketing', 'Email Automation', 'Real Ad Spend', 'Marketing Analytics'],
    evaluationHint:
      'Đừng chỉ chọn GPA cao. Hãy đối chiếu ứng viên với JD: kỹ năng nào khớp, kinh nghiệm nào có thể kiểm chứng, điểm nào chỉ là tín hiệu bề mặt.',
  },
  it: {
    industry: 'it',
    title: 'Junior Fullstack Developer',
    companyContext: 'Vị trí entry-level phát triển web, làm việc với stack front-end và back-end nhỏ.',
    responsibilities: [
      'Phát triển tính năng front-end và back-end nhỏ',
      'Viết unit/integration tests cơ bản',
      'Hợp tác với team để deploy và theo dõi ứng dụng',
    ],
    mustHave: ['React', 'JavaScript', 'Node', 'SQL', 'Git', 'Teamwork'],
    niceToHave: ['Java', 'Spring', 'Docker', 'DevOps', 'TypeScript', 'Open Source', 'Testing'],
    evaluationHint: 'So sánh kỹ kỹ năng front-end/back-end: nếu ứng viên có React + Node/SQL là điểm mạnh rõ rệt.',
  },
  design: {
    industry: 'design',
    title: 'Junior UI/UX Designer',
    companyContext: 'Thiết kế giao diện, prototype và hệ thống UI cơ bản cho sản phẩm.' ,
    responsibilities: ['Thiết kế wireframe', 'Tạo prototype', 'Hợp tác với dev để bàn giao design'],
    mustHave: ['Figma', 'UI/UX', 'Wireframe', 'Prototype', 'Design System'],
    niceToHave: ['Photoshop', 'Illustrator', 'User Research', 'Portfolio'],
    evaluationHint: 'Xem portfolio và khả năng chuyển ý tưởng thành prototype hoạt động.',
  },
  accounting: {
    industry: 'accounting',
    title: 'Junior Accountant',
    companyContext: 'Hỗ trợ công việc kế toán cơ bản, hạch toán và báo cáo.' ,
    responsibilities: ['Ghi sổ kế toán', 'Chuẩn bị chứng từ', 'Hỗ trợ báo cáo tài chính cơ bản'],
    mustHave: ['Kế toán cơ bản', 'Excel', 'Chuẩn mực kế toán'],
    niceToHave: ['Tally', 'ERP', 'Reconciliation'],
    evaluationHint: 'Ưu tiên ứng viên có kiến thức sổ sách và kỹ năng Excel vững.',
  },
  business: {
    industry: 'business',
    title: 'Junior Sales / Business Development',
    companyContext: 'Hỗ trợ phát triển khách hàng, outreach và bán hàng cơ bản.',
    responsibilities: ['Tìm kiếm khách hàng', 'Hỗ trợ quy trình sales', 'Theo dõi lead'],
    mustHave: ['Communication', 'Negotiation', 'CRM basic', 'Teamwork'],
    niceToHave: ['Sales strategy', 'Real Ad Spend', 'Account management'],
    evaluationHint: 'Kiểm tra khả năng giao tiếp và xử lý phản hồi khách hàng.',
  },
  education: {
    industry: 'education',
    title: 'Junior Education Assistant',
    companyContext: 'Hỗ trợ chương trình đào tạo, giảng dạy và quản lý lớp học.',
    responsibilities: ['Chuẩn bị tài liệu', 'Hỗ trợ giảng dạy', 'Liên hệ học viên'],
    mustHave: ['Communication', 'Organization', 'Documentation'],
    niceToHave: ['Curriculum design', 'Teaching experience', 'Assessment'],
    evaluationHint: 'Ưu tiên ứng viên có kỹ năng giao tiếp và tổ chức lớp học.',
  },
  // Fallback generic JD
  default: {
    industry: 'default',
    title: 'Junior Contributor',
    companyContext:
      'Vị trí entry-level cần tinh thần học hỏi, khả năng thực thi và thích nghi với yêu cầu chuyên môn.',
    responsibilities: ['Thực hiện task theo hướng dẫn', 'Học và áp dụng quy trình công việc', 'Báo cáo kết quả công việc định kỳ'],
    mustHave: ['Tinh thần cầu thị', 'Khả năng học nhanh', 'Kỹ năng giao tiếp cơ bản'],
    niceToHave: ['Kinh nghiệm thực tế liên quan', 'Portfolio hoặc project cá nhân'],
    evaluationHint:
      'So sánh kỹ năng ứng viên với JD: điểm mạnh nào dễ chuyển thành thực tiễn, điểm nào cần huấn luyện.',
  },
};

export function getJobDescription(industry: string) {
  if (!industry) return jobDescriptions['default'];
  const key = industry.toLowerCase().trim();
  // normalize common synonyms
  const map: Record<string, string> = {
    'fin': 'accounting',
    'finance': 'accounting',
    'acct': 'accounting',
    'sales': 'business',
    'biz': 'business',
  };
  const finalKey = map[key] || key;
  if (jobDescriptions[finalKey]) return jobDescriptions[finalKey];
  console.warn(`JD: no job description for industry="${industry}", falling back to default`);
  return jobDescriptions['default'];
}

// Helper: normalize string (lowercase, remove diacritics)
function normalizeText(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Map some aliases to canonical tokens for matching
const aliasMap: Record<string, string[]> = {
  react: ['react native', 'reactjs', 'react'],
  javascript: ['js', 'javascript'],
  node: ['nodejs', 'node'],
  sql: ['sql', 'postgres', 'mysql'],
  'google analytics': ['google analytics', 'analytics'],
  'facebook ads': ['facebook ads', 'fb ads', 'facebook'],
  ads: ['ads', 'advertising'],
  docker: ['docker', 'containers'],
  devops: ['devops', 'ci/cd'],
  teamwork: ['teamwork', 'communication', 'collaboration'],
  testing: ['testing', 'test', 'unit test', 'integration test'],
};

function expandAliases(tokens: string[]) {
  const set = new Set<string>();
  tokens.forEach(t => {
    const n = normalizeText(t);
    set.add(n);
    Object.entries(aliasMap).forEach(([canon, aliases]) => {
      aliases.forEach(a => {
        if (a === n) set.add(normalizeText(canon));
      });
    });
  });
  return Array.from(set);
}

export function matchJdSkills(candidateSkills: string[], jd: JobDescription) {
  const cand = candidateSkills.map(s => normalizeText(s));
  const must = expandAliases(jd.mustHave);
  const nice = expandAliases(jd.niceToHave);

  const matchedMust: string[] = [];
  const matchedNice: string[] = [];

  cand.forEach(cs => {
    // exact or includes
    for (const m of must) {
      if (cs.includes(m) || m.includes(cs)) {
        if (!matchedMust.includes(m)) matchedMust.push(m);
      }
    }
    for (const n of nice) {
      if (cs.includes(n) || n.includes(cs)) {
        if (!matchedNice.includes(n) && !matchedMust.includes(n)) matchedNice.push(n);
      }
    }
    // check aliasMap keys
    Object.keys(aliasMap).forEach(k => {
      const key = normalizeText(k);
      if (cs.includes(key)) {
        if (must.includes(key) && !matchedMust.includes(key)) matchedMust.push(key);
        if (nice.includes(key) && !matchedNice.includes(key) && !matchedMust.includes(key)) matchedNice.push(key);
      }
    });
  });

  return { matchedMust, matchedNice };
}
