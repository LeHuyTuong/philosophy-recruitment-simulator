# HireMe Simulator - Worklog

---
Task ID: 1
Agent: Main
Task: Initial project setup and planning

Work Log:
- Analyzed existing Next.js 16 project structure
- Identified available dependencies (recharts, framer-motion, zustand, lucide-react, shadcn/ui)
- Installed qrcode.react for QR code generation
- Created directory structure for backend API routes and frontend components
- Planning to adapt the React+Vite+Express spec to Next.js App Router

Stage Summary:
- Project adapted for Next.js 16 with client-side routing in single / page
- All dependencies confirmed available
- Directory structure created

---
Task ID: 2
Agent: Seed Data Generator (subagent)
Task: Create complete candidate seed data for all 6 industries

Work Log:
- Created /src/lib/candidates.ts with 120 candidates across 6 industries
- Each candidate has: id, name, gpa, internshipMonths, projects, skills, note, quadrant, outcome, trialResult, interviewAnswer
- All 6 industries follow the same Q1-Q4+WILD quadrant structure
- ID prefixes: it_, mkt_, acc_, biz_, des_, edu_

Stage Summary:
- File: /src/lib/candidates.ts (~3031 lines, 120 candidates)
- All Vietnamese names are unique
- All trialResults are industry-specific
- All interviewAnswers rotate Q1/Q2/Q3 with concrete/shallow styles

---
Task ID: 3
Agent: Main
Task: Create data storage, API routes, session hook, and shared components

Work Log:
- Created /src/lib/data.ts - JSON file data storage with CRUD operations
- Created /src/lib/api.ts - API client wrapper
- Created /src/hooks/useSession.ts - Session management with localStorage persistence
- Created 7 API routes: session, session/industry, candidates, round1, round2, round3, stats, poll
- Created shared components: PhilosophyBadge, BottomNav, QuoteBlock, StarRating
- Added safe-area CSS and custom scrollbar styling

Stage Summary:
- All API routes functional and tested (200 responses)
- Session flow: create → set industry → round1 → round2 → round3
- Stats endpoint computes aggregated dashboard data
- All components use framer-motion animations

---
Task ID: 4
Agent: Main
Task: Create all page components and wire up main router

Work Log:
- Created 10 page components: Landing, IndustrySelector, Round1_CV, Round2_Interview, Round3_Task, Reveal, Schools, Criteria, Dashboard, FinalPoll, AIUsage
- Created main page.tsx with client-side state-based routing
- All pages display PhilosophyBadge with appropriate variant
- Updated layout.tsx with Vietnamese lang attribute and proper metadata
- Fixed typo in Round1_CV (removed Cyrillic character)
- Removed unused Checkbox import

Stage Summary:
- Complete app flow: Landing → Industry → Round1 (CV) → Round2 (Interview) → Round3 (Task) → Reveal → Criteria → Poll
- Dashboard with recharts: cross-industry bar chart, success rate chart, poll pie chart
- All Vietnamese text as specified
- Mobile-first responsive design
- ESLint passes with zero errors

---
Task ID: 5
Agent: Main
Task: Refactor candidate files into SOLID structure

Work Log:
- Read and analyzed existing 3000+ line /src/lib/candidates.ts monolith
- Transformed 6 industry files (it, marketing, accounting, business, design, education) into proper modules:
  - Added `import type { Candidate } from './types'` at top of each
  - Renamed array declarations to `export const candidates: Candidate[]`
  - Removed trailing lines (industry separators, candidatePool export) from accounting, business, design, education files
- Created /src/lib/candidates/index.ts barrel file:
  - Imports all 6 industry modules
  - Exports `candidatePool` as `Record<Industry, Candidate[]>`
  - Re-exports `Candidate`, `Industry`, `industryList` from types.ts
- Deleted old /src/lib/candidates.ts (the monolith)
- Verified all existing imports in page.tsx and API routes still resolve correctly (via barrel)
- Ran `bun run lint` — zero errors

