import { expect, test } from '@playwright/test';

test('QR join flow without industry lands on industry selector', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.getByTestId('start-experience').evaluate(el => (el as HTMLElement).click());

  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByText('Chọn ngành nghề')).toBeVisible();
});

test('QR join flow with industry opens Round 1', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);
  await page.getByTestId('start-experience').evaluate(el => (el as HTMLElement).click());
  await page.getByRole('button', { name: /Công nghệ thông tin/ }).evaluate(el => (el as HTMLElement).click());

  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByTestId('round1-page')).toBeVisible();
});
