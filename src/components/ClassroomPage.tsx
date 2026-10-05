import React, { useState, useEffect } from 'react';
import {
  Classroom,
  ClassroomMember,
  StudentProfile,
  CareerRole,
} from '../types/career';
import { apiClient } from '../services/apiClient';
import {
  Users,
  Plus,
  LogIn,
  Copy,
  Check,
  Trophy,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FolderGit2,
  BookOpen,
  Award,
  AlertCircle,
  Trash2,
  RefreshCw,
  LogOut,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ClassroomPageProps {
  currentProfile: StudentProfile;
  targetRole: CareerRole | null;
  onNavigateToCareer: () => void;
  onNavigateToLearning: () => void;
}

export const ClassroomPage: React.FC<ClassroomPageProps> = ({
  currentProfile,
  targetRole,
  onNavigateToCareer,
  onNavigateToLearning,
}) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [activeClassroom, setActiveClassroom] = useState<Classroom | null>(null);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Modal forms
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  // Create form fields
  const [newClassName, setNewClassName] = useState('');
  const [newInstructorName, setNewInstructorName] = useState(currentProfile.studentName || '');
  const [newCourseName, setNewCourseName] = useState('');
  const [newBatchSection, setNewBatchSection] = useState('');
  const [newTargetDate, setNewTargetDate] = useState('');

  // Join form fields
  const [joinCode, setJoinCode] = useState('');

  // Load classrooms on mount
  useEffect(() => {
    loadUserClassrooms();
  }, [currentProfile.userId]);

  const loadUserClassrooms = async () => {
    if (!currentProfile.userId) return;
    setIsLoading(true);
    try {
      const list = await apiClient.fetchClassrooms(currentProfile.userId);
      setClassrooms(list);
      if (list.length > 0 && !activeClassroom) {
        selectClassroom(list[0].code);
      }
    } catch (err: any) {
      console.warn('Error loading classrooms:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectClassroom = async (code: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await apiClient.fetchClassroomDetails(code);
      setActiveClassroom(data.classroom);
      setStats(data.stats);
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not load classroom details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCreateClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProfile.userId) return;

    if (!newClassName.trim() || !newInstructorName.trim()) {
      setErrorMessage('Class name and instructor name are required.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const created = await apiClient.createClassroom({
        name: newClassName.trim(),
        instructorName: newInstructorName.trim(),
        courseName: newCourseName.trim() || undefined,
        batchSection: newBatchSection.trim() || undefined,
        targetDate: newTargetDate.trim() || undefined,
        ownerId: currentProfile.userId,
        ownerDisplayName: currentProfile.studentName,
      });

      setShowCreateModal(false);
      setSuccessMessage(`Classroom created! Share code: ${created.code}`);
      setClassrooms((prev) => [...prev, created]);
      selectClassroom(created.code);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create classroom.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinClassroom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProfile.userId) return;

    if (!joinCode.trim()) {
      setErrorMessage('Please enter a valid 5-character class code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const joined = await apiClient.joinClassroom({
        code: joinCode.trim(),
        userId: currentProfile.userId,
        displayName: currentProfile.studentName || 'Student',
        targetRoleTitle: targetRole?.title,
        completedProjectsCount: (currentProfile.completedProjectIds || []).length,
        completedMilestonesCount:
          (currentProfile.completedProjectIds || []).length +
          (currentProfile.completedGitStepIds || []).length +
          (currentProfile.completedSoftSkillIds || []).length,
      });

      setShowJoinModal(false);
      setJoinCode('');
      setSuccessMessage(`Successfully joined ${joined.name}!`);
      loadUserClassrooms();
      selectClassroom(joined.code);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to join classroom. Check code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveClass = async () => {
    if (!activeClassroom || !currentProfile.userId) return;
    if (!confirm(`Are you sure you want to leave ${activeClassroom.name}?`)) return;

    setIsLoading(true);
    try {
      await apiClient.leaveClassroom(activeClassroom.code, currentProfile.userId);
      setClassrooms((prev) => prev.filter((c) => c.code !== activeClassroom.code));
      setActiveClassroom(null);
      setStats(null);
      setSuccessMessage('You have left the classroom.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to leave classroom.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerateCode = async () => {
    if (!activeClassroom || !currentProfile.userId) return;
    try {
      const newCode = await apiClient.regenerateClassCode(activeClassroom.code, currentProfile.userId);
      setActiveClassroom({ ...activeClassroom, code: newCode });
      setSuccessMessage(`Class code regenerated: ${newCode}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to regenerate code.');
    }
  };

  const handleDeleteClass = async () => {
    if (!activeClassroom || !currentProfile.userId) return;
    if (!confirm(`DELETE CLASSROOM "${activeClassroom.name}"? This action cannot be undone.`)) return;

    setIsLoading(true);
    try {
      await apiClient.deleteClassroom(activeClassroom.code, currentProfile.userId);
      setClassrooms((prev) => prev.filter((c) => c.code !== activeClassroom.code));
      setActiveClassroom(null);
      setStats(null);
      setSuccessMessage('Classroom deleted.');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete classroom.');
    } finally {
      setIsLoading(false);
    }
  };

  const isOwner = activeClassroom?.ownerId === currentProfile.userId;

  // Empty state if user is not in any classrooms
  if (classrooms.length === 0 && !activeClassroom) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="p-8 sm:p-14 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl text-center shadow-[0_4px_24px_rgba(23,43,77,0.04)] space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4D9FFF] to-[#8B7CFF] text-white flex items-center justify-center mx-auto shadow-[0_4px_16px_rgba(77,159,255,0.25)]">
            <Users className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
              You're not in a classroom yet.
            </h2>
            <p className="text-xs sm:text-sm text-[#687A93] max-w-md mx-auto leading-relaxed font-medium">
              Join your university section, bootcamp cohort, or study group to see peer preparation progress and shared milestones.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setErrorMessage(null);
                setShowJoinModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(77,159,255,0.3)] cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>JOIN CLASSROOM</span>
            </button>

            <button
              onClick={() => {
                setErrorMessage(null);
                setShowCreateModal(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-[#172B4D] text-xs font-bold transition-all shadow-2xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#4D9FFF]" />
              <span>CREATE CLASSROOM</span>
            </button>
          </div>
        </div>

        {/* Join Modal */}
        {showJoinModal && renderJoinModal()}
        {/* Create Modal */}
        {showCreateModal && renderCreateModal()}
      </div>
    );
  }

  function renderJoinModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowJoinModal(false)}
          className="fixed inset-0 bg-[#172B4D]/50 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md bg-white border border-[#DCE8F5] rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(23,43,77,0.2)] z-10 space-y-4"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#172B4D]">
              JOIN A CLASSROOM
            </h3>
            <p className="text-xs text-[#687A93] font-medium">
              Enter the unique 5-character class code provided by your instructor or cohort lead.
            </p>
          </div>

          <form onSubmit={handleJoinClassroom} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-[#687A93] block">
                Class Code
              </label>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                placeholder="SKG-7K4P2"
                required
                className="w-full px-4 py-2.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-sm font-mono font-bold text-[#172B4D] tracking-wider focus:outline-none focus:border-[#4D9FFF] uppercase"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowJoinModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-xs font-bold text-[#172B4D]"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-1/2 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-black tracking-wider uppercase transition-all shadow-xs"
              >
                {isLoading ? 'JOINING...' : 'JOIN CLASS'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  function renderCreateModal() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowCreateModal(false)}
          className="fixed inset-0 bg-[#172B4D]/50 backdrop-blur-xs"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative w-full max-w-md bg-white border border-[#DCE8F5] rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(23,43,77,0.2)] z-10 space-y-4"
        >
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#172B4D]">
              CREATE A CLASSROOM
            </h3>
            <p className="text-xs text-[#687A93] font-medium">
              Create a collaborative cohort and invite students using a secure class code.
            </p>
          </div>

          <form onSubmit={handleCreateClassroom} className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-[#687A93] block">
                Class Name *
              </label>
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                placeholder="e.g. AI Engineering Spring 2026"
                required
                className="w-full px-3.5 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-[#687A93] block">
                Instructor / Owner Name *
              </label>
              <input
                type="text"
                value={newInstructorName}
                onChange={(e) => setNewInstructorName(e.target.value)}
                placeholder="e.g. Prof. Raman"
                required
                className="w-full px-3.5 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-[#687A93] block">
                  Course Name (Opt)
                </label>
                <input
                  type="text"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  placeholder="e.g. CS231n"
                  className="w-full px-3.5 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black uppercase text-[#687A93] block">
                  Batch / Section (Opt)
                </label>
                <input
                  type="text"
                  value={newBatchSection}
                  onChange={(e) => setNewBatchSection(e.target.value)}
                  placeholder="e.g. Section B"
                  className="w-full px-3.5 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black uppercase text-[#687A93] block">
                Target Completion Date (Opt)
              </label>
              <input
                type="date"
                value={newTargetDate}
                onChange={(e) => setNewTargetDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#F6FAFF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-1/2 py-2.5 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-xs font-bold text-[#172B4D]"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-1/2 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-black tracking-wider uppercase transition-all shadow-xs"
              >
                {isLoading ? 'CREATING...' : 'CREATE CLASSROOM'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Top Header & Classroom Switcher */}
      <div className="border-b border-[#DCE8F5] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] block mb-1">
            ACADEMIC COHORT & LEADERBOARD
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
            CLASSROOM
          </h1>
          <p className="text-xs sm:text-sm text-[#687A93] mt-0.5 font-medium">
            Collaborative career preparation, shared milestones, and progress transparency.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Class Switcher if multiple */}
          {classrooms.length > 1 && (
            <select
              value={activeClassroom?.code}
              onChange={(e) => selectClassroom(e.target.value)}
              className="px-3.5 py-2 bg-white border border-[#DCE8F5] rounded-xl text-xs font-bold text-[#172B4D] focus:outline-none focus:border-[#4D9FFF]"
            >
              {classrooms.map((c) => (
                <option key={c.id} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setShowJoinModal(true)}
            className="px-3.5 py-2 bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-xs font-bold text-[#172B4D] rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 text-[#4D9FFF]" />
            <span>Join Another</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3.5 py-2 bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New</span>
          </button>
        </div>
      </div>

      {/* Alert Messages */}
      {successMessage && (
        <div className="p-3.5 bg-[#EBFBF3] border border-[#42C98A]/30 rounded-2xl flex items-center justify-between text-xs text-[#172B4D]">
          <span className="font-bold">{successMessage}</span>
          <button onClick={() => setSuccessMessage(null)} className="text-[#687A93] hover:text-[#172B4D]">
            Dismiss
          </button>
        </div>
      )}

      {errorMessage && (
        <div className="p-3.5 bg-[#FFF0ED] border border-[#FF8A72]/30 rounded-2xl flex items-center justify-between text-xs text-[#172B4D]">
          <span className="font-bold">{errorMessage}</span>
          <button onClick={() => setErrorMessage(null)} className="text-[#687A93] hover:text-[#172B4D]">
            Dismiss
          </button>
        </div>
      )}

      {/* Classroom Hero Card */}
      {activeClassroom && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DCE8F5] pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] bg-[#EAF4FF] px-2.5 py-0.5 rounded-md border border-[#4D9FFF]/20">
                  {activeClassroom.courseName || 'Career Preparation Cohort'}
                </span>
                {activeClassroom.batchSection && (
                  <span className="text-[10px] font-bold text-[#687A93]">
                    {activeClassroom.batchSection}
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#172B4D]">
                {activeClassroom.name}
              </h2>
              <p className="text-xs text-[#687A93] font-medium mt-0.5">
                Instructor: <strong className="text-[#172B4D]">{activeClassroom.instructorName}</strong> · Joined: {activeClassroom.members.length} student{activeClassroom.members.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Class Code Card */}
            <div className="p-3.5 bg-gradient-to-r from-[#EAF4FF] via-white to-[#F6FAFF] border border-[#4D9FFF]/30 rounded-2xl flex items-center justify-between gap-4 shrink-0 shadow-2xs">
              <div>
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-[#687A93] block">
                  Class Join Code
                </span>
                <span className="text-base font-mono font-black text-[#347DD9] tracking-wider">
                  {activeClassroom.code}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode(activeClassroom.code)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-xs font-bold text-[#172B4D] transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-[#42C98A]" /> : <Copy className="w-3.5 h-3.5 text-[#4D9FFF]" />}
                <span>{copiedCode ? 'COPIED!' : 'COPY CODE'}</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#687A93]">Enrolled Members</span>
              <p className="text-lg font-black text-[#172B4D]">{stats?.totalMembers || activeClassroom.members.length}</p>
            </div>

            <div className="p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#687A93]">Average Preparation</span>
              <p className="text-lg font-black text-[#4D9FFF]">{stats?.averagePreparation || 0}%</p>
            </div>

            <div className="p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#687A93]">Target Completion</span>
              <p className="text-xs font-black text-[#172B4D] pt-1">{activeClassroom.targetDate || 'Flexible Pace'}</p>
            </div>

            <div className="p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-0.5">
              <span className="text-[10px] font-bold uppercase text-[#687A93]">Your Membership</span>
              <p className="text-xs font-black text-[#42C98A] pt-1">{isOwner ? 'Classroom Owner' : 'Active Student'}</p>
            </div>
          </div>

          {/* Class Achievements */}
          {stats?.achievements && stats.achievements.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-[#EBFBF3] via-white to-[#F6FAFF] border border-[#42C98A]/30 rounded-2xl space-y-1.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#42C98A]" />
                <span className="text-[10px] font-black uppercase text-[#42C98A] tracking-wider">
                  REAL CLASS ACHIEVEMENTS
                </span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {stats.achievements.map((ach: string, idx: number) => (
                  <span key={idx} className="font-bold text-[#172B4D] bg-white border border-[#DCE8F5] px-2.5 py-1 rounded-lg">
                    ✓ {ach}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* SHARED LEADERBOARD */}
      {activeClassroom && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-5">
          <div className="border-b border-[#DCE8F5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-[#FFD166]" />
                <span className="text-[10px] font-black uppercase tracking-wider text-[#FF8A72]">
                  ANTI-CRAMMING LEADERBOARD
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-[#172B4D]">
                CLASS LEADERBOARD
              </h3>
              <p className="text-xs text-[#687A93] font-medium mt-0.5">
                Ranked by demonstrated practical preparation (skills assessed, projects built, Git and soft-skills milestones).
              </p>
            </div>

            <div className="text-[11px] text-[#687A93] italic">
              Privacy protected: only student display names and milestone counts are shared.
            </div>
          </div>

          {/* Leaderboard Table / Cards */}
          <div className="space-y-2.5">
            {activeClassroom.members.map((member, index) => {
              const rank = index + 1;
              const isCurrentUser = member.userId === currentProfile.userId;

              return (
                <div
                  key={member.userId}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrentUser
                      ? 'bg-[#EAF4FF] border-[#4D9FFF] shadow-2xs'
                      : 'bg-[#F6FAFF] border-[#DCE8F5]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Rank Badge */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                        rank === 1
                          ? 'bg-[#FFD166] text-[#172B4D]'
                          : rank === 2
                          ? 'bg-[#DCE8F5] text-[#172B4D]'
                          : rank === 3
                          ? 'bg-[#FF8A72]/20 text-[#FF8A72]'
                          : 'bg-white border border-[#DCE8F5] text-[#687A93]'
                      }`}
                    >
                      #{rank}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-black text-[#172B4D]">
                          {member.displayName}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[9px] font-black uppercase text-[#4D9FFF] bg-white px-2 py-0.2 rounded border border-[#4D9FFF]/30">
                            YOU
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-[#687A93] font-medium block">
                        Target Career: <strong className="text-[#172B4D]">{member.targetRoleTitle || 'Exploring Careers'}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-4 sm:gap-6 text-xs">
                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase text-[#687A93] block">
                        Preparation
                      </span>
                      <span className="font-black text-[#4D9FFF] text-sm">
                        {member.preparationScore}%
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase text-[#687A93] block">
                        Projects
                      </span>
                      <span className="font-bold text-[#172B4D]">
                        {member.completedProjectsCount}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-extrabold uppercase text-[#687A93] block">
                        Milestones
                      </span>
                      <span className="font-bold text-[#42C98A]">
                        {member.completedMilestonesCount}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CLASS TIMELINE */}
      {activeClassroom && activeClassroom.timelineStages && (
        <div className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl shadow-[0_2px_16px_rgba(23,43,77,0.03)] space-y-5">
          <div className="border-b border-[#DCE8F5] pb-3">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#4D9FFF] block mb-0.5">
              COHORT MILESTONES
            </span>
            <h3 className="text-base sm:text-lg font-black text-[#172B4D]">
              CLASS TIMELINE
            </h3>
            <p className="text-xs text-[#687A93] font-medium mt-0.5">
              Synchronized progression benchmark defined for this cohort.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {activeClassroom.timelineStages.map((stage) => (
              <div
                key={stage.id}
                className="p-4 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#4D9FFF]">
                  <span>STAGE {stage.id}</span>
                  <span>WEEK {stage.targetWeek}</span>
                </div>
                <h4 className="text-xs font-black text-[#172B4D]">
                  {stage.title}
                </h4>
                <p className="text-[11px] text-[#687A93] font-medium leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CLASSROOM ADMIN / STUDENT ACTIONS */}
      {activeClassroom && (
        <div className="p-6 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-3xl flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="text-[#687A93] font-medium">
            Joined as: <strong className="text-[#172B4D]">{currentProfile.studentName}</strong>
          </div>

          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                <button
                  type="button"
                  onClick={handleRegenerateCode}
                  className="px-3.5 py-2 bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] text-xs font-bold text-[#172B4D] rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#4D9FFF]" />
                  <span>Regenerate Code</span>
                </button>

                <button
                  type="button"
                  onClick={handleDeleteClass}
                  className="px-3.5 py-2 bg-[#FFF0ED] hover:bg-[#FFE6E1] text-[#FF8A72] border border-[#FF8A72]/30 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Classroom</span>
                </button>
              </>
            )}

            {!isOwner && (
              <button
                type="button"
                onClick={handleLeaveClass}
                className="px-3.5 py-2 bg-white hover:bg-[#FFF0ED] text-[#FF8A72] border border-[#DCE8F5] hover:border-[#FF8A72]/40 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Leave Classroom</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      {showJoinModal && renderJoinModal()}
      {showCreateModal && renderCreateModal()}
    </div>
  );
};
