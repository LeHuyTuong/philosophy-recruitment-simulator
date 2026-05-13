// HireMe Simulator — Candidate Seed Data
// 6 industries × 20 candidates = 120 total
// Quadrant structure per industry:
//   Q1: High GPA + High practice  → 4 success
//   Q2: High GPA + Low practice   → 4 fail + 1 wildcard success
//   Q3: Low GPA + High practice   → 4 success + 1 wildcard fail
//   Q4: Low GPA + Low practice    → 4 fail
//   Wild: 2 extra (self-taught success + bright-but-arrogant fail)

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────

export interface Candidate {
  id: string;
  name: string;
  gpa: number;
  internshipMonths: number;
  projects: number;
  skills: string[];
  note: string;
  quadrant: "Q1" | "Q2" | "Q3" | "Q4" | "WILD";
  outcome: "success" | "fail";
  trialResult: {
    verdict: string;
    bullets: string[];
  };
  interviewAnswer: {
    question: 1 | 2 | 3;
    style: "concrete" | "shallow";
    text: string;
  };
}

export type Industry = "it" | "marketing" | "accounting" | "business" | "design" | "education";

export const industryList = ["it", "marketing", "accounting", "business", "design", "education"] as const;

