import { expect, test } from '@playwright/test';

test.describe('Visual UI regression guards', () => {
  test('CSS loaded smoke test', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('landing-hero')).toBeVisible();
    await expect(page.getByTestId('primary-cta')).toBeVisible();

    const cssState = await page.evaluate(() => {
      const bodyStyle = window.getComputedStyle(document.body);
      const home = document.querySelector('[data-testid="home-page"]') as HTMLElement | null;
      const hero = document.querySelector('[data-testid="landing-hero"]') as HTMLElement | null;
      const homeStyle = home ? window.getComputedStyle(home) : null;
      const heroStyle = hero ? window.getComputedStyle(hero) : null;
      const cta = document.querySelector('[data-testid="primary-cta"]') as HTMLElement | null;
      const ctaStyle = cta ? window.getComputedStyle(cta) : null;

      return {
        bodyFontFamily: bodyStyle.fontFamily,
        bodyBackground: bodyStyle.backgroundImage,
        bodyDisplay: bodyStyle.display,
        bodyPaddingTop: bodyStyle.paddingTop,
        homeBackground: homeStyle?.backgroundImage || '',
        heroDisplay: heroStyle?.display || '',
        heroBackground: heroStyle?.backgroundImage || '',
        ctaRadius: ctaStyle ? Number.parseFloat(ctaStyle.borderTopLeftRadius || '0') : 0,
        ctaBackground: ctaStyle?.backgroundColor || '',
        ctaBackgroundImage: ctaStyle?.backgroundImage || '',
      };
    });

    expect(cssState.bodyFontFamily).not.toContain('Times New Roman');
    expect(cssState.bodyBackground !== 'none' || cssState.homeBackground !== 'none' || cssState.heroBackground !== 'none').toBeTruthy();
    expect(cssState.heroDisplay === 'block' || cssState.heroDisplay === 'flex' || cssState.heroDisplay === 'grid').toBeTruthy();
    expect(cssState.ctaRadius).toBeGreaterThan(8);
    expect(
      (cssState.ctaBackground !== 'rgba(0, 0, 0, 0)' && cssState.ctaBackground !== 'transparent')
      || cssState.ctaBackgroundImage !== 'none'
    ).toBeTruthy();
  });

  test('ProductNavbar compact desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const navbar = page.getByTestId('product-navbar');
    await expect(navbar).toBeVisible();

    const navbarHeight = await navbar.evaluate(el => el.getBoundingClientRect().height);
    expect(navbarHeight).toBeLessThanOrEqual(96);

    await expect(navbar.getByText('Flow tuyển dụng mô phỏng dành cho sinh viên.')).toHaveCount(0);
    await expect(navbar.getByText('Tổng hợp dữ liệu và điều phối thảo luận trên lớp.')).toHaveCount(0);
    await expect(navbar.getByText('Màn hình trình chiếu cho giảng viên hoặc nhóm thuyết trình.')).toHaveCount(0);
    await expect(navbar.getByText('Các màn hình demo, preview và tính năng sắp ra mắt.')).toHaveCount(0);

    await expect(navbar.getByRole('button', { name: 'Trải nghiệm' })).toBeVisible();
    await expect(navbar.getByRole('button', { name: 'Lớp học' })).toBeVisible();
    await expect(navbar.getByRole('button', { name: 'Slide' })).toBeVisible();
    await expect(navbar.getByRole('button', { name: 'Học liệu' })).toBeVisible();
    await expect(navbar.getByRole('button', { name: 'Mở rộng' })).toBeVisible();
  });

  test('ProductNavbar dropdown behavior', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.getByTestId('nav-group-classroom').click();
    const classroomMenu = page.getByTestId('product-nav-menu-classroom');
    await expect(classroomMenu).toBeVisible();

    const classroomDashboard = page.getByTestId('product-nav-class-dashboard');
    await expect(classroomDashboard.locator('span').first()).toHaveText('Dashboard lớp');
    await expect(classroomDashboard).toContainText('Dashboard lớp');
    await expect(classroomDashboard).not.toHaveText('Dashboard lớpDB');
    await expect(classroomDashboard.locator('span').nth(1)).toHaveText(/DB|Demo|Soon/);

    await expect(page.getByTestId('product-nav-db-results').locator('span').first()).toHaveText('Kết quả DB');
    await expect(page.getByTestId('product-nav-session-history').locator('span').first()).toHaveText('Lịch sử phiên chơi');

    await page.getByTestId('nav-group-learning').click();
    const learningMenu = page.getByTestId('product-nav-menu-learning');
    await expect(learningMenu).toBeVisible();
    await expect(page.getByTestId('product-nav-schools').locator('span').first()).toHaveText('Trường phái');
    await expect(page.getByTestId('product-nav-criteria').locator('span').first()).toHaveText('Tiêu chí đánh giá');
    await expect(page.getByTestId('product-nav-ai-usage').locator('span').first()).toHaveText('AI Usage');

    await page.getByTestId('nav-group-more').click();
    const moreMenu = page.getByTestId('product-nav-menu-extensions');
    await expect(moreMenu).toBeVisible();
    await expect(page.getByTestId('product-nav-personal-report').locator('span').first()).toHaveText('Báo cáo cá nhân');
    await expect(page.getByTestId('product-nav-candidate-comparison').locator('span').first()).toHaveText('So sánh ứng viên');
    await expect(page.getByTestId('product-nav-teacher-mode').locator('span').first()).toHaveText('Teacher Mode');
    await expect(page.getByTestId('product-nav-export-report').locator('span').first()).toHaveText('Xuất báo cáo');
  });

  test('Mobile navbar behavior', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const navbar = page.getByTestId('product-navbar');
    await expect(navbar).toBeVisible();
    const navbarHeight = await navbar.evaluate(el => el.getBoundingClientRect().height);
    expect(navbarHeight).toBeLessThanOrEqual(72);

    await expect(page.getByText('Flow tuyển dụng mô phỏng dành cho sinh viên.')).toHaveCount(0);
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    await page.getByTestId('mobile-menu-button').click();
    await expect(page.getByTestId('product-nav-mobile-menu')).toBeVisible();
    await expect(page.getByTestId('product-nav-group-classroom')).toBeVisible();
    await expect(page.getByTestId('product-nav-group-learning')).toBeVisible();
    await expect(page.getByTestId('product-nav-group-extensions')).toBeVisible();

    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(2);
  });

  test('Landing hero visual check', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const hero = page.getByTestId('landing-hero');
    const cta = page.getByTestId('primary-cta');
    await expect(hero).toBeVisible();
    await expect(page.getByRole('heading', { name: 'HireMe Philosophy Lab' })).toBeVisible();
    await expect(cta).toBeVisible();

    const ctaStyles = await cta.evaluate(el => {
      const style = window.getComputedStyle(el as HTMLElement);
      const rect = (el as HTMLElement).getBoundingClientRect();
      return {
        borderRadius: Number.parseFloat(style.borderTopLeftRadius || '0'),
        height: rect.height,
        backgroundColor: style.backgroundColor,
      };
    });

    expect(ctaStyles.borderRadius).toBeGreaterThanOrEqual(8);
    expect(ctaStyles.height).toBeGreaterThanOrEqual(36);
    const hasVisibleButtonBackground = ctaStyles.backgroundColor !== 'rgba(0, 0, 0, 0)' && ctaStyles.backgroundColor !== 'transparent';
    const hasGradient = await cta.evaluate(el => window.getComputedStyle(el as HTMLElement).backgroundImage !== 'none');
    expect(hasVisibleButtonBackground || hasGradient).toBeTruthy();

    const heroTop = await hero.evaluate(el => el.getBoundingClientRect().top);
    expect(heroTop).toBeLessThan(220);
  });

  test('Dashboard visual honesty check', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    await page.getByTestId('nav-group-classroom').click();
    await page.getByTestId('product-nav-class-dashboard').click();

    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByTestId('dashboard-real-tab')).toBeVisible();
    await expect(page.getByTestId('dashboard-demo-tab')).toBeVisible();

    await page.getByTestId('dashboard-real-tab').click();
    await expect(page.getByText(/Chưa có lượt chơi thật|Tổng số lượt chơi/)).toBeVisible();

    const hasDbUnavailable = await page.getByText(/DB chưa sẵn sàng/i).first().isVisible().catch(() => false);
    const hasSimLabelInReal = await page.getByText(/Dữ liệu giả lập phục vụ thuyết trình/i).first().isVisible().catch(() => false);
    expect(hasDbUnavailable && hasSimLabelInReal).toBeFalsy();

    await page.getByTestId('dashboard-demo-tab').click();
    await expect(page.getByText(/Dữ liệu giả lập|không phải thống kê lớp thật/i).first()).toBeVisible();
  });

  test('Screenshot regression: landing desktop, dashboard desktop, navbar mobile opened', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await expect(page).toHaveScreenshot('landing-desktop.png', { fullPage: true });

    await page.getByTestId('nav-group-classroom').click();
    await page.getByTestId('product-nav-class-dashboard').click();
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page).toHaveScreenshot('dashboard-desktop.png', { fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByTestId('mobile-menu-button').click();
    await expect(page.getByTestId('product-nav-mobile-menu')).toBeVisible();
    await expect(page).toHaveScreenshot('mobile-menu.png', { fullPage: true });
  });
});