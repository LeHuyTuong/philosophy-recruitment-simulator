import { expect, test } from '@playwright/test';

test('dashboard tab shows DB or fallback stats safely', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('nav-group-classroom').click();
  await page.getByTestId('product-nav-class-dashboard').click();
  await expect(page.getByTestId('dashboard-page')).toBeVisible();
  await expect(page.getByTestId('dashboard-real-tab')).toBeVisible();
  await expect(page.getByTestId('dashboard-demo-tab')).toBeVisible();
  await expect(page.getByText(/Chưa có lượt chơi thật\.|Tổng số lượt chơi/)).toBeVisible();

  await page.getByTestId('dashboard-demo-tab').click();
  await expect(page.getByText('Dữ liệu giả lập phục vụ thuyết trình — không phải thống kê lớp thật.').first()).toBeVisible();
});

test('mobile viewport keeps ProductNavbar usable without page overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await page.getByTestId('mobile-menu-button').click();
  await expect(page.getByTestId('product-nav-mobile-menu')).toBeVisible();
  await page.getByTestId('product-nav-db-results').click();
  await expect(page.getByTestId('db-status-modal')).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(2);
});
