import React, { useState } from 'react';
import {
  CareerRole,
  CareerCompetency,
  CompetencyEvidence,
  NavigationTab,
} from '../types/career';
import { ALL_SKILLS, UNIVERSAL_STAGES } from '../data/careerData';
import { SkillLevelSelector } from './SkillLevelSelector';
import {
  calculateReadiness,
  calculateSkillGaps,
  calculateStrongestSkills,
} from '../services/careerCalculations';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  ListOrdered,
  RotateCcw,
  BookOpen,
  Award,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillsPageProps {
  targetRole: CareerRole | null;
  assessments: Record<string, number>;
  skillEvidence?: Record<string, CompetencyEvidence>;
  onUpdateSkill: (skillId: string, level: number) => void;
  onUpdateEvidence?: (skillId: string, evidence: CompetencyEvidence) => void;
  onResetSkills: () => void;
  onNavigateToRoadmap: () => void;
}

export const SkillsPage: React.FC<SkillsPageProps> = ({
  targetRole,
  assessments,
  skillEvidence = {},
  onUpdateSkill,
  onUpdateEvidence,
  onResetSkills,
  onNavigateToRoadmap,
}) => {
  // If role is selected, competencies are strictly from that role; otherwise all foundational skills
  const competencies: CareerCompetency[] = targetRole
    ? targetRole.documentedCompetencies
    : ALL_SKILLS;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'guided' | 'summary'>('guided');
  const [showJumpDrawer, setShowJumpDrawer] = useState(false);

  const safeIndex = Math.min(Math.max(currentIndex, 0), Math.max(0, competencies.length - 1));
  const currentComp = competencies[safeIndex];

  // Overall evaluation metrics
  const readiness = calculateReadiness(targetRole, assessments);
  const strongestSkills = calculateStrongestSkills(targetRole, assessments);
  const skillGaps = calculateSkillGaps(targetRole, assessments);

  const assessedCount = competencies.filter(
    (c) => assessments[c.id] !== undefined && assessments[c.id] > 0
  ).length;

  const isCurrentAssessed = currentComp && assessments[currentComp.id] !== undefined;

  const handleNext = () => {
    if (safeIndex < competencies.length - 1) {
      setCurrentIndex(safeIndex + 1);
    } else {
      setViewMode('summary');
    }
  };

  const handlePrev = () => {
    if (safeIndex > 0) {
      setCurrentIndex(safeIndex - 1);
    }
  };

  // If no career selected yet
  if (!targetRole) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
        <div className="p-8 sm:p-12 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl text-center shadow-[0_4px_24px_rgba(23,43,77,0.04)]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white flex items-center justify-center mx-auto mb-4 shadow-xs">
            <Target className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] mb-2">
            Choose a Career Goal to Begin Self-Assessment
          </h2>

          <p className="text-xs sm:text-sm text-[#687A93] max-w-lg mx-auto mb-8 leading-relaxed font-medium">
            Self-assessment in SkillGap is directly connected to the specific competencies documented for your target career. Select a career to evaluate your capabilities.
          </p>

          <a
            href="#career"
            onClick={(e) => {
              e.preventDefault();
              window.location.hash = 'career';
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>Explore Career Paths</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    );
  }

  // SUMMARY VIEW (After assessment or when toggled)
  if (viewMode === 'summary') {
    const criticalFocus = skillGaps.filter((g) => g.gapCategory === 'CRITICAL_FOCUS');
    const developGaps = skillGaps.filter((g) => g.gapCategory === 'DEVELOP');
    const strongCompetencies = strongestSkills.filter((s) => s.currentLevel >= 4);

    return (
      <div className="space-y-8 max-w-5xl mx-auto pb-12">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE8F5]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-[#4D9FFF] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assessment Completed for {targetRole.title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
              YOUR CURRENT SKILL PROFILE
            </h2>
            <p className="text-xs sm:text-sm text-[#687A93] mt-1 font-medium">
              Based on your self-assessment across the {competencies.length} documented competencies for this role.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setViewMode('guided');
              }}
              className="px-4 py-2 bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-[#172B4D] text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Review Skill by Skill
            </button>
            <button
              onClick={onNavigateToRoadmap}
              className="px-5 py-2.5 bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold rounded-xl transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer flex items-center gap-1.5"
            >
              <span>View Learning Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Status Columns: Strong Areas, Develop Areas, Critical Focus */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Top Priorities (Critical Focus) */}
          <div className="p-6 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
            <div className="border-b border-[#DCE8F5] pb-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#FF8A72]">
                <AlertTriangle className="w-4 h-4" />
                <span>TOP PRIORITIES</span>
              </div>
              <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
                Core competencies with limited prior experience.
              </p>
            </div>

            {criticalFocus.length === 0 ? (
              <p className="text-xs text-[#687A93] italic py-4 text-center font-medium">
                No critical gaps identified!
              </p>
            ) : (
              <div className="space-y-3">
                {criticalFocus.map((gap) => (
                  <div
                    key={gap.skill.id}
                    className="p-3 bg-[#FFF0ED] border border-[#FF8A72]/20 rounded-xl space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#172B4D]">
                      <span>{gap.skill.name}</span>
                      <span className="text-[10px] text-[#FF8A72] font-mono">Stage {gap.currentLevel}</span>
                    </div>
                    <p className="text-[11px] text-[#687A93] font-medium leading-tight">
                      {gap.rationale}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Areas to Develop */}
          <div className="p-6 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
            <div className="border-b border-[#DCE8F5] pb-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#4D9FFF]">
                <BookOpen className="w-4 h-4" />
                <span>AREAS TO DEVELOP</span>
              </div>
              <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
                Familiar or guided skills ready for practical independence.
              </p>
            </div>

            {developGaps.length === 0 ? (
              <p className="text-xs text-[#687A93] italic py-4 text-center font-medium">
                No intermediate development areas.
              </p>
            ) : (
              <div className="space-y-3">
                {developGaps.map((gap) => (
                  <div
                    key={gap.skill.id}
                    className="p-3 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#172B4D]">
                      <span>{gap.skill.name}</span>
                      <span className="text-[10px] text-[#4D9FFF] font-mono">Stage {gap.currentLevel} ({gap.currentStageLabel})</span>
                    </div>
                    <p className="text-[11px] text-[#687A93] font-medium leading-tight">
                      {gap.skill.whyItMatters}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 3: Strong Areas */}
          <div className="p-6 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-xs space-y-4">
            <div className="border-b border-[#DCE8F5] pb-3">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#42C98A]">
                <Award className="w-4 h-4" />
                <span>STRONG AREAS</span>
              </div>
              <p className="text-[11px] text-[#687A93] mt-0.5 font-medium">
                Competencies where you demonstrated applied confidence.
              </p>
            </div>

            {strongCompetencies.length === 0 ? (
              <p className="text-xs text-[#687A93] italic py-4 text-center font-medium">
                No competencies currently rated at Applied/Advanced.
              </p>
            ) : (
              <div className="space-y-3">
                {strongCompetencies.map((item) => (
                  <div
                    key={item.skill.id}
                    className="p-3 bg-[#EBFBF3] border border-[#42C98A]/20 rounded-xl space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#172B4D]">
                      <span>{item.skill.name}</span>
                      <span className="text-[10px] text-[#42C98A] font-mono">Stage {item.currentLevel} ({item.currentStageLabel})</span>
                    </div>
                    <p className="text-[11px] text-[#687A93] font-medium leading-tight">
                      {item.skill.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA to Learning Roadmap */}
        <div className="p-8 bg-gradient-to-r from-[#EAF4FF] to-[#F2F7FC] border border-[#DCE8F5] rounded-3xl text-center space-y-3">
          <h3 className="text-lg font-black text-[#172B4D]">
            Ready to close your identified skill gaps?
          </h3>
          <p className="text-xs sm:text-sm text-[#687A93] max-w-xl mx-auto font-medium">
            SkillGap has mapped curated, authentic free learning resources directly to each of your development areas.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToRoadmap}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold rounded-xl transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
            >
              <span>Explore My Tailored Learning Path</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // GUIDED ONE-SKILL-AT-A-TIME FLOW
  const currentSkillLevel = assessments[currentComp.id] || 0;
  const currentSkillEvidence = skillEvidence[currentComp.id];
  const progressPct = Math.round(((safeIndex + 1) / competencies.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Breadcrumb Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE8F5]">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D9FFF] block mb-0.5">
            YOU'RE EXPLORING: {targetRole.title.toUpperCase()}
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-[#172B4D]">
            Self-Assessment
          </h2>
          <p className="text-xs text-[#687A93] font-medium">
            We'll ask you about the competencies most relevant to this career.
          </p>
        </div>

        {/* Jump List Drawer Trigger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowJumpDrawer(!showJumpDrawer)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#DCE8F5] hover:border-[#4D9FFF] text-[#172B4D] text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-2xs"
          >
            <ListOrdered className="w-4 h-4 text-[#4D9FFF]" />
            <span>All Competencies ({competencies.length})</span>
          </button>

          {assessedCount > 0 && (
            <button
              type="button"
              onClick={() => setViewMode('summary')}
              className="text-xs font-bold text-[#4D9FFF] hover:underline cursor-pointer px-2"
            >
              View Summary
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-[#172B4D]">
            Competency {safeIndex + 1} of {competencies.length}
          </span>
          <span className="text-[#4D9FFF] font-mono">
            {assessedCount} assessed · {progressPct}% complete
          </span>
        </div>

        <div className="w-full h-2 bg-white border border-[#DCE8F5] rounded-full overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#4D9FFF] to-[#49C7E8] transition-all duration-300 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Jump Drawer / Overview Modal if opened */}
      {showJumpDrawer && (
        <div className="p-4 bg-white border border-[#DCE8F5] rounded-2xl shadow-sm space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-[#DCE8F5] pb-2 text-xs font-bold text-[#172B4D]">
            <span>Jump to Competency:</span>
            <button
              onClick={() => setShowJumpDrawer(false)}
              className="text-[11px] text-[#687A93] hover:text-[#172B4D] cursor-pointer"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
            {competencies.map((comp, idx) => {
              const lvl = assessments[comp.id] || 0;
              const isCurrent = idx === safeIndex;

              return (
                <button
                  key={comp.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowJumpDrawer(false);
                  }}
                  className={`p-2 rounded-xl text-left text-xs transition-all cursor-pointer border flex items-center justify-between ${
                    isCurrent
                      ? 'bg-[#EAF4FF] border-[#4D9FFF] text-[#347DD9] font-bold'
                      : 'bg-[#F6FAFF] border-[#DCE8F5] text-[#172B4D] hover:bg-white'
                  }`}
                >
                  <span className="truncate pr-2">
                    {idx + 1}. {comp.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      lvl > 0 ? 'bg-[#EBFBF3] text-[#42C98A]' : 'bg-gray-100 text-[#687A93]'
                    }`}
                  >
                    {lvl > 0 ? `Stage ${lvl}` : 'Not rated'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Single Competency Interactive Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentComp.id}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_4px_24px_rgba(23,43,77,0.04)] space-y-6"
        >
          {/* Header of Skill Card */}
          <div className="space-y-2 border-b border-[#DCE8F5] pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md ${
                  currentComp.classification === 'ROLE_SPECIFIC'
                    ? 'bg-[#EAF4FF] text-[#347DD9]'
                    : 'bg-[#F2F7FC] text-[#687A93]'
                }`}
              >
                {currentComp.classification === 'ROLE_SPECIFIC'
                  ? 'ROLE-SPECIFIC COMPETENCY'
                  : 'FOUNDATIONAL SKILL'}
              </span>

              <span className="text-[10px] font-bold uppercase tracking-wider text-[#687A93]">
                {currentComp.category}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-[#172B4D]">
              {currentComp.name}
            </h3>

            <p className="text-xs sm:text-sm text-[#172B4D] leading-relaxed font-medium">
              <strong className="text-[#347DD9]">Why this matters for {targetRole.title}: </strong>
              {currentComp.whyItMatters}
            </p>
          </div>

          {/* Interactive Evidence-Based Level Selector */}
          <SkillLevelSelector
            competency={currentComp}
            currentLevel={currentSkillLevel}
            evidence={currentSkillEvidence}
            onChangeLevel={(lvl) => onUpdateSkill(currentComp.id, lvl)}
            onChangeEvidence={(ev) => {
              if (onUpdateEvidence) onUpdateEvidence(currentComp.id, ev);
            }}
          />

          {/* Card Navigation Footer */}
          <div className="pt-6 border-t border-[#DCE8F5] flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={safeIndex === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                safeIndex === 0
                  ? 'opacity-40 text-[#687A93] cursor-not-allowed'
                  : 'text-[#172B4D] hover:bg-[#F2F7FC] border border-[#DCE8F5] cursor-pointer'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="text-[11px] font-mono text-[#687A93]">
              {safeIndex + 1} / {competencies.length}
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
            >
              <span>{safeIndex === competencies.length - 1 ? 'Finish Assessment' : 'Next Competency'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
