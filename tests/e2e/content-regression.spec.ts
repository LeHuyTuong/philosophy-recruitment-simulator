import { test } from '@playwright/test';
import {
  chooseIndustry,
  completeRound2,
  mockStatsRoute,
  openClassroomPage,
  openExperience,
  openHome,
  openLearningPage,
  openPresentation,
  scanForForbiddenPhrases,
  selectRound1Candidates,
  sortRound1ByProjects,
  submitRound1,
} from './helpers';

const forbiddenPhrases = [
  'từ biết sang tin',
  'Các trường phái nhận thức',
  'Cả hai + thực tiễn kiểm nghiệm = CHÂN LÝ',
  'Top ứng viên thực sự PASS theo phân khu',
  'Có lỗi khi đọc DB. Vui lòng kiểm tra kết nối DB.',
  'database unavailable',
];

test('content regression scan covers the major product surfaces', async ({ page }) => {
  await openHome(page);
  await scanForForbiddenPhrases(page, forbiddenPhrases);

  await openExperience(page);
  await scanForForbiddenPhrases(page, forbiddenPhrases);

  await openClassroomPage(page, 'Dashboard lớp');
  await scanForForbiddenPhrases(page, forbiddenPhrases);

  await openPresentation(page);
  for (let index = 0; index < 10; index++) {
    await scanForForbiddenPhrases(page, forbiddenPhrases);
    const nextButton = page.getByTestId('presentation-next');
    if (!(await nextButton.isEnabled())) {
      break;
    }
    await nextButton.click();
  }

  await openLearningPage(page, 'Trường phái');
  await scanForForbiddenPhrases(page, forbiddenPhrases);

  await openLearningPage(page, 'AI Usage');
  await scanForForbiddenPhrases(page, forbiddenPhrases);

  await openExperience(page);
  await chooseIndustry(page, 'Giáo dục');
  await sortRound1ByProjects(page);
  await selectRound1Candidates(page, 5);
  await submitRound1(page);
  await completeRound2(page);
  await scanForForbiddenPhrases(page, forbiddenPhrases);

  await mockStatsRoute(page, {
    ok: true,
    source: 'db',
    hasData: false,
    data: [],
  });
  await openClassroomPage(page, 'Dashboard lớp');
  await scanForForbiddenPhrases(page, forbiddenPhrases);
});