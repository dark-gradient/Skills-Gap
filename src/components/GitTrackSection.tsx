import React, { useState } from 'react';
import {
  UNIVERSAL_GIT_PROGRESSION,
  GIT_CORE_RESOURCE,
  GIT_FIRST_PROJECT_CHECKLIST,
} from '../data/learningProjectsData';
import {
  GitBranch,
  FolderGit2,
  GitCommit,
  GitPullRequest,
  GitMerge,
  ExternalLink,
  Check,
  Award,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface GitTrackSectionProps {
  completedGitStepIds?: number[];
  onToggleGitStepCompleted?: (stepId: number) => void;
}

export const GitTrackSection: React.FC<GitTrackSectionProps> = ({
  completedGitStepIds = [],
  onToggleGitStepCompleted,
}) => {
  const [activeStepTab, setActiveStepTab] = useState<'progression' | 'project'>('project');

  return (
    <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-6">
      {/* Header */}
      <div className="border-b border-[#DCE8F5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] bg-[#EAF4FF] px-2.5 py-0.5 rounded-md border border-[#4D9FFF]/20">
              UNIVERSAL TRACK FOR EVERY CAREER
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-[#172B4D] mt-1">
            GIT & GITHUB — FOUNDATIONAL FOR EVERY CAREER
          </h2>
          <p className="text-xs text-[#687A93] font-medium mt-0.5">
            Every technology professional must be comfortable with version control, pull requests, and showcasing public project repositories.
          </p>
        </div>

        <div className="flex items-center gap-2 p-1 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-bold shrink-0">
          <button
            type="button"
            onClick={() => setActiveStepTab('project')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeStepTab === 'project'
                ? 'bg-[#4D9FFF] text-white shadow-2xs'
                : 'text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            Practical Git Project ({completedGitStepIds.length}/8)
          </button>
          <button
            type="button"
            onClick={() => setActiveStepTab('progression')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeStepTab === 'progression'
                ? 'bg-[#4D9FFF] text-white shadow-2xs'
                : 'text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            8-Step Progression
          </button>
        </div>
      </div>

      {/* Featured Verified GitHub Skills Resource Card */}
      <div className="p-5 bg-gradient-to-r from-[#EAF4FF] via-white to-[#F2EFFF] border border-[#4D9FFF]/30 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white text-[#172B4D] border border-[#DCE8F5] flex items-center justify-center shrink-0 shadow-xs">
            <FolderGit2 className="w-6 h-6 text-[#4D9FFF]" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#347DD9]">
                VERIFIED HANDS-ON RESOURCE · GITHUB SKILLS
              </span>
              <span className="text-[10px] font-bold text-[#42C98A] bg-[#EBFBF3] px-2 py-0.5 rounded">
                Free Interactive Course
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
              {GIT_CORE_RESOURCE.title}
            </h3>

            <p className="text-xs text-[#687A93] font-medium max-w-2xl leading-relaxed">
              {GIT_CORE_RESOURCE.description}
            </p>
          </div>
        </div>

        <a
          href={GIT_CORE_RESOURCE.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 self-start md:self-center"
        >
          <span>Open GitHub Skills</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* TAB 1: PRACTICAL GIT PROJECT CHECKLIST */}
      {activeStepTab === 'project' && (
        <div className="space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE8F5] pb-2">
            <div>
              <span className="text-[10px] font-black uppercase text-[#4D9FFF] block">
                PROJECT-BASED ACTIVITY
              </span>
              <h3 className="text-sm font-black text-[#172B4D]">
                GIT PROJECT: "Publish Your First Professional Project"
              </h3>
            </div>
            <span className="text-xs font-semibold text-[#687A93]">
              Check off steps as you complete them in terminal & GitHub
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GIT_FIRST_PROJECT_CHECKLIST.map((item) => {
              const isDone = completedGitStepIds.includes(item.step);

              return (
                <div
                  key={item.step}
                  onClick={() => onToggleGitStepCompleted && onToggleGitStepCompleted(item.step)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isDone
                      ? 'bg-[#EBFBF3] border-[#42C98A]/40 text-[#172B4D]'
                      : 'bg-[#F6FAFF] border-[#DCE8F5] hover:border-[#4D9FFF]/40 text-[#172B4D]'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      isDone
                        ? 'bg-[#42C98A] text-white'
                        : 'bg-white border border-[#DCE8F5] text-[#687A93]'
                    }`}
                  >
                    {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : item.step}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-black text-[#172B4D]">
                        {item.label}
                      </h4>
                      {isDone && (
                        <span className="text-[9px] font-extrabold uppercase text-[#42C98A]">
                          Done
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#687A93] font-medium leading-relaxed">
                      {item.instruction}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: 8-STEP PROGRESSION */}
      {activeStepTab === 'progression' && (
        <div className="space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {UNIVERSAL_GIT_PROGRESSION.map((step) => {
              const isDone = completedGitStepIds.includes(step.id);

              return (
                <div
                  key={step.id}
                  className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black text-[#4D9FFF] font-mono">
                        STEP 0{step.id}
                      </span>
                      {isDone && (
                        <span className="w-4 h-4 rounded-full bg-[#42C98A] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-black text-[#172B4D]">
                      {step.title}
                    </h4>

                    <p className="text-[11px] text-[#687A93] font-medium mt-1 leading-snug">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DCE8F5] text-[10px] text-[#347DD9] font-mono bg-white p-2 rounded-lg border border-[#DCE8F5]/60">
                    {step.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
