'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Presentation as PresentationIcon } from 'lucide-react';
import { useSession } from '@/hooks/useSession';
import { usePresenterMode } from '@/hooks/usePresenterMode';
import { api } from '@/lib/api';
import { candidatePool, type Candidate, industryList, type Industry } from '@/lib/candidates';
import { presentationScripts } from '@/data/presentationScripts';
import type { ProductNavItem, ProductNavItemId } from '@/data/productNavItems';
import BottomNav from '@/components/hireme/BottomNav';
import ScreenNarrationBlock from '@/components/hireme/ScreenNarrationBlock';
import PresenterModeToggle from '@/components/hireme/PresenterModeToggle';
import PresenterScriptPanel from '@/components/hireme/PresenterScriptPanel';
import ProductNavbar from '@/components/hireme/ProductNavbar';
import FeaturePreviewModal from '@/components/hireme/FeaturePreviewModal';
import DbStatusModal from '@/components/hireme/DbStatusModal';
import SessionHistoryPanel from '@/components/hireme/SessionHistoryPanel';
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
import PresentationSlides from '@/components/hireme/PresentationSlides';

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

type PreviewModalId = Extract<ProductNavItemId, 'personal-report' | 'candidate-comparison' | 'teacher-mode' | 'export-report'>;

// Screens that should NOT show the narration block
const NARRATION_HIDDEN_SCREENS = ['landing'];
const GAME_PAGES = ['landing', 'industry', 'round1', 'round2', 'round3', 'reveal', 'final-poll'];

