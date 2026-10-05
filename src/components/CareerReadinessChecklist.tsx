import React from 'react';
import { CareerRole } from '../types/career';
import { getProjectsForRole, VERIFIED_SOFT_SKILL_VIDEOS, GIT_FIRST_PROJECT_CHECKLIST } from '../data/learningProjectsData';
import {
  CheckCircle2,
  Circle,
  ShieldCheck,
  Award,
  BookOpen,
  Code,
  FolderGit2,
  MessageSquare,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface CareerReadinessChecklistProps {
  targetRole: CareerRole;
  assessments: Record<string, number>;
  completedProjectIds?: string[];
  completedSoftSkillIds?: string[];
  completedGitStepIds?: number[];
  onNavigateToTab?: (tab: 'skills' | 'learning') => void;
}

interface ChecklistCategory {
  id: string;
  name: string;
  description: string;
  completedCount: number;
  totalCount: number;
  items: {
    label: string;
    isDone: boolean;
    hint: string;
  }[];
}

export const CareerReadinessChecklist: React.FC<CareerReadinessChecklistProps> = ({
  targetRole,
  assessments,
  completedProjectIds = [],
  completedSoftSkillIds = [],
  completedGitStepIds = [],
}) => {
  const roleCompetencies = targetRole.documentedCompetencies;
  const coreCompetencies = roleCompetencies.filter((c) => c.importance === 'Core');
  const roleProjects = getProjectsForRole(targetRole.id);

  // Real calculations based on actual student actions
  const technicalCompetenciesAssessed = roleCompetencies.filter(
    (c) => (assessments[c.id] || 0) >= 3
  ).length;

  const coreCompetenciesAssessed = coreCompetencies.filter(
    (c) => (assessments[c.id] || 0) >= 3
  ).length;

  const hasAssessedAtLeastHalf =
    roleCompetencies.length > 0 &&
    roleCompetencies.filter((c) => (assessments[c.id] || 0) > 0).length >= Math.ceil(roleCompetencies.length / 2);

  // 1. Technical Skills Category
  const technicalCategory: ChecklistCategory = {
    id: 'tech_skills',
    name: 'Technical Competencies',
    description: 'Demonstrated independent capability (Level 3+) in role competencies.',
    completedCount: technicalCompetenciesAssessed,
    totalCount: roleCompetencies.length,
    items: [
      {
        label: `Core competencies at Level 3+ (${coreCompetenciesAssessed}/${coreCompetencies.length})`,
        isDone: coreCompetenciesAssessed >= Math.max(1, Math.floor(coreCompetencies.length * 0.7)),
        hint: 'Evaluate your core competencies in My Skills.',
      },
      {
        label: `Assessed at least 50% of documented role skills`,
        isDone: hasAssessedAtLeastHalf,
        hint: 'Complete your initial baseline assessment across role competencies.',
      },
      {
        label: `At least one advanced competency (Level 4 or 5)`,
        isDone: roleCompetencies.some((c) => (assessments[c.id] || 0) >= 4),
        hint: 'Deepen one specialization to applied or advanced level.',
      },
    ],
  };

  // 2. Practical Projects Category
  const projectsDoneCount = roleProjects.filter((p) => completedProjectIds.includes(p.id)).length;
  const projectsCategory: ChecklistCategory = {
    id: 'projects',
    name: 'Practical Projects',
    description: 'Hands-on project artifacts built specifically for your chosen career.',
    completedCount: projectsDoneCount,
    totalCount: roleProjects.length,
    items: roleProjects.map((p) => ({
      label: `${p.difficulty}: ${p.name}`,
      isDone: completedProjectIds.includes(p.id),
      hint: `Build this practical ${p.difficulty.toLowerCase()} assignment.`,
    })),
  };

  // 3. GitHub & Documentation Category
  const gitStepsDoneCount = completedGitStepIds.length;
  const hasRepoStep = completedGitStepIds.includes(1);
  const hasReadmeStep = completedGitStepIds.includes(2) && completedGitStepIds.includes(7);
  const hasPublishedStep = completedGitStepIds.includes(8);

  const gitCategory: ChecklistCategory = {
    id: 'github_portfolio',
    name: 'GitHub & Documentation',
    description: 'Public version control workflows, README documentation, and reproducible code.',
    completedCount: Math.min(3, (hasRepoStep ? 1 : 0) + (hasReadmeStep ? 1 : 0) + (hasPublishedStep ? 1 : 0)),
    totalCount: 3,
    items: [
      {
        label: 'Public GitHub repository with modular code structure',
        isDone: hasRepoStep,
        hint: 'Complete Step 1 of the Universal Git Track.',
      },
      {
        label: 'Comprehensive README with problem statement & instructions',
        isDone: hasReadmeStep,
        hint: 'Complete Steps 2 & 7 of the Universal Git Track.',
      },
      {
        label: 'Published portfolio-ready repository pinned on GitHub profile',
        isDone: hasPublishedStep,
        hint: 'Complete Step 8 of the Universal Git Track.',
      },
    ],
  };

  // 4. Communication & Soft Skills Category
  const softSkillsDoneCount = completedSoftSkillIds.length;
  const softCategory: ChecklistCategory = {
    id: 'soft_skills',
    name: 'Communication & Interview Readiness',
    description: 'Presenting technical work, articulating trade-offs, and behavioral interviewing.',
    completedCount: softSkillsDoneCount,
    totalCount: VERIFIED_SOFT_SKILL_VIDEOS.length,
    items: VERIFIED_SOFT_SKILL_VIDEOS.map((v) => ({
      label: `${v.category}: ${v.title}`,
      isDone: completedSoftSkillIds.includes(v.id),
      hint: `Watch video and complete practice prompt: "${v.practicePrompt}"`,
    })),
  };

  const categories = [technicalCategory, projectsCategory, gitCategory, softCategory];
  const totalCompletedItems = categories.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.isDone).length,
    0
  );
  const totalPossibleItems = categories.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
      {/* Top Heading */}
      <div className="border-b border-[#DCE8F5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#42C98A] bg-[#EBFBF3] px-2.5 py-0.5 rounded-md border border-[#42C98A]/20">
              REAL USER PREPARATION TRACKER
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-[#172B4D] mt-1">
            CAREER READINESS CHECKLIST
          </h2>
          <p className="text-xs text-[#687A93] font-medium mt-0.5">
            Your preparation across technical competencies, hands-on projects, portfolio evidence, and interview readiness.
          </p>
        </div>

        <div className="p-3 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl text-right shrink-0">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#687A93] block">
            Your Preparation
          </span>
          <span className="text-base sm:text-lg font-black text-[#172B4D]">
            {totalCompletedItems} of {totalPossibleItems} Milestones
          </span>
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => {
          const completedInCat = cat.items.filter((i) => i.isDone).length;
          const percent = Math.round((completedInCat / cat.items.length) * 100);

          return (
            <div
              key={cat.id}
              className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs sm:text-sm font-black text-[#172B4D]">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] font-mono font-bold text-[#347DD9]">
                    {completedInCat} / {cat.items.length}
                  </span>
                </div>

                <p className="text-[11px] text-[#687A93] font-medium mb-3">
                  {cat.description}
                </p>

                {/* Micro Progress Bar */}
                <div className="w-full h-1.5 bg-[#EAF4FF] rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-[#4D9FFF] transition-all duration-300 rounded-full"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Milestone Items */}
                <div className="space-y-2">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-xs transition-colors ${
                        item.isDone
                          ? 'bg-[#EBFBF3] border-[#42C98A]/30 text-[#172B4D]'
                          : 'bg-white border-[#DCE8F5] text-[#687A93]'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {item.isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-[#42C98A]" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#DCE8F5]" />
                        )}
                      </div>

                      <div className="space-y-0.5">
                        <span className={`font-bold block ${item.isDone ? 'text-[#172B4D]' : 'text-[#687A93]'}`}>
                          {item.label}
                        </span>
                        {!item.isDone && (
                          <span className="text-[10px] text-[#74766F] block leading-tight">
                            {item.hint}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl text-[11px] text-[#687A93] font-medium text-center">
        SkillGap does not provide guaranteed employment claims. These preparation milestones reflect proven practical indicators evaluated by industry engineering hiring teams.
      </div>
    </div>
  );
};
