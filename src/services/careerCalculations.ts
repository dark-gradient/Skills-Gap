import { ALL_SKILLS, CAREER_ROLES, UNIVERSAL_STAGES } from '../data/careerData';
import {
  CareerRole,
  CareerCompetency,
  Skill,
  StudentProfile,
  StudentProgressHistory,
  GapCategory,
} from '../types/career';

export interface CalculatedReadiness {
  percentage: number;
  assessedCount: number;
  totalRequiredCount: number;
  pointsEarned: number;
  totalPossiblePoints: number;
}

export interface SkillGapItem {
  skill: CareerCompetency;
  currentLevel: number;
  currentStageLabel: string;
  importance: 'Core' | 'Important' | 'Supporting';
  classification: 'ROLE_SPECIFIC' | 'FOUNDATIONAL' | 'SPECIALIZED' | 'SUPPORTING';
  gapCategory: GapCategory; // 'CRITICAL_FOCUS' | 'DEVELOP' | 'STRONG'
  severity: 'Large Gap' | 'Medium Gap' | 'Small Gap' | 'On Track'; // Backward compatibility
  whyItMatters: string;
  rationale: string;
}

export interface StrongestSkillItem {
  skill: CareerCompetency;
  currentLevel: number;
  currentStageLabel: string;
  isRequiredForRole: boolean;
  classification: 'ROLE_SPECIFIC' | 'FOUNDATIONAL' | 'SPECIALIZED' | 'SUPPORTING';
}

export interface NextStepItem {
  priorityNumber: number;
  priorityCategory: 'High Priority' | 'Medium Priority' | 'Later';
  skill: CareerCompetency;
  currentLevel: number;
  currentStageLabel: string;
  importance: 'Core' | 'Important' | 'Supporting';
  classification: 'ROLE_SPECIFIC' | 'FOUNDATIONAL' | 'SPECIALIZED' | 'SUPPORTING';
  gapCategory: GapCategory;
  whyItMatters: string;
  recommendedFocus: string;
  resourceTitle: string;
  resourceProvider: string;
  resourceUrl: string;
  resourceType: string;
}

export interface RoadmapSection {
  title: string;
  description: string;
  items: RoadmapItem[];
}

export interface RoadmapItem {
  skill: CareerCompetency;
  classification: 'ROLE_SPECIFIC' | 'FOUNDATIONAL' | 'SPECIALIZED' | 'SUPPORTING';
  importance: 'Core' | 'Important' | 'Supporting';
  currentLevel: number;
  currentStageLabel: string;
  status: 'NOT ASSESSED' | 'CRITICAL FOCUS' | 'DEVELOP' | 'STRONG';
  isCompleted: boolean;
  whyItMatters: string;
  recommendedFocus: string;
  resource: CareerCompetency['authenticResource'];
}

// Internal consistency validator ensuring zero orphan competencies
export function validateCareerCoverage(role: CareerRole): {
  isValid: boolean;
  competencyCount: number;
  missingResourceCount: number;
  errors: string[];
} {
  const errors: string[] = [];
  let missingResourceCount = 0;

  if (!role.documentedCompetencies || role.documentedCompetencies.length === 0) {
    errors.push(`Role ${role.title} has no documented competencies.`);
  }

  for (const comp of role.documentedCompetencies) {
    if (!comp.id || !comp.name) {
      errors.push(`Competency in ${role.title} is missing id or name.`);
    }
    if (!comp.authenticResource || !comp.authenticResource.url) {
      missingResourceCount++;
      errors.push(`Competency ${comp.name} in ${role.title} has no authentic learning resource.`);
    }
  }

  return {
    isValid: errors.length === 0,
    competencyCount: role.documentedCompetencies.length,
    missingResourceCount,
    errors,
  };
}

// Clean storage key ensuring no legacy mock data persists in browser
const STORAGE_KEY = 'skillgap_student_profile_v5';

export const DEFAULT_PROFILE: StudentProfile = {
  studentName: '',
  targetRoleId: null,
  skillAssessments: {},
  skillEvidence: {},
  completedLearningIds: [],
  completedProjectIds: [],
  completedSoftSkillIds: [],
  completedGitStepIds: [],
  assessmentHistory: [],
  theme: 'light',
  motionMode: 'full',
};

