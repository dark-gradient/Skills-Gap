import React, { useState } from 'react';
import {
  CareerRole,
  CareerCompetency,
  CompetencyEvidence,
  ResourceDifficulty,
} from '../types/career';
import {
  calculateNextSteps,
  calculateSkillGaps,
  calculateRoadmapSections,
} from '../services/careerCalculations';
import {
  getProjectsForRole,
  getExperienceAwareResources,
  EXPERIENCED_RESOURCES_CATALOG,
} from '../data/learningProjectsData';
import { STAGE_DEFINITIONS } from './SkillLevelSelector';
import { SkillDetailModal } from './SkillDetailModal';
import { SoftSkillsSection } from './SoftSkillsSection';
import { GitTrackSection } from './GitTrackSection';
import { CareerReadinessChecklist } from './CareerReadinessChecklist';
import {
  ExternalLink,
  BookOpen,
  ArrowRight,
  Compass,
  Check,
  FolderGit2,
  Play,
  Layers,
  Sparkles,
  ChevronRight,
  Filter,
  CheckCircle2,
  Hammer,
  ShieldCheck,
  Lightbulb,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LearningPageProps {
  targetRole: CareerRole | null;
  assessments: Record<string, number>;
  evidence?: Record<string, CompetencyEvidence>;
  completedLearningIds: string[];
  completedProjectIds?: string[];
  completedSoftSkillIds?: string[];
  completedGitStepIds?: number[];
  onToggleLearningCompleted: (skillId: string) => void;
  onToggleProjectCompleted?: (projectId: string) => void;
  onToggleSoftSkillCompleted?: (videoId: string) => void;
  onToggleGitStepCompleted?: (stepId: number) => void;
  onUpdateSkill?: (skillId: string, level: number) => void;
  onUpdateEvidence?: (skillId: string, evidence: CompetencyEvidence) => void;
  onNavigateToCareers: () => void;
}

type LearningTabFilter =
  | 'all'
  | 'role_skills'
  | 'projects'
  | 'resources'
  | 'git_track'
  | 'soft_skills'
  | 'checklist';

export const LearningPage: React.FC<LearningPageProps> = ({
  targetRole,
  assessments,
  evidence = {},
  completedLearningIds,
  completedProjectIds = [],
  completedSoftSkillIds = [],
  completedGitStepIds = [],
  onToggleLearningCompleted,
  onToggleProjectCompleted,
  onToggleSoftSkillCompleted,
  onToggleGitStepCompleted,
  onUpdateSkill,
  onUpdateEvidence,
  onNavigateToCareers,
}) => {
  const [activeTabFilter, setActiveTabFilter] = useState<LearningTabFilter>('all');
  const [selectedCompetencyForModal, setSelectedCompetencyForModal] = useState<CareerCompetency | null>(null);
  const [resourceDifficultyFilter, setResourceDifficultyFilter] = useState<'ALL' | ResourceDifficulty>('ALL');

  // If no career has been chosen yet by student
  if (!targetRole) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
        <div className="p-8 sm:p-14 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl text-center shadow-[0_4px_24px_rgba(23,43,77,0.04)]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#8B7CFF] text-white flex items-center justify-center mx-auto mb-5 shadow-[0_4px_16px_rgba(77,159,255,0.25)]">
            <Compass className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] mb-3">
            Choose a Career Goal to Generate Your Learning Path
          </h2>

          <p className="text-xs sm:text-sm text-[#687A93] max-w-lg mx-auto mb-8 leading-relaxed font-medium">
            SkillGap learning paths are project-first and strictly tailored to the specific competencies documented for your target role. Select a career to begin.
          </p>

          <button
            onClick={onNavigateToCareers}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
          >
            <span>Explore Career Paths</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const { roleSpecificItems, foundationalItems, allRequirements } = calculateRoadmapSections(
    targetRole,
    assessments,
    completedLearningIds
  );

  const nextSteps = calculateNextSteps(targetRole, assessments);
  const skillGaps = calculateSkillGaps(targetRole, assessments);
  const roleProjects = getProjectsForRole(targetRole.id);

  const hasAssessedAny = allRequirements.some((r) => r.currentLevel > 0);
  const topNextStep = nextSteps[0] || null;

  // Next Best Step Project & Resources
  const topStepLevel = topNextStep ? topNextStep.currentLevel : 0;
  const topStepResources = topNextStep
    ? getExperienceAwareResources(topNextStep.skill.id, topStepLevel).slice(0, 2)
    : [];
  const topStepProject =
    roleProjects.find((p) =>
      topNextStep
        ? p.skillsDemonstrated.some(
            (s) =>
              s.toLowerCase().includes(topNextStep.skill.name.toLowerCase()) ||
              topNextStep.skill.name.toLowerCase().includes(s.toLowerCase())
          )
        : false
    ) || roleProjects[0];

  // Experience-aware learning resources for this role
  const roleSkillIds = targetRole.documentedCompetencies.map((c) => c.id);
  const allRoleResources = EXPERIENCED_RESOURCES_CATALOG.filter((res) =>
    res.targetSkills?.some((s) => roleSkillIds.includes(s))
  );

  const filteredResources = allRoleResources.filter((res) => {
    if (resourceDifficultyFilter !== 'ALL' && res.difficulty !== resourceDifficultyFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* 1. Header: WHAT SHOULD I LEARN? */}
      <div className="border-b border-[#DCE8F5] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] block mb-1">
            CAREER PREPARATION PATHWAY · {targetRole.title.toUpperCase()}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
            WHAT SHOULD I LEARN?
          </h1>
          <p className="text-xs sm:text-sm text-[#687A93] mt-1 font-medium leading-relaxed">
            A project-first, experience-aware career preparation pathway built around your verified competencies.
          </p>
        </div>
      </div>

      {/* 2. Instructional Block (Replaces redundant redirect button) */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#EAF4FF] via-white to-[#F6FAFF] border border-[#4D9FFF]/30 rounded-2xl flex items-start gap-3.5 shadow-2xs">
        <div className="w-8 h-8 rounded-xl bg-[#4D9FFF] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Lightbulb className="w-4 h-4" />
        </div>
        <div className="space-y-0.5 text-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#347DD9] block">
            BEFORE YOU START
          </span>
          <p className="text-[#172B4D] font-bold">
            Rate your current experience with the skills below. Your answers help us choose the right learning path for you.
          </p>
          <p className="text-[#687A93] font-medium text-[11px] leading-relaxed">
            Click any role skill card to view its learning path, practical projects, experience-aware resources, and interview preparation.
          </p>
        </div>
      </div>

      {/* 3. Section: YOUR NEXT BEST STEP (Prioritized Action) */}
      {topNextStep && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-5">
          <div className="border-b border-[#DCE8F5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8A72] block mb-0.5">
                RECOMMENDED PRIORITY FOCUS
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#172B4D]">
                YOUR NEXT BEST STEP
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#687A93]">Current Capability:</span>
              <span className="text-xs font-bold text-[#172B4D] bg-[#F6FAFF] border border-[#DCE8F5] px-2.5 py-0.5 rounded-lg">
                Level {topNextStep.currentLevel}: {topNextStep.currentStageLabel}
              </span>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-[#F6FAFF] via-white to-[#EAF4FF] border border-[#4D9FFF]/30 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-[#4D9FFF]">
                  Top Priority Skill:
                </span>
                <h3 className="text-lg font-black text-[#172B4D]">
                  {topNextStep.skill.name}
                </h3>
                <p className="text-xs text-[#172B4D] font-medium mt-1 max-w-3xl leading-relaxed">
                  <strong className="text-[#347DD9]">Recommended Focus: </strong>
                  {topNextStep.recommendedFocus}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCompetencyForModal(topNextStep.skill)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 self-start sm:self-center"
              >
                <span>Explore Skill Detail</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Pillars Grid: Learn, Build, Document, Interview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
              {/* 1. Learn */}
              <div className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase text-[#4D9FFF] block">
                  1. Study (Experience-Aware)
                </span>
                <p className="font-bold text-[#172B4D] line-clamp-1">
                  {topStepResources[0]?.title || topNextStep.resourceTitle}
                </p>
                <a
                  href={topStepResources[0]?.url || topNextStep.resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-[#4D9FFF] hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* 2. Build */}
              <div className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase text-[#347DD9] block">
                  2. Practical Project
                </span>
                <p className="font-bold text-[#172B4D] line-clamp-1">
                  {topStepProject?.name || 'Practical Implementation'}
                </p>
                <span className="text-[11px] text-[#687A93] block">
                  Build and test independent code.
                </span>
              </div>

              {/* 3. Document */}
              <div className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase text-[#8B7CFF] block">
                  3. Portfolio Action
                </span>
                <p className="font-bold text-[#172B4D] line-clamp-1">
                  GitHub README & Code
                </p>
                <span className="text-[11px] text-[#687A93] block">
                  Push modular commits with instructions.
                </span>
              </div>

              {/* 4. Interview */}
              <div className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase text-[#42C98A] block">
                  4. Interview Talking Point
                </span>
                <p className="font-bold text-[#172B4D] line-clamp-1">
                  Explain Design Trade-offs
                </p>
                <span className="text-[11px] text-[#687A93] block">
                  Be ready to defend architecture decisions.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Navigation Filter Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white/80 backdrop-blur-md border border-[#DCE8F5] rounded-2xl text-xs font-bold overflow-x-auto shadow-2xs">
        <button
          type="button"
          onClick={() => setActiveTabFilter('all')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTabFilter === 'all'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          All Pathway
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('role_skills')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTabFilter === 'role_skills'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          <span>Role Skills & Gaps</span>
          <span className="px-1.5 py-0.2 rounded-md bg-black/10 text-[10px]">
            {allRequirements.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('projects')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeTabFilter === 'projects'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          <span>Practical Projects</span>
          <span className="px-1.5 py-0.2 rounded-md bg-black/10 text-[10px]">
            {roleProjects.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('resources')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTabFilter === 'resources'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          Experience-Aware Resources
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('git_track')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTabFilter === 'git_track'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          Git & GitHub Track
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('soft_skills')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTabFilter === 'soft_skills'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          Soft Skills & Interview Videos
        </button>

        <button
          type="button"
          onClick={() => setActiveTabFilter('checklist')}
          className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
            activeTabFilter === 'checklist'
              ? 'bg-[#4D9FFF] text-white shadow-xs'
              : 'text-[#687A93] hover:text-[#172B4D] hover:bg-[#F6FAFF]'
          }`}
        >
          Readiness Checklist
        </button>
      </div>

      {/* 5. ROLE REQUIREMENTS / SKILL MAP (ENTIRE CARD CLICKABLE) */}
      {(activeTabFilter === 'all' || activeTabFilter === 'role_skills') && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
          <div className="border-b border-[#DCE8F5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#347DD9] block mb-0.5">
                DOCUMENTED COMPETENCY MAP
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#172B4D]">
                ROLE SKILLS & IDENTIFIED GAPS
              </h2>
              <p className="text-xs text-[#687A93] font-medium mt-0.5">
                Click any competency card to open its dedicated learning path, practical projects, and interview preparation.
              </p>
            </div>

            <div className="text-xs font-semibold text-[#687A93]">
              Role: <strong className="text-[#172B4D]">{targetRole.title}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allRequirements.map((item) => {
              const isRoleSpecific = item.classification === 'ROLE_SPECIFIC';
              const currentLvl = item.currentLevel;
              const hasAssessed = currentLvl > 0;

              return (
                <div
                  key={item.skill.id}
                  onClick={() => setSelectedCompetencyForModal(item.skill)}
                  className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl flex flex-col justify-between hover:border-[#4D9FFF] hover:bg-[#EAF4FF]/40 transition-all cursor-pointer shadow-2xs group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                          isRoleSpecific
                            ? 'bg-[#EAF4FF] text-[#347DD9]'
                            : 'bg-white border border-[#DCE8F5] text-[#687A93]'
                        }`}
                      >
                        {isRoleSpecific ? 'Role-Specific' : 'Foundational'}
                      </span>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          item.status === 'CRITICAL FOCUS'
                            ? 'bg-[#FFF0ED] text-[#FF8A72]'
                            : item.status === 'DEVELOP'
                            ? 'bg-[#EAF4FF] text-[#347DD9]'
                            : item.status === 'STRONG'
                            ? 'bg-[#EBFBF3] text-[#42C98A]'
                            : 'bg-white border border-[#DCE8F5] text-[#687A93]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-[#172B4D] group-hover:text-[#4D9FFF] transition-colors">
                      {item.skill.name}
                    </h3>

                    <p className="text-xs text-[#687A93] font-medium leading-relaxed">
                      {item.whyItMatters}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE8F5]/80 mt-4 flex items-center justify-between text-xs">
                    <span className="text-[#687A93] font-medium">
                      Your confidence:{' '}
                      <strong className="text-[#172B4D]">
                        {hasAssessed
                          ? `Level ${currentLvl} (${item.currentStageLabel})`
                          : 'Not assessed'}
                      </strong>
                    </span>

                    <span className="text-[#4D9FFF] font-bold group-hover:underline inline-flex items-center gap-1">
                      Click to explore →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. PRACTICAL PROJECTS SECTION */}
      {(activeTabFilter === 'all' || activeTabFilter === 'projects') && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
          <div className="border-b border-[#DCE8F5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] block mb-0.5">
                CAREER-SPECIFIC PROJECT ASSIGNMENTS
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#172B4D]">
                YOUR PRACTICAL PROJECTS
              </h2>
              <p className="text-xs text-[#687A93] font-medium mt-0.5">
                Progress from core foundations to role-specific capstones. Every project produces verified portfolio evidence.
              </p>
            </div>

            <div className="text-xs font-semibold text-[#687A93]">
              Completed: <strong className="text-[#172B4D]">{completedProjectIds.length}</strong> / {roleProjects.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {roleProjects.map((project) => {
              const isDone = completedProjectIds.includes(project.id);

              return (
                <div
                  key={project.id}
                  className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl space-y-4 flex flex-col justify-between hover:border-[#4D9FFF]/40 transition-colors shadow-2xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#EAF4FF] text-[#347DD9]">
                        {project.difficulty} Project
                      </span>
                      <span className="text-[9px] font-mono text-[#74766F] font-bold">
                        SKILLGAP PROJECT
                      </span>
                    </div>

                    <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
                      {project.name}
                    </h3>

                    <p className="text-xs text-[#687A93] font-medium leading-relaxed">
                      {project.whyYoureBuildingIt}
                    </p>

                    <div className="space-y-1.5 text-xs pt-1">
                      <div className="flex flex-wrap gap-1">
                        {project.skillsDemonstrated.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold text-[#172B4D] bg-white border border-[#DCE8F5] px-2 py-0.5 rounded-md"
                          >
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="p-3 bg-white border border-[#DCE8F5] rounded-xl text-[11px] space-y-1">
                        <span className="font-extrabold uppercase text-[#4D9FFF] text-[9px] block">
                          Expected Output & Portfolio
                        </span>
                        <p className="text-[#172B4D] font-medium leading-relaxed">
                          {project.expectedOutput}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#DCE8F5] flex items-center justify-between">
                    <span className="text-[11px] text-[#687A93] font-medium">
                      Status: {isDone ? 'Completed' : 'In Progress'}
                    </span>

                    {onToggleProjectCompleted && (
                      <button
                        type="button"
                        onClick={() => onToggleProjectCompleted(project.id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isDone
                            ? 'bg-[#EBFBF3] text-[#42C98A] border border-[#42C98A]/30'
                            : 'bg-white hover:bg-[#F2F7FC] text-[#687A93] hover:text-[#172B4D] border border-[#DCE8F5]'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{isDone ? 'Completed' : 'Mark as Done'}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. EXPERIENCE-AWARE RESOURCES SECTION */}
      {(activeTabFilter === 'all' || activeTabFilter === 'resources') && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
          <div className="border-b border-[#DCE8F5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] block mb-0.5">
                VERIFIED STUDY MATERIALS
              </span>
              <h2 className="text-base sm:text-lg font-black text-[#172B4D]">
                EXPERIENCE-AWARE RESOURCES
              </h2>
              <p className="text-xs text-[#687A93] font-medium mt-0.5">
                Authentic, free resources mapped directly to role competencies. Filter by difficulty below.
              </p>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-[11px] font-bold">
              {(['ALL', 'FOUNDATION', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'PRODUCTION'] as const).map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setResourceDifficultyFilter(diff)}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    resourceDifficultyFilter === diff
                      ? 'bg-[#4D9FFF] text-white shadow-2xs'
                      : 'text-[#687A93] hover:text-[#172B4D]'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res, idx) => (
              <div
                key={idx}
                className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl flex flex-col justify-between hover:border-[#4D9FFF]/40 transition-colors shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase text-[#4D9FFF]">
                      {res.difficulty || 'RECOMMENDED'}
                    </span>
                    <span className="text-[10px] font-bold text-[#687A93]">
                      {res.type} · Free
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#172B4D] mb-1">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#687A93] font-medium leading-relaxed mb-3">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#DCE8F5] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-[#687A93] font-medium">
                    {res.provider}
                  </span>
                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-[#4D9FFF] hover:text-[#347DD9]"
                  >
                    <span>Open Free Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. UNIVERSAL GIT & GITHUB TRACK */}
      {(activeTabFilter === 'all' || activeTabFilter === 'git_track') && (
        <GitTrackSection
          completedGitStepIds={completedGitStepIds}
          onToggleGitStepCompleted={onToggleGitStepCompleted}
        />
      )}

      {/* 9. UNIVERSAL SOFT SKILLS & INTERVIEW SECTION */}
      {(activeTabFilter === 'all' || activeTabFilter === 'soft_skills') && (
        <SoftSkillsSection
          completedSoftSkillIds={completedSoftSkillIds}
          onToggleSoftSkillCompleted={onToggleSoftSkillCompleted}
        />
      )}

      {/* 10. CAREER READINESS CHECKLIST */}
      {(activeTabFilter === 'all' || activeTabFilter === 'checklist') && (
        <CareerReadinessChecklist
          targetRole={targetRole}
          assessments={assessments}
          completedProjectIds={completedProjectIds}
          completedSoftSkillIds={completedSoftSkillIds}
          completedGitStepIds={completedGitStepIds}
        />
      )}

      {/* DEDICATED SKILL DETAIL MODAL */}
      {selectedCompetencyForModal && (
        <SkillDetailModal
          competency={selectedCompetencyForModal}
          targetRole={targetRole}
          currentLevel={assessments[selectedCompetencyForModal.id] || 0}
          evidence={evidence[selectedCompetencyForModal.id]}
          isOpen={Boolean(selectedCompetencyForModal)}
          onClose={() => setSelectedCompetencyForModal(null)}
          onUpdateLevel={(level) => {
            if (onUpdateSkill) onUpdateSkill(selectedCompetencyForModal.id, level);
          }}
          onUpdateEvidence={(ev) => {
            if (onUpdateEvidence) onUpdateEvidence(selectedCompetencyForModal.id, ev);
          }}
          completedProjectIds={completedProjectIds}
          onToggleProjectCompleted={onToggleProjectCompleted}
        />
      )}
    </div>
  );
};
