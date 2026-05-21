"use client";

import { motion } from 'framer-motion';

export default function AIUsage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
      </div>
    </motion.div>
  );
}
