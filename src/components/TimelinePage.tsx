import React, { useState } from 'react';
import {
  CareerRole,
  PersonalTimeline,
  TimelinePaceHours,
  PaceStatus,
} from '../types/career';
import {
  generatePersonalTimeline,
  rebalanceTimeline,
} from '../services/timelineService';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Sliders,
  Check,
  Award,
  Layers,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelinePageProps {
  targetRole: CareerRole | null;
  timeline?: PersonalTimeline;
  onUpdateTimeline: (newTimeline: PersonalTimeline) => void;
  onNavigateToCareer: () => void;
  onNavigateToSkills: () => void;
  onNavigateToLearning: () => void;
}

export const TimelinePage: React.FC<TimelinePageProps> = ({
  targetRole,
  timeline,
  onUpdateTimeline,
  onNavigateToCareer,
  onNavigateToSkills,
  onNavigateToLearning,
}) => {
  // Pacing setup state
  const [selectedHours, setSelectedHours] = useState<TimelinePaceHours>(
    timeline?.hoursPerWeek || '5-7'
  );
  const [hasDeadline, setHasDeadline] = useState<boolean>(
    timeline?.hasDeadline || false
  );
  const [targetDate, setTargetDate] = useState<string>(
    timeline?.targetDate || ''
  );
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);

  // If no career selected yet
  if (!targetRole) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
        <div className="p-8 sm:p-14 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl text-center shadow-[0_4px_24px_rgba(23,43,77,0.04)]">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Clock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D] mb-3">
            Choose a Career Goal to Set Your Learning Pace
          </h2>

          <p className="text-xs sm:text-sm text-[#687A93] max-w-lg mx-auto mb-8 leading-relaxed font-medium">
            Personal timelines are customized to the specific competencies and projects of your chosen career. Select a career to generate your paced weekly schedule.
          </p>

          <button
            onClick={onNavigateToCareer}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
          >
            <span>Explore Career Paths</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Handle timeline generation
  const handleGenerateTimeline = (e: React.FormEvent) => {
    e.preventDefault();
    const newTimeline = generatePersonalTimeline(
      targetRole,
      selectedHours,
      hasDeadline ? targetDate : undefined
    );
    onUpdateTimeline(newTimeline);
  };

  // Toggle milestone completion
  const handleToggleWeek = (weekNumber: number) => {
    if (!timeline) return;
    const updatedPlan = timeline.weeklyPlan.map((node) =>
      node.weekNumber === weekNumber ? { ...node, isCompleted: !node.isCompleted } : node
    );
    const allDone = updatedPlan.every((n) => n.isCompleted);
    onUpdateTimeline({
      ...timeline,
      weeklyPlan: updatedPlan,
      paceStatus: allDone ? 'COMPLETED' : timeline.paceStatus,
    });
  };

  // Rebalance actions
  const handleRebalanceAction = (action: 'SPREAD_MORE_WEEKS' | 'KEEP_PACE' | 'INCREASE_TIME') => {
    if (!timeline) return;
    const rebalanced = rebalanceTimeline(timeline, action);
    onUpdateTimeline(rebalanced);
    setShowRebalanceModal(false);
  };

  // If student hasn't created a personal timeline yet
  if (!timeline || !timeline.weeklyPlan || timeline.weeklyPlan.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-8">
        <div className="border-b border-[#DCE8F5] pb-4">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] block mb-1">
            ANTI-CRAMMING LEARNING TIMELINE
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
            PERSONALIZED LEARNING PACE
          </h1>
          <p className="text-xs sm:text-sm text-[#687A93] mt-1 font-medium">
            "Build your skills consistently, without rushing or cramming."
          </p>
        </div>

        <form
          onSubmit={handleGenerateTimeline}
          className="p-7 sm:p-9 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_4px_24px_rgba(23,43,77,0.04)] space-y-6"
        >
          {/* Availability Selection */}
          <div className="space-y-3">
            <div>
              <label className="text-xs sm:text-sm font-black text-[#172B4D] block">
                How many hours per week can you sustainably dedicate?
              </label>
              <p className="text-[11px] text-[#687A93] font-medium mt-0.5">
                These are personal pacing choices to protect your focus, not industry-mandated requirements.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: '2-4' as TimelinePaceHours, label: '2–4 hrs/week', note: 'Sustainable / Part-time' },
                { id: '5-7' as TimelinePaceHours, label: '5–7 hrs/week', note: 'Steady / Recommended' },
                { id: '8-12' as TimelinePaceHours, label: '8–12 hrs/week', note: 'Accelerated' },
                { id: '12+' as TimelinePaceHours, label: '12+ hrs/week', note: 'Immersive Focus' },
              ].map((pace) => {
                const isSelected = selectedHours === pace.id;
                return (
                  <button
                    key={pace.id}
                    type="button"
                    onClick={() => setSelectedHours(pace.id)}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#EAF4FF] border-[#4D9FFF] shadow-xs'
                        : 'bg-[#F6FAFF] border-[#DCE8F5] hover:border-[#4D9FFF]/40'
                    }`}
                  >
                    <span className={`text-xs font-black ${isSelected ? 'text-[#347DD9]' : 'text-[#172B4D]'}`}>
                      {pace.label}
                    </span>
                    <span className="text-[10px] text-[#687A93] font-medium mt-1">
                      {pace.note}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deadline or No Deadline Choice */}
          <div className="pt-2 border-t border-[#DCE8F5] space-y-3">
            <div>
              <label className="text-xs sm:text-sm font-black text-[#172B4D] block">
                Do you have a target completion deadline?
              </label>
              <p className="text-[11px] text-[#687A93] font-medium mt-0.5">
                Choose what works for your academic semester or personal schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setHasDeadline(false)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  !hasDeadline
                    ? 'bg-[#EAF4FF] border-[#4D9FFF] shadow-xs'
                    : 'bg-[#F6FAFF] border-[#DCE8F5] hover:border-[#4D9FFF]/40'
                }`}
              >
                <span className="text-xs font-black text-[#172B4D] block">
                  I DON'T HAVE A DEADLINE
                </span>
                <span className="text-[11px] text-[#687A93] font-medium mt-0.5 block">
                  Generate a balanced, open-ended milestone schedule based solely on my weekly availability.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setHasDeadline(true)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  hasDeadline
                    ? 'bg-[#EAF4FF] border-[#4D9FFF] shadow-xs'
                    : 'bg-[#F6FAFF] border-[#DCE8F5] hover:border-[#4D9FFF]/40'
                }`}
              >
                <span className="text-xs font-black text-[#172B4D] block">
                  I HAVE A TARGET DATE
                </span>
                <span className="text-[11px] text-[#687A93] font-medium mt-0.5 block">
                  Target a specific semester end or internship application deadline.
                </span>
              </button>
            </div>

            {hasDeadline && (
              <div className="pt-2 animate-in fade-in duration-150">
                <label className="text-[11px] font-black uppercase text-[#687A93] block mb-1">
                  Target Completion Date
                </label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="px-4 py-2.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-black tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer flex items-center justify-center gap-2"
            >
              <span>CREATE MY PERSONAL LEARNING PACE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    );
  }

  // TIMELINE ACTIVE DASHBOARD
  const completedWeeks = timeline.weeklyPlan.filter((w) => w.isCompleted).length;
  const totalWeeks = timeline.weeklyPlan.length;
  const progressPercent = Math.round((completedWeeks / totalWeeks) * 100);

  const getStatusBadge = (status: PaceStatus) => {
    switch (status) {
      case 'ON_TRACK':
        return { label: 'ON TRACK', bg: 'bg-[#EBFBF3]', text: 'text-[#42C98A]' };
      case 'A_LITTLE_BEHIND':
        return { label: 'A LITTLE BEHIND', bg: 'bg-[#FFF0ED]', text: 'text-[#FF8A72]' };
      case 'REBALANCED':
        return { label: 'REBALANCED', bg: 'bg-[#EAF4FF]', text: 'text-[#347DD9]' };
      case 'COMPLETED':
        return { label: 'COMPLETED', bg: 'bg-[#EBFBF3]', text: 'text-[#42C98A]' };
    }
  };

  const badge = getStatusBadge(timeline.paceStatus);

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* 1. Header Bar */}
      <div className="border-b border-[#DCE8F5] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] bg-[#EAF4FF] px-2.5 py-0.5 rounded-md border border-[#4D9FFF]/20">
              PERSONALIZED LEARNING PACE
            </span>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${badge.bg} ${badge.text}`}>
              {badge.label}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
            MY LEARNING TIMELINE
          </h1>
          <p className="text-xs sm:text-sm text-[#687A93] mt-0.5 font-medium">
            Sustainable weekly distribution for {targetRole.title}. Paced at {timeline.hoursPerWeek} hrs/week.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowRebalanceModal(true)}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-[#172B4D] text-xs font-bold transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span>Rebalance Plan</span>
          </button>
        </div>
      </div>

      {/* 2. Pace Status Card */}
      <div className="p-6 sm:p-7 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#687A93]">
            Schedule Overview
          </span>
          <h2 className="text-base sm:text-lg font-black text-[#172B4D]">
            Your current pace puts you on track for steady skill acquisition.
          </h2>
          <p className="text-xs text-[#687A93] font-medium">
            Completed <strong className="text-[#172B4D]">{completedWeeks}</strong> of <strong className="text-[#172B4D]">{totalWeeks}</strong> weeks. Focus on 1–3 meaningful outcomes per week.
          </p>
        </div>

        <div className="w-full sm:w-48 space-y-1.5 shrink-0">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#687A93]">Progress</span>
            <span className="text-[#4D9FFF]">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-[#EAF4FF] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4D9FFF] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Timeline Visualization (Weeks) */}
      <div className="space-y-4">
        <h3 className="text-xs font-black uppercase tracking-wider text-[#172B4D]">
          WEEK-BY-WEEK MILESTONE SCHEDULE
        </h3>

        <div className="space-y-3">
          {timeline.weeklyPlan.map((node) => (
            <div
              key={node.weekNumber}
              className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                node.isCompleted
                  ? 'bg-[#EBFBF3]/60 border-[#42C98A]/30 text-[#172B4D]'
                  : node.isCurrentWeek
                  ? 'bg-gradient-to-r from-[#EAF4FF] via-white to-[#F6FAFF] border-[#4D9FFF] shadow-xs'
                  : 'bg-white border-[#DCE8F5]'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Checkbox circle */}
                <button
                  type="button"
                  onClick={() => handleToggleWeek(node.weekNumber)}
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                    node.isCompleted
                      ? 'bg-[#42C98A] text-white'
                      : 'bg-white border border-[#DCE8F5] text-transparent hover:border-[#4D9FFF]'
                  }`}
                  aria-label={`Mark Week ${node.weekNumber} as completed`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </button>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-[#4D9FFF] font-mono">
                      WEEK {node.weekNumber}
                    </span>
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#EAF4FF] text-[#347DD9]">
                      {node.milestoneType}
                    </span>
                    {node.isCurrentWeek && (
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-[#4D9FFF] text-white">
                        Current Focus
                      </span>
                    )}
                  </div>

                  <h4 className={`text-sm sm:text-base font-black ${node.isCompleted ? 'line-through text-[#687A93]' : 'text-[#172B4D]'}`}>
                    {node.title}
                  </h4>

                  <p className="text-xs text-[#687A93] font-medium leading-relaxed max-w-2xl">
                    {node.focus}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {node.outcomes.map((outcome, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium text-[#172B4D] bg-[#F6FAFF] border border-[#DCE8F5] px-2.5 py-0.5 rounded-lg"
                      >
                        ✓ {outcome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleWeek(node.weekNumber)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    node.isCompleted
                      ? 'bg-[#EBFBF3] text-[#42C98A] border border-[#42C98A]/30'
                      : 'bg-[#F6FAFF] hover:bg-[#EAF4FF] text-[#687A93] hover:text-[#172B4D] border border-[#DCE8F5]'
                  }`}
                >
                  {node.isCompleted ? 'Completed' : 'Mark Week Done'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. REBALANCE MODAL (Catch-up protection without judgment) */}
      <AnimatePresence>
        {showRebalanceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRebalanceModal(false)}
              className="fixed inset-0 bg-[#172B4D]/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-md bg-white border border-[#DCE8F5] rounded-3xl shadow-[0_20px_60px_rgba(23,43,77,0.2)] p-7 z-10 space-y-5"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#4D9FFF] bg-[#EAF4FF] px-2.5 py-0.5 rounded">
                    Catch-Up Protection
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#172B4D]">
                  Let's rebalance your plan
                </h3>
                <p className="text-xs text-[#687A93] font-medium leading-relaxed">
                  Life happens. SkillGap adapts your schedule without penalty so you can continue learning at a healthy pace.
                </p>
              </div>

              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleRebalanceAction('SPREAD_MORE_WEEKS')}
                  className="w-full p-4 rounded-2xl border border-[#DCE8F5] hover:border-[#4D9FFF] hover:bg-[#F6FAFF] text-left transition-all cursor-pointer space-y-0.5"
                >
                  <span className="text-xs font-black text-[#172B4D] block">
                    SPREAD THIS OVER MORE WEEKS
                  </span>
                  <span className="text-[11px] text-[#687A93] font-medium block">
                    Add 2 buffer weeks to ease the workload while keeping weekly study light.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRebalanceAction('KEEP_PACE')}
                  className="w-full p-4 rounded-2xl border border-[#DCE8F5] hover:border-[#4D9FFF] hover:bg-[#F6FAFF] text-left transition-all cursor-pointer space-y-0.5"
                >
                  <span className="text-xs font-black text-[#172B4D] block">
                    KEEP MY CURRENT PACE
                  </span>
                  <span className="text-[11px] text-[#687A93] font-medium block">
                    Continue with the current timeline schedule without modifications.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleRebalanceAction('INCREASE_TIME')}
                  className="w-full p-4 rounded-2xl border border-[#DCE8F5] hover:border-[#4D9FFF] hover:bg-[#F6FAFF] text-left transition-all cursor-pointer space-y-0.5"
                >
                  <span className="text-xs font-black text-[#172B4D] block">
                    INCREASE WEEKLY TIME
                  </span>
                  <span className="text-[11px] text-[#687A93] font-medium block">
                    Dedicate additional study hours per week to maintain the original date.
                  </span>
                </button>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowRebalanceModal(false)}
                  className="text-xs font-bold text-[#687A93] hover:text-[#172B4D] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
