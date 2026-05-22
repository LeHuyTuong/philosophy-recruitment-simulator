import { expect, test } from '@playwright/test';
import {
  chooseIndustry,
  completeRound2,
  openExperience,
  selectRound1Candidates,
  sortRound1ByProjects,
  submitRound1,
} from './helpers';

test('result screen explains the 5 selected candidates and the PASS logic', async ({ page }) => {
  await openExperience(page);
  await chooseIndustry(page, 'Giáo dục');
  await sortRound1ByProjects(page);

  const selectedNames = await selectRound1Candidates(page, 5);
  await submitRound1(page);
  await completeRound2(page);

  const resultPage = page.getByTestId('reveal-page');
  const selectedContainer = page.getByTestId('result-selected-candidates');
  const resultRows = page.getByTestId('result-candidate-row');

  await expect(resultPage.getByText('THỰC TIỄN GIÚP KIỂM NGHIỆM')).toBeVisible();
  await expect(resultPage.getByText('Kết quả · Bản chất dần bộc lộ')).toBeVisible();
  await expect(resultPage.getByText('Kết quả kiểm nghiệm 5 ứng viên bạn đã chọn')).toBeVisible();
  await expect(page.getByTestId('pass-criteria-note')).toContainText('PASS được xác định');
  await expect(page.getByText('Tỷ lệ PASS theo nhóm hồ sơ')).toBeVisible();
  await expect(page.getByText('Hồ sơ ngoại lệ')).toBeVisible();
  await expect(page.getByText('Dữ liệu minh họa')).toBeVisible();

  await expect(resultRows).toHaveCount(5);
  await expect(selectedContainer).toContainText('PASS');
  await expect(selectedContainer).toContainText('CẦN XEM XÉT');
  await expect(selectedContainer).toContainText('FAIL');

  const rowNames = await resultRows.evaluateAll(rows => rows.map(row => row.querySelector('h3')?.textContent?.trim() || ''));
  for (const name of selectedNames) {
    expect(rowNames).toContain(name);
  }

  for (let index = 0; index < await resultRows.count(); index++) {
    await expect(resultRows.nth(index)).toContainText('Lý do:');
    await expect(resultRows.nth(index)).toContainText(/PASS|CẦN XEM XÉT|FAIL/);
  }

  const modalText = await resultPage.innerText();
  expect(modalText).not.toContain('THỰC TIỄN ĐÃ PHÁN QUYẾT');
  expect(modalText).not.toContain('Kết quả · BẢN CHẤT đã lộ ra');
  expect(modalText).not.toContain('Top ứng viên thực sự PASS theo phân khu');
  expect(modalText).not.toContain('Đặc biệt');
  expect(modalText).not.toContain('Thực tiễn mù quáng');
  expect(modalText).not.toContain('lý luận suông');
  expect(modalText).not.toContain('CHÂN LÝ');
});