import {
  CareerRole,
  PersonalTimeline,
  TimelinePaceHours,
  WeeklyTimelineNode,
  PaceStatus,
} from '../types/career';
import { getProjectsForRole } from '../data/learningProjectsData';

export function generatePersonalTimeline(
  targetRole: CareerRole | null,
  hoursPerWeek: TimelinePaceHours,
  targetDate?: string
): PersonalTimeline {
  const roleTitle = targetRole ? targetRole.title : 'Technology Career';
  const roleProjects = targetRole ? getProjectsForRole(targetRole.id) : [];

  const proj1 = roleProjects[0]?.name || 'Foundation Domain Project';
  const proj2 = roleProjects[1]?.name || 'Application Domain Project';
  const proj3 = roleProjects[2]?.name || 'Role-Specific Project';
  const proj4 = roleProjects[3]?.name || 'End-to-End Capstone Project';

  // Calculate total estimated weeks based on hours per week
  // 12+ hrs: 8 weeks; 8-12 hrs: 10 weeks; 5-7 hrs: 12 weeks; 2-4 hrs: 16 weeks
  let totalWeeks = 12;
  if (hoursPerWeek === '12+') totalWeeks = 8;
  else if (hoursPerWeek === '8-12') totalWeeks = 10;
  else if (hoursPerWeek === '5-7') totalWeeks = 12;
  else if (hoursPerWeek === '2-4') totalWeeks = 16;

  const weeklyPlan: WeeklyTimelineNode[] = [];

  if (totalWeeks <= 8) {
    // Accelerated 8-week plan
    weeklyPlan.push(
      {
        weekNumber: 1,
        title: 'Git Version Control & Environment Setup',
        focus: 'Version control fundamentals and initial baseline self-assessment.',
        outcomes: ['Complete Git 8-step progression', 'Publish first GitHub repo', 'Baseline self-assessment in My Skills'],
        milestoneType: 'FOUNDATION',
        isCompleted: false,
        isCurrentWeek: true,
      },
      {
        weekNumber: 2,
        title: 'Core Role Competencies',
        focus: `Deep-dive into primary documented competencies for ${roleTitle}.`,
        outcomes: ['Complete guided exercises in core skills', 'Review official documentation'],
        milestoneType: 'CORE_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 3,
        title: `Project 1: ${proj1}`,
        focus: 'Hands-on practical implementation of foundational skills.',
        outcomes: ['Write and test independent code', 'Document repository with problem statement and run steps'],
        milestoneType: 'PROJECT_1',
        isCompleted: false,
      },
      {
        weekNumber: 4,
        title: 'Applied Engineering & Communication',
        focus: 'Integration and technical presentation skills.',
        outcomes: ['Advance 2 competencies to Level 4 (Applied)', 'Complete Vinh Giang communication practice'],
        milestoneType: 'APPLIED_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 5,
        title: `Project 2: ${proj2}`,
        focus: 'Build real application pipeline with testing and verification.',
        outcomes: ['Implement end-to-end working system', 'Add architecture diagram and demo video to README'],
        milestoneType: 'PROJECT_2',
        isCompleted: false,
      },
      {
        weekNumber: 6,
        title: 'Portfolio Curation & Technical Interview Prep',
        focus: 'Defending architectural trade-offs in technical interviews.',
        outcomes: ['Curate top 3 pinned repositories', 'Practice Google technical interview trade-off questions'],
        milestoneType: 'INTERVIEW_PREP',
        isCompleted: false,
      },
      {
        weekNumber: 7,
        title: `Project 3: ${proj3}`,
        focus: 'Role-specific advanced technical solution.',
        outcomes: ['Benchmark latency/accuracy trade-offs', 'Package repository with Docker / clean environment'],
        milestoneType: 'CORE_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 8,
        title: `Capstone & Career Readiness: ${proj4}`,
        focus: 'Full showcase project and behavioral interview mastery.',
        outcomes: ['Publish portfolio centerpiece repository', 'Complete behavioral STAR interview practice'],
        milestoneType: 'CAPSTONE',
        isCompleted: false,
      }
    );
  } else {
    // 10 to 16 week sustainable pacing
    weeklyPlan.push(
      {
        weekNumber: 1,
        title: 'Git Version Control & Environment Setup',
        focus: 'Initialize development environment and master repository workflows.',
        outcomes: ['Complete GitHub Skills course', 'Author clean commits and push initial project repo'],
        milestoneType: 'FOUNDATION',
        isCompleted: false,
        isCurrentWeek: true,
      },
      {
        weekNumber: 2,
        title: 'Core Foundations & Mental Models',
        focus: `Foundational programming and mathematical intuition for ${roleTitle}.`,
        outcomes: ['Assess baseline skills', 'Study official documentation tutorial'],
        milestoneType: 'FOUNDATION',
        isCompleted: false,
      },
      {
        weekNumber: 3,
        title: 'Guided Practice & Architecture Basics',
        focus: 'Hands-on guided walkthroughs and structured exercises.',
        outcomes: ['Replicate reference codebases', 'Achieve Level 2 (Guided) in primary role skills'],
        milestoneType: 'CORE_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 4,
        title: `Project 1: ${proj1}`,
        focus: 'First independent milestone project.',
        outcomes: ['Build working solution from scratch', 'Write clean Markdown README with setup steps'],
        milestoneType: 'PROJECT_1',
        isCompleted: false,
      },
      {
        weekNumber: 5,
        title: 'Core Competency Deepening',
        focus: 'Moving from guided practice to independent problem solving.',
        outcomes: ['Reach Level 3 (Independent) in core role skills', 'Resolve unguided practice bugs'],
        milestoneType: 'CORE_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 6,
        title: 'Presentation & Technical Communication',
        focus: 'Explaining complex concepts clearly to non-technical stakeholders.',
        outcomes: ['Complete Vinh Giang vocal exercises', 'Deliver 90-second project explanation without notes'],
        milestoneType: 'APPLIED_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 7,
        title: `Project 2: ${proj2}`,
        focus: 'Application-level project with realistic datasets or inputs.',
        outcomes: ['Implement production pipeline', 'Record demo GIF or video walkthrough'],
        milestoneType: 'PROJECT_2',
        isCompleted: false,
      },
      {
        weekNumber: 8,
        title: 'Code Quality, Testing & Docker',
        focus: 'Packaging applications for reliable execution.',
        outcomes: ['Write unit tests with pytest', 'Containerize project with Docker'],
        milestoneType: 'APPLIED_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 9,
        title: 'Public GitHub Portfolio Curation',
        focus: 'Showcasing real evidence of engineering capability.',
        outcomes: ['Pin top 3 repositories with tags', 'Add architecture diagrams and live links'],
        milestoneType: 'PORTFOLIO',
        isCompleted: false,
      },
      {
        weekNumber: 10,
        title: `Project 3: ${proj3}`,
        focus: 'Role-specific specialized engineering problem.',
        outcomes: ['Optimize system bottlenecks', 'Document architectural trade-offs in README'],
        milestoneType: 'CORE_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: 11,
        title: 'Technical & Behavioral Interview Prep',
        focus: 'Practicing common technical questions and STAR behavioral stories.',
        outcomes: ['Practice Google technical trade-off questions', 'Prepare 3 STAR project stories'],
        milestoneType: 'INTERVIEW_PREP',
        isCompleted: false,
      },
      {
        weekNumber: 12,
        title: `Capstone Showcase: ${proj4}`,
        focus: 'Final end-to-end showcase project ready for employer review.',
        outcomes: ['Publish polished open-source repository', 'Complete final career readiness checklist'],
        milestoneType: 'CAPSTONE',
        isCompleted: false,
      }
    );
  }

  return {
    hoursPerWeek,
    hasDeadline: Boolean(targetDate),
    targetDate,
    paceStatus: 'ON_TRACK',
    weeklyPlan,
    createdAt: new Date().toISOString(),
  };
}

