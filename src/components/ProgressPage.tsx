import React from 'react';
import { CareerRole, StudentProfile } from '../types/career';
import { calculateReadiness } from '../services/careerCalculations';
import { ALL_SKILLS, UNIVERSAL_STAGES } from '../data/careerData';
import {
  TrendingUp,
  Calendar,
  BarChart2,
  Sparkles,
  Sliders,
  ArrowRight,
} from 'lucide-react';

interface ProgressPageProps {
  profile: StudentProfile;
  targetRole: CareerRole | null;
  onNavigateToSkills: () => void;
  onNavigateToLearning: () => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  profile,
  targetRole,
  onNavigateToSkills,
  onNavigateToLearning,
}) => {
  const readiness = calculateReadiness(targetRole, profile.skillAssessments);

  const activeCompetencies = targetRole
    ? targetRole.documentedCompetencies
    : ALL_SKILLS;

  // Real assessed metrics
  const assessedSkillsList = activeCompetencies.filter(
    (c) => profile.skillAssessments[c.id] !== undefined && profile.skillAssessments[c.id] > 0
  );
  const assessedCount = assessedSkillsList.length;
  const improvedCount = activeCompetencies.filter(
    (c) => profile.skillAssessments[c.id] !== undefined && profile.skillAssessments[c.id] >= 3
  ).length;
  const learningCompletedCount = profile.completedLearningIds.filter((id) =>
    activeCompetencies.some((c) => c.id === id)
  ).length;

  const history = profile.assessmentHistory || [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Title */}
      <div className="border-b border-[#DCE8F5] pb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#172B4D]">
          My Progress
        </h2>
        <p className="text-sm text-[#687A93] mt-1 font-medium">
          Track your skill growth, assessed competencies, and milestones toward {targetRole ? targetRole.title : 'your career goal'}.
        </p>
      </div>

      {/* When NO skills assessed yet: Intentional Empty Experience */}
      {assessedCount === 0 ? (
        <div className="space-y-6">
          <div className="relative p-8 sm:p-12 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl text-center shadow-[0_2px_12px_rgba(23,43,77,0.03)] overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF] mx-auto mb-4 shadow-xs">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#172B4D] mb-2">
              Your progress trajectory starts with your first assessment
            </h3>
            <p className="text-xs sm:text-sm text-[#687A93] max-w-md mx-auto mb-6 leading-relaxed font-medium">
              We never fabricate chart data. Once you evaluate your capability across core competencies, your skill distribution and readiness progress will automatically record here.
            </p>
            <button
              onClick={onNavigateToSkills}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Assess My Skills</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Faint Muted Placeholders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 opacity-60">
            <div className="p-6 bg-white border border-dashed border-[#DCE8F5] rounded-2xl text-center py-12">
              <BarChart2 className="w-8 h-8 text-[#687A93]/40 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[#172B4D] mb-1">
                Stage Distribution
              </h4>
              <p className="text-[11px] text-[#687A93] max-w-xs mx-auto">
                Will illustrate your distribution across Familiar, Guided, Independent, Applied, and Advanced stages.
              </p>
            </div>

            <div className="p-6 bg-white border border-dashed border-[#DCE8F5] rounded-2xl text-center py-12">
              <Calendar className="w-8 h-8 text-[#687A93]/40 mx-auto mb-2" />
              <h4 className="text-xs font-bold text-[#172B4D] mb-1">
                Progression Milestones
              </h4>
              <p className="text-[11px] text-[#687A93] max-w-xs mx-auto">
                Will plot verified timestamped changes in your career readiness as you practice.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* 4 Summary Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)]">
              <span className="text-[11px] uppercase font-bold text-[#687A93] block mb-1">
                Competencies Evaluated
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#172B4D] tabular-nums">
                {assessedCount}
              </div>
              <span className="text-xs text-[#687A93] mt-1 block font-medium">
                out of {activeCompetencies.length} {targetRole ? 'role requirements' : 'competencies'}
              </span>
            </div>

            <div className="p-5 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)]">
              <span className="text-[11px] uppercase font-bold text-[#687A93] block mb-1">
                Independent or Applied (Stage 3+)
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#4D9FFF] tabular-nums">
                {improvedCount}
              </div>
              <span className="text-xs text-[#687A93] mt-1 block font-medium">
                capable of building without guidance
              </span>
            </div>

            <div className="p-5 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)]">
              <span className="text-[11px] uppercase font-bold text-[#687A93] block mb-1">
                Roadmap Milestones Finished
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#8B7CFF] tabular-nums">
                {learningCompletedCount}
              </div>
              <span className="text-xs text-[#687A93] mt-1 block font-medium">
                curated resources completed
              </span>
            </div>

            <div className="p-5 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)]">
              <span className="text-[11px] uppercase font-bold text-[#687A93] block mb-1">
                Current Career Readiness
              </span>
              <div className="text-3xl font-extrabold font-mono text-[#42C98A] tabular-nums">
                {readiness !== null ? `${readiness.percentage}%` : 'Not assessed'}
              </div>
              <span className="text-xs text-[#687A93] mt-1 block font-medium">
                {targetRole ? targetRole.title : 'No role selected'}
              </span>
            </div>
          </div>

          {/* Meaningful Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Graph 1: Competency Mastery Distribution */}
            <div className="p-6 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#172B4D]">
                      Evaluated Stage Distribution
                    </h3>
                    <p className="text-xs text-[#687A93] font-medium">
                      Breakdown of your assessed capability stages across role competencies
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF]">
                    <BarChart2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {[5, 4, 3, 2, 1].map((lvl) => {
                    const count = activeCompetencies.filter(
                      (c) => profile.skillAssessments[c.id] === lvl
                    ).length;
                    const pct = Math.round((count / activeCompetencies.length) * 100);

                    const barColors = {
                      5: 'bg-[#42C98A]',
                      4: 'bg-[#4D9FFF]',
                      3: 'bg-[#49C7E8]',
                      2: 'bg-[#8B7CFF]',
                      1: 'bg-[#FF8A72]',
                    }[lvl as 1 | 2 | 3 | 4 | 5];

                    return (
                      <div key={lvl} className="space-y-1">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="font-bold text-[#172B4D]">
                            Stage {lvl}: {UNIVERSAL_STAGES[lvl as 1 | 2 | 3 | 4 | 5].label}
                          </span>
                          <span className="font-mono text-[#687A93] font-semibold">
                            {count} skills ({pct}% of role)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-[#EAF4FF] overflow-hidden">
                          <div
                            style={{ width: `${pct}%` }}
                            className={`h-full rounded-full transition-all duration-500 ease-out ${barColors}`}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#DCE8F5] flex items-center justify-between text-xs text-[#687A93] font-medium">
                <span>Stage 0 (Not Started): {activeCompetencies.length - assessedCount} competencies</span>
                <button
                  onClick={onNavigateToSkills}
                  className="text-[#4D9FFF] font-bold hover:text-[#347DD9] cursor-pointer"
                >
                  Update ratings →
                </button>
              </div>
            </div>

            {/* Graph 2: Readiness Progression History */}
            <div className="p-6 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#172B4D]">
                      Career Readiness Progression
                    </h3>
                    <p className="text-xs text-[#687A93] font-medium">
                      Historical readiness milestones recorded as you assess and learn
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF]">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="relative pl-6 border-l-2 border-[#4D9FFF]/30 space-y-4">
                    {history.map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#4D9FFF] ring-4 ring-white" />
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-bold text-[#172B4D]">
                            {item.targetRoleTitle}
                          </span>
                          <span className="font-mono text-[#687A93]">
                            {item.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span className="font-mono font-bold text-[#4D9FFF]">
                            {item.readinessPercentage}% Readiness
                          </span>
                          <span className="text-[#687A93]">·</span>
                          <span className="text-[#687A93]">
                            {item.assessedSkillsCount} competencies evaluated
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Current Active Point */}
                    {readiness && (
                      <div className="relative">
                        <span className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-[#49C7E8] ring-4 ring-white animate-pulse" />
                        <div className="flex items-baseline justify-between text-xs">
                          <span className="font-bold text-[#172B4D]">
                            Current Standing
                          </span>
                          <span className="text-[10px] font-mono text-[#49C7E8] font-bold">
                            ACTIVE
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span className="font-mono font-bold text-[#42C98A]">
                            {readiness.percentage}% Readiness
                          </span>
                          <span className="text-[#687A93]">·</span>
                          <span className="text-[#687A93]">
                            {assessedCount} competencies evaluated
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-[#DCE8F5] flex items-center justify-between text-xs text-[#687A93] font-medium">
                <span>Trajectories update automatically with your assessments</span>
                <button
                  onClick={onNavigateToLearning}
                  className="text-[#4D9FFF] font-bold hover:text-[#347DD9] cursor-pointer"
                >
                  Continue learning →
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
