import { expect, test } from '@playwright/test';
import {
  chooseIndustry,
  completeRound2,
  openExperience,
  openHome,
  openPresentation,
  selectRound1Candidates,
  sortRound1ByProjects,
  submitRound1,
} from './helpers';

async function runResponsiveFlow(page: import('@playwright/test').Page) {
  await openHome(page);
  await expect(page.getByTestId('product-navbar')).toBeVisible();

  await page.getByTestId('nav-group-learning').evaluate(el => (el as HTMLElement).click());
  const learningMenu = page.getByTestId('product-nav-menu-learning');
  await expect(learningMenu).toBeVisible();
  await learningMenu.getByRole('menuitem', { name: 'AI Usage' }).click();
  await expect(page.getByTestId('ai-usage-page')).toBeVisible();
  await expect(page.getByText('AI đã hỗ trợ gì?')).toBeVisible();
  await expect(page.getByText('Nhóm tự quyết định gì?')).toBeVisible();

  await openPresentation(page);
  await expect(page.getByTestId('presentation-next')).toBeVisible();
  await expect(page.getByTestId('presentation-close')).toBeVisible();
  await page.getByTestId('presentation-next').click();
  await page.getByTestId('presentation-close').click();

  await openExperience(page);
  await chooseIndustry(page, 'Giáo dục');
  await sortRound1ByProjects(page);
  await selectRound1Candidates(page, 5);
  await submitRound1(page);
  await completeRound2(page);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(8);
}

test('responsive flow stays usable on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await runResponsiveFlow(page);
});

test('responsive flow stays usable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await runResponsiveFlow(page);
});