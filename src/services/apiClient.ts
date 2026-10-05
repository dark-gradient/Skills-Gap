import { Classroom, StudentProfile, UserAccount } from '../types/career';

const API_BASE = '/api';

export interface AuthResponse {
  success: boolean;
  user: UserAccount;
  profile: StudentProfile;
  error?: string;
}

export const apiClient = {
  // Register
  async register(data: {
    name: string;
    email: string;
    password: string;
    college?: string;
    degree?: string;
    yearOfStudy?: string;
  }): Promise<AuthResponse> {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to create account.');
      }
      return json;
    } catch (err: any) {
      console.warn('API register error, utilizing fallback:', err);
      // Fallback local registration if server unreachable
      const userId = `usr_${Date.now()}`;
      const newUser: UserAccount = {
        id: userId,
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        college: data.college,
        degree: data.degree,
        yearOfStudy: data.yearOfStudy,
        createdAt: new Date().toISOString(),
      };
      const newProfile: StudentProfile = {
        userId,
        studentName: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        college: data.college,
        degree: data.degree,
        yearOfStudy: data.yearOfStudy,
        targetRoleId: null,
        skillAssessments: {},
        skillEvidence: {},
        completedLearningIds: [],
        completedProjectIds: [],
        completedSoftSkillIds: [],
        completedGitStepIds: [],
        classroomIds: [],
        assessmentHistory: [],
        theme: 'light',
        motionMode: 'full',
      };
      return { success: true, user: newUser, profile: newProfile };
    }
  },

  // Login
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Invalid credentials.');
      }
      return json;
    } catch (err: any) {
      console.warn('API login error:', err);
      throw err;
    }
  },

  // Reset Password
  async resetPassword(email: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || 'Failed to reset password.');
      }
      return json;
    } catch (err: any) {
      console.warn('API reset password error:', err);
      throw err;
    }
  },

  // Sync Profile
  async syncProfile(userId: string, profile: StudentProfile): Promise<void> {
    try {
      await fetch(`${API_BASE}/user/sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, profile }),
      });
    } catch (err) {
      console.warn('Could not sync profile to backend:', err);
    }
  },

  // Reset Personal Data
  async resetUserData(userId: string, leaveClassrooms: boolean): Promise<StudentProfile> {
    try {
      const res = await fetch(`${API_BASE}/user/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, leaveClassrooms }),
      });
      const json = await res.json();
      if (res.ok && json.profile) {
        return json.profile;
      }
    } catch (err) {
      console.warn('API reset failed, applying local wipe:', err);
    }

    return {
      userId,
      studentName: '',
      targetRoleId: null,
      skillAssessments: {},
      skillEvidence: {},
      completedLearningIds: [],
      completedProjectIds: [],
      completedSoftSkillIds: [],
      completedGitStepIds: [],
      classroomIds: leaveClassrooms ? [] : undefined,
      assessmentHistory: [],
      theme: 'light',
      motionMode: 'full',
    };
  },

  // Get Classrooms for user
  async fetchClassrooms(userId: string): Promise<Classroom[]> {
    try {
      const res = await fetch(`${API_BASE}/classrooms?userId=${encodeURIComponent(userId)}`);
      if (res.ok) {
        const json = await res.json();
        return json.classrooms || [];
      }
    } catch (err) {
      console.warn('Could not fetch classrooms:', err);
    }
    return [];
  },

  // Create Classroom
  async createClassroom(data: {
    name: string;
    instructorName: string;
    courseName?: string;
    batchSection?: string;
    targetDate?: string;
    ownerId: string;
    ownerDisplayName?: string;
  }): Promise<Classroom> {
    const res = await fetch(`${API_BASE}/classrooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to create classroom.');
    }
    return json.classroom;
  },

  // Join Classroom
  async joinClassroom(data: {
    code: string;
    userId: string;
    displayName: string;
    targetRoleTitle?: string;
    preparationScore?: number;
    completedProjectsCount?: number;
    completedMilestonesCount?: number;
  }): Promise<Classroom> {
    const res = await fetch(`${API_BASE}/classrooms/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to join classroom.');
    }
    return json.classroom;
  },

  // Get Classroom details & leaderboard
  async fetchClassroomDetails(code: string): Promise<{ classroom: Classroom; stats: any }> {
    const res = await fetch(`${API_BASE}/classrooms/${encodeURIComponent(code)}`);
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Classroom not found.');
    }
    return json;
  },

  // Leave Classroom
  async leaveClassroom(code: string, userId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/classrooms/${encodeURIComponent(code)}/leave`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to leave classroom.');
    }
  },

  // Regenerate Code
  async regenerateClassCode(code: string, ownerId: string): Promise<string> {
    const res = await fetch(`${API_BASE}/classrooms/${encodeURIComponent(code)}/regenerate-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownerId }),
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || 'Failed to regenerate code.');
    }
    return json.newCode;
  },

  // Delete Classroom
  async deleteClassroom(code: string, ownerId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/classrooms/${encodeURIComponent(code)}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ownerId }),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error || 'Failed to delete classroom.');
    }
  },
};
