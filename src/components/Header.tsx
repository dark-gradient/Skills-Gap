import React from 'react';
import { NavigationTab } from '../types/career';
import { CAREER_ROLES } from '../data/careerData';
import { Briefcase, Menu, Sparkles, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  targetRoleId: string | null;
  studentName: string;
  onOpenProfile: () => void;
  onToggleSidebar?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  targetRoleId,
  studentName,
  onOpenProfile,
  onToggleSidebar,
  onLogout,
}) => {
  const currentRole = CAREER_ROLES.find((r) => r.id === targetRoleId);

  const getSubtitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Where do I stand?';
      case 'career':
        return 'What career do I want?';
      case 'skills':
        return 'What skills do I already have?';
      case 'learning':
        return 'What should I learn next?';
      case 'timeline':
        return 'How should I pace my learning?';
      case 'classroom':
        return 'Shared Cohort & Leaderboard';
      case 'soft_skills':
        return 'Presentation & Interview Mastery';
      case 'progress':
        return 'How far have I progressed?';
      case 'insights':
        return 'Market & Industry Trends';
      default:
        return 'Career Intelligence';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FFFFFF] border-b border-[#DCE8F5] px-4 md:px-8 flex items-center justify-between shadow-[0_1px_3px_rgba(23,43,77,0.03)]">
      {/* Zone 1: Mobile Hamburger & Contextual Title */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-lg text-[#172B4D] hover:bg-[#F2F7FC] transition-colors"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-tight text-[#4D9FFF] hidden sm:inline">
            SKILLGAP
          </span>
          <span className="text-xs text-[#687A93] hidden sm:inline">/</span>
          <span className="text-xs font-semibold text-[#172B4D] tracking-wide">
            {getSubtitle()}
          </span>
        </div>
      </div>

      {/* Zone 2: Target Career Switcher & Profile */}
      <div className="flex items-center gap-3">
        {currentRole ? (
          <button
            onClick={() => onSelectTab('career')}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-lg border border-[#DCE8F5] hover:border-[#4D9FFF]/60 bg-[#F6FAFF] hover:bg-[#EAF4FF] text-[#172B4D] transition-colors cursor-pointer"
          >
            <Briefcase className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span className="text-[#687A93]">Goal:</span>
            <span className="font-semibold truncate max-w-[190px]">
              {currentRole.title}
            </span>
          </button>
        ) : (
          <button
            onClick={() => onSelectTab('career')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg border border-dashed border-[#4D9FFF] bg-[#EAF4FF] text-[#4D9FFF] font-semibold hover:bg-[#E0EEFF] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Career Goal</span>
          </button>
        )}

        {/* Profile Button */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-lg hover:bg-[#F2F7FC] border border-transparent hover:border-[#DCE8F5] transition-all cursor-pointer"
          title="Student Profile & Settings"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white flex items-center justify-center text-xs font-bold shadow-xs">
            {studentName ? studentName.charAt(0).toUpperCase() : 'S'}
          </div>
          <span className="text-xs font-semibold text-[#172B4D] hidden md:inline">
            {studentName || 'Student Profile'}
          </span>
        </button>

        {/* Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 rounded-lg text-[#687A93] hover:text-[#FF8A72] hover:bg-[#FFF0ED] transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
};
