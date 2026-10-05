import React, { useState } from 'react';
import { AlertTriangle, X, CheckSquare, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReset: (leaveClassrooms: boolean) => void;
  hasJoinedClassrooms: boolean;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmReset,
  hasJoinedClassrooms,
}) => {
  const [leaveClassrooms, setLeaveClassrooms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirmReset(leaveClassrooms);
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#172B4D]/50 backdrop-blur-xs"
      />

      {/* Modal Surface */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-white border border-[#DCE8F5] rounded-3xl shadow-[0_20px_60px_rgba(23,43,77,0.2)] p-6 sm:p-7 z-10 space-y-5"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0ED] text-[#FF8A72] flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] flex items-center justify-center text-[#687A93] hover:text-[#172B4D] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-xl font-black text-[#172B4D] tracking-tight">
            RESET YOUR PROGRESS?
          </h3>
          <p className="text-xs sm:text-sm text-[#687A93] font-medium leading-relaxed">
            This will remove your personal SkillGap progress and return your account to a fresh starting point.
          </p>
        </div>

        <div className="p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-2 text-xs text-[#172B4D]">
          <span className="font-extrabold text-[10px] uppercase text-[#FF8A72] block">
            What will be removed:
          </span>
          <ul className="text-[11px] text-[#687A93] space-y-1 font-medium list-disc list-inside">
            <li>Selected target career and skills assessments</li>
            <li>Completed projects, learning milestones, and soft-skills practice</li>
            <li>Personal learning timeline and assessment history</li>
          </ul>
        </div>

        {/* Separate Classroom Membership Prompt */}
        {hasJoinedClassrooms && (
          <div
            onClick={() => setLeaveClassrooms(!leaveClassrooms)}
            className="p-3.5 bg-white border border-[#DCE8F5] rounded-2xl flex items-start gap-3 cursor-pointer hover:border-[#4D9FFF]/40 transition-colors"
          >
            <div className="mt-0.5 text-[#4D9FFF]">
              {leaveClassrooms ? (
                <CheckSquare className="w-4 h-4 fill-[#4D9FFF] text-white" />
              ) : (
                <Square className="w-4 h-4 text-[#DCE8F5]" />
              )}
            </div>
            <div className="space-y-0.5 text-xs">
              <span className="font-bold text-[#172B4D] block">
                Leave all classrooms too?
              </span>
              <p className="text-[11px] text-[#687A93] font-medium leading-tight">
                If unchecked, you will remain in your classrooms with zeroed progress scores.
              </p>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            className="w-full sm:w-1/2 py-2.5 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-[#172B4D] text-xs font-bold transition-all cursor-pointer shadow-2xs"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="w-full sm:w-1/2 py-2.5 rounded-xl bg-[#FF8A72] hover:bg-[#E5765F] text-white text-xs font-black tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(255,138,114,0.3)] cursor-pointer"
          >
            {isProcessing ? 'RESETTING...' : 'RESET MY DATA'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
