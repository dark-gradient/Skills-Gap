import React, { useState } from 'react';
import { StudentProfile } from '../types/career';
import { CAREER_ROLES } from '../data/careerData';
import { X, RotateCcw, Activity, User, Target } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateName: (name: string) => void;
  onUpdateMotionMode: (mode: 'full' | 'reduced' | 'off') => void;
  onReset: () => void;
  onOpenResetConfirm?: () => void;
  onSelectRole: (roleId: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateName,
  onUpdateMotionMode,
  onReset,
  onOpenResetConfirm,
  onSelectRole,
}) => {
  const [nameInput, setNameInput] = useState(profile.studentName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateName(nameInput.trim());
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#172B4D]/30 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#DCE8F5] rounded-3xl p-6 sm:p-8 shadow-[0_16px_48px_rgba(23,43,77,0.15)] space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#49C7E8] text-white flex items-center justify-center font-bold text-sm shadow-xs">
              {profile.studentName ? profile.studentName.charAt(0).toUpperCase() : <User className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#172B4D]">
                Student Profile & Workspace
              </h3>
              <p className="text-xs text-[#687A93] font-medium">
                {profile.studentName ? `Signed in as ${profile.studentName}` : 'Personal Career Workspace'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#687A93] hover:text-[#172B4D] hover:bg-[#F2F7FC] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Name */}
        <form onSubmit={handleSaveName} className="space-y-2">
          <label className="text-xs font-bold text-[#172B4D]">
            Your Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Enter your name"
              className="flex-1 px-3.5 py-2 text-xs bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] font-medium"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              {savedSuccess ? 'Saved!' : 'Save'}
            </button>
          </div>
          <p className="text-[11px] text-[#687A93]">
            This name is stored locally in your browser session for personalized greetings.
          </p>
        </form>

        {/* Target Career Goal Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#172B4D] flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span>Target Career Goal</span>
          </label>
          <select
            value={profile.targetRoleId || ''}
            onChange={(e) => onSelectRole(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-[#172B4D] focus:outline-none focus:border-[#4D9FFF] font-medium cursor-pointer"
          >
            <option value="">No career selected</option>
            {CAREER_ROLES.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title}
              </option>
            ))}
          </select>
        </div>

        {/* Ambient Living Background Motion Setting */}
        <div className="p-3.5 bg-[#F6FAFF] rounded-2xl border border-[#DCE8F5] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#4D9FFF]" />
              <span className="text-xs font-bold text-[#172B4D]">
                Ambient Living Background
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase text-[#687A93]">
              {profile.motionMode}
            </span>
          </div>
          <p className="text-[11px] text-[#687A93]">
            Continuous subtle motion reflects dynamic career opportunities.
          </p>
          <div className="grid grid-cols-3 gap-1.5 p-1 bg-white rounded-xl border border-[#DCE8F5] text-xs">
            {(['full', 'reduced', 'off'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onUpdateMotionMode(mode)}
                className={`py-1.5 rounded-lg font-bold capitalize transition-colors cursor-pointer ${
                  profile.motionMode === mode
                    ? 'bg-[#4D9FFF] text-white shadow-xs'
                    : 'text-[#687A93] hover:text-[#172B4D]'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Actions */}
        <div className="pt-2 border-t border-[#DCE8F5] space-y-2">
          <button
            type="button"
            onClick={() => {
              if (onOpenResetConfirm) {
                onClose();
                onOpenResetConfirm();
              } else {
                onReset();
                onClose();
              }
            }}
            className="w-full py-2.5 px-3 text-[#687A93] hover:text-[#FF8A72] hover:bg-[#FFF0ED] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer border border-transparent hover:border-[#FF8A72]/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Progress & Clear Career</span>
          </button>
        </div>
      </div>
    </div>
  );
};