export function loadProfileFromStorage(): StudentProfile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    // Purge legacy keys
    [
      'skillgap_student_profile_v1',
      'skillgap_student_profile_v2',
      'skillgap_student_profile_v3',
      'skillgap_student_profile_v4',
      'skillgap_registered_account_v1',
      'skillgap_auth_state',
    ].forEach((k) => {
      try {
        localStorage.removeItem(k);
      } catch {
        // ignore
      }
    });

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);

    const sanitizedName = typeof parsed.studentName === 'string'
      ? parsed.studentName.trim()
      : '';

    return {
      studentName: sanitizedName,
      targetRoleId: typeof parsed.targetRoleId === 'string' ? parsed.targetRoleId : null,
      skillAssessments: parsed.skillAssessments && typeof parsed.skillAssessments === 'object'
        ? parsed.skillAssessments
        : {},
      skillEvidence: parsed.skillEvidence && typeof parsed.skillEvidence === 'object'
        ? parsed.skillEvidence
        : {},
      completedLearningIds: Array.isArray(parsed.completedLearningIds)
        ? parsed.completedLearningIds
        : [],
      completedProjectIds: Array.isArray(parsed.completedProjectIds)
        ? parsed.completedProjectIds
        : [],
      completedSoftSkillIds: Array.isArray(parsed.completedSoftSkillIds)
        ? parsed.completedSoftSkillIds
        : [],
      completedGitStepIds: Array.isArray(parsed.completedGitStepIds)
        ? parsed.completedGitStepIds
        : [],
      assessmentHistory: Array.isArray(parsed.assessmentHistory)
        ? parsed.assessmentHistory
        : [],
      theme: 'light',
      motionMode: parsed.motionMode === 'reduced' || parsed.motionMode === 'off'
        ? parsed.motionMode
        : 'full',
    };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveProfileToStorage(profile: StudentProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile:', e);
  }
}

export function getRoleById(roleId: string | null): CareerRole | null {
  if (!roleId) return null;
  return CAREER_ROLES.find((r) => r.id === roleId) || null;
}

export function getSkillById(skillId: string): CareerCompetency | null {
  return ALL_SKILLS.find((s) => s.id === skillId) || null;
}

// Calculate readiness strictly from documented role competencies
export function calculateReadiness(
  targetRole: CareerRole | null,
  assessments: Record<string, number>
): CalculatedReadiness | null {
  if (!targetRole) return null;

  const competencies = targetRole.documentedCompetencies;
  if (!competencies || competencies.length === 0) return null;

  // Check if at least one competency has been assessed
  const assessedAnySkill = competencies.some(
    (c) => assessments[c.id] !== undefined && assessments[c.id] > 0
  );
  if (!assessedAnySkill) {
    return null; // Truly unassessed
  }

  let pointsEarned = 0;
  let totalPossiblePoints = 0;
  let assessedCount = 0;

  for (const comp of competencies) {
    // Weight points based on documented importance
    const weight = comp.importance === 'Core' ? 1.0 : comp.importance === 'Important' ? 0.8 : 0.6;
    const targetMaxPoints = 5 * weight;
    totalPossiblePoints += targetMaxPoints;

    const currentLevel = assessments[comp.id] || 0;
    if (currentLevel > 0) {
      assessedCount++;
    }
    pointsEarned += Math.min(currentLevel, 5) * weight;
  }

  if (totalPossiblePoints === 0) return null;

  const percentage = Math.round((pointsEarned / totalPossiblePoints) * 100);

  return {
    percentage,
    assessedCount,
    totalRequiredCount: competencies.length,
    pointsEarned: Math.round(pointsEarned * 10) / 10,
    totalPossiblePoints: Math.round(totalPossiblePoints * 10) / 10,
  };
}

