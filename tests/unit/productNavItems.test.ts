import { describe, expect, it } from 'vitest';
import { getStatusBadgeLabel, productNavItems } from '@/data/productNavItems';

describe('productNavItems', () => {
  it('contains all required navbar modules', () => {
    expect(productNavItems.map(item => item.id)).toEqual([
      'main-experience',
      'presentation-slides',
      'class-dashboard',
      'personal-report',
      'db-results',
      'candidate-comparison',
      'session-history',
      'schools',
      'criteria',
      'ai-usage',
      'teacher-mode',
      'export-report',
    ]);
  });

  it('maps status badge labels exactly', () => {
    expect(getStatusBadgeLabel('live')).toBe('Live');
    expect(getStatusBadgeLabel('db')).toBe('DB');
    expect(getStatusBadgeLabel('demo')).toBe('Demo');
    expect(getStatusBadgeLabel('soon')).toBe('Soon');
  });
});
