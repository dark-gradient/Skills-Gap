import React from 'react';
import { Sparkles, ArrowRight, Compass, CheckCircle2 } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartAnalysis: () => void;
  onExploreCareers: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({
  isOpen,
  onClose,
  onStartAnalysis,
  onExploreCareers,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172B4D]/35 backdrop-blur-xs p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-[#FFFFFF] border border-[#DCE8F5] rounded-3xl p-8 shadow-[0_20px_60px_rgba(23,43,77,0.18)] text-center">
        {/* Subtle geometric brand mark */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white mx-auto flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(77,159,255,0.35)]">
          <Sparkles className="w-8 h-8" />
        </div>

        <span className="text-xs uppercase tracking-widest font-extrabold text-[#4D9FFF] mb-2 block">
          Student Career Intelligence
        </span>

        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#172B4D] mb-3">
          SKILL<span className="text-[#4D9FFF]">GAP</span>
        </h2>

        <p className="text-base text-[#172B4D] font-bold max-w-md mx-auto mb-2">
          "Know where you stand. Know where you're going."
        </p>

        <p className="text-xs text-[#687A93] max-w-md mx-auto mb-8 leading-relaxed font-medium">
          Evaluate your real skills against industry benchmarks, identify your critical competency gaps, and follow a personalized free learning roadmap.
        </p>

        {/* The 5 Student Questions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left mb-8 max-w-md mx-auto text-xs">
          {[
            'What career do I want?',
            'What skills do I already have?',
            'What skills am I missing?',
            'What should I learn next?',
          ].map((q, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl flex items-center gap-2.5 text-[#172B4D] font-medium"
            >
              <CheckCircle2 className="w-4 h-4 text-[#42C98A] shrink-0" />
              <span>{q}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onClose();
              onStartAnalysis();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(77,159,255,0.3)]"
          >
            <span>Start Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              onClose();
              onExploreCareers();
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F2F7FC] text-[#172B4D] text-xs font-bold flex items-center justify-center gap-2 border border-[#DCE8F5] transition-all cursor-pointer shadow-xs"
          >
            <Compass className="w-4 h-4 text-[#4D9FFF]" />
            <span>Explore Careers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
