import { expect, test } from '@playwright/test';

test('home page and product navbar render without crashing', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByTestId('home-page')).toBeVisible();
  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByTestId('nav-brand')).toHaveText('HireMe Lab');
  await expect(page.getByTestId('nav-main-experience')).toBeVisible();
  await expect(page.getByTestId('product-nav-presentation-slides')).toBeVisible();
  await expect(page.getByTestId('nav-group-classroom')).toBeVisible();
  await expect(page.getByText('Kết quả DB')).toHaveCount(0);
});

test('core navbar public flows open from home', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await page.getByTestId('product-nav-presentation-slides').evaluate(el => (el as HTMLElement).click());
  await expect(page.getByTestId('presentation-slides')).toBeVisible();
  await page.getByTestId('presentation-close').click();

  await page.getByTestId('nav-group-classroom').evaluate(el => (el as HTMLElement).click());
  await expect(page.getByTestId('product-nav-menu-classroom')).toBeVisible();
  await expect(page.getByTestId('product-nav-menu-classroom')).toContainText('Dashboard lớp');

  await page.getByTestId('nav-group-learning').evaluate(el => (el as HTMLElement).click());
  await expect(page.getByTestId('product-nav-menu-learning')).toBeVisible();
  await expect(page.getByTestId('product-nav-menu-learning')).toContainText('AI Usage');
});
