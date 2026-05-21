import { expect, test } from '@playwright/test';

test('ProductNavbar exposes only production public items', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1000);

  await expect(page.getByTestId('product-navbar')).toBeVisible();
  await expect(page.getByTestId('nav-main-experience')).toBeVisible();
  await expect(page.getByTestId('nav-group-classroom')).toBeVisible();
  await expect(page.getByTestId('product-nav-presentation-slides')).toBeVisible();
  await expect(page.getByTestId('nav-group-learning')).toBeVisible();
  await expect(page.getByText('Kết quả DB')).toHaveCount(0);

  await page.getByTestId('product-nav-presentation-slides').evaluate(el => (el as HTMLElement).click());
  await expect(page.getByTestId('presentation-slides')).toBeVisible();
  await page.getByTestId('presentation-next').click();
  await page.getByTestId('presentation-close').click();
  await expect(page.getByTestId('presentation-slides')).toBeHidden();

  await page.getByTestId('nav-group-classroom').evaluate(el => (el as HTMLElement).click());
  const classroomMenu = page.getByTestId('product-nav-menu-classroom');
  await expect(classroomMenu).toBeVisible();
  await expect(classroomMenu.getByRole('menuitem', { name: 'Dashboard lớp' })).toBeVisible();
  await expect(classroomMenu.getByText('Kết quả DB')).toHaveCount(0);

  await page.getByTestId('nav-group-learning').evaluate(el => (el as HTMLElement).click());
  const learningMenu = page.getByTestId('product-nav-menu-learning');
  await expect(learningMenu).toBeVisible();
  await expect(learningMenu.getByRole('menuitem', { name: 'Trường phái' })).toBeVisible();
  await expect(learningMenu.getByRole('menuitem', { name: 'Tiêu chí đánh giá' })).toBeVisible();
  await expect(learningMenu.getByRole('menuitem', { name: 'AI Usage' })).toBeVisible();
});
