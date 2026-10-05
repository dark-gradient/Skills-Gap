export type SkillCategory =
  | 'Foundations'
  | 'Machine Learning'
  | 'Generative AI & NLP'
  | 'Systems & Deployment'
  | 'Agentic Workflows'
  | 'Vision & Multimodal'
  | 'Data & Analytics';

export type CompetencyClassification =
  | 'ROLE_SPECIFIC'
  | 'FOUNDATIONAL'
  | 'SPECIALIZED'
  | 'SUPPORTING';

export type CompetencyImportance = 'Core' | 'Important' | 'Supporting';

export type ConfidenceLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type EvidenceLevel =
  | 'BUILT_SOMETHING'
  | 'USED_IN_PROJECT'
  | 'USED_PROFESSIONALLY'
  | 'NO_EVIDENCE_YET';

export interface CompetencyEvidence {
  level: EvidenceLevel;
  note?: string;
}

export type GapCategory = 'CRITICAL_FOCUS' | 'DEVELOP' | 'STRONG';

export type ResourceDifficulty =
  | 'FOUNDATION'
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'PRODUCTION'
  | 'INTERVIEW';

export type ResourceSourceType =
  | 'RESEARCH'
  | 'VERIFIED_EXTERNAL'
  | 'SKILLGAP_CREATED';

export interface LearningResource {
  id?: string;
  title: string;
  provider: string;
  url: string;
  type: 'Course' | 'Interactive' | 'Guide' | 'Documentation' | 'Video Series';
  description: string;
  cost: 'Free';
  difficulty?: ResourceDifficulty;
  sourceType?: ResourceSourceType;
  targetSkills?: string[];
  whyThisResource?: string;
  whatYouWillLearn?: string[];
  whatToDoAfter?: string;
  relatedProject?: string;
}

export type ProjectDifficulty =
  | 'Foundation'
  | 'Application'
  | 'Role-Specific'
  | 'Capstone';

export interface SkillGapProject {
  id: string;
  name: string;
  roleId: string;
  difficulty: ProjectDifficulty;
  whyYoureBuildingIt: string;
  skillsDemonstrated: string[];
  prerequisites: string[];
  expectedOutput: string;
  portfolioEvidence: {
    githubRepo: boolean;
    readmeStructure: string;
    architectureDiagram?: string;
    demoDescription: string;
  };
  interviewTalkingPoints: string[];
  sourceClassification: 'SKILLGAP PROJECT';
}

export type SoftSkillCategory =
  | 'ALL'
  | 'PRESENTATION'
  | 'PUBLIC SPEAKING'
  | 'COMMUNICATION'
  | 'INTERVIEW PREPARATION'
  | 'BEHAVIORAL INTERVIEWS'
  | 'TECHNICAL INTERVIEWS'
  | 'SELF INTRODUCTION'
  | 'NETWORKING'
  | 'WORKPLACE COMMUNICATION'
  | 'LEADERSHIP'
  | 'PROFESSIONAL CONFIDENCE'
  | 'LOGICAL COMMUNICATION';

export interface SoftSkillVideo {
  id: string;
  title: string;
  youtubeId: string;
  provider: string; // channel or creator
  creator: string;
  language: 'en' | 'ja';
  category: SoftSkillCategory;
  difficulty?: 'FOUNDATION' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  skillTags?: string[];
  sourceDate?: string;
  whyItMatters: string;
  practicePrompt: string;
  talkingPointFocus: string;
}

export interface GitStep {
  id: number;
  title: string;
  description: string;
  action: string;
}

export interface CareerCompetency {
  id: string;
  name: string;
  category: SkillCategory;
  classification: CompetencyClassification;
  importance: CompetencyImportance;
  description: string;
  whyItMatters: string;
  concretePrompts?: {
    familiar: string;
    guided: string;
    independent: string;
    applied: string;
    advanced: string;
  };
  authenticResource: LearningResource;
}

// Alias Skill to CareerCompetency for full system compatibility
export type Skill = CareerCompetency;

export interface IndiaSalaryBands {
  fresher: string;
  midLevel: string;
  senior: string;
  premiumCeiling: string;
}

export interface JapanSalaryBands {
  entry: string;
  mid: string;
  senior: string;
  topTech: string;
}

export interface WorkCycleInfo {
  hasDocumentedCycle: boolean;
  title: string; // e.g. "Documented Work Cycle in Research" or "Work Focus"
  summary: string;
  stepsOrFocus: string[];
}

export interface SoftSkillsContext {
  stakeholderManagement?: string;
  explainingProbabilisticAI?: string;
  communication?: string;
  securityAwareness?: string;
  threatModeling?: string;
  apiSecurity?: string;
  dataPrivacyAndResidency?: string;
  productIntuition?: string;
  [key: string]: string | undefined;
}

