import { expect, test } from '@playwright/test';
import { openPresentation } from './helpers';

async function goToSlide(page: import('@playwright/test').Page, text: string) {
  const target = page.getByText(text, { exact: false });
  for (let index = 0; index < 10; index++) {
    if (await target.count()) {
      try {
        await expect(target.first()).toBeVisible({ timeout: 500 });
        return;
      } catch {
        // Keep advancing until the target slide is active.
      }
    }

    await page.getByTestId('presentation-next').click();
  }

  await expect(target.first()).toBeVisible();
}

test('presentation slides preserve the agreed philosophical content', async ({ page }) => {
  await openPresentation(page);

  await expect(page.getByText('Vấn đề: Học giỏi chưa chắc thành công')).toBeVisible();
  await expect(page.getByText('Điểm số là tín hiệu tốt, nhưng chưa phải toàn bộ năng lực.')).toBeVisible();
  await expect(page.getByText('Liên hệ triết học')).toBeVisible();
  await expect(page.getByText('Liên hệ với app')).toBeVisible();
  await expect(page.getByText('Câu hỏi phản tư')).toBeVisible();
  await expect(page.getByText('Ý chính cần nhớ')).toBeVisible();

  await goToSlide(page, 'Luồng trải nghiệm: Cảm tính → Lý tính → Thực tiễn');
  await expect(page.getByText(/Trực quan sinh động|Tư duy trừu tượng|Thực tiễn|Cảm tính → Lý tính → Thực tiễn/)).toBeVisible();
  await expect(page.getByText(/Liên hệ với app|Câu hỏi phản tư|Ý chính cần nhớ/)).toBeVisible();

  await goToSlide(page, 'Bản chất – Hiện tượng');
  await expect(page.getByText('CV/GPA là điểm xuất phát, không phải kết luận cuối cùng.')).toBeVisible();
  await expect(page.getByText(/Liên hệ với app|Câu hỏi phản tư|Ý chính cần nhớ/)).toBeVisible();

  await goToSlide(page, 'Thực tiễn kiểm nghiệm năng lực');
  await expect(page.getByText('Kết quả thử việc giúp kiểm tra nhận định ban đầu về năng lực.')).toBeVisible();
  await expect(page.getByText(/Liên hệ với app|Câu hỏi phản tư|Ý chính cần nhớ/)).toBeVisible();

  await goToSlide(page, 'Minh bạch sử dụng AI');
  await expect(page.getByText('AI là công cụ hỗ trợ, tư duy con người là yếu tố quyết định.')).toBeVisible();
  await expect(page.getByText('chủ thể nhận thức vẫn là con người')).toBeVisible();
  await expect(page.getByText(/Liên hệ với app|Câu hỏi phản tư|Ý chính cần nhớ/)).toBeVisible();

  await goToSlide(page, 'Nhận thức đúng phải được kiểm nghiệm bằng thực tiễn');
  await expect(page.getByText('Nhận thức đúng phải được kiểm nghiệm bằng thực tiễn')).toBeVisible();
  const modalText = await page.getByTestId('presentation-slides').innerText();
  expect(modalText).not.toContain('CHÂN LÝ');
  await expect(page.getByText(/Liên hệ với app|Câu hỏi phản tư|Ý chính cần nhớ/)).toBeVisible();
});