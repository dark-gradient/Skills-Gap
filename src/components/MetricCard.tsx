import React from 'react';
import { LucideIcon } from 'lucide-react';

export type MetricAccent = 'blue' | 'coral' | 'purple' | 'cyan' | 'green';

interface MetricCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
  accent?: MetricAccent;
  badge?: string;
  isAssessed?: boolean;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  accent = 'blue',
  badge,
  isAssessed = true,
  onClick,
}) => {
  const accentStyles = {
    blue: {
      iconBg: 'bg-[#EAF4FF] text-[#4D9FFF]',
      labelColor: 'text-[#4D9FFF]',
      borderHover: 'hover:border-[#4D9FFF]/50',
      badgeBg: 'bg-[#EAF4FF] text-[#347DD9]',
    },
    coral: {
      iconBg: 'bg-[#FFF0ED] text-[#FF8A72]',
      labelColor: 'text-[#FF8A72]',
      borderHover: 'hover:border-[#FF8A72]/50',
      badgeBg: 'bg-[#FFF0ED] text-[#FF8A72]',
    },
    purple: {
      iconBg: 'bg-[#F2EFFF] text-[#8B7CFF]',
      labelColor: 'text-[#8B7CFF]',
      borderHover: 'hover:border-[#8B7CFF]/50',
      badgeBg: 'bg-[#F2EFFF] text-[#8B7CFF]',
    },
    cyan: {
      iconBg: 'bg-[#E8F9FD] text-[#49C7E8]',
      labelColor: 'text-[#49C7E8]',
      borderHover: 'hover:border-[#49C7E8]/50',
      badgeBg: 'bg-[#E8F9FD] text-[#009CBF]',
    },
    green: {
      iconBg: 'bg-[#EBFBF3] text-[#42C98A]',
      labelColor: 'text-[#42C98A]',
      borderHover: 'hover:border-[#42C98A]/50',
      badgeBg: 'bg-[#EBFBF3] text-[#2EA46D]',
    },
  }[accent];

  return (
    <div
      onClick={onClick}
      className={`group relative p-5 bg-[#FFFFFF] border border-[#DCE8F5] rounded-2xl transition-all duration-200 shadow-[0_2px_8px_rgba(23,43,77,0.03)] ${
        onClick
          ? `cursor-pointer ${accentStyles.borderHover} hover:shadow-[0_4px_16px_rgba(77,159,255,0.08)]`
          : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider font-bold text-[#687A93]">
          {label}
        </span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-105 shadow-xs ${accentStyles.iconBg}`}
        >
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <span
          className={`text-2xl md:text-3xl font-extrabold font-mono tracking-tight tabular-nums text-[#172B4D]`}
        >
          {value}
        </span>
        {badge && (
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${accentStyles.badgeBg}`}>
            {badge}
          </span>
        )}
      </div>

      <p className="text-xs text-[#687A93] truncate font-medium">
        {subtext}
      </p>
    </div>
  );
};
