import React, { useState } from 'react';
import {
  CareerCompetency,
  CareerRole,
  CompetencyEvidence,
  SkillGapProject,
  LearningResource,
} from '../types/career';
import { SkillLevelSelector, STAGE_DEFINITIONS } from './SkillLevelSelector';
import {
  getExperienceAwareResources,
  getProjectsForRole,
} from '../data/learningProjectsData';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Layers,
  ArrowRight,
  Sparkles,
  GitBranch,
  FolderGit2,
  HelpCircle,
  Award,
  BookOpen,
  Hammer,
  Code,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillDetailModalProps {
  competency: CareerCompetency;
  targetRole: CareerRole | null;
  currentLevel: number;
  evidence?: CompetencyEvidence;
  isOpen: boolean;
  onClose: () => void;
  onUpdateLevel: (level: number) => void;
  onUpdateEvidence?: (evidence: CompetencyEvidence) => void;
  completedProjectIds?: string[];
  onToggleProjectCompleted?: (projectId: string) => void;
}

export const SkillDetailModal: React.FC<SkillDetailModalProps> = ({
  competency,
  targetRole,
  currentLevel,
  evidence,
  isOpen,
  onClose,
  onUpdateLevel,
  onUpdateEvidence,
  completedProjectIds = [],
  onToggleProjectCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'resources' | 'portfolio' | 'interview'>('overview');
  const [showAssessmentEditor, setShowAssessmentEditor] = useState(false);

  if (!isOpen) return null;

  const currentStageDef = STAGE_DEFINITIONS[currentLevel] || STAGE_DEFINITIONS[0];
  const allProjects = targetRole ? getProjectsForRole(targetRole.id) : [];
  // Filter projects demonstrating this skill or general projects for the role
  const relevantProjects = allProjects.filter((p) =>
    p.skillsDemonstrated.some(
      (s) =>
        s.toLowerCase().includes(competency.name.toLowerCase()) ||
        competency.name.toLowerCase().includes(s.toLowerCase())
    )
  );
  const displayProjects = relevantProjects.length > 0 ? relevantProjects : allProjects.slice(0, 2);

  // Experience-aware learning resources (respects what the student already knows!)
  const experienceAwareResources = getExperienceAwareResources(competency.id, currentLevel);
  // Ensure the verified resource for this competency is included if appropriate
  const baseResource = competency.authenticResource;
  const resourcesToDisplay: LearningResource[] = [];
  if (baseResource) {
    // If student is advanced (3+), don't show if it's pure beginner
    const isBasicIntro =
      baseResource.title.toLowerCase().includes('beginner') ||
      baseResource.title.toLowerCase().includes('introduction to python');
    if (!(currentLevel >= 3 && isBasicIntro)) {
      resourcesToDisplay.push(baseResource);
    }
  }
  for (const r of experienceAwareResources) {
    if (!resourcesToDisplay.some((existing) => existing.url === r.url)) {
      resourcesToDisplay.push(r);
    }
  }

  // Priority badge
  const priority =
    competency.importance === 'Core'
      ? 'High'
      : competency.importance === 'Important'
      ? 'Medium'
      : 'Supporting';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#172B4D]/40 backdrop-blur-xs"
      />

      {/* Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-4xl bg-white border border-[#DCE8F5] rounded-3xl shadow-[0_20px_60px_rgba(23,43,77,0.18)] z-10 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Bar */}
        <div className="p-6 sm:p-7 border-b border-[#DCE8F5] bg-gradient-to-r from-[#F6FAFF] via-white to-[#EAF4FF] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] bg-[#EAF4FF] px-2.5 py-0.5 rounded-md border border-[#4D9FFF]/20">
                {competency.category}
              </span>

              <span className="text-[10px] font-semibold text-[#687A93]">
                Used in:{' '}
                <strong className="text-[#172B4D]">
                  {targetRole ? targetRole.title : 'Technology Careers'}
                </strong>
              </span>

              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                  priority === 'High'
                    ? 'bg-[#FFF0ED] text-[#FF8A72]'
                    : priority === 'Medium'
                    ? 'bg-[#EAF4FF] text-[#347DD9]'
                    : 'bg-[#F2F7FC] text-[#687A93]'
                }`}
              >
                Priority: {priority}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#172B4D] tracking-tight">
              {competency.name}
            </h2>

            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-[#687A93] font-medium">
                Your current experience:
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#172B4D] bg-white px-2.5 py-1 rounded-lg border border-[#DCE8F5] shadow-2xs">
                <span
                  className={`w-2 h-2 rounded-full ${
                    currentLevel === 0
                      ? 'bg-gray-300'
                      : currentLevel <= 2
                      ? 'bg-[#49C7E8]'
                      : currentLevel <= 4
                      ? 'bg-[#4D9FFF]'
                      : 'bg-[#8B7CFF]'
                  }`}
                />
                <span>
                  Level {currentLevel}: {currentStageDef.label}
                </span>
              </span>

              <button
                type="button"
                onClick={() => setShowAssessmentEditor(!showAssessmentEditor)}
                className="text-[11px] font-bold text-[#4D9FFF] hover:text-[#347DD9] hover:underline cursor-pointer"
              >
                {showAssessmentEditor ? 'Close Assessment' : 'Update Experience Level →'}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] flex items-center justify-center text-[#687A93] hover:text-[#172B4D] transition-colors cursor-pointer shrink-0 shadow-2xs"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inline Self-Assessment Slider (Expandable) */}
        {showAssessmentEditor && (
          <div className="p-6 bg-[#F6FAFF] border-b border-[#DCE8F5] animate-in fade-in duration-150">
            <SkillLevelSelector
              competency={competency}
              currentLevel={currentLevel}
              evidence={evidence}
              onChangeLevel={onUpdateLevel}
              onChangeEvidence={onUpdateEvidence}
            />
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-[#DCE8F5] bg-white text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-[#4D9FFF] text-[#4D9FFF]'
                : 'border-transparent text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            Overview & Path
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'projects'
                ? 'border-[#4D9FFF] text-[#4D9FFF]'
                : 'border-transparent text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            <span>Projects</span>
            <span className="w-4 h-4 rounded-full bg-[#EAF4FF] text-[#4D9FFF] text-[10px] flex items-center justify-center font-mono">
              {displayProjects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'resources'
                ? 'border-[#4D9FFF] text-[#4D9FFF]'
                : 'border-transparent text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            <span>Experience-Aware Resources</span>
            <span className="w-4 h-4 rounded-full bg-[#EAF4FF] text-[#4D9FFF] text-[10px] flex items-center justify-center font-mono">
              {resourcesToDisplay.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'portfolio'
                ? 'border-[#4D9FFF] text-[#4D9FFF]'
                : 'border-transparent text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            Show Your Work
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'interview'
                ? 'border-[#4D9FFF] text-[#4D9FFF]'
                : 'border-transparent text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            Interview Preparation
          </button>
        </div>

        {/* Scrollable Tab Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white">
          {/* TAB 1: OVERVIEW & LEARNING PATH */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              {/* Why This Matters */}
              <div className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF]">
                  WHY THIS MATTERS FOR {targetRole ? targetRole.title.toUpperCase() : 'YOUR CAREER'}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#172B4D] leading-relaxed">
                  {competency.whyItMatters}
                </p>
                <p className="text-xs text-[#687A93] font-medium leading-relaxed pt-1">
                  {competency.description}
                </p>
              </div>

              {/* What You Should Be Able To Do */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#172B4D]">
                  WHAT YOU SHOULD BE ABLE TO DO
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-4 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#347DD9]">
                      Immediate Practical Outcome
                    </span>
                    <p className="text-xs text-[#172B4D] font-medium leading-relaxed">
                      {competency.concretePrompts?.independent ||
                        'Independently implement and test working solutions with this competency.'}
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#8B7CFF]">
                      Production & Career Outcome
                    </span>
                    <p className="text-xs text-[#172B4D] font-medium leading-relaxed">
                      {competency.concretePrompts?.advanced ||
                        'Design robust architectures, optimize bottlenecks, and articulate trade-offs in interviews.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Learning Path (Framework) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-[#172B4D]">
                    RECOMMENDED LEARNING PROGRESSION
                  </h3>
                  <span className="text-[10px] text-[#74766F] italic">
                    SkillGap Learning Framework
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
                  {[
                    { step: '1', title: 'Foundation', desc: 'Core syntax & mental models' },
                    { step: '2', title: 'Guided Practice', desc: 'Tutorials & lab workflows' },
                    { step: '3', title: 'Applied Project', desc: 'Independent practical task' },
                    { step: '4', title: 'Portfolio Project', desc: 'Documented GitHub showcase' },
                    { step: '5', title: 'Interview Readiness', desc: 'Trade-off defense & tests' },
                  ].map((s, idx) => (
                    <div
                      key={s.step}
                      className={`p-3 rounded-2xl border flex flex-col justify-between ${
                        currentLevel === idx + 1
                          ? 'bg-[#EAF4FF] border-[#4D9FFF] shadow-2xs'
                          : 'bg-[#F6FAFF] border-[#DCE8F5]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] font-black text-[#4D9FFF] font-mono">
                          0{s.step}
                        </span>
                        <h4 className="font-extrabold text-[#172B4D] mt-0.5 text-xs">
                          {s.title}
                        </h4>
                      </div>
                      <p className="text-[10px] text-[#687A93] font-medium mt-1 leading-tight">
                        {s.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div>
                <h3 className="text-sm font-black text-[#172B4D] tracking-tight">
                  PRACTICAL PROJECTS DEMONSTRATING THIS COMPETENCY
                </h3>
                <p className="text-xs text-[#687A93] font-medium mt-0.5">
                  Complete these hands-on assignments to turn theoretical knowledge into provable portfolio capability.
                </p>
              </div>

              <div className="space-y-4">
                {displayProjects.map((project) => {
                  const isDone = completedProjectIds.includes(project.id);

                  return (
                    <div
                      key={project.id}
                      className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl space-y-4 hover:border-[#4D9FFF]/40 transition-colors shadow-2xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#EAF4FF] text-[#347DD9]">
                              {project.difficulty} Project
                            </span>
                            <span className="text-[9px] font-mono font-bold text-[#74766F]">
                              SKILLGAP PROJECT
                            </span>
                          </div>

                          <h4 className="text-sm sm:text-base font-black text-[#172B4D]">
                            {project.name}
                          </h4>
                          <p className="text-xs text-[#687A93] font-medium mt-1">
                            {project.whyYoureBuildingIt}
                          </p>
                        </div>

                        {onToggleProjectCompleted && (
                          <button
                            type="button"
                            onClick={() => onToggleProjectCompleted(project.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
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

                      {/* Project Breakdown Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#4D9FFF] block">
                            Expected Output
                          </span>
                          <p className="text-[#172B4D] font-medium leading-relaxed">
                            {project.expectedOutput}
                          </p>
                        </div>

                        <div className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl space-y-1">
                          <span className="text-[10px] font-bold uppercase text-[#8B7CFF] block">
                            Portfolio Evidence
                          </span>
                          <p className="text-[#172B4D] font-medium leading-relaxed">
                            {project.portfolioEvidence.readmeStructure}
                          </p>
                        </div>
                      </div>

                      {/* Interview Talking Points */}
                      <div className="pt-2 border-t border-[#DCE8F5]">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#687A93] block mb-1.5">
                          Interview Talking Points to Prepare:
                        </span>
                        <ul className="space-y-1">
                          {project.interviewTalkingPoints.map((tp, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-[#172B4D] font-medium flex items-start gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#4D9FFF] mt-1.5 shrink-0" />
                              <span>{tp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCE-AWARE RESOURCES */}
          {activeTab === 'resources' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#DCE8F5] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-[#4D9FFF]">
                    EXPERIENCE-AWARE LEARNING MATERIALS
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF4FF] text-[#347DD9]">
                    Level {currentLevel}: {currentStageDef.label}
                  </span>
                </div>
                <p className="text-xs text-[#687A93] font-medium mt-1">
                  Tailored to your current capability. Intermediate and advanced students are not recommended basic beginner tutorials.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resourcesToDisplay.map((res, idx) => (
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

                      <h4 className="text-sm font-extrabold text-[#172B4D] mb-1">
                        {res.title}
                      </h4>

                      <p className="text-xs text-[#687A93] font-medium leading-relaxed mb-3">
                        {res.description}
                      </p>

                      {res.whyThisResource && (
                        <div className="p-3 bg-white border border-[#DCE8F5] rounded-xl text-[11px] text-[#172B4D] font-medium mb-3">
                          <strong className="text-[#347DD9] block mb-0.5">Why This Resource:</strong>
                          {res.whyThisResource}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-[#DCE8F5] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#687A93] font-medium">
                        Provider: {res.provider}
                      </span>
                      <a
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-[#4D9FFF] hover:text-[#347DD9]"
                      >
                        <span>Open Resource</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SHOW YOUR WORK / PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#DCE8F5] pb-3">
                <h3 className="text-sm font-black text-[#172B4D] tracking-tight uppercase">
                  WHAT SHOULD APPEAR IN YOUR GITHUB PORTFOLIO
                </h3>
                <p className="text-xs text-[#687A93] font-medium mt-0.5">
                  Employers evaluate concrete code, architecture reasoning, and reproducibility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-[#172B4D]">
                    <FolderGit2 className="w-4 h-4 text-[#4D9FFF]" />
                    <span>Repository Standards</span>
                  </div>
                  <ul className="text-xs text-[#687A93] font-medium space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4D9FFF] mt-1.5 shrink-0" />
                      <span>Dedicated repository with a clear title and tags matching the role.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4D9FFF] mt-1.5 shrink-0" />
                      <span>Modular code structure separating data, models, and execution scripts.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4D9FFF] mt-1.5 shrink-0" />
                      <span>Requirements file (`requirements.txt` or `pyproject.toml`) with pinned versions.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-3xl space-y-3">
                  <div className="flex items-center gap-2 text-xs font-black text-[#172B4D]">
                    <BookOpen className="w-4 h-4 text-[#8B7CFF]" />
                    <span>README Structure</span>
                  </div>
                  <ul className="text-xs text-[#687A93] font-medium space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] mt-1.5 shrink-0" />
                      <span><strong>Problem Statement:</strong> Why this project matters.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] mt-1.5 shrink-0" />
                      <span><strong>Architecture Diagram:</strong> Visual data flow or pipeline.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] mt-1.5 shrink-0" />
                      <span><strong>Reproducibility:</strong> Step-by-step commands to run locally.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTERVIEW PREPARATION */}
          {activeTab === 'interview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#DCE8F5] pb-3">
                <h3 className="text-sm font-black text-[#172B4D] tracking-tight uppercase">
                  TECHNICAL INTERVIEW PREPARATION FOR {competency.name.toUpperCase()}
                </h3>
                <p className="text-xs text-[#687A93] font-medium mt-0.5">
                  Questions technology interviewers frequently ask to assess genuine depth versus superficial tutorial knowledge.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    q: `How would you diagnose and resolve performance or accuracy degradation when using ${competency.name}?`,
                    a: 'Explain your systematic debugging methodology: isolating data issues, profiling compute bottlenecks, and inspecting intermediate tensor/data states.',
                  },
                  {
                    q: `What are two architectural trade-offs you evaluated in your project involving ${competency.name}?`,
                    a: 'Discuss latency vs accuracy, memory footprint vs throughput, or simplicity vs maintainability based on real project constraints.',
                  },
                  {
                    q: `How does ${competency.name} integrate with downstream production systems?`,
                    a: 'Describe serialization formats (ONNX, Parquet, JSON), latency SLAs, failure retries, and monitoring telemetry.',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-1.5"
                  >
                    <span className="text-[10px] font-black text-[#4D9FFF] uppercase font-mono">
                      Question {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-black text-[#172B4D]">
                      "{item.q}"
                    </h4>
                    <p className="text-xs text-[#687A93] font-medium leading-relaxed pt-0.5">
                      <strong className="text-[#347DD9]">Suggested Talking Point: </strong>
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
