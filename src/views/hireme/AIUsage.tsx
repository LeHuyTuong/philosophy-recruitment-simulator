"use client";

import { motion } from 'framer-motion';

export default function AIUsage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      data-testid="ai-usage-page"
      className="min-h-screen px-4 py-5 pb-20 md:pb-8 bg-gradient-to-b from-slate-50 to-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Minh bạch sử dụng AI</h1>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <p className="text-sm text-gray-700 leading-relaxed">
            AI được sử dụng để hỗ trợ kỹ thuật, gợi ý cấu trúc, kiểm thử và tối ưu giao diện. Nhóm chịu trách nhiệm cuối cùng về phân tích triết học, kịch bản sản phẩm, lập luận và nội dung trình bày.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border bg-white p-4">
            <h4 className="text-sm font-semibold text-slate-800">AI đã hỗ trợ gì?</h4>
            <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Gợi ý cấu trúc giao diện</li>
              <li>Tạo code cơ bản</li>
              <li>Kiểm thử và tối ưu wording</li>
              <li>Gợi ý cách trình bày slide</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <h4 className="text-sm font-semibold text-slate-800">Nhóm tự quyết định gì?</h4>
            <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Phân tích triết học</li>
              <li>Kịch bản sản phẩm</li>
              <li>Luận điểm thuyết trình</li>
              <li>Logic đánh giá ứng viên</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <h4 className="text-sm font-semibold text-slate-800">AI không thay thế gì?</h4>
            <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Không thay thế tư duy phản biện</li>
              <li>Không tự quyết định kết luận</li>
              <li>Không thay thế trách nhiệm học thuật</li>
              <li>Không thay thế kiểm chứng bằng giáo trình</li>
            </ul>
          </div>

          <div className="rounded-xl border bg-white p-4">
            <h4 className="text-sm font-semibold text-slate-800">Cam kết minh bạch</h4>
            <ul className="mt-2 text-sm text-slate-600 list-disc pl-5 space-y-1">
              <li>Nhóm kiểm tra lại nội dung bằng giáo trình</li>
              <li>Nhóm chịu trách nhiệm cuối cùng</li>
              <li>AI chỉ là công cụ hỗ trợ</li>
              <li>Nội dung trình bày được nhóm chọn lọc và chỉnh sửa</li>
            </ul>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-500">Các phần dùng AI được xem là hỗ trợ kỹ thuật và trình bày; phần lập luận, phân tích và kết luận do nhóm chịu trách nhiệm.</p>
      </div>
    </motion.div>
  );
}
