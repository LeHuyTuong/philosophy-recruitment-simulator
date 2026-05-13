'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'hireme_session';

interface SessionState {
  sessionId: string | null;
  industry: string | null;
}

export function useSession() {
  const [session, setSession] = useState<SessionState>(() => {
    if (typeof window === 'undefined') return { sessionId: null, industry: null };
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return { sessionId: null, industry: null };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }, [session]);

  const createSession = useCallback(async () => {
    try {
      const res = await fetch('/api/session', { method: 'POST' });
      const data = await res.json();
      if (data.sessionId) {
        setSession({ sessionId: data.sessionId, industry: null });
        return data.sessionId;
      }
      throw new Error('No sessionId returned');
    } catch (error) {
      console.error('Create session error:', error);
      throw error;
    }
  }, []);

  const setIndustry = useCallback(async (industry: string) => {
    if (!session.sessionId) return;
    try {
      await fetch('/api/session/industry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.sessionId, industry }),
      });
      setSession(prev => ({ ...prev, industry }));
    } catch (error) {
      console.error('Set industry error:', error);
      throw error;
    }
  }, [session.sessionId]);

  const resetSession = useCallback(() => {
    setSession({ sessionId: null, industry: null });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { ...session, createSession, setIndustry, resetSession };
}
