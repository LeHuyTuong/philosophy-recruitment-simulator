'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSession } from '@/hooks/useSession';
import { usePresenterMode } from '@/hooks/usePresenterMode';
import { api } from '@/lib/api';
import { candidatePool, type Candidate, industryList, type Industry } from '@/lib/candidates';
import { presentationScripts } from '@/data/presentationScripts';
import BottomNav from '@/components/hireme/BottomNav';
import ScreenNarrationBlock from '@/components/hireme/ScreenNarrationBlock';
import PresenterModeToggle from '@/components/hireme/PresenterModeToggle';
import PresenterScriptPanel from '@/components/hireme/PresenterScriptPanel';
import Landing from '@/views/hireme/Landing';
import IndustrySelector from '@/views/hireme/IndustrySelector';
import Round1_CV from '@/views/hireme/Round1_CV';
import Round2_Interview from '@/views/hireme/Round2_Interview';
import Round3_Task from '@/views/hireme/Round3_Task';
import Reveal from '@/views/hireme/Reveal';
import Schools from '@/views/hireme/Schools';
import Criteria from '@/views/hireme/Criteria';
import Dashboard from '@/views/hireme/Dashboard';
import FinalPoll from '@/views/hireme/FinalPoll';
import AIUsage from '@/views/hireme/AIUsage';

interface Round1Candidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  note: string;
  quadrant: string;
  interviewAnswer: {
    question: 1 | 2 | 3;
    style: string;
    text: string;
  };
}

interface TrialCandidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  quadrant: string;
  outcome: 'success' | 'fail';
}

// Screens that should NOT show the narration block
const NARRATION_HIDDEN_SCREENS = ['landing'];

