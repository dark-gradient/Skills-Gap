import React from 'react';
import { CareerRole } from '../types/career';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CareerChosenModalProps {
  role: CareerRole;
  onStartAssessment: () => void;
  onExploreDashboard: () => void;
}

export const CareerChosenModal: React.FC<CareerChosenModalProps> = ({
  role,
  onStartAssessment,
  onExploreDashboard,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172B4D]/35 backdrop-blur-xs p-4 animate-in fade-in duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#DCE8F5] rounded-3xl p-8 sm:p-10 shadow-[0_24px_64px_rgba(23,43,77,0.18)] text-center"
      >
        {/* Visual Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white mx-auto flex items-center justify-center mb-5 shadow-[0_4px_16px_rgba(77,159,255,0.35)]">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-widest text-[#4D9FFF] block mb-1">
          Career Goal Selected
        </span>

        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#172B4D] mb-2">
          Great choice.
        </h2>

        <p className="text-sm font-bold text-[#172B4D] mb-1">
          {role.title}
        </p>

        <p className="text-xs sm:text-sm text-[#687A93] max-w-sm mx-auto mb-8 font-medium leading-relaxed">
          Let's see how your current skills compare against the core competencies required for this role.
        </p>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={onStartAssessment}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Skill Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreDashboard}
            className="w-full py-3 px-6 rounded-xl bg-[#F6FAFF] hover:bg-[#EAF4FF] text-[#172B4D] text-xs font-bold transition-colors cursor-pointer border border-[#DCE8F5]"
          >
            Go to My Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
};
