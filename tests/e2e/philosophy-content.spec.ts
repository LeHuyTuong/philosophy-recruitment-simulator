import { expect, test } from '@playwright/test';
import { openLearningPage } from './helpers';

test('philosophy content matches the agreed wording and distinctions', async ({ page }) => {
  await openLearningPage(page, 'Trường phái');

  const pageRoot = page.getByTestId('schools-page');
  await expect(pageRoot).toBeVisible();

  const bodyText = await pageRoot.innerText();
  const requiredTerms = [
    'Duy tâm chủ quan',
    'Duy tâm khách quan',
    'Duy vật chất phác',
    'Duy vật siêu hình',
    'Thuyết khả tri',
    'Thuyết bất khả tri',
    'Hoài nghi luận',
    'Nhị nguyên luận',
    'Duy vật biện chứng',
  ];

  for (const term of requiredTerms) {
    expect(bodyText).toContain(term);
  }

  const metaphysicalCard = page.getByTestId('philosophy-card').filter({ hasText: 'Duy vật siêu hình' });
  await expect(metaphysicalCard).toBeVisible();
  await expect(metaphysicalCard).not.toContainText('Feuerbach');
  await expect(metaphysicalCard).toContainText('Các nhà duy vật thế kỷ XVII–XVIII');

  const unknowableCard = page.getByTestId('philosophy-card').filter({ hasText: 'Thuyết bất khả tri' });
  await expect(unknowableCard).toBeVisible();
  await expect(unknowableCard).toContainText('Hume, Kant');

  const knowableCard = page.getByTestId('philosophy-card').filter({ hasText: 'Thuyết khả tri' });
  await expect(knowableCard).toBeVisible();
  await expect(knowableCard).toContainText('Con người về nguyên tắc có thể nhận thức được thế giới và bản chất sự vật');

  const skepticismCard = page.getByTestId('philosophy-card').filter({ hasText: 'Hoài nghi luận' });
  await expect(skepticismCard).toBeVisible();
  await expect(skepticismCard).toContainText('Nâng sự hoài nghi thành nguyên tắc');
  await expect(skepticismCard).not.toContainText('Hume, Kant');

  const dualismCard = page.getByTestId('philosophy-card').filter({ hasText: 'Nhị nguyên luận' });
  await expect(dualismCard).toBeVisible();
  await expect(dualismCard).toContainText('Xem thêm');

  await expect(pageRoot.getByText('Cách app vận hành gần với lập trường nào?')).toBeVisible();
  await expect(pageRoot.getByText('Duy vật biện chứng (Marx-Lenin)')).toBeVisible();
  await expect(pageRoot.getByText('kiểm nghiệm bằng thực tiễn')).toBeVisible();

  expect(bodyText).not.toContain('Các trường phái nhận thức');
  expect(bodyText).not.toContain('Bất khả tri luận');
  expect(bodyText).not.toContain('Khả tri luận');
  expect(bodyText).not.toContain('chỉ có thể biết hiện tượng');
  expect(bodyText).not.toContain('Feuerbach');
});