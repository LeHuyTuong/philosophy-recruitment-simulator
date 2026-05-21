'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function usePresenterMode() {
  const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
  const notesRef = useRef(isNotesPanelOpen);

  useEffect(() => {
    notesRef.current = isNotesPanelOpen;
  }, [isNotesPanelOpen]);

  const openNotesPanel = useCallback(() => {
    setIsNotesPanelOpen(true);
  }, []);

  const closeNotesPanel = useCallback(() => {
    setIsNotesPanelOpen(false);
  }, []);

  const toggleNotesPanel = useCallback(() => {
    setIsNotesPanelOpen(prev => !prev);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // N: toggle notes panel
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsNotesPanelOpen(prev => !prev);
      }

      // Escape: close notes panel
      if (e.key === 'Escape') {
        e.preventDefault();
        if (notesRef.current) {
          setIsNotesPanelOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isNotesPanelOpen,
    openNotesPanel,
    closeNotesPanel,
    toggleNotesPanel,
  };
}
