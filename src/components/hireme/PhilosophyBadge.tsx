'use client';

import { motion } from 'framer-motion';

type BadgeVariant = 'sensory' | 'rational' | 'practice' | 'universal' | 'essence';

const variantStyles: Record<BadgeVariant, string> = {
  sensory: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  rational: 'bg-blue-100 text-blue-800 border-blue-300',
  practice: 'bg-red-100 text-red-800 border-red-300',
  universal: 'bg-purple-100 text-purple-800 border-purple-300',
  essence: 'bg-emerald-100 text-emerald-800 border-emerald-300',
};

interface PhilosophyBadgeProps {
  variant: BadgeVariant;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function PhilosophyBadge({ variant, title, subtitle, className = '' }: PhilosophyBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`inline-flex flex-col items-start px-4 py-2.5 rounded-lg border-2 ${variantStyles[variant]} ${className}`}
    >
      <span className="text-sm font-bold tracking-wide">{title}</span>
      {subtitle && <span className="text-xs mt-0.5 opacity-80">{subtitle}</span>}
    </motion.div>
  );
}
