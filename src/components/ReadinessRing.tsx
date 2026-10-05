import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ReadinessRingProps {
  percentage: number | null;
  size?: number;
  strokeWidth?: number;
  onStartAssessment?: () => void;
  targetRoleTitle?: string;
}

export const ReadinessRing: React.FC<ReadinessRingProps> = ({
  percentage,
  size = 230,
  strokeWidth = 14,
  onStartAssessment,
  targetRoleTitle,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    if (percentage === null) {
      setAnimatedScore(0);
      return;
    }

    let start = 0;
    const end = percentage;
    const duration = 850;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // smooth easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(start + (end - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = percentage !== null
    ? circumference - (animatedScore / 100) * circumference
    : circumference;

  if (percentage === null) {
    return (
      <div
        className="flex flex-col items-center justify-center p-8 bg-[#FFFFFF] border border-[#DCE8F5] rounded-2xl text-center shadow-[0_2px_8px_rgba(23,43,77,0.03)]"
        style={{ minHeight: `${size + 40}px` }}
      >
        <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] flex items-center justify-center text-[#4D9FFF] mb-4 shadow-xs">
          <Sparkles className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-wider font-bold text-[#687A93] mb-1">
          Career Readiness
        </span>
        <h4 className="text-xl font-bold text-[#172B4D] mb-2">
          Not Assessed Yet
        </h4>
        <p className="text-xs text-[#687A93] max-w-xs mb-6 leading-relaxed font-medium">
          Complete your skill self-assessment to discover where you stand for{' '}
          <span className="font-semibold text-[#4D9FFF]">
            {targetRoleTitle || 'your selected career'}
          </span>
          .
        </p>
        {onStartAssessment && (
          <button
            onClick={onStartAssessment}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_12px_rgba(77,159,255,0.25)] cursor-pointer"
          >
            <span>Start Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }

  let statusLabel = 'Getting Started';
  let statusBadgeColor = 'bg-[#FFF0ED] text-[#FF8A72]';
  if (percentage >= 75) {
    statusLabel = 'Strongly Prepared';
    statusBadgeColor = 'bg-[#EBFBF3] text-[#42C98A]';
  } else if (percentage >= 45) {
    statusLabel = 'Developing Readiness';
    statusBadgeColor = 'bg-[#EAF4FF] text-[#4D9FFF]';
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#FFFFFF] border border-[#DCE8F5] rounded-2xl shadow-[0_2px_8px_rgba(23,43,77,0.03)]">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="readinessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4D9FFF" />
              <stop offset="100%" stopColor="#49C7E8" />
            </linearGradient>
          </defs>

          {/* Background Light Blue Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#EAF4FF"
            strokeWidth={strokeWidth}
          />
          {/* Active Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#readinessGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-75 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#687A93] mb-0.5">
            Readiness
          </span>
          <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-[#172B4D] tabular-nums">
            {animatedScore}%
          </div>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${statusBadgeColor}`}>
            {statusLabel}
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-[#687A93] max-w-xs font-medium">
          Calculated for{' '}
          <span className="font-bold text-[#172B4D]">
            {targetRoleTitle}
          </span>
        </p>
      </div>
    </div>
  );
};