Stage Summary:
- SOLID module structure: types.ts + 6 industry files + index.ts
- All 120 candidates preserved with exact data integrity
- No breaking changes: `candidatePool`, `Candidate`, `Industry` imports work from `@/lib/candidates`
- ESLint passes cleanly

---
Task ID: 6
Agent: Main
Task: Fix deployment failure — production build error

Work Log:
- Comprehensive audit of entire project (all 10 page components, 4 shared components, 7 API routes, hooks, lib files)
- Ran `bun run lint` — zero errors
- Dev server returned 200, all API routes functional
- Ran `npx next build` — **CRITICAL ERROR FOUND**:
  ```
  TypeError: Cannot read properties of undefined (reading 'filter')
  Error occurred prerendering page "/hireme/Reveal"
  ```
- **Root cause**: Files in `src/pages/hireme/` were being treated as Pages Router pages by Next.js.
  Next.js auto-discovers the `pages/` directory and tries to prerender all components as routes,
  but these are client components that expect props (e.g., `criteriaProfile`, `successCount`, etc.).
- **Fix**: Moved all 11 files from `src/pages/hireme/` to `src/views/hireme/`
- Updated imports in `src/app/page.tsx` from `@/pages/hireme/*` to `@/views/hireme/*`
- Removed empty `src/pages/` directory
- Re-ran `npx next build` — **BUILD SUCCESS** ✅
- All routes compile: `/` (static), all API routes (dynamic)
- Dev server restarts and returns 200, all APIs functional
- ESLint passes cleanly

Stage Summary:
- Build failure was caused by Next.js interpreting `src/pages/` as Pages Router directory
- Moving to `src/views/` resolved the prerendering conflict
- Production build now completes successfully
- App is fully deployable

---
Task ID: 7
Agent: Main
Task: Add Presenter Mode feature for classroom presentations

Work Log:
- Created `/src/data/presentationScripts.ts` with 10 screen scripts (landing, industry, round1, round2, round3, reveal, criteria, dashboard, schools, final-poll, ai-usage)
- Each script has: title, purpose, philosophy, talkTrack, productValue, transition
- Created `/src/hooks/usePresenterMode.ts` with state management and keyboard shortcuts (P to toggle, Esc to close)
- Persists presenter mode on/off state in localStorage
- Created `/src/components/hireme/PresenterModeToggle.tsx` — floating toggle button at top-right corner
  - Shows "🎤 Presenter Mode" when off, "🎤 Script đang bật" when on
  - Displays keyboard shortcut hint (P)
- Created `/src/components/hireme/PresenterScriptPanel.tsx` — presentation script display
  - Desktop (md+): 400px fixed side panel on the right with spring animation
  - Mobile: draggable bottom sheet with drag-to-dismiss
  - 5 collapsible sections: Mục đích, Liên hệ triết học, Script thuyết trình, Giá trị sản phẩm, Câu chuyển tiếp
  - Each section has icon, color-coded accent, and expand/collapse animation
- Integrated into `/src/app/page.tsx`:
  - Added usePresenterMode hook
  - Added PresenterModeToggle + PresenterScriptPanel alongside existing BottomNav
  - Passes currentScreenKey to match script data
  - Does NOT affect any existing game state or navigation
- Fixed ESLint error (react-hooks/set-state-in-effect) by using lazy initializer instead of setState in useEffect
- ESLint passes with zero errors
- Production build succeeds (next build compiled in 7.6s)
- Dev server returns 200, all features functional

Stage Summary:
- 4 new files created: presentationScripts.ts, usePresenterMode.ts, PresenterModeToggle.tsx, PresenterScriptPanel.tsx
- 1 file modified: src/app/page.tsx (added imports + toggle + panel)
- All 10 screens mapped to presentation scripts
- Presenter Mode is completely additive — does not affect existing game flow
- Keyboard shortcuts: P (toggle), Esc (close panel)

---
Task ID: 8
Agent: Main
Task: Fix mixed-language content (CJK/Cyrillic) across all candidate data