export default function Home() {
  const { sessionId, industry, createSession, setIndustry } = useSession();
  const { isNotesPanelOpen, openNotesPanel, closeNotesPanel, toggleNotesPanel } = usePresenterMode();
  const [currentPage, setCurrentPage] = useState('landing');
  const [lastGamePage, setLastGamePage] = useState('landing');
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [presentationSession, setPresentationSession] = useState(0);
  const [previewModal, setPreviewModal] = useState<PreviewModalId | null>(null);
  const [isDbStatusOpen, setIsDbStatusOpen] = useState(false);
  const [isSessionHistoryOpen, setIsSessionHistoryOpen] = useState(false);
  const [round1Candidates, setRound1Candidates] = useState<Round1Candidate[]>([]);
  const [round1Shortlist, setRound1Shortlist] = useState<string[]>([]);
  const [round3Results, setRound3Results] = useState<{ candidates: TrialCandidate[]; successCount: number } | null>(null);
  const [criteriaProfile, setCriteriaProfile] = useState('');
  const [finalPollAnswer, setFinalPollAnswer] = useState<string | null>(null);
  const hasHandledJoinRef = useRef(false);

  const navigate = useCallback((page: string) => {
    if (page === 'presentation-slides') {
      setPresentationSession(session => session + 1);
      setIsPresentationOpen(true);
      return;
    }

    if (GAME_PAGES.includes(page)) {
      setLastGamePage(page);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleStart = useCallback(() => {
    void createSession().catch(error => {
      console.error('Start error:', error);
    });
    navigate('industry');
  }, [createSession, navigate]);

  const openPresentationSlides = useCallback(() => {
    setPresentationSession(session => session + 1);
    setIsPresentationOpen(true);
  }, []);

  const handleProductNavSelect = useCallback((item: ProductNavItem) => {
    switch (item.id) {
      case 'main-experience':
        navigate(lastGamePage);
        break;
      case 'presentation-slides':
        openPresentationSlides();
        break;
      case 'class-dashboard':
        navigate('dashboard');
        break;
      case 'db-results':
        setIsDbStatusOpen(true);
        break;
      case 'session-history':
        setIsSessionHistoryOpen(true);
        break;
      case 'schools':
      case 'criteria':
      case 'ai-usage':
        if (item.targetPage) navigate(item.targetPage);
        break;
      case 'personal-report':
      case 'candidate-comparison':
      case 'teacher-mode':
      case 'export-report':
        setPreviewModal(item.id);
        break;
    }
  }, [lastGamePage, navigate, openPresentationSlides]);

  const handleSelectIndustry = useCallback((industryId: string) => {
    void setIndustry(industryId).catch(error => {
      console.error('Industry select error:', error);
    });
    window.setTimeout(() => {
      navigate('round1');
    }, 0);
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

  const selectedRound1Candidates = useMemo(() => {
    if (!industry || round1Shortlist.length === 0) return [];
    const fallbackPool = candidatePool[industry as keyof typeof candidatePool] || [];
    return round1Shortlist
      .map(id => round1Candidates.find(candidate => candidate.id === id) || fallbackPool.find(candidate => candidate.id === id))
      .filter((candidate): candidate is Round1Candidate | Candidate => Boolean(candidate));
  }, [industry, round1Candidates, round1Shortlist]);

  const renderPreviewModalContent = () => {
    if (!previewModal) return null;

    if (previewModal === 'personal-report') {
      return (
        <FeaturePreviewModal
          isOpen
          title="Báo cáo cá nhân"
          status="demo"
          description="Tóm tắt nhanh dựa trên state hiện tại của phiên chơi, chưa lưu thông tin cá nhân."
          onClose={() => setPreviewModal(null)}
        >
          {sessionId ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Session</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{sessionId.slice(0, 8)}...</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Ngành</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{industry || 'Chưa chọn'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Round 1</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{round1Shortlist.length}/5 ứng viên</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-bold uppercase text-slate-500">Round 3</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {round3Results ? `${round3Results.successCount}/5 pass` : 'Chưa có kết quả'}
                </p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase text-slate-500">Tiêu chí</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{criteriaProfile || 'Chưa đủ dữ liệu'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                <p className="text-xs font-bold uppercase text-slate-500">Final poll</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{finalPollAnswer || 'Chưa trả lời'}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Chưa có phiên chơi. Khi người dùng bắt đầu flow, báo cáo demo sẽ tự dùng state hiện tại để hiển thị summary.
            </div>
          )}
        </FeaturePreviewModal>
      );
    }

    if (previewModal === 'candidate-comparison') {
      const resultById = new Map(round3Results?.candidates.map(candidate => [candidate.id, candidate]) || []);
      return (
        <FeaturePreviewModal
          isOpen
          title="So sánh ứng viên"
          status="demo"
          description="Preview đối chiếu shortlist ở Round 1 với outcome Round 3 nếu phiên chơi đã đi đủ xa."
          onClose={() => setPreviewModal(null)}
        >
          {selectedRound1Candidates.length ? (
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <div className="grid grid-cols-[1.2fr_0.7fr_0.7fr] gap-2 bg-slate-50 px-3 py-2 text-xs font-black uppercase text-slate-500">
                <span>Ứng viên</span>
                <span>GPA</span>
                <span>Outcome</span>
              </div>
              {selectedRound1Candidates.map(candidate => {
                const result = resultById.get(candidate.id);
                return (
                  <div key={candidate.id} className="grid grid-cols-[1.2fr_0.7fr_0.7fr] gap-2 border-t border-slate-100 px-3 py-3 text-sm">
                    <span className="font-semibold text-slate-900">{candidate.name}</span>
                    <span className="text-slate-700">{candidate.gpa.toFixed(2)}</span>
                    <span className={result?.outcome === 'success' ? 'font-bold text-emerald-700' : result?.outcome === 'fail' ? 'font-bold text-rose-700' : 'text-slate-500'}>
                      {result ? (result.outcome === 'success' ? 'PASS' : 'FAIL') : 'Preview'}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              Chưa có shortlist Round 1. Module này đang ở chế độ demo và sẽ tự hiển thị so sánh khi có dữ liệu trong phiên.
            </div>
          )}
        </FeaturePreviewModal>
      );
    }

    if (previewModal === 'teacher-mode') {
      return (
        <FeaturePreviewModal
          isOpen
          title="Teacher Mode"
          status="soon"
          description="Preview chế độ giáo viên: khóa màn hình lớp, highlight luận điểm và điều phối thảo luận."
          onClose={() => setPreviewModal(null)}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {['Điều phối lớp', 'Gợi ý câu hỏi', 'Chốt triết học'].map(item => (
              <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </FeaturePreviewModal>
      );
    }

    return (
      <FeaturePreviewModal
        isOpen
        title="Xuất báo cáo"
        status="soon"
        description="Preview xuất báo cáo lớp/nhóm ra PDF hoặc CSV. Bản demo hiện chưa sinh file thật."
        onClose={() => setPreviewModal(null)}
      >
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          Báo cáo sẽ gom dashboard, phiên chơi ẩn danh và phần giải thích tiêu chí. Chức năng xuất file được để Soon để tránh tạo dữ liệu cá nhân ngoài ý muốn.
        </div>
      </FeaturePreviewModal>
    );
  };

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
        return <FinalPoll sessionId={sessionId} onNavigate={navigate} onSubmitted={setFinalPollAnswer} />;
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
      <ProductNavbar currentPage={currentPage} onSelect={handleProductNavSelect} />
      <button
        onClick={() => {
          setPresentationSession(session => session + 1);
          setIsPresentationOpen(true);
        }}
        className="hidden fixed top-14 right-3 z-[60] items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-all cursor-pointer border bg-white/90 backdrop-blur-sm text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50"
        title="Slide thuyết trình"
      >
        <PresentationIcon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Slide thuyết trình</span>
      </button>

      {/* In-document-flow narration block */}
      {showNarration && (
        <div className="px-4 pt-3">
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

      <PresentationSlides
        key={presentationSession}
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
      />

      <DbStatusModal isOpen={isDbStatusOpen} onClose={() => setIsDbStatusOpen(false)} />
      <SessionHistoryPanel isOpen={isSessionHistoryOpen} onClose={() => setIsSessionHistoryOpen(false)} />
      {renderPreviewModalContent()}
    </div>
  );
}
