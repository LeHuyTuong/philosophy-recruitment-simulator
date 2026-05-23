import { expect, type Locator, test } from '@playwright/test';
import { openPresentation } from './helpers';

async function goToSlide(page: import('@playwright/test').Page, text: string) {
  const modal = page.getByTestId('presentation-modal');
  const activeSlide = modal.getByTestId('presentation-active-slide');
  const targetIndices: Record<string, number> = {
    'Luồng trải nghiệm: Cảm tính → Lý tính → Thực tiễn': 2,
    'Bản chất – Hiện tượng': 3,
    'Thực tiễn kiểm nghiệm năng lực': 5,
    'Minh bạch sử dụng AI': 8,
    'Nhận thức đúng phải được kiểm nghiệm bằng thực tiễn': 9,
  };

  const targetIndex = targetIndices[text];
  if (typeof targetIndex === 'number') {
    const modalText = await modal.innerText();
    const match = modalText.match(/Slide\s+(\d+)\/(\d+)/);
    const currentIndex = match ? Number.parseInt(match[1], 10) - 1 : 0;
    for (let index = 0; index < Math.max(0, targetIndex - currentIndex); index++) {
      await page.getByTestId('presentation-next').click();
      await page.waitForTimeout(200);
    }
    return;
  }

  for (let index = 0; index < 10; index++) {
    const slideText = await activeSlide.innerText();
    if (slideText.includes(text)) {
      return;
    }

    if (!(await page.getByTestId('presentation-next').isEnabled())) {
      break;
    }
    await page.getByTestId('presentation-next').click();
    await page.waitForTimeout(200);
  }

  await expect(activeSlide).toContainText(text);
}

function supportBox(activeSlide: Locator, label: string) {
  return activeSlide.locator('[data-testid="slide-support-box"], aside div').filter({ hasText: label }).first();
}

test('presentation slides preserve the agreed philosophical content', async ({ page }) => {
  await openPresentation(page);

  const modal = page.getByTestId('presentation-modal');
  const activeSlide = modal.getByTestId('presentation-active-slide');

  await expect(activeSlide.getByRole('heading', { name: 'Vấn đề: Học giỏi chưa chắc thành công' })).toBeVisible();
  await expect(activeSlide.getByText('Điểm số là tín hiệu tốt, nhưng chưa phải toàn bộ năng lực.')).toBeVisible();
  await expect(activeSlide.getByText('Liên hệ triết học')).toBeVisible();
  await expect(supportBox(activeSlide, 'Liên hệ với app')).toBeVisible();
  await expect(supportBox(activeSlide, 'Câu hỏi phản tư')).toBeVisible();
  await expect(supportBox(activeSlide, 'Ý chính cần nhớ')).toBeVisible();

  await goToSlide(page, 'Luồng trải nghiệm: Cảm tính → Lý tính → Thực tiễn');
  await expect(activeSlide).toContainText(/Trực quan sinh động|Tư duy trừu tượng|Thực tiễn|Cảm tính → Lý tính → Thực tiễn/);
  await expect(supportBox(activeSlide, 'Liên hệ với app').or(supportBox(activeSlide, 'Câu hỏi phản tư')).or(supportBox(activeSlide, 'Ý chính cần nhớ')).first()).toBeVisible();

  await goToSlide(page, 'Bản chất – Hiện tượng');
  await expect(activeSlide.getByText('Bản chất – Hiện tượng: hiện tượng cần được đọc đúng trước khi kết luận về bản chất.', { exact: true })).toBeVisible();
  await expect(supportBox(activeSlide, 'Liên hệ với app')).toBeVisible();

  await goToSlide(page, 'Thực tiễn kiểm nghiệm năng lực');
  await expect(activeSlide.getByText('Kết quả thử việc giúp kiểm tra nhận định ban đầu về năng lực.')).toBeVisible();
  await expect(supportBox(activeSlide, 'Liên hệ với app').or(supportBox(activeSlide, 'Câu hỏi phản tư')).or(supportBox(activeSlide, 'Ý chính cần nhớ')).first()).toBeVisible();

  await goToSlide(page, 'Minh bạch sử dụng AI');
  await expect(activeSlide.getByRole('heading', { name: 'AI usage: AI là công cụ hỗ trợ, không thay thế chủ thể' })).toBeVisible();
  await expect(activeSlide.getByText('AI là công cụ hỗ trợ kỹ thuật và trình bày; lập luận và kết luận thuộc về con người.')).toBeVisible();
  await expect(activeSlide.getByText('chủ thể nhận thức vẫn là con người')).toBeVisible();
  await expect(supportBox(activeSlide, 'Liên hệ với app').or(supportBox(activeSlide, 'Câu hỏi phản tư')).or(supportBox(activeSlide, 'Ý chính cần nhớ')).first()).toBeVisible();

  await goToSlide(page, 'Nhận thức đúng phải được kiểm nghiệm bằng thực tiễn');
  await expect(activeSlide.getByRole('heading', { name: 'Nhận thức đúng phải được kiểm nghiệm bằng thực tiễn' })).toBeVisible();
  const modalText = await modal.innerText();
  expect(modalText).not.toContain('CHÂN LÝ');
  expect(modalText).not.toContain('Cả hai + thực tiễn kiểm nghiệm = CHÂN LÝ');
  expect(modalText).not.toContain('Quan hệ giữa công cụ và chủ thể');
  expect(modalText).not.toContain('từ biết sang tin');
  expect(modalText).not.toContain('Thực tiễn mù quáng');
});
