import { test } from '@playwright/test';
import {
  mockStatsRoute,
  openClassroomPage,
  openExperience,
  openHome,
  openLearningPage,
  openPresentation,
  scanForForbiddenPhrases,
  setupCompletedSession,
} from './helpers';

const forbiddenPhrases = [
  'từ biết sang tin',
  'Các trường phái nhận thức',
  'Cả hai + thực tiễn kiểm nghiệm = CHÂN LÝ',
  'Top ứng viên thực sự PASS theo phân khu',
  'Có lỗi khi đọc DB. Vui lòng kiểm tra kết nối DB.',
  'database unavailable',
  'Học đường đo Hiện tượng',
  'Nghề nghiệp đo Bản chất',
  'Học đường đo nhận thức bằng đúng + đủ — đó là đo HIỆN TƯỢNG',
  'Nghề nghiệp đo nhận thức bằng hiệu quả — đó là đo BẢN CHẤT',
  'Thực tiễn → bản chất lộ ra',
];

test.setTimeout(60_000);

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

  await setupCompletedSession(page, { industry: 'education' });
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