Work Log:
- Ran Unicode scan across entire src/ directory for CJK, Hiragana, Katakana, Hangul, Cyrillic characters
- Found 30+ occurrences of foreign characters mixed into Vietnamese text across 5 industry files
- Also found old monolith `src/lib/candidates.ts` had been recreated by sandbox (same issues)
- Deleted `src/lib/candidates.ts` (old monolith) — all data is in `src/lib/candidates/*.ts`
- Fixed 5 industry candidate data files via subagents:
  - `it.ts`: 5 CJK/Russian fixes + 7 English→Vietnamese fixes
  - `design.ts`: 3 CJK fixes + 8 English→Vietnamese fixes
  - `education.ts`: 2 CJK fixes + 12 English→Vietnamese fixes
  - `marketing.ts`: 3 CJK fixes + 16 English→Vietnamese fixes
  - `business.ts`: 1 CJK fix + ~57 English→Vietnamese fixes
- Created `/scripts/check-vietnamese-content.js` — validation script that scans for foreign characters
- Added npm scripts: `check:content` and `validate`
- Added `scripts/` to ESLint ignores in `eslint.config.mjs`

Key fixes:
- 跟上 → theo kịp | 加班 → làm thêm | 坚持 → kiên trì | 跟进 → theo sát
- 赠送 → tặng kèm | 反馈 → phản hồi | 前辈 → giáo viên có kinh nghiệm
- урок → bài học kinh nghiệm | полезно → nó hữu ích | 各自 → mỗi người
- 承认 → thừa nhận | 改进 → cải tiến | 深夜 → khuya
- assign peer tutoring → phân công các bạn khá hơn hỗ trợ các bạn yếu hơn
- minimum 7 điểm → tối thiểu 7 điểm

Stage Summary:
- 94 files scanned, 0 foreign characters remaining
- ESLint: 0 errors
- Production build: SUCCESS (7.5s)
- Validation script prevents future regressions

---
Task ID: 9
Agent: Main
Task: Refactor Presenter Mode into 2-layer architecture (Audience Overlay + Private Notes)

Work Log:
- Read and analyzed all existing Presenter Mode files (4 files + page.tsx)
- Updated `/src/data/presentationScripts.ts`:
  - Added `AudienceNarration` interface: { title, headline, philosophyLink, transition }
  - Added `audienceNarration` field to all 11 screen scripts
  - Content derived from existing long-form scripts, shortened for audience display (3-4 lines)
- Refactored `/src/hooks/usePresenterMode.ts`:
  - Separated state into: isPresentationMode, isNotesPanelOpen, isAudienceOverlayVisible
  - URL param support: ?present=1 auto-enables presentation mode (priority over localStorage)
  - Keyboard shortcuts: P (toggle mode), N (toggle notes, only when mode on), Esc (close notes first, then close mode)
  - Notes panel no longer auto-opens when presentation mode turns on
  - Uses useRef + useEffect pattern for keyboard handler to read latest state
  - Removed old localStorage key `hireme_presenter_mode_panel`, only persists mode state
- Created `/src/components/hireme/AudienceNarrationOverlay.tsx`:
  - Desktop: floating card at bottom center (max-w-xl), above BottomNav
  - Mobile: compact bottom card, above BottomNav
  - Shows: badge "Presentation", title, headline, philosophy link (with amber icon), transition (with arrow)
  - "Ẩn" button to collapse, "Ghi chú" button to open notes panel
  - Hidden state shows small floating "Hiện nội dung" button
  - framer-motion animations for show/hide
- Updated `/src/components/hireme/PresenterModeToggle.tsx`:
  - Off state: "Bật thuyết trình" button with Mic icon (was "Presenter Mode")
  - On state: Two buttons — "Ghi chú" (with BookOpen icon, N shortcut) + "Đang thuyết trình" (with Mic icon, P shortcut)
  - Notes button shows active state when panel is open
- Updated `/src/components/hireme/PresenterScriptPanel.tsx`:
  - Removed `screenKey` prop (unused)
  - Renamed "Presenter Script" → "Ghi chú thuyết trình"
  - Updated keyboard shortcut hints (N to close, Esc to close or turn off)
  - Structure and functionality unchanged (still private speaker notes)
