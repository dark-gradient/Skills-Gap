import React, { useState } from 'react';
import { CareerRole } from '../types/career';
import { ALL_SKILLS, SKILL_LEVEL_LABELS } from '../data/careerData';
import { BarChart3, Info, Sliders } from 'lucide-react';

interface SkillProfileChartProps {
  targetRole: CareerRole | null;
  assessments: Record<string, number>;
  onNavigateToSkills: () => void;
}

interface HoveredSkill {
  name: string;
  category: string;
  currentLevel: number;
  targetLevel: number;
  gap: number;
  x: number;
  y: number;
}

export const SkillProfileChart: React.FC<SkillProfileChartProps> = ({
  targetRole,
  assessments,
  onNavigateToSkills,
}) => {
  const [hovered, setHovered] = useState<HoveredSkill | null>(null);

  if (!targetRole) {
    return null;
  }

  // Target skills for this role
  const requiredSkillIds = Object.keys(targetRole.requiredSkills);
  const data = requiredSkillIds.map((id, index) => {
    const skill = ALL_SKILLS.find((s) => s.id === id);
    const targetLevel = targetRole.requiredSkills[id] || 0;
    const currentLevel = assessments[id] || 0;
    const gap = Math.max(0, targetLevel - currentLevel);

    const barColors = [
      'bg-[#4D9FFF]',
      'bg-[#49C7E8]',
      'bg-[#8B7CFF]',
      'bg-[#42C98A]',
      'bg-[#FF8A72]',
      'bg-[#4D9FFF]',
      'bg-[#49C7E8]',
      'bg-[#8B7CFF]',
      'bg-[#FFD166]',
    ];
    const barColor = barColors[index % barColors.length];

    return {
      id,
      name: skill ? skill.name : id,
      category: skill ? skill.category : 'General',
      currentLevel,
      targetLevel,
      gap,
      barColor,
    };
  });

  const hasAnyAssessed = data.some((d) => d.currentLevel > 0);
  const maxLevel = 5;

  return (
    <div className="relative p-6 bg-[#FFFFFF] border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h4 className="text-base font-bold text-[#172B4D]">
            Skill Benchmark Profile
          </h4>
          <p className="text-xs text-[#687A93] font-medium">
            {hasAnyAssessed
              ? `Comparing your assessed capability against target requirements for ${targetRole.title}`
              : `Your skill profile will appear after your assessment for ${targetRole.title}`}
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#4D9FFF]" />
            <span className="text-[#172B4D]">Your Level</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md border border-dashed border-[#8B7CFF] bg-[#F2EFFF]" />
            <span className="text-[#687A93]">Target Goal</span>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="relative w-full overflow-x-auto pb-2 p-4 bg-[#F6FAFF] rounded-xl border border-[#DCE8F5]/80">
        <div className="min-w-[500px] relative">
          {/* Unassessed Overlay Prompt if no user data */}
          {!hasAnyAssessed && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#F6FAFF]/75 backdrop-blur-[1px] rounded-lg">
              <div className="w-10 h-10 rounded-xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF] mb-2 shadow-xs">
                <Sliders className="w-5 h-5" />
              </div>
              <h5 className="text-xs font-bold text-[#172B4D] mb-1">
                Your skill profile will appear after your assessment
              </h5>
              <p className="text-[11px] text-[#687A93] max-w-xs text-center mb-3 font-medium">
                Rate your existing skills to generate this benchmark chart.
              </p>
              <button
                onClick={onNavigateToSkills}
                className="px-3.5 py-1.5 bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Assess My Skills
              </button>
            </div>
          )}

          {/* Y-Axis Grid Lines */}
          <div className="relative h-48 border-b border-[#DCE8F5] mb-2 flex flex-col justify-between">
            {[5, 4, 3, 2, 1, 0].map((lvl) => (
              <div key={lvl} className="w-full flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold text-[#687A93] w-4 text-right tabular-nums">
                  {lvl}
                </span>
                <div className="flex-1 border-b border-[#DCE8F5]/60" />
              </div>
            ))}

            {/* Bars Column Container */}
            <div className="absolute inset-0 left-6 right-2 flex items-end justify-around gap-3 px-2">
              {data.map((item) => {
                const currentHeight = (item.currentLevel / maxLevel) * 100;
                const targetHeight = (item.targetLevel / maxLevel) * 100;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={(e) => {
                      if (!hasAnyAssessed) return;
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHovered({
                        name: item.name,
                        category: item.category,
                        currentLevel: item.currentLevel,
                        targetLevel: item.targetLevel,
                        gap: item.gap,
                        x: rect.left + rect.width / 2,
                        y: rect.top,
                      });
                    }}
                    onMouseLeave={() => setHovered(null)}
                    className="group relative flex-1 max-w-[52px] h-full flex items-end justify-center cursor-pointer"
                  >
                    {/* Target Bar Outline / Ghost */}
                    <div
                      style={{ height: `${targetHeight}%` }}
                      className="absolute bottom-0 w-full rounded-t-lg border-2 border-dashed border-[#8B7CFF]/50 bg-[#8B7CFF]/5 transition-all duration-200 group-hover:border-[#8B7CFF] group-hover:bg-[#8B7CFF]/15"
                    />

                    {/* Current Student Level Bar (Only drawn if currentLevel > 0) */}
                    {item.currentLevel > 0 && (
                      <div
                        style={{ height: `${currentHeight}%` }}
                        className={`relative z-10 w-full rounded-t-lg ${item.barColor} transition-all duration-500 ease-out group-hover:brightness-105 shadow-xs`}
                      >
                        <span className="absolute -top-4 inset-x-0 text-center text-[10px] font-mono font-bold text-[#172B4D] opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.currentLevel}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* X-Axis Labels */}
          <div className="flex justify-around gap-3 pl-6 pr-2">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex-1 max-w-[52px] text-center"
                title={item.name}
              >
                <span className="text-[11px] font-semibold text-[#172B4D] block truncate">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hovered && hasAnyAssessed && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 px-4 py-3 bg-[#172B4D] text-white rounded-xl shadow-xl text-xs border border-[#4D9FFF]/30"
          style={{ left: hovered.x, top: hovered.y }}
        >
          <div className="font-bold text-sm mb-0.5">{hovered.name}</div>
          <div className="text-[11px] text-[#49C7E8] font-medium mb-2">{hovered.category}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="text-[#DCE8F5]">Your Level:</span>
            <span className="font-bold text-[#49C7E8] text-right">
              {hovered.currentLevel} ({SKILL_LEVEL_LABELS[hovered.currentLevel]})
            </span>
            <span className="text-[#DCE8F5]">Role Target:</span>
            <span className="font-bold text-[#FFD166] text-right">
              {hovered.targetLevel} ({SKILL_LEVEL_LABELS[hovered.targetLevel]})
            </span>
            <span className="text-[#DCE8F5]">Skill Gap:</span>
            <span className="font-bold text-right text-[#FF8A72]">
              {hovered.gap === 0 ? 'On Track' : `-${hovered.gap} Levels`}
            </span>
          </div>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-[#DCE8F5] flex items-center justify-between text-xs text-[#687A93]">
        <span className="inline-flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-[#4D9FFF]" /> Competency bars update directly from your real ratings.
        </span>
        <button
          onClick={onNavigateToSkills}
          className="font-bold text-[#4D9FFF] hover:text-[#347DD9] cursor-pointer"
        >
          {hasAnyAssessed ? 'Update self-assessment →' : 'Begin assessment →'}
        </button>
      </div>
    </div>
  );
};
