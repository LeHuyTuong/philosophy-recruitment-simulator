import { expect, type Page, type TestInfo } from '@playwright/test';

declare global {
  interface Window {
    __hireMeTestSetupCompletedSession?: (options?: {
      industry?: string;
      selectedCandidateIds?: string[];
    }) => void;
  }
}

export async function openHome(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

export async function openExperience(page: Page) {
  await openHome(page);
  await page.getByTestId('start-experience').click({ force: true });
  await expect(page.getByTestId('industry-selector')).toBeVisible();
}

export async function chooseIndustry(page: Page, name = 'Giáo dục') {
  const industryId =
    name === 'Giáo dục'
      ? 'education'
      : name === 'Công nghệ thông tin'
        ? 'it'
        : name === 'Marketing'
          ? 'marketing'
          : name === 'Kế toán – Kiểm toán'
            ? 'accounting'
            : name === 'Kinh doanh – Bán hàng'
              ? 'business'
              : 'design';

  await page.getByTestId(`industry-card-${industryId}`).click({ force: true });
      await expect(page.getByTestId('round1-page')).toBeVisible({ timeout: 30000 });
}

export async function sortRound1ByProjects(page: Page) {
  await page.locator('select').first().selectOption('projects_desc');
}

export async function selectRound1Candidates(page: Page, count = 5) {
  const cards = page.getByTestId('candidate-card');
  const names: string[] = [];

  for (let index = 0; index < count; index++) {
    const card = cards.nth(index);
    const name = (await card.locator('h3').textContent())?.trim();
    if (name) names.push(name);
    await card.click();
  }

  await expect(page.getByText(`Đã chọn: ${count}/5`)).toBeVisible();
  return names;
}

export async function submitRound1(page: Page) {
  await page.getByRole('button', { name: /Gửi shortlist lên Sếp/ }).click();
  await expect(page.getByText('Vòng 2: Phỏng vấn 5 ứng viên')).toBeVisible();
}

export async function completeRound2(page: Page, testInfo?: TestInfo) {
  await page.waitForTimeout(300);
  for (let index = 0; index < 5; index++) {
    const currentCandidate = page.getByTestId('round2-current-candidate');
    await expect(currentCandidate).toBeVisible({ timeout: 10000 });
    const candidateText = await currentCandidate.innerText();

    const ratingButton = currentCandidate.getByTestId('star-rating-5');
    await expect(ratingButton).toBeVisible({ timeout: 10000 });
    await ratingButton.click();

    const nextButton = page.getByTestId('next-step');
    if (await nextButton.isDisabled()) {
      await testInfo?.attach(`round2-disabled-step-${index + 1}`, {
        body: Buffer.from(candidateText),
        contentType: 'text/plain',
      });
      await page.screenshot({
        path: testInfo?.outputPath(`round2-disabled-step-${index + 1}.png`),
        fullPage: true,
      });
    }
    await expect(nextButton).toBeEnabled({ timeout: 10000 });
    await nextButton.click();
  }

  await expect(page.getByTestId('reveal-page')).toBeVisible();
}

export async function setupCompletedSession(
  page: Page,
  options: { industry?: 'it' | 'marketing' | 'accounting' | 'business' | 'design' | 'education'; selectedCandidateIds?: string[] } = {},
) {
  const industry = options.industry || 'education';
  await page.addInitScript(({ targetIndustry }) => {
    window.localStorage.setItem('hireme_session', JSON.stringify({
      sessionId: `e2e-${Date.now()}`,
      industry: targetIndustry,
    }));
  }, { targetIndustry: industry });
  await openHome(page);
  await page.waitForFunction(() => typeof window.__hireMeTestSetupCompletedSession === 'function');
  await page.evaluate((setupOptions) => {
    window.__hireMeTestSetupCompletedSession?.(setupOptions);
  }, { industry, selectedCandidateIds: options.selectedCandidateIds });
  await expect(page.getByTestId('reveal-page')).toBeVisible();
}

export async function openLearningPage(page: Page, itemName: string) {
  await openHome(page);
  await page.getByTestId('nav-group-learning').click({ force: true });
  await expect(page.getByTestId('nav-group-learning')).toHaveAttribute('aria-expanded', 'true');
  const menu = page.getByTestId('product-nav-menu-learning');
  await expect(menu).toBeVisible();
  await menu.getByRole('menuitem', { name: itemName }).click();
}

export async function openClassroomPage(page: Page, itemName: string) {
  await openHome(page);
  await page.getByTestId('nav-group-classroom').click({ force: true });
  await expect(page.getByTestId('nav-group-classroom')).toHaveAttribute('aria-expanded', 'true');
  const menu = page.getByTestId('product-nav-menu-classroom');
  await expect(menu).toBeVisible();
  await menu.getByRole('menuitem', { name: itemName }).click();
}

export async function openPresentation(page: Page) {
  await openHome(page);
  await page.getByTestId('slide-button').click({ force: true });
  await expect(page.getByTestId('presentation-modal')).toBeVisible();
}

export async function openDashboard(page: Page) {
  await openClassroomPage(page, 'Dashboard lớp');
  await expect(page.getByTestId('dashboard-page')).toBeVisible();
}

export async function mockStatsRoute(page: Page, payload: unknown) {
  await page.route('**/api/stats', route => {
    void route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(payload),
    });
  });
}

export async function scanForForbiddenPhrases(page: Page, forbidden: string[]) {
  const bodyText = await page.locator('body').innerText();
  for (const phrase of forbidden) {
    expect(bodyText).not.toContain(phrase);
  }
}