- Updated `/src/app/page.tsx`:
  - Integrated AudienceNarrationOverlay into layout
  - PresenterScriptPanel only renders when isNotesPanelOpen=true (not when mode is on)
  - PresenterModeToggle passes new separated props
  - No layout shift — notes panel only opens explicitly

Stage Summary:
- 1 new file: AudienceNarrationOverlay.tsx
- 4 files modified: presentationScripts.ts, usePresenterMode.ts, PresenterModeToggle.tsx, PresenterScriptPanel.tsx, page.tsx
- ESLint: 0 errors
- Dev server: returns 200 (both normal and ?present=1)
- Architecture: Audience Overlay (visible by default when mode on) + Notes Panel (opened manually with N key or Ghi chú button)

---
Task ID: 10
Agent: Main
Task: Major UX overhaul — remove floating overlay, add in-document narration block, fix Round1 candidate bias

Work Log:
- Deleted `/src/components/hireme/AudienceNarrationOverlay.tsx` — replaced by in-document-flow component
- Updated `/src/data/presentationScripts.ts`:
  - Replaced `AudienceNarration` with `ScreenNarration` interface: { title, headline, body, philosophyLink, action }
  - Body content 70-120 words per screen — longer, more descriptive than before
  - Each screen has philosophy link in amber-highlighted box and action call-to-action
  - All 11 screens mapped with new narration content
- Created `/src/components/hireme/ScreenNarrationBlock.tsx`:
  - In-document-flow component (NOT floating overlay)
  - max-w-3xl centered, gradient bg, rounded-xl card
  - Badge "Gợi ý thuyết trình" + screen title + optional "Ghi chú" button
  - Headline (bold), body text, philosophy link (amber box), action (arrow + text)
  - No hide/show toggle — always visible when rendered
- Simplified `/src/hooks/usePresenterMode.ts`:
  - Removed all presentation mode state (isPresentationMode, isAudienceOverlayVisible, togglePresentationMode, etc.)
  - Only manages isNotesPanelOpen for PresenterScriptPanel
  - Keyboard shortcuts: N (toggle notes), Esc (close notes)
  - Removed localStorage persistence, URL param logic
- Simplified `/src/components/hireme/PresenterModeToggle.tsx`:
  - Single small button (rounded-lg, not rounded-full) — "Ghi chú" with BookOpen icon
  - Shows active state (dark bg) when notes panel open
  - Keyboard hint: N
  - No "Bật thuyết trình" / "Đang thuyết trình" buttons anymore
- Fixed `/src/views/hireme/Round1_CV.tsx`:
  - Changed default sort from `gpa_desc` to `default` (seeded shuffle)
  - Added `seededShuffle()` function using deterministic hash from sessionId + industry
  - Added microcopy: "Thứ tự ứng viên đã được xáo trộn ngẫu nhiên. Đừng chỉ nhìn GPA..."
  - Microcopy only shows when using default sort
  - Replaced "Ngẫu nhiên" sort option with "Mặc định" (shuffle by default)
  - Manual sort options (GPA ↓, Tháng thực tập ↓, Dự án ↓) still work when user selects them
- Updated `/src/app/page.tsx`:
  - Removed AudienceNarrationOverlay import and usage
  - Added ScreenNarrationBlock at top of content (before renderPage), wrapped in px-4 pt-4
  - Narration hidden on landing page (NARRATION_HIDDEN_SCREENS = ['landing'])
  - Narration shown on all other screens automatically
  - PresenterScriptPanel now always rendered (no isPresentationMode guard) — only isOpen controls visibility
  - Simplified presenter mode props to just notes panel state

Stage Summary:
- 1 file deleted: AudienceNarrationOverlay.tsx
- 1 new file: ScreenNarrationBlock.tsx
- 5 files modified: presentationScripts.ts, usePresenterMode.ts, PresenterModeToggle.tsx, Round1_CV.tsx, page.tsx
- ESLint: 0 errors
- Production build: SUCCESS (7.6s)
- Dev server: HTTP 200
