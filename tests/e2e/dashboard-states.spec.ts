import { expect, test } from '@playwright/test';
import { mockStatsRoute, openDashboard } from './helpers';

test('dashboard shows a friendly empty state when DB is empty', async ({ page }) => {
  await mockStatsRoute(page, {
    ok: true,
    source: 'db',
    hasData: false,
    data: [],
  });

  await openDashboard(page);

  await expect(page.getByText('Chưa có lượt chơi nào được ghi nhận. Hãy hoàn thành một lượt chơi để dashboard tự động cập nhật.')).toBeVisible();
  await expect(page.getByText('Chưa có dữ liệu thật')).toBeVisible();
  await expect(page.getByText(/database unavailable/i)).toHaveCount(0);
  await expect(page.getByText(/Có lỗi khi đọc DB\. Vui lòng kiểm tra kết nối DB\./i)).toHaveCount(0);
});

test('dashboard shows a sanitized error when DB read fails', async ({ page }) => {
  await mockStatsRoute(page, {
    ok: false,
    source: 'db',
    hasData: false,
    error: 'dashboard_db_connection_failed',
  });

  await openDashboard(page);

  await expect(page.getByText('Dữ liệu minh họa').first()).toBeVisible();
  await expect(page.getByText('Dữ liệu minh họa: DB chưa sẵn sàng hoặc chưa có dữ liệu.')).toBeVisible();
  await expect(page.getByText(/database unavailable/i)).toHaveCount(0);
  await expect(page.getByText(/Có lỗi khi đọc DB\. Vui lòng kiểm tra kết nối DB\./i)).toHaveCount(0);
});

test('dashboard labels mocked demo data correctly', async ({ page }) => {
  await mockStatsRoute(page, {
    ok: true,
    source: 'demo',
    hasData: true,
    data: [],
  });

  await openDashboard(page);

  await expect(page.getByText('Dữ liệu minh họa').first()).toBeVisible();
  await expect(page.getByText('Tổng số lượt chơi')).toBeVisible();
});