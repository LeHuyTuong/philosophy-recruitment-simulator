import { expect, test } from '@playwright/test';

test('ProductNavbar opens slides, DB status, session history, and soon preview', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('product-navbar')).toBeVisible();

  await page.getByTestId('product-nav-presentation-slides').click();
  await expect(page.getByTestId('presentation-slides')).toBeVisible();
  await page.getByTestId('presentation-next').click();
  await page.getByTestId('presentation-close').click();
  await expect(page.getByTestId('presentation-slides')).toBeHidden();

  await page.getByTestId('product-nav-trigger-classroom').click();
  await page.getByTestId('product-nav-db-results').click();
  await expect(page.getByTestId('db-status-modal')).toBeVisible();
  await page.getByTestId('feature-preview-close').click();

  await page.getByTestId('product-nav-trigger-classroom').click();
  await page.getByTestId('product-nav-session-history').click();
  await expect(page.getByTestId('session-history-panel')).toBeVisible();
  await page.getByTestId('feature-preview-close').click();

  await page.getByTestId('product-nav-trigger-extensions').click();
  await page.getByTestId('product-nav-teacher-mode').click();
  await expect(page.getByTestId('feature-preview-modal')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Teacher Mode' })).toBeVisible();
});
