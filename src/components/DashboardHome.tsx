import React from 'react';
import { CareerRole, NavigationTab } from '../types/career';
import {
  calculateReadiness,
  calculateStrongestSkills,
  calculateSkillGaps,
  calculateNextSteps,
} from '../services/careerCalculations';
import { ReadinessRing } from './ReadinessRing';
import { MetricCard } from './MetricCard';
import {
  Compass,
  Target,
  Award,
  BookOpen,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { UNIVERSAL_STAGES } from '../data/careerData';

interface DashboardHomeProps {
  targetRole: CareerRole | null;
  assessments: Record<string, number>;
  completedLearningIds: string[];
  studentName: string;
  onNavigate: (tab: NavigationTab) => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  targetRole,
  assessments,
  completedLearningIds,
  studentName,
  onNavigate,
}) => {
  const readiness = calculateReadiness(targetRole, assessments);
  const strongestSkills = calculateStrongestSkills(targetRole, assessments);
  const skillGaps = calculateSkillGaps(targetRole, assessments);
  const nextSteps = calculateNextSteps(targetRole, assessments);
  const hasAnyAssessment = Object.values(assessments).some((val) => val > 0);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* 1. Header Greeting & My Career Goal Card */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-2 border-b border-[#DCE8F5]">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#172B4D]">
            {studentName ? `Good to see you, ${studentName}.` : 'Good to see you.'}
          </h2>
          <p className="text-sm text-[#687A93] mt-1 font-medium">
            Let's see where you are on your path to your career goal.
          </p>
        </div>

        {/* Main Target Card */}
        <div className="flex items-center gap-4 p-4 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_12px_rgba(23,43,77,0.04)]">
          <div className="w-11 h-11 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF] shadow-xs shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wider font-bold text-[#687A93]">
              MY CAREER GOAL
            </div>
            <div className="text-sm font-extrabold text-[#172B4D]">
              {targetRole ? targetRole.title : 'No career goal selected'}
            </div>
          </div>
          <button
            onClick={() => onNavigate('career')}
            className="ml-2 px-3.5 py-1.5 bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer shrink-0"
          >
            {targetRole ? 'Change' : 'CHOOSE CAREER'}
          </button>
        </div>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Career Readiness"
          value={readiness !== null ? `${readiness.percentage}%` : 'Not assessed'}
          subtext={
            readiness !== null
              ? `${readiness.pointsEarned} of ${readiness.totalPossiblePoints} benchmark points`
              : 'Complete skill assessment to calculate'
          }
          icon={Compass}
          accent="blue"
          isAssessed={readiness !== null}
          onClick={() => onNavigate(targetRole ? 'skills' : 'career')}
        />

        <MetricCard
          label="Skill Gaps"
          value={
            targetRole
              ? hasAnyAssessment
                ? `${skillGaps.length} areas`
                : 'Not assessed'
              : 'Select role'
          }
          subtext={
            targetRole
              ? hasAnyAssessment
                ? `${skillGaps.filter((g) => g.gapCategory === 'CRITICAL_FOCUS').length} critical focus areas`
                : 'Rate what you know to find gaps'
              : 'Choose a target career first'
          }
          icon={Target}
          accent="coral"
          isAssessed={hasAnyAssessment && Boolean(targetRole)}
          onClick={() => onNavigate(targetRole ? 'skills' : 'career')}
        />

        <MetricCard
          label="Strongest Skill"
          value={
            strongestSkills.length > 0
              ? strongestSkills[0].skill.name
              : 'Not assessed'
          }
          subtext={
            strongestSkills.length > 0
              ? `Stage ${strongestSkills[0].currentLevel}: ${strongestSkills[0].currentStageLabel}`
              : 'Self-assess skills to discover'
          }
          icon={Award}
          accent="green"
          isAssessed={strongestSkills.length > 0}
          onClick={() => onNavigate('skills')}
        />

        <MetricCard
          label="Roadmap Progress"
          value={
            nextSteps.length > 0
              ? `${completedLearningIds.filter((id) => targetRole?.documentedCompetencies.some((c) => c.id === id)).length} of ${nextSteps.length}`
              : '0 milestones'
          }
          subtext={
            nextSteps.length > 0
              ? `${Math.round(
                  (completedLearningIds.filter((id) => targetRole?.documentedCompetencies.some((c) => c.id === id)).length /
                    nextSteps.length) *
                    100
                )}% curriculum completed`
              : 'Generate roadmap from your gaps'
          }
          icon={BookOpen}
          accent="purple"
          isAssessed={nextSteps.length > 0}
          onClick={() => onNavigate('learning')}
        />
      </div>

      {/* 3. Central Dual Visual Section: Readiness & Strongest Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: YOUR CAREER READINESS */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)]">
          <div className="border-b border-[#DCE8F5] pb-4 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D9FFF] block mb-1">
              Readiness Assessment
            </span>
            <h3 className="text-lg font-extrabold text-[#172B4D]">
              YOUR CAREER READINESS
            </h3>
          </div>

          <div className="my-auto py-2">
            <ReadinessRing
              percentage={readiness ? readiness.percentage : null}
              size={240}
              strokeWidth={16}
              targetRoleTitle={targetRole ? targetRole.title : undefined}
              onStartAssessment={() => onNavigate(targetRole ? 'skills' : 'career')}
            />
          </div>

          <div className="pt-4 border-t border-[#DCE8F5] text-center">
            {targetRole ? (
              <button
                onClick={() => onNavigate('skills')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4D9FFF] hover:text-[#347DD9] transition-colors cursor-pointer"
              >
                <span>{hasAnyAssessment ? 'Update skill assessment' : 'Complete skill assessment'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate('career')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4D9FFF] hover:text-[#347DD9] transition-colors cursor-pointer"
              >
                <span>Choose your career goal to begin</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Column: YOUR STRONGEST SKILLS */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)]">
          <div>
            <div className="flex items-center justify-between border-b border-[#DCE8F5] pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#42C98A] block mb-1">
                  Validated Competencies
                </span>
                <h3 className="text-lg font-extrabold text-[#172B4D]">
                  YOUR STRONGEST SKILLS
                </h3>
              </div>

              {strongestSkills.length > 0 && (
                <button
                  onClick={() => onNavigate('skills')}
                  className="text-xs font-bold text-[#4D9FFF] hover:text-[#347DD9] transition-colors cursor-pointer"
                >
                  View all ({strongestSkills.length})
                </button>
              )}
            </div>

            {/* List of Strongest Assessed Competencies */}
            {strongestSkills.length === 0 ? (
              <div className="py-12 px-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF] mx-auto mb-3">
                  <Sliders className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#172B4D] mb-1">
                  No skills assessed yet
                </h4>
                <p className="text-xs text-[#687A93] max-w-sm mx-auto mb-5 leading-relaxed font-medium">
                  Rate what you already know in My Skills to identify your core competencies.
                </p>
                <button
                  onClick={() => onNavigate('skills')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <span>Rate Your Skills</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {strongestSkills.slice(0, 5).map((item) => {
                  const pct = Math.round((item.currentLevel / 5) * 100);

                  return (
                    <div key={item.skill.id} className="p-3.5 bg-[#F6FAFF] rounded-2xl border border-[#DCE8F5] space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#172B4D]">
                            {item.skill.name}
                          </span>
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                              item.classification === 'ROLE_SPECIFIC'
                                ? 'text-[#4D9FFF] bg-[#EAF4FF]'
                                : 'text-[#687A93] bg-white border border-[#DCE8F5]'
                            }`}
                          >
                            {item.classification === 'ROLE_SPECIFIC' ? 'Role-Specific' : 'Foundational'}
                          </span>
                        </div>

                        <span className="text-xs font-bold text-[#172B4D] font-mono tabular-nums">
                          Stage {item.currentLevel} / 5 ({item.currentStageLabel})
                        </span>
                      </div>

                      {/* Visual Progress Bar */}
                      <div className="w-full h-2.5 bg-white rounded-full overflow-hidden border border-[#DCE8F5] p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#4D9FFF] to-[#42C98A] transition-all duration-500 ease-out"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#DCE8F5] flex items-center justify-between text-xs text-[#687A93]">
            <span>Visualized strictly from your assessed self-ratings.</span>
            <button
              onClick={() => onNavigate('skills')}
              className="font-bold text-[#4D9FFF] hover:underline cursor-pointer"
            >
              Update Ratings →
            </button>
          </div>
        </div>
      </div>

      {/* 4. Section: YOUR SKILL GAPS */}
      <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE8F5] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF8A72] block mb-1">
              Priority Areas to Strengthen
            </span>
            <h3 className="text-lg font-extrabold text-[#172B4D]">
              YOUR SKILL GAPS
            </h3>
          </div>

          {targetRole && (
            <span className="text-xs font-medium text-[#687A93]">
              Benchmarked against <span className="font-bold text-[#172B4D]">{targetRole.title}</span>
            </span>
          )}
        </div>

        {!targetRole ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0ED] flex items-center justify-center text-[#FF8A72] mx-auto mb-3">
              <Target className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#172B4D] mb-1">
              No career goal selected
            </h4>
            <p className="text-xs text-[#687A93] max-w-sm mx-auto mb-5 leading-relaxed font-medium">
              Select a career goal to calculate your skill gaps against required industry proficiencies.
            </p>
            <button
              onClick={() => onNavigate('career')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Choose Your Career</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : !hasAnyAssessment ? (
          <div className="py-12 px-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF] mx-auto mb-3">
              <Sliders className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-[#172B4D] mb-1">
              Complete your assessment to uncover skill gaps
            </h4>
            <p className="text-xs text-[#687A93] max-w-sm mx-auto mb-5 leading-relaxed font-medium">
              Rate your comfort across the {targetRole.documentedCompetencies.length} documented competencies for {targetRole.title}.
            </p>
            <button
              onClick={() => onNavigate('skills')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Assess Skills Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : skillGaps.length === 0 ? (
          <div className="p-8 bg-[#EBFBF3] rounded-2xl border border-[#42C98A]/30 text-center">
            <div className="w-12 h-12 rounded-2xl bg-[#42C98A] text-white flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-[#172B4D] mb-1">
              Outstanding! You meet all required proficiency targets.
            </h4>
            <p className="text-xs text-[#687A93] max-w-md mx-auto font-medium">
              Your assessed skills match or exceed all baseline requirements for {targetRole.title}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillGaps.map((item) => {
              const isCritical = item.gapCategory === 'CRITICAL_FOCUS';

              return (
                <div
                  key={item.skill.id}
                  className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl flex flex-col justify-between hover:border-[#4D9FFF]/40 transition-colors shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#687A93]">
                        {item.classification === 'ROLE_SPECIFIC' ? 'Role-Specific' : 'Foundational'}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-[#FFF0ED] text-[#FF8A72]'
                            : 'bg-[#EAF4FF] text-[#347DD9]'
                        }`}
                      >
                        {isCritical ? 'Critical Focus' : 'Develop'}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-[#172B4D] mb-1">
                      {item.skill.name}
                    </h4>

                    <p className="text-xs text-[#687A93] font-medium leading-relaxed line-clamp-2">
                      {item.rationale}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DCE8F5] flex items-center justify-between text-xs">
                    <span className="text-[#687A93] font-medium">
                      Current: <strong className="text-[#172B4D]">Stage {item.currentLevel} ({item.currentStageLabel})</strong>
                    </span>
                    <button
                      onClick={() => onNavigate('learning')}
                      className="font-bold text-[#4D9FFF] hover:underline cursor-pointer"
                    >
                      Learn →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Section: YOUR NEXT STEPS */}
      <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE8F5] pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#4D9FFF] block mb-1">
              Curated Roadmap
            </span>
            <h3 className="text-lg font-extrabold text-[#172B4D]">
              YOUR NEXT STEPS
            </h3>
          </div>

          <button
            onClick={() => onNavigate('learning')}
            className="text-xs font-bold text-[#4D9FFF] hover:text-[#347DD9] transition-colors cursor-pointer"
          >
            View Complete Learning Roadmap →
          </button>
        </div>

        {!targetRole ? (
          <div className="py-10 text-center">
            <p className="text-xs text-[#687A93] font-medium">
              Choose your career goal to see your recommended next learning steps.
            </p>
          </div>
        ) : nextSteps.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-xs text-[#687A93] font-medium">
              No pending skill gaps! You are on track for your career goal.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {nextSteps.slice(0, 3).map((step) => {
              const isCompleted = completedLearningIds.includes(step.skill.id);

              return (
                <div
                  key={step.skill.id}
                  className="p-5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-[#4D9FFF]/40 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Big Priority Number */}
                    <div className="w-10 h-10 rounded-2xl bg-[#EAF4FF] text-[#4D9FFF] font-black text-base flex items-center justify-center shrink-0 shadow-xs">
                      {step.priorityNumber}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-[#172B4D]">
                          {step.skill.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#687A93] bg-white px-2 py-0.5 rounded border border-[#DCE8F5]">
                          {step.priorityCategory}
                        </span>
                      </div>

                      <p className="text-xs text-[#687A93] font-medium leading-relaxed max-w-2xl">
                        <strong className="text-[#172B4D]">Why it matters: </strong>
                        {step.whyItMatters}
                      </p>

                      <div className="pt-1 text-xs text-[#172B4D] font-medium flex items-center gap-2">
                        <span className="text-[#687A93]">Free learning resource:</span>
                        <a
                          href={step.resourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-[#4D9FFF] hover:underline inline-flex items-center gap-1"
                        >
                          <span>{step.resourceTitle} ({step.resourceProvider})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('learning')}
                    className="px-4 py-2 bg-white hover:bg-[#EAF4FF] text-[#4D9FFF] border border-[#DCE8F5] hover:border-[#4D9FFF] text-xs font-bold rounded-xl transition-all cursor-pointer shrink-0"
                  >
                    View in Roadmap
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
