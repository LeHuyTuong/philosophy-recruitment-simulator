import { expect, test } from '@playwright/test';

test('home page and product navbar render without crashing', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByTestId('product-nav-main-experience')).toBeVisible();
  await expect(page.getByTestId('product-nav-presentation-slides')).toBeVisible();
  await expect(page.getByTestId('product-nav-db-results')).toBeVisible();
});

test('core navbar modals open from home', async ({ page }) => {
  await page.goto('/');

  await page.getByTestId('product-nav-presentation-slides').click();
  await expect(page.getByTestId('presentation-slides')).toBeVisible();
  await page.getByTestId('presentation-close').click();

  await page.getByTestId('product-nav-db-results').click();
  await expect(page.getByTestId('db-status-modal')).toBeVisible();
  await page.getByTestId('feature-preview-close').click();

  await page.getByTestId('product-nav-teacher-mode').click();
  await expect(page.getByTestId('feature-preview-modal')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Teacher Mode' })).toBeVisible();
});
