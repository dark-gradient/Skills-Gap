import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  college?: string;
  degree?: string;
  yearOfStudy?: string;
  createdAt: string;
  profile: any;
}

interface StoredClassroom {
  id: string;
  code: string;
  name: string;
  instructorName: string;
  courseName?: string;
  batchSection?: string;
  ownerId: string;
  targetDate?: string;
  startDate?: string;
  createdAt: string;
  members: {
    userId: string;
    displayName: string;
    targetRoleTitle?: string;
    preparationScore: number;
    completedProjectsCount: number;
    completedMilestonesCount: number;
    joinedAt: string;
  }[];
  timelineStages?: {
    id: string;
    title: string;
    description: string;
    targetWeek: number;
  }[];
}

interface StoreData {
  users: StoredUser[];
  classrooms: StoredClassroom[];
}

const DATA_DIR = path.resolve(__dirname, 'data');
const DATA_FILE = path.resolve(DATA_DIR, 'skillgap_store.json');

function ensureStore(): StoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    const initial: StoreData = {
      users: [],
      classrooms: [],
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initial, null, 2), 'utf8');
    return initial;
  }
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    const fallback: StoreData = { users: [], classrooms: [] };
    fs.writeFileSync(DATA_FILE, JSON.stringify(fallback, null, 2), 'utf8');
    return fallback;
  }
}

function saveStore(data: StoreData) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed to save store:', err);
  }
}

