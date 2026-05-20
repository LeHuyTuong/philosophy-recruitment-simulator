'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

function hasPresentParam(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('present') === '1';
  } catch {
    return false;
  }
}

function getStoredPresentationMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem('hireme_presentation_mode') === 'true';
  } catch {
    return false;
  }
}

export function usePresenterMode() {
  // URL param ?present=1 takes priority over localStorage
  const [isPresentationMode, setIsPresentationMode] = useState(
    () => hasPresentParam() || getStoredPresentationMode()
  );
  const [isNotesPanelOpen, setIsNotesPanelOpen] = useState(false);
  const [isAudienceOverlayVisible, setIsAudienceOverlayVisible] = useState(true);

  // Keep a ref so keyboard handler always reads latest state
  const presentationRef = useRef(isPresentationMode);
  const notesRef = useRef(isNotesPanelOpen);

  // Sync refs after render (not during render)
  useEffect(() => {
    presentationRef.current = isPresentationMode;
  }, [isPresentationMode]);

  useEffect(() => {
    notesRef.current = isNotesPanelOpen;
  }, [isNotesPanelOpen]);

  const persistPresentation = useCallback((value: boolean) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('hireme_presentation_mode', String(value));
    }
  }, []);

  const togglePresentationMode = useCallback(() => {
    const next = !presentationRef.current;
    setIsPresentationMode(next);
    persistPresentation(next);
    if (next) {
      setIsAudienceOverlayVisible(true);
      setIsNotesPanelOpen(false);
    } else {
      setIsNotesPanelOpen(false);
    }
  }, [persistPresentation]);

  const openNotesPanel = useCallback(() => {
    if (!presentationRef.current) {
      // Auto-enable presentation mode
      setIsPresentationMode(true);
      persistPresentation(true);
      setIsAudienceOverlayVisible(true);
    }
    setIsNotesPanelOpen(true);
  }, [persistPresentation]);

  const closeNotesPanel = useCallback(() => {
    setIsNotesPanelOpen(false);
  }, []);

  const toggleAudienceOverlay = useCallback(() => {
    setIsAudienceOverlayVisible(prev => !prev);
  }, []);

  const closePresentationMode = useCallback(() => {
    setIsPresentationMode(false);
    setIsNotesPanelOpen(false);
    persistPresentation(false);
  }, [persistPresentation]);

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

      // P: toggle presentation mode
      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        togglePresentationMode();
      }

      // N: toggle notes panel (only when presentation mode is on)
      if (e.key === 'n' || e.key === 'N') {
        if (presentationRef.current) {
          e.preventDefault();
          setIsNotesPanelOpen(prev => !prev);
        }
      }

      // Escape: close notes first, then close presentation mode
      if (e.key === 'Escape') {
        e.preventDefault();
        if (notesRef.current) {
          setIsNotesPanelOpen(false);
        } else if (presentationRef.current) {
          setIsPresentationMode(false);
          persistPresentation(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePresentationMode, persistPresentation]);

  return {
    isPresentationMode,
    isNotesPanelOpen,
    isAudienceOverlayVisible,
    togglePresentationMode,
    openNotesPanel,
    closeNotesPanel,
    toggleAudienceOverlay,
    closePresentationMode,
  };
}
