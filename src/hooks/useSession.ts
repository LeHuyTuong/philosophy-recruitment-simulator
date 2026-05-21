'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

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
  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
  }, [session]);

  const createSession = useCallback(async () => {
    try {
      const res = await fetch('/api/session', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (data.sessionId) {
        setSession({ sessionId: data.sessionId, industry: null });
        return data.sessionId;
      }
      throw new Error('No sessionId returned');
    } catch (error) {
      console.error('Create session error, falling back to client session:', error);
      const fallbackId = `client-${crypto.randomUUID()}`;
      setSession({ sessionId: fallbackId, industry: null });
      return fallbackId;
    }
  }, []);

  const setIndustry = useCallback(async (industry: string, sessionIdOverride?: string) => {
    const targetSessionId = sessionIdOverride ?? sessionRef.current.sessionId;
    if (!targetSessionId) {
      setSession(prev => ({ ...prev, industry }));
      return;
    }

    try {
      const res = await fetch('/api/session/industry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: targetSessionId, industry }),
      });
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        console.warn('Set industry API returned non-OK:', errorBody?.error || res.status);
      }
    } catch (error) {
      console.error('Set industry API error, using local state:', error);
    } finally {
      setSession(prev => ({ ...prev, industry }));
    }
  }, []);

  const resetSession = useCallback(() => {
    setSession({ sessionId: null, industry: null });
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { ...session, createSession, setIndustry, resetSession };
}