// Gap analysis based on relationship between documented importance and student confidence
export function calculateSkillGaps(
  targetRole: CareerRole | null,
  assessments: Record<string, number>
): SkillGapItem[] {
  if (!targetRole) return [];

  const competencies = targetRole.documentedCompetencies;
  if (!competencies || competencies.length === 0) return [];

  const hasAssessed = competencies.some(
    (c) => assessments[c.id] !== undefined && assessments[c.id] > 0
  );
  if (!hasAssessed) return [];

  const gaps: SkillGapItem[] = [];

  for (const comp of competencies) {
    const currentLevel = assessments[comp.id] || 0;
    const currentStage = UNIVERSAL_STAGES[currentLevel as 0 | 1 | 2 | 3 | 4 | 5] || UNIVERSAL_STAGES[0];

    // Explicit application logic rule:
    // Core competency + (Not Started / Familiar / Guided) => CRITICAL_FOCUS
    // Core/Important competency + (Guided / Independent) => DEVELOP
    // Applied / Advanced => STRONG
    let gapCategory: GapCategory = 'DEVELOP';
    let severity: SkillGapItem['severity'] = 'Medium Gap';
    let rationale = 'Familiar with concepts, but additional applied practice will strengthen this competency.';

    if (currentLevel >= 4) {
      gapCategory = 'STRONG';
      severity = 'On Track';
      rationale = 'You already demonstrate applied confidence and independence in this competency.';
    } else if (comp.importance === 'Core' && currentLevel <= 2) {
      gapCategory = 'CRITICAL_FOCUS';
      severity = 'Large Gap';
      rationale = 'Core requirement for this role, but you currently have limited practical experience.';
    } else if (currentLevel <= 1) {
      gapCategory = 'CRITICAL_FOCUS';
      severity = 'Large Gap';
      rationale = 'Important competency where beginner or no prior experience was indicated.';
    } else if (currentLevel === 3) {
      gapCategory = 'DEVELOP';
      severity = 'Small Gap';
      rationale = 'Independent in solving basic tasks; focus next on production edge cases and optimization.';
    }

    // Only surface gaps if not fully strong
    if (gapCategory !== 'STRONG') {
      gaps.push({
        skill: comp,
        currentLevel,
        currentStageLabel: currentStage.label,
        importance: comp.importance,
        classification: comp.classification,
        gapCategory,
        severity,
        whyItMatters: comp.whyItMatters,
        rationale,
      });
    }
  }

  // Sort: Critical Focus first, then Role Specific, then Core Importance
  gaps.sort((a, b) => {
    const categoryWeight = { CRITICAL_FOCUS: 3, DEVELOP: 2, STRONG: 1 };
    if (categoryWeight[b.gapCategory] !== categoryWeight[a.gapCategory]) {
      return categoryWeight[b.gapCategory] - categoryWeight[a.gapCategory];
    }
    const classWeight = { ROLE_SPECIFIC: 3, FOUNDATIONAL: 2, SPECIALIZED: 2, SUPPORTING: 1 };
    if (classWeight[b.classification] !== classWeight[a.classification]) {
      return classWeight[b.classification] - classWeight[a.classification];
    }
    return a.currentLevel - b.currentLevel;
  });

  return gaps;
}

// Strongest assessed competencies
export function calculateStrongestSkills(
  targetRole: CareerRole | null,
  assessments: Record<string, number>
): StrongestSkillItem[] {
  const items: StrongestSkillItem[] = [];

  const competenciesToEvaluate = targetRole
    ? targetRole.documentedCompetencies
    : ALL_SKILLS;

  for (const comp of competenciesToEvaluate) {
    const level = assessments[comp.id] || 0;
    if (level <= 0) continue;

    const stage = UNIVERSAL_STAGES[level as 0 | 1 | 2 | 3 | 4 | 5] || UNIVERSAL_STAGES[0];
    const isRequired = targetRole
      ? targetRole.documentedCompetencies.some((c) => c.id === comp.id)
      : false;

    items.push({
      skill: comp,
      currentLevel: level,
      currentStageLabel: stage.label,
      isRequiredForRole: isRequired,
      classification: comp.classification,
    });
  }

  // Sort strictly by confidence level descending, then role-specific priority
  items.sort((a, b) => {
    if (b.currentLevel !== a.currentLevel) {
      return b.currentLevel - a.currentLevel;
    }
    if (a.classification === 'ROLE_SPECIFIC' && b.classification !== 'ROLE_SPECIFIC') {
      return -1;
    }
    if (b.classification === 'ROLE_SPECIFIC' && a.classification !== 'ROLE_SPECIFIC') {
      return 1;
    }
    return a.skill.name.localeCompare(b.skill.name);
  });

  return items;
}

