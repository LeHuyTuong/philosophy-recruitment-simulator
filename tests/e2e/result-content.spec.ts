import { expect, test } from '@playwright/test';
import {
  setupCompletedSession,
} from './helpers';

test('result screen explains the 5 selected candidates and the PASS logic', async ({ page }) => {
  await setupCompletedSession(page, { industry: 'education' });

  const resultPage = page.getByTestId('reveal-page');
  const selectedContainer = page.getByTestId('result-selected-candidates');
  const resultRows = page.getByTestId('result-candidate-row');

  await expect(resultPage.getByText('THỰC TIỄN GIÚP KIỂM NGHIỆM')).toBeVisible();
  await expect(resultPage.getByText('Kết quả · Bản chất dần bộc lộ')).toBeVisible();
  await expect(resultPage.getByText('Kết quả kiểm nghiệm 5 ứng viên bạn đã chọn')).toBeVisible();
  await expect(page.getByTestId('pass-criteria-note')).toContainText('PASS được xác định');
  await expect(page.getByText('Tỷ lệ PASS theo nhóm hồ sơ')).toBeVisible();
  await expect(page.getByText('Hồ sơ ngoại lệ', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Dữ liệu minh họa')).toBeVisible();

  await expect(resultRows).toHaveCount(5);
  await expect(selectedContainer).toContainText('PASS');
  await expect(selectedContainer).toContainText('CẦN XEM XÉT');
  await expect(selectedContainer).toContainText('FAIL');

  for (let index = 0; index < await resultRows.count(); index++) {
    await expect(resultRows.nth(index)).toContainText('Lý do:');
    await expect(resultRows.nth(index)).toContainText(/PASS|CẦN XEM XÉT|FAIL/);
  }

  await expect(resultPage.getByText('Dữ liệu minh họa')).toBeVisible();

  const modalText = await resultPage.innerText();
  expect(modalText).not.toContain('THỰC TIỄN ĐÃ PHÁN QUYẾT');
  expect(modalText).not.toContain('Kết quả · BẢN CHẤT đã lộ ra');
  expect(modalText).not.toContain('Top ứng viên thực sự PASS theo phân khu');
  expect(modalText).not.toContain('Đặc biệt');
  expect(modalText).not.toContain('Thực tiễn mù quáng');
  expect(modalText).not.toContain('lý luận suông');
  expect(modalText).not.toContain('CHÂN LÝ');
});
