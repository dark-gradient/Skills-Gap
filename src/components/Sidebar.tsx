import React from 'react';
import { NavigationTab } from '../types/career';
import {
  Compass,
  Briefcase,
  Sliders,
  GraduationCap,
  TrendingUp,
  Globe,
  Settings,
  Sparkles,
  Users,
  Clock,
  Video,
} from 'lucide-react';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenProfile,
}) => {
  const navItems: { tab: NavigationTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { tab: 'home', label: 'Home', icon: Compass },
    { tab: 'career', label: 'Career Paths', icon: Briefcase },
    { tab: 'skills', label: 'My Skills', icon: Sliders },
    { tab: 'learning', label: 'Learning Roadmap', icon: GraduationCap },
    { tab: 'timeline', label: 'Learning Timeline', icon: Clock },
    { tab: 'classroom', label: 'Classroom', icon: Users },
    { tab: 'soft_skills', label: 'Soft Skills', icon: Video },
    { tab: 'progress', label: 'My Progress', icon: TrendingUp },
    { tab: 'insights', label: 'Career Insights', icon: Globe },
  ];

  return (
    <aside className="w-64 h-full bg-[#FFFFFF] border-r border-[#DCE8F5] flex flex-col justify-between select-none shadow-[1px_0_4px_rgba(23,43,77,0.02)]">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-[#DCE8F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-extrabold tracking-tight text-[#172B4D] leading-none">
                SKILL<span className="text-[#4D9FFF]">GAP</span>
              </h1>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-[#687A93] mt-0.5">
                Career Intelligence
              </p>
            </div>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="p-3 space-y-1.5">
          {navItems.map(({ tab, label, icon: Icon }) => {
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => onSelectTab(tab)}
                className={`w-full relative flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-[#EAF4FF] text-[#347DD9]'
                    : 'text-[#172B4D] hover:text-[#347DD9] hover:bg-[#F2F7FC]'
                }`}
              >
                {/* Active Left Indicator Bar */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-[#4D9FFF] rounded-r-md" />
                )}

                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-[#4D9FFF]' : 'text-[#687A93]'
                  }`}
                />
                <span className="flex-1 text-left">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Action Area */}
      <div className="p-4 border-t border-[#DCE8F5] bg-[#F6FAFF]/60">
        <button
          onClick={onOpenProfile}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-[#172B4D] hover:bg-[#FFFFFF] border border-transparent hover:border-[#DCE8F5] transition-all cursor-pointer shadow-2xs"
        >
          <Settings className="w-4 h-4 text-[#687A93]" />
          <span>Profile & Workspace</span>
        </button>
      </div>
    </aside>
  );
};
