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

  const metaphysicalCard = page.locator('[data-testid="philosophy-card"][data-school-name="Duy vật siêu hình"]');
  await expect(metaphysicalCard).toBeVisible();
  await expect(metaphysicalCard).not.toContainText('Feuerbach');
  await expect(metaphysicalCard).toContainText('Các nhà duy vật thế kỷ XVII–XVIII, chịu ảnh hưởng tư duy cơ giới');
  await expect(metaphysicalCard).toContainText('cô lập, tĩnh tại, máy móc');
  await expect(metaphysicalCard).toContainText('đại lượng cố định');

  const naiveMaterialistCard = page.locator('[data-testid="philosophy-card"][data-school-name="Duy vật chất phác"]');
  await expect(naiveMaterialistCard).toBeVisible();
  await expect(naiveMaterialistCard).toContainText('Triết học Cổ đại (Thales, Democritus...)');
  await expect(naiveMaterialistCard).toContainText('Đồng nhất vật chất với các dạng vật thể cụ thể, cảm tính');
  await expect(naiveMaterialistCard).not.toContainText('chỉ dựa vào một chỉ số');

  const unknowableCard = page.locator('[data-testid="philosophy-card"][data-school-name="Thuyết bất khả tri"]');
  await expect(unknowableCard).toBeVisible();
  await expect(unknowableCard).toContainText('Hume, Kant');

  const knowableCard = page.locator('[data-testid="philosophy-card"][data-school-name="Thuyết khả tri"]');
  await expect(knowableCard).toBeVisible();
  await expect(knowableCard).toContainText('Con người về nguyên tắc có thể nhận thức được thế giới và bản chất sự vật');

  const skepticismCard = page.locator('[data-testid="philosophy-card"][data-school-name="Hoài nghi luận"]');
  await expect(skepticismCard).toBeVisible();
  await expect(skepticismCard).toContainText('Nâng sự hoài nghi thành nguyên tắc');
  await expect(skepticismCard).not.toContainText('Hume, Kant');

  const dualismCard = page.locator('[data-testid="philosophy-card"][data-school-name="Nhị nguyên luận"]');
  await expect(dualismCard).toBeVisible();
  await expect(dualismCard).toContainText('Xem thêm');

  await expect(pageRoot.getByText('Cách app vận hành gần với lập trường nào?')).toBeVisible();
  await expect(pageRoot.getByRole('heading', { name: 'Duy vật biện chứng' })).toBeVisible();
  await expect(pageRoot.getByText('Karl Marx, Friedrich Engels, V.I. Lenin')).toBeVisible();
  await expect(pageRoot.getByText('kiểm nghiệm bằng thực tiễn')).toBeVisible();

  expect(bodyText).not.toContain('Các trường phái nhận thức');
  expect(bodyText).not.toContain('Bất khả tri luận');
  expect(bodyText).not.toContain('Khả tri luận');
  expect(bodyText).not.toContain('chỉ có thể biết hiện tượng');
  expect(bodyText).not.toContain('Trung tính/tiền-biện chứng');
  expect(bodyText).not.toContain('Feuerbach');
});
