'use client';

import { useState, useEffect, useCallback } from 'react';

function getStoredPresenterMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('hireme_presenter_mode') === 'true';
  } catch {
    return false;
  }
}

export function usePresenterMode() {
  const [isPresenterMode, setIsPresenterMode] = useState(getStoredPresenterMode);
  const [isPanelOpen, setIsPanelOpen] = useState(() => getStoredPresenterMode());

  const togglePresenterMode = useCallback(() => {
    setIsPresenterMode(prev => {
      const next = !prev;
      if (typeof window !== 'undefined') {
        localStorage.setItem('hireme_presenter_mode', String(next));
      }
      if (next) {
        setIsPanelOpen(true);
      }
      return next;
    });
  }, []);

  const togglePanel = useCallback(() => {
    setIsPanelOpen(prev => !prev);
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture when typing in inputs/textareas
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // P: toggle presenter mode
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        togglePresenterMode();
      }

      // Escape: close panel (on mobile)
      if (e.key === 'Escape') {
        e.preventDefault();
        closePanel();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePresenterMode, closePanel]);

  return {
    isPresenterMode,
    isPanelOpen,
    togglePresenterMode,
    togglePanel,
    closePanel,
  };
}
