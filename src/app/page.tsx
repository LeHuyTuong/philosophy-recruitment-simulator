'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from '@/hooks/useSession';
import { api } from '@/lib/api';
import { candidatePool, type Candidate } from '@/lib/candidates';
import BottomNav from '@/components/hireme/BottomNav';
import Landing from '@/pages/hireme/Landing';
import IndustrySelector from '@/pages/hireme/IndustrySelector';
import Round1_CV from '@/pages/hireme/Round1_CV';
import Round2_Interview from '@/pages/hireme/Round2_Interview';
import Round3_Task from '@/pages/hireme/Round3_Task';
import Reveal from '@/pages/hireme/Reveal';
import Schools from '@/pages/hireme/Schools';
import Criteria from '@/pages/hireme/Criteria';
import Dashboard from '@/pages/hireme/Dashboard';
import FinalPoll from '@/pages/hireme/FinalPoll';
import AIUsage from '@/pages/hireme/AIUsage';

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

export default function Home() {
  const { sessionId, industry, createSession, setIndustry, resetSession } = useSession();
  const [currentPage, setCurrentPage] = useState('landing');
  const [round1Candidates, setRound1Candidates] = useState<Round1Candidate[]>([]);
  const [round3Results, setRound3Results] = useState<{ candidates: TrialCandidate[]; successCount: number } | null>(null);
  const [criteriaProfile, setCriteriaProfile] = useState('');

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
    if (!sessionId) return;
    try {
      const data = await api.submitRound1({ sessionId, shortlist, sortUsed, filterUsed });
      setRound1Candidates(data.candidates);
      setCriteriaProfile(data.criteriaProfile);
      navigate('round2');
    } catch (error) {
      console.error('Round1 complete error:', error);
    }
  }, [sessionId, navigate]);

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
        return <Round3_Task sessionId={sessionId} onComplete={handleRound3Complete} />;
      
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

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <BottomNav onNavigate={navigate} currentPage={currentPage} />
    </div>
  );
}