export default function Home() {
  const { sessionId, industry, createSession, setIndustry } = useSession();
  const { isNotesPanelOpen, openNotesPanel, closeNotesPanel, toggleNotesPanel } = usePresenterMode();
  const [currentPage, setCurrentPage] = useState('landing');
  const [round1Candidates, setRound1Candidates] = useState<Round1Candidate[]>([]);
  const [round1Shortlist, setRound1Shortlist] = useState<string[]>([]);
  const [round3Results, setRound3Results] = useState<{ candidates: TrialCandidate[]; successCount: number } | null>(null);
  const [criteriaProfile, setCriteriaProfile] = useState('');
  const hasHandledJoinRef = useRef(false);

  const navigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStart = useCallback(async () => {
    try {
      await createSession();
      navigate('industry');
    } catch (error) {
      console.error('Start error:', error);
    }
  }, [createSession, navigate]);

  const handleSelectIndustry = useCallback(async (industryId: string) => {
    try {
      await setIndustry(industryId);
      navigate('round1');
    } catch (error) {
      console.error('Industry select error:', error);
    }
  }, [setIndustry, navigate]);

  const handleRound1Complete = useCallback(async (shortlist: string[], sortUsed: string, filterUsed: string) => {
    if (!sessionId || !industry) return;
    try {
      const data = await api.submitRound1({ sessionId, industry, shortlist, sortUsed, filterUsed });
      setRound1Candidates(data.candidates);
      setRound1Shortlist(shortlist);
      setCriteriaProfile(data.criteriaProfile);
      navigate('round2');
    } catch (error) {
      console.error('Round1 complete error:', error);
    }
  }, [sessionId, industry, navigate]);

  const handleRound2Complete = useCallback(async (ratings: Record<string, number>, top3: string[]) => {
    if (!sessionId) return;
    try {
      await api.submitRound2({ sessionId, ratings, top3 });
      navigate('round3');
    } catch (error) {
      console.error('Round2 complete error:', error);
    }
  }, [sessionId, navigate]);

  const handleRound3Complete = useCallback((results: { candidates: TrialCandidate[]; successCount: number }) => {
    setRound3Results(results);
    navigate('reveal');
  }, [navigate]);

  const normalizeIndustry = useCallback((value: string | null): Industry | null => {
    if (!value) return null;
    const normalized = value.toLowerCase();
    if ((industryList as readonly string[]).includes(normalized)) {
      return normalized as Industry;
    }
    return null;
  }, []);

  const bootstrapJoinFlow = useCallback(async () => {
    if (typeof window === 'undefined' || hasHandledJoinRef.current) return;
    hasHandledJoinRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const join = params.get('join');
    if (join !== '1') return;

    const requestedIndustry = normalizeIndustry(params.get('industry'));
    let activeSessionId = sessionId;

    if (!activeSessionId) {
      activeSessionId = await createSession();
    }

    if (requestedIndustry) {
      await setIndustry(requestedIndustry, activeSessionId || undefined);
      navigate('round1');
      return;
    }

    navigate('industry');
  }, [createSession, navigate, normalizeIndustry, sessionId, setIndustry]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      void bootstrapJoinFlow();
    }, 0);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [bootstrapJoinFlow]);

  const getRevealData = useCallback(() => {
    if (!industry || !round3Results) return null;
    const allCandidates = candidatePool[industry as keyof typeof candidatePool] || [];
    const allTrialCandidates: TrialCandidate[] = allCandidates.map(c => ({
      id: c.id,
      name: c.name,
      gpa: c.gpa,
      internshipMonths: c.internshipMonths,
      projects: c.projects,
      skills: c.skills,
      quadrant: c.quadrant,
      outcome: c.outcome,
    }));
    return allTrialCandidates;
  }, [industry, round3Results]);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <Landing onStart={handleStart} onNavigate={navigate} />;
      case 'industry':
        return <IndustrySelector onSelectIndustry={handleSelectIndustry} onNavigate={navigate} />;
      case 'round1':
        if (!sessionId || !industry) {
          navigate('industry');
          return null;
        }
        return <Round1_CV sessionId={sessionId} industry={industry} onComplete={handleRound1Complete} />;
      case 'round2':
        if (round1Candidates.length === 0) {
          navigate('round1');
          return null;
        }
        return <Round2_Interview candidates={round1Candidates} onComplete={handleRound2Complete} />;
      case 'round3':
        if (!sessionId) {
          navigate('landing');
          return null;
        }
        return <Round3_Task sessionId={sessionId} industry={industry} shortlist={round1Shortlist} onComplete={handleRound3Complete} />;
      case 'reveal':
        if (!round3Results) {
          navigate('round3');
          return null;
        }
        return (
          <Reveal
            criteriaProfile={criteriaProfile}
            successCount={round3Results.successCount}
            candidates={round3Results.candidates}
            allCandidates={getRevealData() || []}
            onNavigate={navigate}
          />
        );
      case 'schools':
        return <Schools />;
      case 'criteria':
        return <Criteria criteriaProfile={criteriaProfile} onNavigate={navigate} />;
      case 'dashboard':
        return <Dashboard />;
      case 'final-poll':
        return <FinalPoll onNavigate={navigate} />;
      case 'ai-usage':
        return <AIUsage />;
      default:
        return <Landing onStart={handleStart} onNavigate={navigate} />;
    }
  };

  const currentScript = presentationScripts[currentPage];
  const showNarration = !NARRATION_HIDDEN_SCREENS.includes(currentPage);

  return (
    <div className="min-h-screen bg-white" suppressHydrationWarning>
      {/* In-document-flow narration block */}
      {showNarration && (
        <div className="px-4 pt-4">
          <ScreenNarrationBlock
            narration={currentScript?.screenNarration}
            onOpenNotes={openNotesPanel}
          />
        </div>
      )}

      {/* Main page content */}
      {renderPage()}

      <BottomNav onNavigate={navigate} currentPage={currentPage} />

      {/* Minimal notes toggle */}
      <PresenterModeToggle
        isNotesPanelOpen={isNotesPanelOpen}
        onToggleNotes={toggleNotesPanel}
      />

      {/* Presenter Script Panel — only when explicitly opened */}
      <PresenterScriptPanel
        script={currentScript}
        isOpen={isNotesPanelOpen}
        onClose={closeNotesPanel}
      />
    </div>
  );
}
