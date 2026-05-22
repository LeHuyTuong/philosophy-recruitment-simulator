import { expect, test } from '@playwright/test';
import {
  chooseIndustry,
  completeRound2,
  openExperience,
  selectRound1Candidates,
  sortRound1ByProjects,
  submitRound1,
} from './helpers';

test.setTimeout(60_000);

test('user can complete the full HireMe flow and reach transparent results', async ({ page }, testInfo) => {
  await openExperience(page);
  await chooseIndustry(page, 'Giáo dục');
  await sortRound1ByProjects(page);

  const selectedNames = await selectRound1Candidates(page, 5);
  await submitRound1(page);
  await completeRound2(page, testInfo);

  await expect(page.getByText('THỰC TIỄN GIÚP KIỂM NGHIỆM')).toBeVisible();
  await expect(page.getByText('Kết quả · Bản chất dần bộc lộ')).toBeVisible();
  await expect(page.getByText('Kết quả kiểm nghiệm 5 ứng viên bạn đã chọn')).toBeVisible();
  await expect(page.getByTestId('pass-criteria-note')).toContainText('PASS được xác định');

  const selectedContainer = page.getByTestId('result-selected-candidates');
  const resultRows = page.getByTestId('result-candidate-row');

  await expect(resultRows).toHaveCount(5);
  await expect(selectedContainer).toContainText('PASS');
  await expect(selectedContainer).toContainText('CẦN XEM XÉT');
  await expect(selectedContainer).toContainText('FAIL');
  await expect(page.getByText('Tỷ lệ PASS theo nhóm hồ sơ')).toBeVisible();
  await expect(page.getByText('Hồ sơ ngoại lệ', { exact: true }).first()).toBeVisible();

  for (const name of selectedNames) {
    await expect(selectedContainer).toContainText(name);
  }
});
