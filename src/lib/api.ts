const API_BASE = '';

async function apiFetch(url: string, options?: RequestInit) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  createSession: () => apiFetch('/api/session', { method: 'POST' }),
  setIndustry: (sessionId: string, industry: string) =>
    apiFetch('/api/session/industry', {
      method: 'POST',
      body: JSON.stringify({ sessionId, industry }),
    }),
  getCandidates: (industry: string) =>
    apiFetch(`/api/candidates?industry=${industry}`),
  submitRound1: (data: { sessionId: string; industry: string; shortlist: string[]; sortUsed: string; filterUsed: string }) =>
    apiFetch('/api/round1', { method: 'POST', body: JSON.stringify(data) }),
  submitRound2: (data: { sessionId: string; ratings: Record<string, number>; top3: string[] }) =>
    apiFetch('/api/round2', { method: 'POST', body: JSON.stringify(data) }),
  submitRound3: (sessionId: string) =>
    apiFetch('/api/round3', { method: 'POST', body: JSON.stringify({ sessionId }) }),
  getStats: () => apiFetch('/api/stats'),
  submitPoll: (answer: string) =>
    apiFetch('/api/poll', { method: 'POST', body: JSON.stringify({ answer }) }),
};
