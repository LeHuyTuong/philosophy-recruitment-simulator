import { expect, test } from '@playwright/test';

test('QR join flow without industry lands on industry selector', async ({ page }) => {
  await page.goto('/?join=1');

  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByTestId('industry-selector')).toBeVisible();
});

test('QR join flow with industry opens Round 1', async ({ page }) => {
  await page.goto('/?join=1&industry=it');

  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByTestId('round1-page')).toBeVisible();
});
