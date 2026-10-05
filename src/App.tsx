/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  StudentProfile,
  NavigationTab,
  CareerRole,
  CompetencyEvidence,
  UserAccount,
  PersonalTimeline,
} from './types/career';
import {
  loadProfileFromStorage,
  saveProfileToStorage,
  getRoleById,
  recordProgressSnapshot,
  calculateReadiness,
} from './services/careerCalculations';
import { apiClient } from './services/apiClient';
import { CAREER_ROLES } from './data/careerData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardHome } from './components/DashboardHome';
import { CareerPage } from './components/CareerPage';
import { SkillsPage } from './components/SkillsPage';
import { LearningPage } from './components/LearningPage';
import { ProgressPage } from './components/ProgressPage';
import { CareerInsightsPage } from './components/CareerInsightsPage';
import { TimelinePage } from './components/TimelinePage';
import { ClassroomPage } from './components/ClassroomPage';
import { SoftSkillsPage } from './components/SoftSkillsPage';
import { ProfileModal } from './components/ProfileModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { CareerChosenModal } from './components/CareerChosenModal';
import { AuthScreen } from './components/AuthScreen';
import { AmbientBackground } from './components/AmbientBackground';
import { AnimatePresence, motion } from 'motion/react';

const USER_STORAGE_KEY = 'skillgap_user_v1';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState<StudentProfile>(() => loadProfileFromStorage());
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [chosenRoleForModal, setChosenRoleForModal] = useState<CareerRole | null>(null);

  // Persist current profile to localStorage
  useEffect(() => {
    saveProfileToStorage(profile);
  }, [profile]);

  // Sync to backend if authenticated
  useEffect(() => {
    if (currentUser?.id) {
      apiClient.syncProfile(currentUser.id, profile);
    }
  }, [profile, currentUser]);

  const targetRole = getRoleById(profile.targetRoleId);

  // Authentication Handlers
  const handleLoginSuccess = (user: UserAccount, loadedProfile: StudentProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to storage:', e);
    }

    if (loadedProfile) {
      setProfile((prev) => ({
        ...prev,
        ...loadedProfile,
        studentName: user.name || loadedProfile.studentName,
        email: user.email,
        college: user.college,
        degree: user.degree,
        yearOfStudy: user.yearOfStudy,
        userId: user.id,
      }));
    }
  };

  const handleRegisterSuccess = (user: UserAccount, newProfile: StudentProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.warn('Could not save user to storage:', e);
    }

    if (newProfile) {
      setProfile({
        ...newProfile,
        studentName: user.name,
        email: user.email,
        college: user.college,
        degree: user.degree,
        yearOfStudy: user.yearOfStudy,
        userId: user.id,
      });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove user from storage:', e);
    }
  };

  // Update a single skill assessment
  const handleUpdateSkill = (skillId: string, level: number) => {
    setProfile((prev) => {
      const nextAssessments = {
        ...prev.skillAssessments,
        [skillId]: level,
      };

      const updatedProfile = {
        ...prev,
        skillAssessments: nextAssessments,
      };

      // Record snapshot if a role is selected and readiness can be calculated
      const role = getRoleById(prev.targetRoleId);
      const readiness = calculateReadiness(role, nextAssessments);
      if (readiness) {
        updatedProfile.assessmentHistory = recordProgressSnapshot(
          updatedProfile,
          readiness.percentage
        );
      }

      return updatedProfile;
    });
  };

  // Update evidence for a competency
  const handleUpdateEvidence = (skillId: string, evidence: CompetencyEvidence) => {
    setProfile((prev) => ({
      ...prev,
      skillEvidence: {
        ...(prev.skillEvidence || {}),
        [skillId]: evidence,
      },
    }));
  };

  // Select target career role
  const handleSelectRole = (role: CareerRole) => {
    setProfile((prev) => {
      const updatedProfile = {
        ...prev,
        targetRoleId: role.id,
      };

      const readiness = calculateReadiness(role, prev.skillAssessments);
      if (readiness) {
        updatedProfile.assessmentHistory = recordProgressSnapshot(
          updatedProfile,
          readiness.percentage
        );
      }

      return updatedProfile;
    });

    // Show celebration modal when selecting a new career
    setChosenRoleForModal(role);
  };

  // Toggle learning milestone completed
  const handleToggleLearningCompleted = (skillId: string) => {
    setProfile((prev) => {
      const exists = prev.completedLearningIds.includes(skillId);
      const nextCompleted = exists
        ? prev.completedLearningIds.filter((id) => id !== skillId)
        : [...prev.completedLearningIds, skillId];

      return {
        ...prev,
        completedLearningIds: nextCompleted,
      };
    });
  };

  // Toggle practical project completed
  const handleToggleProjectCompleted = (projectId: string) => {
    setProfile((prev) => {
      const current = prev.completedProjectIds || [];
      const exists = current.includes(projectId);
      const nextProjects = exists
        ? current.filter((id) => id !== projectId)
        : [...current, projectId];

      return {
        ...prev,
        completedProjectIds: nextProjects,
      };
    });
  };

  // Toggle soft skill practice completed
  const handleToggleSoftSkillCompleted = (videoId: string) => {
    setProfile((prev) => {
      const current = prev.completedSoftSkillIds || [];
      const exists = current.includes(videoId);
      const nextSoftSkills = exists
        ? current.filter((id) => id !== videoId)
        : [...current, videoId];

      return {
        ...prev,
        completedSoftSkillIds: nextSoftSkills,
      };
    });
  };

  // Toggle Git track step completed
  const handleToggleGitStepCompleted = (stepId: number) => {
    setProfile((prev) => {
      const current = prev.completedGitStepIds || [];
      const exists = current.includes(stepId);
      const nextGitSteps = exists
        ? current.filter((id) => id !== stepId)
        : [...current, stepId];

      return {
        ...prev,
        completedGitStepIds: nextGitSteps,
      };
    });
  };

  // Update Personal Learning Timeline
  const handleUpdateTimeline = (newTimeline: PersonalTimeline) => {
    setProfile((prev) => ({
      ...prev,
      timeline: newTimeline,
    }));
  };

  // Reset assessments & progress via modal
  const handleConfirmReset = async (leaveClassrooms: boolean) => {
    if (currentUser?.id) {
      try {
        const wiped = await apiClient.resetUserData(currentUser.id, leaveClassrooms);
        setProfile(wiped);
        return;
      } catch (e) {
        console.warn('Backend reset call failed, falling back to local wipe:', e);
      }
    }

    setProfile((prev) => ({
      ...prev,
      targetRoleId: null,
      skillAssessments: {},
      skillEvidence: {},
      completedLearningIds: [],
      completedProjectIds: [],
      completedSoftSkillIds: [],
      completedGitStepIds: [],
      timeline: undefined,
      classroomIds: leaveClassrooms ? [] : prev.classroomIds,
      assessmentHistory: [],
    }));
  };

  // Direct reset fallback
  const handleReset = () => {
    handleConfirmReset(false);
  };

  // Update student name
  const handleUpdateName = (name: string) => {
    setProfile((prev) => ({
      ...prev,
      studentName: name,
    }));
    if (currentUser) {
      const updated = { ...currentUser, name };
      setCurrentUser(updated);
      try {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save user name update:', e);
      }
    }
  };

  // Update motion mode
  const handleUpdateMotionMode = (mode: 'full' | 'reduced' | 'off') => {
    setProfile((prev) => ({
      ...prev,
      motionMode: mode,
    }));
  };

  // If not logged in, render student authentication screen
  if (!currentUser) {
    return (
      <div className="relative min-h-screen w-screen bg-[#F6FAFF] text-[#172B4D]">
        <AmbientBackground motionMode="reduced" />
        <div className="relative z-10">
          <AuthScreen
            onLoginSuccess={handleLoginSuccess}
            onRegisterSuccess={handleRegisterSuccess}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-[#F6FAFF] text-[#172B4D]">
      {/* Visually Present Ambient Animated Living Background (Layer 0) */}
      <AmbientBackground motionMode={profile.motionMode} />

      {/* Desktop Fixed Sidebar (Layer 10) */}
      <div className="relative z-10 hidden md:block shrink-0 h-full">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onOpenProfile={() => setIsProfileOpen(true)}
        />
      </div>

      {/* Mobile Drawer Navigation (Layer 50) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-[#172B4D]/30 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 h-full z-10">
            <Sidebar
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
                setMobileSidebarOpen(false);
              }}
              onOpenProfile={() => {
                setIsProfileOpen(true);
                setMobileSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Workspace Frame (Layer 10, Transparent Viewport) */}
      <div className="relative z-10 flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-transparent">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          targetRoleId={profile.targetRoleId}
          studentName={profile.studentName || currentUser.name}
          onOpenProfile={() => setIsProfileOpen(true)}
          onToggleSidebar={() => setMobileSidebarOpen(true)}
          onLogout={handleLogout}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 bg-transparent">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'home' && (
                <DashboardHome
                  targetRole={targetRole}
                  assessments={profile.skillAssessments}
                  completedLearningIds={profile.completedLearningIds}
                  studentName={profile.studentName || currentUser.name}
                  onNavigate={setActiveTab}
                />
              )}

              {activeTab === 'career' && (
                <CareerPage
                  selectedRoleId={profile.targetRoleId}
                  onSelectRole={handleSelectRole}
                  onNavigateToAssessment={() => setActiveTab('skills')}
                />
              )}

              {activeTab === 'skills' && (
                <SkillsPage
                  targetRole={targetRole}
                  assessments={profile.skillAssessments}
                  skillEvidence={profile.skillEvidence}
                  onUpdateSkill={handleUpdateSkill}
                  onUpdateEvidence={handleUpdateEvidence}
                  onResetSkills={handleReset}
                  onNavigateToRoadmap={() => setActiveTab('learning')}
                />
              )}

              {activeTab === 'learning' && (
                <LearningPage
                  targetRole={targetRole}
                  assessments={profile.skillAssessments}
                  evidence={profile.skillEvidence}
                  completedLearningIds={profile.completedLearningIds}
                  completedProjectIds={profile.completedProjectIds}
                  completedSoftSkillIds={profile.completedSoftSkillIds}
                  completedGitStepIds={profile.completedGitStepIds}
                  onToggleLearningCompleted={handleToggleLearningCompleted}
                  onToggleProjectCompleted={handleToggleProjectCompleted}
                  onToggleSoftSkillCompleted={handleToggleSoftSkillCompleted}
                  onToggleGitStepCompleted={handleToggleGitStepCompleted}
                  onUpdateSkill={handleUpdateSkill}
                  onUpdateEvidence={handleUpdateEvidence}
                  onNavigateToCareers={() => setActiveTab('career')}
                />
              )}

              {activeTab === 'timeline' && (
                <TimelinePage
                  targetRole={targetRole}
                  timeline={profile.timeline}
                  onUpdateTimeline={handleUpdateTimeline}
                  onNavigateToCareer={() => setActiveTab('career')}
                  onNavigateToSkills={() => setActiveTab('skills')}
                  onNavigateToLearning={() => setActiveTab('learning')}
                />
              )}

              {activeTab === 'classroom' && (
                <ClassroomPage
                  currentProfile={profile}
                  targetRole={targetRole}
                  onNavigateToCareer={() => setActiveTab('career')}
                  onNavigateToLearning={() => setActiveTab('learning')}
                />
              )}

              {activeTab === 'soft_skills' && (
                <SoftSkillsPage
                  completedSoftSkillIds={profile.completedSoftSkillIds}
                  onToggleSoftSkillCompleted={handleToggleSoftSkillCompleted}
                />
              )}

              {activeTab === 'progress' && (
                <ProgressPage
                  profile={profile}
                  targetRole={targetRole}
                  onNavigateToSkills={() => setActiveTab('skills')}
                  onNavigateToLearning={() => setActiveTab('learning')}
                />
              )}

              {activeTab === 'insights' && (
                <CareerInsightsPage
                  selectedRole={targetRole}
                  onSelectRole={handleSelectRole}
                  onNavigateToCareers={() => setActiveTab('career')}
                  onNavigateToLearning={() => setActiveTab('learning')}
                  assessments={profile.skillAssessments}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Profile & Settings Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onUpdateName={handleUpdateName}
        onUpdateMotionMode={handleUpdateMotionMode}
        onReset={handleReset}
        onOpenResetConfirm={() => setShowResetModal(true)}
        onSelectRole={(roleId) => {
          if (!roleId) {
            setProfile((prev) => ({ ...prev, targetRoleId: null }));
          } else {
            const role = CAREER_ROLES.find((r) => r.id === roleId);
            if (role) handleSelectRole(role);
          }
        }}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirmReset={handleConfirmReset}
        hasJoinedClassrooms={(profile.classroomIds?.length || 0) > 0}
      />

      {/* Career Chosen Modal */}
      {chosenRoleForModal && (
        <CareerChosenModal
          role={chosenRoleForModal}
          onStartAssessment={() => {
            setChosenRoleForModal(null);
            setActiveTab('skills');
          }}
          onExploreDashboard={() => {
            setChosenRoleForModal(null);
            setActiveTab('home');
          }}
        />
      )}
    </div>
  );
}
