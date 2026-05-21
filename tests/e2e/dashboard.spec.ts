import { expect, test } from '@playwright/test';

test('dashboard shows real-data-only state and remains usable on mobile', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await page.getByTestId('nav-group-classroom').evaluate(el => (el as HTMLElement).click());
  const classroomMenu = page.getByTestId('product-nav-menu-classroom');
  await expect(classroomMenu).toBeVisible();
  await classroomMenu.getByRole('menuitem', { name: 'Dashboard lớp' }).click();

  await expect(page.getByTestId('dashboard-page')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dashboard lớp' })).toBeVisible();
  await expect(page.getByText('Tổng hợp dữ liệu thật từ các lượt chơi đã hoàn thành.')).toBeVisible();
  await expect(page.getByText(/Chưa có dữ liệu lớp thật|Có lỗi khi đọc DB/i)).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByTestId('mobile-menu-button').click({ force: true });
  await expect(page.getByTestId('product-nav-mobile-menu')).toBeVisible();
  await expect(page.getByTestId('product-nav-group-classroom')).toBeVisible();
  await expect(page.getByText('Kết quả DB')).toHaveCount(0);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
});
