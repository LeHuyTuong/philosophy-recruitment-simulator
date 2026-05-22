import { expect, type Page } from '@playwright/test';

export async function openHome(page: Page) {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);
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
  await expect(page.getByTestId('round1-page')).toBeVisible();
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

export async function completeRound2(page: Page) {
  for (let index = 0; index < 5; index++) {
    await page.getByTestId('star-rating-5').click();
    await page.getByRole('button', { name: index === 4 ? /Hoàn tất/ : /Tiếp theo/ }).click();
  }

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
  await page.getByTestId('product-nav-presentation-slides').click({ force: true });
  await expect(page.getByTestId('presentation-slides')).toBeVisible();
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