export interface CareerProfile {
  id: string;
  title: string;
  categoryLabel: string;
  primaryDomain: string;
  colorAccent: string; // 'blue' | 'purple' | 'cyan' | 'coral' | 'yellow' | 'green' | 'indigo' | 'teal'
  shortSummary: string;
  whatThisRoleIs: string;
  atAGlance: {
    whatItDoes: string;
    whatItWorksWith: string[];
    ecosystemPosition: string;
    keyFocusAreas: string[];
  };
  responsibilities: string[]; // Source-supported "What You'll Work On"
  whatYouWillWorkOn: string[]; // Backward-compatible alias
  workCycle: WorkCycleInfo;
  dayToDayWork: string; // Summary string
  documentedCompetencies: CareerCompetency[];
  documentedTechnologies: string[];
  coreSkills: string[]; // Skill names list
  whatEmployersExpect: string[];
  careerEnvironment: {
    workplaces: string[]; // e.g. "Startup", "Enterprise", "Research Lab"
    characteristics: string[];
    summary: string;
  };
  softSkills: SoftSkillsContext;
  indiaContext: {
    tagline: string; // "FAST-PACED / SCALE / OWNERSHIP"
    marketEcosystem: string;
    industryAdoption: string;
    compensation: IndiaSalaryBands | null;
  };
  japanContext: {
    tagline: string; // "PRECISION / CONSENSUS / STRUCTURE"
    marketEcosystem: string;
    culturalConcepts: {
      nemawashi: string;
      ringi: string;
      languageAndForeignTalent: string;
    };
    compensation: JapanSalaryBands | null;
  };
  // Backward compatibility fields
  indiaCompensation: IndiaSalaryBands | null;
  japanCompensation: JapanSalaryBands | null;
  marketContext: {
    indiaEcosystem: string;
    japanEcosystem: string;
  };
  whyThisRoleMatters: string;
  isThisCareerForYou: string[]; // Reflective prompts
  freeLearningResources: LearningResource[];
  requiredSkills: Record<string, number>; // competencyId -> benchmark score (1..5)
}

// CareerRole is alias to CareerProfile
export type CareerRole = CareerProfile;

export interface StudentProgressHistory {
  date: string;
  readinessPercentage: number;
  assessedSkillsCount: number;
  targetRoleTitle: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  college?: string;
  degree?: string;
  yearOfStudy?: string;
  createdAt: string;
}

export interface ClassroomMember {
  userId: string;
  displayName: string;
  targetRoleTitle?: string;
  preparationScore: number; // 0..100
  completedProjectsCount: number;
  completedMilestonesCount: number;
  joinedAt: string;
}

export interface ClassroomTimelineStage {
  id: string;
  title: string;
  description: string;
  targetWeek: number;
}

export interface Classroom {
  id: string;
  code: string; // e.g. "SKG-7K4P2"
  name: string;
  instructorName: string;
  courseName?: string;
  batchSection?: string;
  ownerId: string;
  targetDate?: string;
  startDate?: string;
  createdAt: string;
  members: ClassroomMember[];
  timelineStages?: ClassroomTimelineStage[];
}

export type TimelinePaceHours = '2-4' | '5-7' | '8-12' | '12+';

export type PaceStatus = 'ON_TRACK' | 'A_LITTLE_BEHIND' | 'REBALANCED' | 'COMPLETED';

export interface WeeklyTimelineNode {
  weekNumber: number;
  title: string;
  focus: string;
  outcomes: string[];
  milestoneType:
    | 'FOUNDATION'
    | 'CORE_SKILLS'
    | 'PROJECT_1'
    | 'APPLIED_SKILLS'
    | 'PROJECT_2'
    | 'PORTFOLIO'
    | 'INTERVIEW_PREP'
    | 'CAPSTONE';
  isCompleted: boolean;
  isCurrentWeek?: boolean;
}

export interface PersonalTimeline {
  hoursPerWeek: TimelinePaceHours;
  hasDeadline: boolean;
  targetDate?: string;
  paceStatus: PaceStatus;
  weeklyPlan: WeeklyTimelineNode[];
  createdAt: string;
  lastRebalancedAt?: string;
}

export interface StudentProfile {
  userId?: string;
  studentName: string;
  email?: string;
  college?: string;
  degree?: string;
  yearOfStudy?: string;
  targetRoleId: string | null;
  skillAssessments: Record<string, number>; // competencyId -> ConfidenceLevel (0..5)
  skillEvidence?: Record<string, CompetencyEvidence>; // competencyId -> Evidence
  completedLearningIds: string[]; // competencyId
  completedProjectIds?: string[]; // projectId
  completedSoftSkillIds?: string[]; // videoId
  completedGitStepIds?: number[]; // stepId
  classroomIds?: string[]; // joined classroom IDs
  timeline?: PersonalTimeline;
  assessmentHistory: StudentProgressHistory[];
  theme: 'light' | 'dark';
  motionMode: 'full' | 'reduced' | 'off';
  lastUpdated?: string;
}

export type NavigationTab =
  | 'home'
  | 'career'
  | 'skills'
  | 'learning'
  | 'timeline'
  | 'classroom'
  | 'soft_skills'
  | 'progress'
  | 'insights';