// Rebalance personal timeline without judgment
export function rebalanceTimeline(
  current: PersonalTimeline,
  action: 'SPREAD_MORE_WEEKS' | 'KEEP_PACE' | 'INCREASE_TIME'
): PersonalTimeline {
  const updatedPlan = [...current.weeklyPlan];

  if (action === 'SPREAD_MORE_WEEKS') {
    // Add 2 buffer weeks to distribute remaining incomplete items
    const maxWeek = Math.max(...updatedPlan.map((w) => w.weekNumber), 0);
    updatedPlan.push(
      {
        weekNumber: maxWeek + 1,
        title: 'Consolidation & Practice Buffer',
        focus: 'Catch up on unfinished project milestones and reinforce core concepts.',
        outcomes: ['Review previous project feedback', 'Refine GitHub documentation'],
        milestoneType: 'APPLIED_SKILLS',
        isCompleted: false,
      },
      {
        weekNumber: maxWeek + 2,
        title: 'Final Portfolio Polish & Interview Review',
        focus: 'Ensure all repositories and interview talking points are interview-ready.',
        outcomes: ['Complete all pending soft-skills practices', 'Final checklist review'],
        milestoneType: 'CAPSTONE',
        isCompleted: false,
      }
    );

    return {
      ...current,
      paceStatus: 'REBALANCED',
      weeklyPlan: updatedPlan,
      lastRebalancedAt: new Date().toISOString(),
    };
  } else if (action === 'INCREASE_TIME') {
    return {
      ...current,
      hoursPerWeek: current.hoursPerWeek === '2-4' ? '5-7' : current.hoursPerWeek === '5-7' ? '8-12' : '12+',
      paceStatus: 'ON_TRACK',
      lastRebalancedAt: new Date().toISOString(),
    };
  }

  return {
    ...current,
    paceStatus: 'ON_TRACK',
    lastRebalancedAt: new Date().toISOString(),
  };
}