function hashPassword(password: string, salt: string): string {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function generateClassCode(): string {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 5; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SKG-${random}`;
}

async function startServer() {
  const app = express();
  const port = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // --- API ROUTES ---

  // Health
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Register
  app.post('/api/auth/register', (req: Request, res: Response) => {
    const { name, email, password, college, degree, yearOfStudy } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const store = ensureStore();
    const normalizedEmail = email.trim().toLowerCase();

    if (store.users.some((u) => u.email === normalizedEmail)) {
      return res.status(400).json({ error: 'An account with this email already exists.' });
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const passwordHash = hashPassword(password, salt);
    const userId = crypto.randomUUID();

    const newUser: StoredUser = {
      id: userId,
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      salt,
      college: college?.trim(),
      degree: degree?.trim(),
      yearOfStudy: yearOfStudy?.trim(),
      createdAt: new Date().toISOString(),
      profile: {
        userId,
        studentName: name.trim(),
        email: normalizedEmail,
        college: college?.trim(),
        degree: degree?.trim(),
        yearOfStudy: yearOfStudy?.trim(),
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
      },
    };

    store.users.push(newUser);
    saveStore(store);

    res.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        college: newUser.college,
        degree: newUser.degree,
        yearOfStudy: newUser.yearOfStudy,
      },
      profile: newUser.profile,
    });
  });

  // Login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const store = ensureStore();
    const normalizedEmail = email.trim().toLowerCase();
    const user = store.users.find((u) => u.email === normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const computed = hashPassword(password, user.salt);
    if (computed !== user.passwordHash) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        college: user.college,
        degree: user.degree,
        yearOfStudy: user.yearOfStudy,
      },
      profile: user.profile,
    });
  });

  // Password Reset
  app.post('/api/auth/reset-password', (req: Request, res: Response) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required.' });
    }

    const store = ensureStore();
    const normalizedEmail = email.trim().toLowerCase();
    const user = store.users.find((u) => u.email === normalizedEmail);

    if (!user) {
      return res.status(404).json({ error: 'No account found with this email address.' });
    }

    const newSalt = crypto.randomBytes(16).toString('hex');
    user.salt = newSalt;
    user.passwordHash = hashPassword(newPassword, newSalt);

    saveStore(store);
    res.json({ success: true, message: 'Password has been successfully updated.' });
  });

  // Profile Sync
  app.post('/api/user/sync', (req: Request, res: Response) => {
    const { userId, profile } = req.body;
    if (!userId || !profile) {
      return res.status(400).json({ error: 'User ID and profile data are required.' });
    }

    const store = ensureStore();
    const user = store.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.profile = {
      ...user.profile,
      ...profile,
      lastUpdated: new Date().toISOString(),
    };

    // Calculate preparation score for classroom leaderboard:
    // Core competencies assessed >= 3 (up to 40 pts)
    // Projects completed (up to 30 pts)
    // Git & Soft skills milestones (up to 30 pts)
    const assessments = profile.skillAssessments || {};
    const assessedCount = Object.values(assessments).filter((v: any) => v >= 3).length;
    const projectCount = (profile.completedProjectIds || []).length;
    const gitCount = (profile.completedGitStepIds || []).length;
    const softCount = (profile.completedSoftSkillIds || []).length;

    const prepScore = Math.min(
      100,
      Math.round(
        Math.min(40, assessedCount * 8) +
        Math.min(30, projectCount * 10) +
        Math.min(15, gitCount * 2) +
        Math.min(15, softCount * 3)
      )
    );

    // Sync member score across any classrooms the user belongs to
    for (const c of store.classrooms) {
      const member = c.members.find((m) => m.userId === userId);
      if (member) {
        member.displayName = profile.studentName || user.name;
        member.targetRoleTitle = profile.targetRoleTitle || member.targetRoleTitle;
        member.preparationScore = prepScore;
        member.completedProjectsCount = projectCount;
        member.completedMilestonesCount = projectCount + gitCount + softCount;
      }
    }

    saveStore(store);
    res.json({ success: true, profile: user.profile });
  });

  // Reset Personal Data
  app.post('/api/user/reset', (req: Request, res: Response) => {
    const { userId, leaveClassrooms } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const store = ensureStore();
    const user = store.users.find((u) => u.id === userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Keep membership unless explicitly chosen to leave
    const retainedClassrooms = leaveClassrooms ? [] : (user.profile.classroomIds || []);

    if (leaveClassrooms) {
      for (const c of store.classrooms) {
        c.members = c.members.filter((m) => m.userId !== userId);
      }
    } else {
      // Zero out leaderboard contributions
      for (const c of store.classrooms) {
        const member = c.members.find((m) => m.userId === userId);
        if (member) {
          member.preparationScore = 0;
          member.completedProjectsCount = 0;
          member.completedMilestonesCount = 0;
        }
      }
    }

    user.profile = {
      userId,
      studentName: user.name,
      email: user.email,
      college: user.college,
      degree: user.degree,
      yearOfStudy: user.yearOfStudy,
      targetRoleId: null,
      skillAssessments: {},
      skillEvidence: {},
      completedLearningIds: [],
      completedProjectIds: [],
      completedSoftSkillIds: [],
      completedGitStepIds: [],
      classroomIds: retainedClassrooms,
      assessmentHistory: [],
      theme: 'light',
      motionMode: 'full',
      lastUpdated: new Date().toISOString(),
    };

    saveStore(store);
    res.json({ success: true, profile: user.profile });
  });

  // --- CLASSROOM ROUTES ---

  // Get Classrooms for user
  app.get('/api/classrooms', (req: Request, res: Response) => {
    const userId = req.query.userId as string;
    const store = ensureStore();

    if (!userId) {
      return res.json({ classrooms: [] });
    }

    const userClasses = store.classrooms.filter(
      (c) => c.ownerId === userId || c.members.some((m) => m.userId === userId)
    );

    res.json({ classrooms: userClasses });
  });

  // Create Classroom
  app.post('/api/classrooms', (req: Request, res: Response) => {
    const { name, instructorName, courseName, batchSection, targetDate, ownerId, ownerDisplayName } = req.body;
    if (!name || !instructorName || !ownerId) {
      return res.status(400).json({ error: 'Class Name, Instructor Name, and Owner ID are required.' });
    }

    const store = ensureStore();
    let code = generateClassCode();
    while (store.classrooms.some((c) => c.code === code)) {
      code = generateClassCode();
    }

    const newClass: StoredClassroom = {
      id: crypto.randomUUID(),
      code,
      name: name.trim(),
      instructorName: instructorName.trim(),
      courseName: courseName?.trim() || undefined,
      batchSection: batchSection?.trim() || undefined,
      ownerId,
      targetDate: targetDate?.trim() || undefined,
      startDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      members: [
        {
          userId: ownerId,
          displayName: ownerDisplayName || instructorName.trim(),
          preparationScore: 0,
          completedProjectsCount: 0,
          completedMilestonesCount: 0,
          joinedAt: new Date().toISOString(),
        },
      ],
      timelineStages: [
        { id: '1', title: 'Career Exploration & Skills Assessment', description: 'Explore target careers and complete baseline self-assessments.', targetWeek: 1 },
        { id: '2', title: 'Foundations & Git Portfolio Setup', description: 'Master version control workflows and publish initial repository.', targetWeek: 2 },
        { id: '3', title: 'Project 1: Foundation Assignment', description: 'Build and test your first hands-on role project.', targetWeek: 4 },
        { id: '4', title: 'Core Skills & Soft Skills', description: 'Deepen core competencies and practice technical presentation.', targetWeek: 6 },
        { id: '5', title: 'Project 2: Application Pipeline', description: 'End-to-end practical solution with README documentation.', targetWeek: 8 },
        { id: '6', title: 'Technical & Behavioral Interview Prep', description: 'Google-style interview trade-offs and STAR stories.', targetWeek: 10 },
        { id: '7', title: 'Capstone Project & Final Readiness', description: 'Publish final portfolio piece ready for hiring review.', targetWeek: 12 },
      ],
    };

    store.classrooms.push(newClass);

    // Add to user's classroomIds
    const user = store.users.find((u) => u.id === ownerId);
    if (user) {
      user.profile.classroomIds = user.profile.classroomIds || [];
      if (!user.profile.classroomIds.includes(newClass.id)) {
        user.profile.classroomIds.push(newClass.id);
      }
    }

    saveStore(store);
    res.json({ success: true, classroom: newClass });
  });

  // Join Classroom
  app.post('/api/classrooms/join', (req: Request, res: Response) => {
    const { code, userId, displayName, targetRoleTitle, preparationScore, completedProjectsCount, completedMilestonesCount } = req.body;
    if (!code || !userId) {
      return res.status(400).json({ error: 'Class code and user ID are required.' });
    }

    const store = ensureStore();
    const normalizedCode = code.trim().toUpperCase();
    const classroom = store.classrooms.find((c) => c.code === normalizedCode);

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found. Please verify the 5-character class code.' });
    }

    // Check if already member
    let member = classroom.members.find((m) => m.userId === userId);
    if (!member) {
      member = {
        userId,
        displayName: displayName || 'Student',
        targetRoleTitle: targetRoleTitle || undefined,
        preparationScore: preparationScore || 0,
        completedProjectsCount: completedProjectsCount || 0,
        completedMilestonesCount: completedMilestonesCount || 0,
        joinedAt: new Date().toISOString(),
      };
      classroom.members.push(member);
    } else {
      member.displayName = displayName || member.displayName;
      member.targetRoleTitle = targetRoleTitle || member.targetRoleTitle;
    }

    // Add classroomId to user
    const user = store.users.find((u) => u.id === userId);
    if (user) {
      user.profile.classroomIds = user.profile.classroomIds || [];
      if (!user.profile.classroomIds.includes(classroom.id)) {
        user.profile.classroomIds.push(classroom.id);
      }
    }

    saveStore(store);
    res.json({ success: true, classroom });
  });

  // Get Classroom Details & Leaderboard
  app.get('/api/classrooms/:code', (req: Request, res: Response) => {
    const code = req.params.code.trim().toUpperCase();
    const store = ensureStore();
    const classroom = store.classrooms.find((c) => c.code === code);

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found.' });
    }

    // Sort leaderboard by preparation score descending, then projects
    const sortedMembers = [...classroom.members].sort(
      (a, b) => b.preparationScore - a.preparationScore || b.completedProjectsCount - a.completedProjectsCount
    );

    // Compute genuine class achievements from real member data
    const totalMembers = classroom.members.length;
    const avgScore = totalMembers > 0
      ? Math.round(classroom.members.reduce((acc, m) => acc + m.preparationScore, 0) / totalMembers)
      : 0;

    const studentsWithGit = classroom.members.filter((m) => m.completedMilestonesCount >= 1).length;
    const studentsWithProject = classroom.members.filter((m) => m.completedProjectsCount >= 1).length;

    const achievements: string[] = [];
    if (studentsWithGit > 0) {
      achievements.push(`${studentsWithGit} student${studentsWithGit > 1 ? 's' : ''} established their project portfolio.`);
    }
    if (studentsWithProject > 0) {
      achievements.push(`${Math.round((studentsWithProject / totalMembers) * 100)}% of the class finished a practical project.`);
    }
    if (classroom.members.some((m) => m.preparationScore >= 60)) {
      achievements.push('Multiple students reached intermediate career readiness.');
    }

    res.json({
      classroom: {
        ...classroom,
        members: sortedMembers,
      },
      stats: {
        totalMembers,
        averagePreparation: avgScore,
        achievements,
      },
    });
  });

  // Leave Classroom
  app.post('/api/classrooms/:code/leave', (req: Request, res: Response) => {
    const code = req.params.code.trim().toUpperCase();
    const { userId } = req.body;
    const store = ensureStore();
    const classroom = store.classrooms.find((c) => c.code === code);

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found.' });
    }

    classroom.members = classroom.members.filter((m) => m.userId !== userId);

    const user = store.users.find((u) => u.id === userId);
    if (user && user.profile.classroomIds) {
      user.profile.classroomIds = user.profile.classroomIds.filter((id: string) => id !== classroom.id);
    }

    saveStore(store);
    res.json({ success: true, message: 'You have left the classroom.' });
  });

  // Regenerate Code (Owner only)
  app.post('/api/classrooms/:code/regenerate-code', (req: Request, res: Response) => {
    const code = req.params.code.trim().toUpperCase();
    const { ownerId } = req.body;
    const store = ensureStore();
    const classroom = store.classrooms.find((c) => c.code === code);

    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found.' });
    }
    if (classroom.ownerId !== ownerId) {
      return res.status(403).json({ error: 'Only the classroom owner can regenerate the code.' });
    }

    classroom.code = generateClassCode();
    saveStore(store);
    res.json({ success: true, newCode: classroom.code });
  });

  // Delete Classroom (Owner only)
  app.delete('/api/classrooms/:code', (req: Request, res: Response) => {
    const code = req.params.code.trim().toUpperCase();
    const { ownerId } = req.body;
    const store = ensureStore();
    const idx = store.classrooms.findIndex((c) => c.code === code);

    if (idx === -1) {
      return res.status(404).json({ error: 'Classroom not found.' });
    }
    if (store.classrooms[idx].ownerId !== ownerId) {
      return res.status(403).json({ error: 'Only the classroom owner can delete this class.' });
    }

    store.classrooms.splice(idx, 1);
    saveStore(store);
    res.json({ success: true, message: 'Classroom has been deleted.' });
  });

  // --- VITE MIDDLEWARE OR STATIC SERVING ---
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`SkillGap Career Intelligence running at http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