// Traceable next steps derived 100% from role competencies & gaps
export function calculateNextSteps(
  targetRole: CareerRole | null,
  assessments: Record<string, number>
): NextStepItem[] {
  if (!targetRole) return [];

  const gaps = calculateSkillGaps(targetRole, assessments);
  if (gaps.length === 0) return [];

  const nextSteps: NextStepItem[] = [];
  let count = 1;

  for (const gap of gaps) {
    let priorityCategory: NextStepItem['priorityCategory'] = 'Medium Priority';
    let recommendedFocus = 'Follow practical documentation exercises to build independent capability.';

    if (gap.gapCategory === 'CRITICAL_FOCUS') {
      priorityCategory = 'High Priority';
      recommendedFocus = gap.currentLevel === 0
        ? 'Begin with introductory documentation, guided examples, and foundational syntax exercises.'
        : 'Work through structured tutorials to transition from guided replication to independent implementation.';
    } else if (gap.currentLevel >= 3) {
      priorityCategory = 'Later';
      recommendedFocus = 'Deepen knowledge with real-world edge cases, debugging, and production optimization patterns.';
    }

    nextSteps.push({
      priorityNumber: count++,
      priorityCategory,
      skill: gap.skill,
      currentLevel: gap.currentLevel,
      currentStageLabel: gap.currentStageLabel,
      importance: gap.importance,
      classification: gap.classification,
      gapCategory: gap.gapCategory,
      whyItMatters: gap.whyItMatters,
      recommendedFocus,
      resourceTitle: gap.skill.authenticResource.title,
      resourceProvider: gap.skill.authenticResource.provider,
      resourceUrl: gap.skill.authenticResource.url,
      resourceType: gap.skill.authenticResource.type,
    });
  }

  return nextSteps;
}

// Traceable Learning Roadmap sections separating Role-Specific vs Foundational
export function calculateRoadmapSections(
  targetRole: CareerRole | null,
  assessments: Record<string, number>,
  completedLearningIds: string[]
): {
  roleSpecificItems: RoadmapItem[];
  foundationalItems: RoadmapItem[];
  allRequirements: RoadmapItem[];
} {
  if (!targetRole) {
    return { roleSpecificItems: [], foundationalItems: [], allRequirements: [] };
  }

  const roleSpecificItems: RoadmapItem[] = [];
  const foundationalItems: RoadmapItem[] = [];
  const allRequirements: RoadmapItem[] = [];

  for (const comp of targetRole.documentedCompetencies) {
    const currentLevel = assessments[comp.id] || 0;
    const currentStage = UNIVERSAL_STAGES[currentLevel as 0 | 1 | 2 | 3 | 4 | 5] || UNIVERSAL_STAGES[0];
    const isCompleted = completedLearningIds.includes(comp.id);

    let status: RoadmapItem['status'] = 'NOT ASSESSED';
    let recommendedFocus = 'Review curriculum and complete initial hands-on exercise.';

    if (currentLevel === 0) {
      status = 'NOT ASSESSED';
      recommendedFocus = 'Start with foundational concepts and walkthrough exercises.';
    } else if (currentLevel >= 4) {
      status = 'STRONG';
      recommendedFocus = 'Master advanced production edge cases and system resilience.';
    } else if (comp.importance === 'Core' && currentLevel <= 2) {
      status = 'CRITICAL FOCUS';
      recommendedFocus = 'High priority role requirement: prioritize hands-on practice.';
    } else {
      status = 'DEVELOP';
      recommendedFocus = 'Strengthen independent execution and debug non-trivial scenarios.';
    }

    const item: RoadmapItem = {
      skill: comp,
      classification: comp.classification,
      importance: comp.importance,
      currentLevel,
      currentStageLabel: currentStage.label,
      status,
      isCompleted,
      whyItMatters: comp.whyItMatters,
      recommendedFocus,
      resource: comp.authenticResource,
    };

    allRequirements.push(item);
    if (comp.classification === 'ROLE_SPECIFIC') {
      roleSpecificItems.push(item);
    } else {
      foundationalItems.push(item);
    }
  }

  return { roleSpecificItems, foundationalItems, allRequirements };
}

export function recordProgressSnapshot(
  profile: StudentProfile,
  readinessPercentage: number
): StudentProgressHistory[] {
  const targetRole = getRoleById(profile.targetRoleId);
  if (!targetRole) return profile.assessmentHistory || [];

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const assessedCount = targetRole.documentedCompetencies.filter(
    (c) => profile.skillAssessments[c.id] !== undefined && profile.skillAssessments[c.id] > 0
  ).length;

  const newSnapshot: StudentProgressHistory = {
    date: dateStr,
    readinessPercentage,
    assessedSkillsCount: assessedCount,
    targetRoleTitle: targetRole.title,
  };

  const existing = [...(profile.assessmentHistory || [])];
  if (existing.length > 0 && existing[existing.length - 1].date === dateStr) {
    existing[existing.length - 1] = newSnapshot;
    return existing;
  }

  existing.push(newSnapshot);
  return existing.slice(-10);
}
