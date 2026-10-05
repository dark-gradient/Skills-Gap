import React, { useState } from 'react';
import { CareerCompetency, CompetencyEvidence, EvidenceLevel } from '../types/career';
import { EVIDENCE_OPTIONS } from '../data/careerData';
import { Check, Info, FileText, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SkillLevelSelectorProps {
  competency: CareerCompetency;
  currentLevel: number;
  evidence?: CompetencyEvidence;
  onChangeLevel: (newLevel: number) => void;
  onChangeEvidence?: (evidence: CompetencyEvidence) => void;
  compact?: boolean;
}

interface LevelStageDefinition {
  level: number;
  label: string;
  meaning: string;
  whatYouCanDo: string;
  evidenceSupport: string;
}

export const STAGE_DEFINITIONS: Record<number, LevelStageDefinition> = {
  0: {
    level: 0,
    label: 'NOT STARTED',
    meaning: 'No prior structured study or hands-on practice in this area yet.',
    whatYouCanDo: 'I have not learned or used this yet.',
    evidenceSupport: 'No prior code, projects, or study completed.',
  },
  1: {
    level: 1,
    label: 'FAMILIAR',
    meaning: 'Able to articulate core terminology, architecture, and purpose, but requires guided walk-throughs to build.',
    whatYouCanDo: 'I understand the basic idea and can recognize the concept, but I cannot use it independently.',
    evidenceSupport: 'Read articles, documentation, or watched introductory lectures.',
  },
  2: {
    level: 2,
    label: 'GUIDED',
    meaning: 'Able to replicate workflows, walk through reference codebases, and complete structured exercise tasks.',
    whatYouCanDo: 'I can follow tutorials, examples or instructions and complete simple tasks with help.',
    evidenceSupport: 'Completed structured lab exercises or tutorial codebases with step-by-step guidance.',
  },
  3: {
    level: 3,
    label: 'INDEPENDENT',
    meaning: 'Able to write code, configure components, and deliver functional outcomes without continuous step-by-step assistance.',
    whatYouCanDo: 'I can use this skill independently to complete a practical task.',
    evidenceSupport: 'Built a standalone script, utility, or project module independently from scratch.',
  },
  4: {
    level: 4,
    label: 'APPLIED',
    meaning: 'Able to investigate edge cases, resolve integration bugs, and make architectural decisions in production.',
    whatYouCanDo: 'I can use this skill in projects, troubleshoot problems and work through unfamiliar situations.',
    evidenceSupport: 'Shipped a substantial academic, personal, or open-source project and diagnosed bugs.',
  },
  5: {
    level: 5,
    label: 'ADVANCED',
    meaning: 'Able to architect end-to-end systems, evaluate complex trade-offs, and optimize performance.',
    whatYouCanDo: 'I can design substantial solutions, evaluate trade-offs, improve implementations and explain my technical decisions.',
    evidenceSupport: 'Architected production systems, led technical decisions, or optimized latency and compute.',
  },
};

export const SkillLevelSelector: React.FC<SkillLevelSelectorProps> = ({
  competency,
  currentLevel,
  evidence,
  onChangeLevel,
  onChangeEvidence,
  compact = false,
}) => {
  const [activeLevelForPanel, setActiveLevelForPanel] = useState<number>(currentLevel);
  const [showEvidence, setShowEvidence] = useState<boolean>(Boolean(evidence?.level && evidence.level !== 'NO_EVIDENCE_YET'));
  const [noteText, setNoteText] = useState<string>(evidence?.note || '');

  const stages = [0, 1, 2, 3, 4, 5] as const;

  const handleSelectLevel = (level: number) => {
    onChangeLevel(level);
    setActiveLevelForPanel(level);
  };

  const handleEvidenceSelect = (evLevel: EvidenceLevel) => {
    if (onChangeEvidence) {
      onChangeEvidence({
        level: evLevel,
        note: noteText.trim() || undefined,
      });
    }
  };

  const handleNoteBlur = () => {
    if (onChangeEvidence && evidence) {
      onChangeEvidence({
        ...evidence,
        note: noteText.trim() || undefined,
      });
    }
  };

  const selectedDef = STAGE_DEFINITIONS[activeLevelForPanel] || STAGE_DEFINITIONS[0];

  return (
    <div className="space-y-5">
      {/* 1. Main Heading System */}
      <div className="border-b border-[#DCE8F5] pb-3 space-y-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <h4 className="text-xs sm:text-sm font-black text-[#172B4D] tracking-tight uppercase">
            HOW WOULD YOU DESCRIBE YOUR EXPERIENCE?
          </h4>
          <span className="text-[10px] font-semibold text-[#8B7CFF] bg-[#F2EFFF] px-2.5 py-0.5 rounded-md self-start sm:self-auto">
            {competency.importance} for Role
          </span>
        </div>

        <p className="text-xs text-[#687A93] font-medium leading-relaxed">
          Choose the description that most closely matches what you can currently do independently.
        </p>

        <p className="text-[10px] text-[#74766F] italic">
          This is a self-assessment used to personalize your learning path. It is not an industry certification.
        </p>
      </div>

      {/* 2. Self-Assessment Stage Cards (STRICTLY CLEAN: LEVEL NUMBER + LABEL ONLY) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((stage) => {
          const isSelected = currentLevel === stage;
          const isInspecting = activeLevelForPanel === stage;
          const def = STAGE_DEFINITIONS[stage];

          return (
            <button
              key={stage}
              type="button"
              onClick={() => handleSelectLevel(stage)}
              className={`p-3 rounded-2xl text-left transition-all duration-150 cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#4D9FFF] border-[#4D9FFF] text-white shadow-[0_4px_16px_rgba(77,159,255,0.35)] ring-2 ring-[#4D9FFF]/30'
                  : isInspecting
                  ? 'bg-[#EAF4FF] border-[#4D9FFF]/60 text-[#172B4D]'
                  : 'bg-white border-[#DCE8F5] text-[#172B4D] hover:border-[#4D9FFF]/40 hover:bg-[#F6FAFF]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider ${
                    isSelected ? 'text-white/90' : 'text-[#687A93]'
                  }`}
                >
                  LEVEL {stage}
                </span>

                {isSelected ? (
                  <span className="w-4 h-4 rounded-full bg-white/25 flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      stage === 0
                        ? 'bg-[#DCE8F5]'
                        : stage <= 2
                        ? 'bg-[#49C7E8]'
                        : stage <= 4
                        ? 'bg-[#4D9FFF]'
                        : 'bg-[#8B7CFF]'
                    }`}
                  />
                )}
              </div>

              <div>
                <span
                  className={`block text-xs font-black tracking-tight ${
                    isSelected ? 'text-white' : 'text-[#172B4D]'
                  }`}
                >
                  {def.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Small Animated Explanation Panel (Opens on click / inspect) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeLevelForPanel}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="p-4 bg-gradient-to-r from-[#EAF4FF] via-white to-[#F6FAFF] border border-[#4D9FFF]/20 rounded-2xl space-y-2 shadow-xs"
        >
          <div className="flex items-center justify-between border-b border-[#DCE8F5]/80 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] bg-white px-2 py-0.5 rounded border border-[#DCE8F5]">
                LEVEL {selectedDef.level} · {selectedDef.label}
              </span>
              <span className="text-[11px] font-bold text-[#172B4D]">
                {currentLevel === selectedDef.level ? 'Your Current Selection' : 'Stage Overview'}
              </span>
            </div>

            <span className="text-[10px] text-[#687A93] font-medium flex items-center gap-1">
              <Info className="w-3 h-3 text-[#4D9FFF]" />
              <span>Behavioral Definition</span>
            </span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#687A93] block">
                What this level means:
              </span>
              <p className="text-[#172B4D] font-bold text-xs">
                "{selectedDef.whatYouCanDo}"
              </p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#687A93] block">
                What you can generally do at this stage:
              </span>
              <p className="text-[#687A93] font-medium text-[11px] leading-relaxed">
                {selectedDef.meaning}
              </p>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#687A93] block">
                Supporting evidence:
              </span>
              <p className="text-[#347DD9] font-medium text-[11px]">
                {selectedDef.evidenceSupport}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4. Optional Evidence & Experience Note */}
      {!compact && (
        <div className="pt-2 border-t border-[#DCE8F5] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#172B4D]">
              Do you have project or practical evidence for this? (Optional)
            </span>
            <span className="text-[10px] text-[#687A93] font-medium">
              Reflects real work in your portfolio
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {EVIDENCE_OPTIONS.map((opt) => {
              const isSelected = evidence?.level === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleEvidenceSelect(opt.id)}
                  className={`p-2.5 text-xs text-left rounded-xl border transition-all cursor-pointer font-medium leading-snug ${
                    isSelected
                      ? 'bg-[#EAF4FF] border-[#4D9FFF] text-[#347DD9] font-bold shadow-2xs'
                      : 'bg-white border-[#DCE8F5] text-[#687A93] hover:text-[#172B4D] hover:bg-[#F2F7FC]'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#4D9FFF]' : 'bg-[#DCE8F5]'
                      }`}
                    />
                    <span>{opt.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Optional Project Note Input */}
          {evidence && evidence.level !== 'NO_EVIDENCE_YET' && (
            <div className="space-y-1.5 pt-1 animate-in fade-in duration-200">
              <label className="text-[11px] font-bold text-[#172B4D] flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#4D9FFF]" />
                <span>Project / Experience Note (Optional)</span>
              </label>
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onBlur={handleNoteBlur}
                placeholder='e.g. "Implemented real-time edge detection in OpenCV for webcam stream"'
                className="w-full px-3.5 py-2 text-xs bg-white border border-[#DCE8F5] rounded-xl text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] font-medium"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
