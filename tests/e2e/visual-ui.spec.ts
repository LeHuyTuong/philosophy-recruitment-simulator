import { expect, test } from '@playwright/test';

test.describe('Visual UI regression guards', () => {
  test('CSS loaded smoke test', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('landing-hero')).toBeVisible();
    await expect(page.getByTestId('start-experience')).toBeVisible();

    const cssState = await page.evaluate(() => {
      const bodyStyle = window.getComputedStyle(document.body);
      const home = document.querySelector('[data-testid="home-page"]') as HTMLElement | null;
      const hero = document.querySelector('[data-testid="landing-hero"]') as HTMLElement | null;
      const homeStyle = home ? window.getComputedStyle(home) : null;
      const heroStyle = hero ? window.getComputedStyle(hero) : null;
      const cta = document.querySelector('[data-testid="start-experience"]') as HTMLElement | null;
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
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const navbar = page.getByTestId('product-navbar');
    await expect(navbar).toBeVisible();

    const navbarHeight = await navbar.evaluate(el => el.getBoundingClientRect().height);
    expect(navbarHeight).toBeLessThanOrEqual(96);

    await expect(navbar.getByText('Flow tuyển dụng mô phỏng dành cho sinh viên.')).toHaveCount(0);
    await expect(navbar.getByText('Tổng hợp dữ liệu và điều phối thảo luận trên lớp.')).toHaveCount(0);
    await expect(navbar.getByText('Màn hình trình chiếu cho giảng viên hoặc nhóm thuyết trình.')).toHaveCount(0);
    await expect(navbar.getByText('Các màn hình demo, preview và tính năng sắp ra mắt.')).toHaveCount(0);

    await expect(navbar.getByTestId('nav-main-experience')).toBeVisible();
    await expect(navbar.getByTestId('nav-group-classroom')).toBeVisible();
    await expect(navbar.getByTestId('product-nav-presentation-slides')).toBeVisible();
    await expect(navbar.getByTestId('nav-group-learning')).toBeVisible();
    await expect(navbar.getByText('Kết quả DB')).toHaveCount(0);
  });

  test('ProductNavbar dropdown behavior', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.getByTestId('nav-group-classroom').evaluate(el => (el as HTMLElement).click());
    const classroomMenu = page.getByTestId('product-nav-menu-classroom');
    await expect(classroomMenu).toBeVisible();

    const classroomDashboard = page.getByTestId('product-nav-class-dashboard');
    await expect(classroomDashboard.locator('span').first()).toHaveText('Dashboard lớp');
    await expect(classroomDashboard).toContainText('Dashboard lớp');
    await expect(classroomDashboard).not.toHaveText('Dashboard lớpDB');
    await expect(page.getByText('Kết quả DB')).toHaveCount(0);

    await page.getByTestId('nav-group-learning').evaluate(el => (el as HTMLElement).click());
    const learningMenu = page.getByTestId('product-nav-menu-learning');
    await expect(learningMenu).toBeVisible();
    await expect(page.getByTestId('product-nav-schools').locator('span').first()).toHaveText('Trường phái');
    await expect(page.getByTestId('product-nav-criteria').locator('span').first()).toHaveText('Tiêu chí đánh giá');
    await expect(page.getByTestId('product-nav-ai-usage').locator('span').first()).toHaveText('AI Usage');
  });

  test('Mobile navbar behavior', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const navbar = page.getByTestId('product-navbar');
    await expect(navbar).toBeVisible();
    const navbarHeight = await navbar.evaluate(el => el.getBoundingClientRect().height);
    expect(navbarHeight).toBeLessThanOrEqual(72);

    await expect(page.getByText('Flow tuyển dụng mô phỏng dành cho sinh viên.')).toHaveCount(0);
    await expect(page.getByTestId('mobile-menu-button')).toBeVisible();

    await page.getByTestId('mobile-menu-button').evaluate(el => (el as HTMLElement).click());
    await expect(page.getByTestId('product-nav-mobile-menu')).toBeVisible();
    await expect(page.getByTestId('product-nav-group-classroom')).toBeVisible();
    await expect(page.getByTestId('product-nav-group-learning')).toBeVisible();
    await expect(page.getByText('Kết quả DB')).toHaveCount(0);

    const overflow = await page.evaluate(() => document.body.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(2);
  });

  test('Landing hero visual check', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const hero = page.getByTestId('landing-hero');
    const cta = page.getByTestId('start-experience');
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
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    await page.getByTestId('nav-group-classroom').evaluate(el => (el as HTMLElement).click());
    await expect(page.getByTestId('product-nav-menu-classroom')).toBeVisible();
    await page.getByTestId('product-nav-menu-classroom').getByRole('menuitem', { name: 'Dashboard lớp' }).click();

    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Dashboard lớp' })).toBeVisible();
    await expect(page.getByText('Tổng hợp dữ liệu thật từ các lượt chơi đã hoàn thành.')).toBeVisible();
    await expect(page.getByText(/Chưa có lượt chơi nào được ghi nhận|Dữ liệu minh họa|Chưa thể tải dữ liệu lớp học/i).first()).toBeVisible();
    await expect(page.getByText(/database unavailable/i)).toHaveCount(0);
    await expect(page.getByText(/Dữ liệu giả lập|mô phỏng|DB chưa sẵn sàng/i)).toHaveCount(0);
  });

  test('Screenshot regression: landing desktop, dashboard desktop, navbar mobile opened', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('landing-desktop.png', { fullPage: true });

    await page.getByTestId('nav-group-classroom').evaluate(el => (el as HTMLElement).click());
    await expect(page.getByTestId('product-nav-menu-classroom')).toBeVisible();
    await page.getByTestId('product-nav-menu-classroom').getByRole('menuitem', { name: 'Dashboard lớp' }).click();
    await expect(page.getByTestId('dashboard-page')).toBeVisible();
    await expect(page).toHaveScreenshot('dashboard-desktop.png', { fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    await page.getByTestId('mobile-menu-button').evaluate(el => (el as HTMLElement).click());
    await expect(page.getByTestId('product-nav-mobile-menu')).toBeVisible();
    await expect(page).toHaveScreenshot('mobile-menu.png', { fullPage: true });
  });
});
