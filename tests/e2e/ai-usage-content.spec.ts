import { expect, test } from '@playwright/test';
import { openLearningPage } from './helpers';

test('AI Usage page stays transparent about support and ownership', async ({ page }) => {
  await openLearningPage(page, 'AI Usage');

  const pageRoot = page.getByTestId('ai-usage-page');
  await expect(pageRoot).toBeVisible();
  await expect(pageRoot.getByRole('heading', { name: 'Minh bạch sử dụng AI' })).toBeVisible();
  await expect(pageRoot.getByText('AI được sử dụng để hỗ trợ kỹ thuật, gợi ý cấu trúc, kiểm thử và tối ưu giao diện.')).toBeVisible();
  await expect(pageRoot.locator('li').filter({ hasText: 'Nhóm chịu trách nhiệm cuối cùng' }).first()).toBeVisible();

  const requiredHeadings = [
    'AI đã hỗ trợ gì?',
    'Nhóm tự quyết định gì?',
    'AI không thay thế gì?',
    'Cam kết minh bạch',
  ];

  for (const heading of requiredHeadings) {
    await expect(pageRoot.getByRole('heading', { name: heading })).toBeVisible();
  }

  await expect(pageRoot.getByText('Gợi ý cấu trúc giao diện')).toBeVisible();
  await expect(pageRoot.getByText('Tạo code cơ bản')).toBeVisible();
  await expect(pageRoot.getByText('Kiểm thử và tối ưu wording')).toBeVisible();
  await expect(pageRoot.locator('li').filter({ hasText: 'Phân tích triết học' }).first()).toBeVisible();
  await expect(pageRoot.locator('li').filter({ hasText: 'Kịch bản sản phẩm' }).first()).toBeVisible();
  await expect(pageRoot.getByText('Không thay thế tư duy phản biện')).toBeVisible();
  await expect(pageRoot.locator('li').filter({ hasText: 'Nhóm chịu trách nhiệm cuối cùng' }).first()).toBeVisible();

  const bodyText = await pageRoot.innerText();
  expect(bodyText).not.toContain('AI tự làm toàn bộ');
  expect(bodyText).not.toContain('AI quyết định lập luận');
});