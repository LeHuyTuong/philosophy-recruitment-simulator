'use client';

import { motion } from 'framer-motion';

interface QuoteBlockProps {
  text: string;
  author: string;
  source?: string;
  variant?: 'default' | 'marx' | 'lenin' | 'hcm';
}

const variantStyles = {
  default: 'border-l-4 border-gray-400 bg-gray-50',
  marx: 'border-l-4 border-red-500 bg-red-50',
  lenin: 'border-l-4 border-blue-600 bg-blue-50',
  hcm: 'border-l-4 border-yellow-600 bg-yellow-50',
};

export default function QuoteBlock({ text, author, source, variant = 'default' }: QuoteBlockProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`${variantStyles[variant]} rounded-r-lg p-4 my-4 italic`}
    >
      <p className="text-sm md:text-base leading-relaxed text-gray-700">{text}</p>
      <footer className="mt-2 text-xs md:text-sm font-semibold text-gray-600 not-italic">
        — {author}
        {source && <span className="text-gray-500 font-normal">, {source}</span>}
      </footer>
    </motion.blockquote>
  );
}
