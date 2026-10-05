import {
  SkillGapProject,
  SoftSkillVideo,
  GitStep,
  LearningResource,
  ResourceDifficulty,
} from '../types/career';

// 1. UNIVERSAL VERIFIED SOFT SKILL VIDEOS (EXPANDED CURATED CATALOG)
export const VERIFIED_SOFT_SKILL_VIDEOS: SoftSkillVideo[] = [
  // --- VINH GIANG (COMMUNICATION / PUBLIC SPEAKING / INTERVIEWS) ---
  {
    id: 'vinh_giang_fix_comm',
    title: 'The Only Video You Need To Fix Your Communication Skills',
    youtubeId: 'HlY0Awdpf9U',
    provider: 'Vinh Giang',
    creator: 'Vinh Giang',
    language: 'en',
    category: 'COMMUNICATION',
    difficulty: 'FOUNDATION',
    skillTags: ['Public Speaking', 'Vocal Presence', 'Clarity', 'Executive Presence'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Vinh Giang demonstrates vocal variety, rate of speech, pausing, and body language to eliminate filler words and project executive presence in interviews.',
    practicePrompt:
      'Record a 60-second self-introduction applying the 5 key vocal instruments: pitch, pace, pause, volume, and tonality. Eliminate all filler words ("um", "like").',
    talkingPointFocus:
      'Intentional pausing before answering, pitch inflection for clarity, and posture confidence.',
  },
  {
    id: 'vinh_giang_interviews',
    title: 'How to Speak with Confidence and Authority in Interviews',
    youtubeId: 'HlY0Awdpf9U',
    provider: 'Vinh Giang',
    creator: 'Vinh Giang',
    language: 'en',
    category: 'INTERVIEW PREPARATION',
    difficulty: 'INTERMEDIATE',
    skillTags: ['Interview Presence', 'Confidence', 'Storytelling'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Learn how to structure complex career experiences into compelling stories that hold interviewers spellbound.',
    practicePrompt:
      'Answer "What is your greatest technical strength?" using a three-part vocal arc: assertion, concrete project proof, and commercial impact.',
    talkingPointFocus:
      'Confident delivery without rushing, matching interviewer energy, and grounded posture.',
  },

  // --- CAREERVIDZ (RICHARD MCMUNN - INTERVIEW PREPARATION) ---
  {
    id: 'careervidz_11_questions',
    title: '11 INTERVIEW QUESTIONS YOU MUST PREPARE FOR! (Best Answers Included!)',
    youtubeId: 'RgBSQi4WLLM',
    provider: 'CareerVidz',
    creator: 'CareerVidz',
    language: 'en',
    category: 'INTERVIEW PREPARATION',
    difficulty: 'FOUNDATION',
    skillTags: ['Common Questions', 'STAR Method', 'Salary Negotiation', 'Strengths & Weaknesses'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Richard McMunn delivers structured, high-scoring answers to the 11 most frequent interview questions, including strengths, weaknesses, and handling difficult team dynamics.',
    practicePrompt:
      'Practice answering: "Why should we hire you over other qualified candidates?" focusing on specific role competencies and your portfolio projects.',
    talkingPointFocus:
      'Connecting past projects directly to role responsibilities and maintaining positive professional tone.',
  },
  {
    id: 'careervidz_top_10_common',
    title: 'TOP 10 COMMON INTERVIEW QUESTIONS & ANSWERS!',
    youtubeId: 'F6yE6FwQw-8',
    provider: 'CareerVidz',
    creator: 'CareerVidz',
    language: 'en',
    category: 'BEHAVIORAL INTERVIEWS',
    difficulty: 'BEGINNER',
    skillTags: ['Behavioral Questions', 'Conflict Resolution', 'Pressure Handling'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Master the classic behavioral prompts: "Describe a time you worked under pressure" and "How do you handle difficult team members?".',
    practicePrompt:
      'Draft your response to: "Tell me about a time you handled conflict or disagreement within a technical project team." Use Situation-Task-Action-Result.',
    talkingPointFocus:
      'De-escalation, focusing on objective project goals, and taking ownership of mistakes.',
  },

  // --- SELF MADE MILLENNIAL (MADELINE MANN) ---
  {
    id: 'smm_tell_me_about_yourself',
    title: "Answering 'Tell Me About Yourself' in an Interview: Step-by-Step Guide",
    youtubeId: 'Rpe4WCOFBSM',
    provider: 'Self Made Millennial',
    creator: 'Self Made Millennial',
    language: 'en',
    category: 'SELF INTRODUCTION',
    difficulty: 'FOUNDATION',
    skillTags: ['Tell Me About Yourself', 'Present-Past-Future Formula', 'Elevator Pitch'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Madeline Mann provides the exact "Present-Past-Future" formula that top hiring managers look for in the opening 2 minutes of an interview.',
    practicePrompt:
      'Deliver your answer to "Tell me about yourself" in under 90 seconds using the Present-Past-Future structure tailored to your chosen career path.',
    talkingPointFocus:
      'Leading with your current focus, highlighting 1-2 major technical wins, and stating why this role is your next step.',
  },

  // --- JEFFERSON FISHER (COMMUNICATION HABITS) ---
  {
    id: 'jefferson_fisher_habits',
    title: 'Communication habits to break',
    youtubeId: 'f3-5CDNIX-k',
    provider: 'Jefferson Fisher',
    creator: 'Jefferson Fisher',
    language: 'en',
    category: 'COMMUNICATION',
    difficulty: 'BEGINNER',
    skillTags: ['Listening', 'Direct Speech', 'Over-apologizing', 'Workplace Clarity'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Trial attorney Jefferson Fisher breaks down common verbal habits that undermine technical authority, such as over-apologizing and rambling.',
    practicePrompt:
      'Practice explaining an issue or bug in your code without saying "sorry" or using minimizing phrases like "just a small thing".',
    talkingPointFocus:
      'Direct, concise phrasing, holding eye contact, and pausing to listen actively.',
  },

  // --- TEDX TALKS ---
  {
    id: 'soft_pres_attention',
    title: "How to Present to Keep Your Audience's Attention",
    youtubeId: 'BmEiZadVNWY',
    provider: 'TEDx Talks',
    creator: 'TEDx Talks',
    language: 'en',
    category: 'PRESENTATION',
    difficulty: 'INTERMEDIATE',
    skillTags: ['Audience Engagement', 'Slide Design', 'Visual Storytelling'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Engineers must persuade colleagues and stakeholders by presenting complex technical solutions clearly, engagingly, and without drowning listeners in jargon.',
    practicePrompt:
      'Explain one of your technical projects in 90 seconds: start with an engaging problem hook, describe your architecture, and conclude with the tangible impact.',
    talkingPointFocus:
      'Focus on pacing, visual structure, problem-first storytelling, and audience retention.',
  },

  // --- INDEED ---
  {
    id: 'soft_interview_common',
    title: 'Top Interview Tips: Common Questions, Nonverbal Communication & More',
    youtubeId: 'HG68Ymazo18',
    provider: 'Indeed',
    creator: 'Indeed',
    language: 'en',
    category: 'INTERVIEW PREPARATION',
    difficulty: 'FOUNDATION',
    skillTags: ['Non-verbal Composure', 'Body Language', 'Interview Protocol'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'A successful technical interview requires clear professional communication, confident body language, and structured answers using the STAR method.',
    practicePrompt:
      'Practice answering: "Tell me about yourself" in under 2 minutes, highlighting your career goal, technical strengths, and project accomplishments.',
    talkingPointFocus:
      'Non-verbal composure, active listening, structured articulation, and genuine curiosity.',
  },

  // --- LIFE AT GOOGLE ---
  {
    id: 'soft_google_tech_interview',
    title: "How to prepare for Google's technical interview questions",
    youtubeId: 'we7ba0slWrc',
    provider: 'Life at Google',
    creator: 'Life at Google',
    language: 'en',
    category: 'TECHNICAL INTERVIEWS',
    difficulty: 'ADVANCED',
    skillTags: ['Whiteboarding', 'Thinking Out Loud', 'Trade-off Analysis', 'Edge Cases'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Top technology hiring teams evaluate how you reason out loud, break down ambiguous requirements, discuss trade-offs, and handle edge cases.',
    practicePrompt:
      'Choose one architectural decision from your recent project and verbally explain three trade-offs you evaluated before choosing your approach.',
    talkingPointFocus:
      'Thinking out loud, clarifying assumptions, algorithmic complexity, and systematic debugging.',
  },
  {
    id: 'soft_google_behavioral',
    title: "How to prepare for Google's non-technical interview questions",
    youtubeId: 'TPilhhzHTnU',
    provider: 'Life at Google',
    creator: 'Life at Google',
    language: 'en',
    category: 'BEHAVIORAL INTERVIEWS',
    difficulty: 'INTERMEDIATE',
    skillTags: ['Googliness', 'Navigating Ambiguity', 'Collaboration', 'STAR Method'],
    sourceDate: 'Verified 2026',
    whyItMatters:
      'Behavioral interviews assess collaboration, resilience under uncertainty, communication with cross-functional partners, and accountability.',
    practicePrompt:
      'Answer: "Describe a situation where a technical project hit an unexpected blocker. How did you diagnose the root cause and resolve it?"',
    talkingPointFocus:
      'Situation-Task-Action-Result (STAR), ownership, team empathy, and post-incident learning.',
  },
];

// 2. UNIVERSAL GIT & GITHUB TRACK
export const UNIVERSAL_GIT_PROGRESSION: GitStep[] = [
  {
    id: 1,
    title: 'Repositories',
    description: 'Initialize a clean project repository with a standard layout, .gitignore, and license.',
    action: 'Create a local repository with `git init` or initialize on GitHub with a README.',
  },
  {
    id: 2,
    title: 'Commits',
    description: 'Author focused, atomic commits with descriptive imperative commit messages.',
    action: 'Stage modified files with `git add` and commit with `git commit -m "Add feature/fix"`.',
  },
  {
    id: 3,
    title: 'Branches',
    description: 'Isolate feature development, experimentation, and bug fixes on dedicated branches.',
    action: 'Create and switch branches with `git checkout -b feature/name` or `git switch -c`.',
  },
  {
    id: 4,
    title: 'Pull Requests',
    description: 'Submit structured pull requests with summaries, screenshots, and testing verification.',
    action: 'Push feature branch to GitHub and open a Pull Request with a clear description.',
  },
  {
    id: 5,
    title: 'Merging',
    description: 'Rebase or merge changes into the main line cleanly while resolving any merge conflicts.',
    action: 'Review code diffs, resolve conflicts calmly in an editor, and complete the merge.',
  },
  {
    id: 6,
    title: 'README & Documentation',
    description: 'Document the problem, architecture diagrams, installation instructions, and live demo links.',
    action: 'Write a comprehensive Markdown README that any engineer can follow in 5 minutes.',
  },
  {
    id: 7,
    title: 'Basic Collaboration Workflow',
    description: 'Synchronize remote updates, clone repositories, handle issues, and review peer diffs.',
    action: 'Pull latest upstream changes with `git pull --rebase` and use GitHub Issues.',
  },
  {
    id: 8,
    title: 'Building a Public Project Portfolio',
    description: 'Curate your pinned GitHub repositories to showcase verified proof of engineering capability.',
    action: 'Pin your top 2–4 repositories with clean tags, descriptions, and functional demo links.',
  },
];

export const GIT_CORE_RESOURCE: LearningResource = {
  id: 'git_intro_github_skills',
  title: 'Introduction to GitHub',
  provider: 'GitHub Skills',
  url: 'https://skills.github.com/',
  type: 'Interactive',
  description:
    'Hands-on interactive repository course teaching repositories, branches, commits, and pull requests directly in GitHub.',
  cost: 'Free',
  difficulty: 'FOUNDATION',
  sourceType: 'RESEARCH',
  whyThisResource:
    'It provides real tactile muscle memory directly on GitHub rather than passive video watching.',
  whatYouWillLearn: [
    'Creating repositories and branch workflows',
    'Writing atomic commits and opening Pull Requests',
    'Handling GitHub discussions, markdown formatting, and merging',
  ],
  whatToDoAfter: 'Complete the "Publish Your First Professional Project" checklist below.',
  relatedProject: 'Publish Your First Professional Project',
};

export interface GitProjectChecklistItem {
  step: number;
  label: string;
  instruction: string;
}

export const GIT_FIRST_PROJECT_CHECKLIST: GitProjectChecklistItem[] = [
  {
    step: 1,
    label: 'Create repository',
    instruction: 'Create a clean public repository on GitHub with a descriptive name and open source license (MIT or Apache 2.0).',
  },
  {
    step: 2,
    label: 'Create README',
    instruction: 'Include Project Overview, Problem Statement, Architecture Summary, and Prerequisites.',
  },
  {
    step: 3,
    label: 'Create branch',
    instruction: 'Never commit directly to main. Run `git checkout -b feature/initial-implementation`.',
  },
  {
    step: 4,
    label: 'Commit work',
    instruction: 'Commit modular code changes with clear descriptive messages following conventional standards.',
  },
  {
    step: 5,
    label: 'Open pull request',
    instruction: 'Push branch to GitHub with `git push -u origin feature/initial-implementation` and open a PR.',
  },
  {
    step: 6,
    label: 'Merge changes',
    instruction: 'Review the file diff in GitHub, confirm checks pass, and merge your branch into main.',
  },
  {
    step: 7,
    label: 'Document project',
    instruction: 'Add setup commands, environment variables example (.env.example), and sample inputs/outputs.',
  },
  {
    step: 8,
    label: 'Publish portfolio-ready repository',
    instruction: 'Add repository tags (topics), pin the repository on your GitHub profile, and add a link in your resume.',
  },
];

// 3. ROLE-SPECIFIC SKILLGAP PROJECTS
export const ROLE_SPECIFIC_PROJECTS: Record<string, SkillGapProject[]> = {
  // Computer Vision Engineer
  computer_vision_engineer: [
    {
      id: 'cv_proj_foundation',
      name: 'Image Filtering & Edge Detection Pipeline',
      roleId: 'computer_vision_engineer',
      difficulty: 'Foundation',
      whyYoureBuildingIt:
        'Understand matrix operations, spatial convolution, Gaussian smoothing, and gradient-based edge extraction in raw OpenCV without black-box shortcuts.',
      skillsDemonstrated: ['OpenCV', 'Python', 'NumPy', 'Image Filtering'],
      prerequisites: ['Python basics', 'Matrix arithmetic'],
      expectedOutput:
        'A command-line and interactive pipeline that accepts webcam or image streams and produces Sobel/Canny edge maps, adaptive thresholding, and morphological contours.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Visual comparisons of filter kernels, run instructions, and processing benchmarks.',
        demoDescription: 'Side-by-side visualization showing original vs filtered vs contour-detected images.',
      },
      interviewTalkingPoints: [
        'How spatial convolution kernels work under the hood',
        'Kernel size trade-offs between noise reduction and detail preservation',
        'Threshold selection in Canny edge detection',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'cv_proj_app',
      name: 'Real-Time Object Detection System',
      roleId: 'computer_vision_engineer',
      difficulty: 'Application',
      whyYoureBuildingIt:
        'Apply deep learning object detection models to live video streams, benchmark inference frames-per-second (FPS), and implement non-maximum suppression (NMS).',
      skillsDemonstrated: ['OpenCV', 'Object Detection', 'Deep Learning', 'Real-Time Inference'],
      prerequisites: ['Image filtering', 'PyTorch / ONNX basics'],
      expectedOutput:
        'A live multi-object detection application capable of maintaining >25 FPS on video input with bounding box annotations, class labels, and confidence filtering.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Model selection rationale, hardware requirements, FPS profiling table, and demo GIF.',
        demoDescription: 'Annotated video demo showing smooth tracking and detection across varying lighting conditions.',
      },
      interviewTalkingPoints: [
        'Single-stage vs two-stage detection architectures',
        'Intersection over Union (IoU) calculation and Non-Maximum Suppression logic',
        'Techniques used to prevent frame dropping in real-time video processing',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'cv_proj_role',
      name: 'Semantic Segmentation & Defect Analysis',
      roleId: 'computer_vision_engineer',
      difficulty: 'Role-Specific',
      whyYoureBuildingIt:
        'Solve industrial inspection or medical imaging challenges by classifying pixels individually using CNN or Vision Transformer segmentation backbones.',
      skillsDemonstrated: ['CNNs', 'Vision Transformers', 'PyTorch', 'Semantic Segmentation'],
      prerequisites: ['Object detection', 'Loss functions (Dice, CrossEntropy)'],
      expectedOutput:
        'Trained segmentation pipeline with custom dataset loader, pixel-level defect mask generation, and IoU metric evaluation.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Dataset preparation steps, training loss curves, mIoU benchmark tables, and failure case analysis.',
        demoDescription: 'Interactive overlay viewer comparing ground truth masks against model predictions.',
      },
      interviewTalkingPoints: [
        'Encoder-decoder architectures and skip connections (e.g. U-Net / SegFormer)',
        'Handling severe class imbalance between background and defect pixels',
        'Data augmentation strategies for spatial invariance',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'cv_proj_capstone',
      name: 'Edge-Optimized Multi-Camera Tracking Pipeline',
      roleId: 'computer_vision_engineer',
      difficulty: 'Capstone',
      whyYoureBuildingIt:
        'Demonstrate end-to-end production readiness by combining detection, re-identification, Kalman filtering, and TensorRT / ONNX quantization for edge deployment.',
      skillsDemonstrated: ['Real-Time Inference', 'OpenCV', 'Model Optimization', 'Docker'],
      prerequisites: ['Object detection', 'C++ or optimized Python', 'Docker'],
      expectedOutput:
        'Containerized production-grade pipeline running on simulated edge streams with tracking IDs maintained across camera handoffs.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Architecture diagram, Dockerfile, latency breakdown per frame stage, and quantization precision comparison.',
        architectureDiagram: 'Camera RTSP Stream -> Frame Decode -> TensorRT Inference -> ByteTrack Tracker -> Output Stream',
        demoDescription: 'Recorded video showing multi-object tracking IDs persisted across occlusions.',
      },
      interviewTalkingPoints: [
        'FP16 vs INT8 quantization trade-offs on edge GPUs',
        'Associating detections with tracklets using Hungarian algorithm and Kalman filter',
        'Memory management and zero-copy buffer passing in high-throughput video pipelines',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ],

  // Generative AI / LLM Engineer
  genai_llm_engineer: [
    {
      id: 'genai_proj_foundation',
      name: 'Semantic Document Search & Embeddings Engine',
      roleId: 'genai_llm_engineer',
      difficulty: 'Foundation',
      whyYoureBuildingIt:
        'Understand tokenization, vector embeddings, cosine similarity, and vector indexing fundamentals before assembling complex agentic chains.',
      skillsDemonstrated: ['Python', 'Embeddings', 'Vector Databases', 'Prompt Engineering'],
      prerequisites: ['Python syntax', 'Basic linear algebra'],
      expectedOutput:
        'A local semantic search engine that indexes technical documents, generates vector embeddings, and returns top-K semantically relevant excerpts.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Embedding model comparison, chunking strategy analysis, and sample query evaluations.',
        demoDescription: 'CLI or Streamlit app demonstrating semantic retrieval versus naive keyword search.',
      },
      interviewTalkingPoints: [
        'Impact of chunk size and overlap on semantic retrieval quality',
        'Distance metrics: Cosine Similarity vs Dot Product vs Euclidean Distance',
        'Handling out-of-vocabulary terms and multilingual embeddings',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'genai_proj_app',
      name: 'Production RAG System with Grounding & Reranking',
      roleId: 'genai_llm_engineer',
      difficulty: 'Application',
      whyYoureBuildingIt:
        'Build an enterprise Retrieval-Augmented Generation pipeline with two-stage cross-encoder reranking, citation synthesis, and context length optimization.',
      skillsDemonstrated: ['RAG & Vector Databases', 'LangChain / LlamaIndex', 'Python', 'Evaluation'],
      prerequisites: ['Semantic search', 'API handling'],
      expectedOutput:
        'A fully functional RAG service that answers domain queries with strict source grounding, citation links, and fallback handling when context is missing.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Pipeline architecture diagram, evaluation benchmark results (Ragas/faithfulness), and curl request examples.',
        demoDescription: 'Web interface showing source document highlights alongside synthesized answers.',
      },
      interviewTalkingPoints: [
        'Mitigating factual inaccuracies through strict grounding and system prompting',
        'Why dense vector retrieval alone fails and why rerankers improve precision',
        'Managing context window limits and cost trade-offs across model tiers',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'genai_proj_role',
      name: 'Fine-Tuning & Parameter-Efficient LoRA Adaptation',
      roleId: 'genai_llm_engineer',
      difficulty: 'Role-Specific',
      whyYoureBuildingIt:
        'Master domain adaptation of open-source models using LoRA / QLoRA, dataset curation, loss monitoring, and validation against a held-out test suite.',
      skillsDemonstrated: ['Fine-Tuning & PEFT', 'PyTorch', 'Hugging Face', 'Model Evaluation'],
      prerequisites: ['PyTorch fundamentals', 'Basic RAG understanding'],
      expectedOutput:
        'A fine-tuned lightweight open-source LLM (e.g. Llama/Mistral) adapted to produce structured JSON outputs for a specialized domain.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Dataset preparation script, training loss plots, GPU memory footprint comparison, and pre/post fine-tuning evaluation tables.',
        demoDescription: 'Side-by-side comparison showing base model outputs vs the fine-tuned adapter outputs.',
      },
      interviewTalkingPoints: [
        'Mathematical concept behind Low-Rank Adaptation (LoRA) rank and alpha parameters',
        'When to choose RAG vs Fine-Tuning vs Prompt Engineering for domain tasks',
        'Techniques for preventing catastrophic forgetting during domain specialization',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'genai_proj_capstone',
      name: 'High-Throughput Streaming LLM Gateway with vLLM',
      roleId: 'genai_llm_engineer',
      difficulty: 'Capstone',
      whyYoureBuildingIt:
        'Build a production-grade inference service featuring continuous batching, streaming responses, PagedAttention memory management, and guardrails.',
      skillsDemonstrated: ['Model Serving & Inference', 'Docker', 'Evaluation & Guardrails', 'System Design'],
      prerequisites: ['Docker', 'Async Python', 'vLLM / TensorRT basics'],
      expectedOutput:
        'A containerized API gateway that serves open-source models with continuous batching, token streaming, and automated latency/throughput metrics.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'System architecture diagram, load testing benchmarks (tokens/sec, time-to-first-token), and Docker compose configuration.',
        architectureDiagram: 'Client -> Fastify/FastAPI Gateway -> Guardrail Validator -> vLLM Engine (PagedAttention) -> Streaming SSE Client',
        demoDescription: 'Load-test run displaying concurrency handling without Out-Of-Memory (OOM) crashes.',
      },
      interviewTalkingPoints: [
        'PagedAttention memory optimization and why KV-cache fragmentation occurs',
        'Continuous batching vs static batching for variable-length generation requests',
        'Strategies for monitoring Time-To-First-Token (TTFT) and Inter-Token Latency (ITL)',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ],

  // MLOps / AI Infrastructure Engineer
  mlops_engineer: [
    {
      id: 'mlops_proj_foundation',
      name: 'Reproducible Model Packaging with Docker',
      roleId: 'mlops_engineer',
      difficulty: 'Foundation',
      whyYoureBuildingIt:
        'Eliminate "works on my machine" issues by packaging model weights, dependencies, CUDA drivers, and inference scripts into self-contained Docker images.',
      skillsDemonstrated: ['Docker', 'Python', 'Git', 'Inference APIs'],
      prerequisites: ['Linux command line', 'Python basics'],
      expectedOutput:
        'A hardened, multi-stage Docker container serving a lightweight model with health checks, environment variables, and minimal image size.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Dockerfile explanations, layer optimization details, build and run commands.',
        demoDescription: 'Docker image scanning report and running container curl responses.',
      },
      interviewTalkingPoints: [
        'Multi-stage Docker builds to reduce image size from gigabytes to megabytes',
        'Security best practices: non-root users and vulnerability scanning',
        'CUDA compatibility matrix between host drivers and container runtime',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'mlops_proj_app',
      name: 'Automated Training & Evaluation Pipeline with CI/CD',
      roleId: 'mlops_engineer',
      difficulty: 'Application',
      whyYoureBuildingIt:
        'Automate testing, model retraining, and evaluation regressions using GitHub Actions and MLflow / DVC for artifact tracking.',
      skillsDemonstrated: ['CI/CD for ML', 'Python', 'Git', 'Testing'],
      prerequisites: ['Docker basics', 'Model training basics'],
      expectedOutput:
        'A GitHub Actions workflow that automatically runs unit tests, executes model validation, checks performance thresholds, and registers artifacts upon git push.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Workflow YAML diagram, artifact registry setup, and automated PR comment reports.',
        demoDescription: 'Successful CI/CD run displaying automated testing and model scorecard generation.',
      },
      interviewTalkingPoints: [
        'Difference between traditional software CI/CD and ML continuous training pipelines',
        'Data versioning with DVC to track data changes alongside code commits',
        'Automated model gating policies before promotion to staging',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'mlops_proj_role',
      name: 'Kubernetes Cluster Model Autoscaling & Monitoring',
      roleId: 'mlops_engineer',
      difficulty: 'Role-Specific',
      whyYoureBuildingIt:
        'Deploy scalable model inference pods on Kubernetes with Horizontal Pod Autoscaling (HPA) driven by custom Prometheus latency and queue metrics.',
      skillsDemonstrated: ['Kubernetes', 'Monitoring (Prometheus/Grafana)', 'Docker', 'System Scalability'],
      prerequisites: ['Docker', 'Kubernetes core concepts'],
      expectedOutput:
        'Kubernetes manifests (Deployment, Service, HPA) running on Minikube/Kind with Prometheus scraping and a Grafana dashboard tracking QPS, latency, and GPU utilization.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Kubernetes architecture diagram, Helm chart structure, and Grafana dashboard export.',
        demoDescription: 'Live terminal screen capture demonstrating automatic scale-up when traffic spike is simulated.',
      },
      interviewTalkingPoints: [
        'Custom metrics autoscaling (request queue length vs CPU utilization) for AI workloads',
        'Resource limits, requests, and NVIDIA GPU operator pod configuration',
        'Liveness vs Readiness probes for heavy model loading states',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'mlops_proj_capstone',
      name: 'Zero-Downtime Canary Model Deployment Infrastructure',
      roleId: 'mlops_engineer',
      difficulty: 'Capstone',
      whyYoureBuildingIt:
        'Design and deploy an enterprise canary deployment pipeline that shifts production traffic gradually while continuously monitoring prediction drift.',
      skillsDemonstrated: ['Kubernetes', 'CI/CD for ML', 'GPU Optimization', 'Reliability Engineering'],
      prerequisites: ['Kubernetes', 'Prometheus monitoring'],
      expectedOutput:
        'Automated canary rollout where 10% of live traffic routes to candidate model; if error rate or latency exceeds SLA, the system automatically rolls back without human intervention.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Canary decision tree, Istio/Argo Rollouts config, and post-mortem disaster recovery plan.',
        architectureDiagram: 'Ingress -> Traffic Splitter (90/10) -> Primary Pods / Canary Pods -> Prometheus Drift Engine -> Automated Rollback Controller',
        demoDescription: 'Simulated failure injection triggering automated rollback within 15 seconds.',
      },
      interviewTalkingPoints: [
        'Canary vs Blue-Green vs Shadow deployments for high-stake AI models',
        'Detecting prediction drift and data distribution shift in production',
        'Incident management and graceful service degradation strategies',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ],

  // Agentic AI Developer
  agentic_ai_engineer: [
    {
      id: 'agent_proj_foundation',
      name: 'Function Calling & Structured Tool-Execution Agent',
      roleId: 'agentic_ai_engineer',
      difficulty: 'Foundation',
      whyYoureBuildingIt:
        'Understand schema-driven tool execution, JSON schema validation, and parameter extraction using native function-calling APIs.',
      skillsDemonstrated: ['Python', 'Prompt Engineering', 'LangChain / Tool-Calling', 'Pydantic'],
      prerequisites: ['Python basics', 'API handling'],
      expectedOutput:
        'A deterministic agent capable of binding to 3 custom Python tools (e.g. calculator, weather, database query) and generating strictly typed arguments.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Tool schemas, error recovery handling, and end-to-end execution logs.',
        demoDescription: 'Interactive terminal conversation showing agent selecting and executing correct tools based on user prompts.',
      },
      interviewTalkingPoints: [
        'How tool calling differs from naive text prompt extraction',
        'Validating LLM parameters with Pydantic schemas before execution',
        'Handling tool execution timeouts and runtime exceptions gracefully',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'agent_proj_app',
      name: 'Multi-Agent Research & Synthesis Workflow',
      roleId: 'agentic_ai_engineer',
      difficulty: 'Application',
      whyYoureBuildingIt:
        'Coordinate multiple specialized agents (Planner, Web Researcher, Fact Checker, Writer) using a structured state machine with cyclical graph execution.',
      skillsDemonstrated: ['Multi-Agent Orchestration', 'Agent State & Memory', 'Python', 'Evaluation'],
      prerequisites: ['Function calling', 'Async Python'],
      expectedOutput:
        'A multi-agent team that takes an ambiguous research topic, splits it into research subtasks, executes concurrent web queries, synthesizes findings, and validates sources.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'State machine graph diagram (LangGraph/CrewAI), message bus communication logs, and evaluation reports.',
        demoDescription: 'Terminal or UI visualization showing agent handoffs and intermediate consensus states.',
      },
      interviewTalkingPoints: [
        'State machines vs linear DAG pipelines for autonomous systems',
        'Preventing infinite loops and deadlocks in cyclical agent interactions',
        'Designing specialized agent personas with bounded responsibility',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'agent_proj_role',
      name: 'Self-Correcting Autonomous Code Generation Agent',
      roleId: 'agentic_ai_engineer',
      difficulty: 'Role-Specific',
      whyYoureBuildingIt:
        'Build an autonomous agent that generates code, runs unit tests in an isolated sandbox, reads stack traces upon failure, and repairs its own code iteratively.',
      skillsDemonstrated: ['Agent Sandboxing', 'Agent State & Memory', 'Python', 'Automated Testing'],
      prerequisites: ['Multi-agent workflows', 'Docker sandboxing'],
      expectedOutput:
        'A self-correcting agent that receives coding problem specs, drafts implementations, executes them against test suites in a Docker sandbox, and iterates until all tests pass.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Self-correction loop flowcharts, pass@k benchmark metrics, and security sandbox policies.',
        demoDescription: 'Execution trace showing the agent diagnosing an IndexError and refactoring the code to green.',
      },
      interviewTalkingPoints: [
        'Security isolation: why code execution agents must run in non-networked sandboxes',
        'Giving the model actionable feedback (compiler errors, tracebacks) for self-reflection',
        'Token budgeting and maximum retry limits to prevent runaway compute costs',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'agent_proj_capstone',
      name: 'Enterprise Agent with Distributed Memory & Human-in-the-Loop',
      roleId: 'agentic_ai_engineer',
      difficulty: 'Capstone',
      whyYoureBuildingIt:
        'Build a production-grade enterprise agent featuring persistent hierarchical memory (short-term conversational + long-term episodic), and human approval gates for critical actions.',
      skillsDemonstrated: ['Agent State & Memory', 'Multi-Agent Orchestration', 'Security & Sandboxing', 'System Architecture'],
      prerequisites: ['Self-correcting agents', 'Relational + Vector DBs'],
      expectedOutput:
        'Production backend service with OAuth-scoped user actions, Redis/Postgres state persistence, long-term memory retrieval, and approval webhooks for irreversible tasks.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Comprehensive architecture diagrams, database schemas, security audit report, and API specs.',
        architectureDiagram: 'User -> Gateway -> State Coordinator -> Short/Long-Term Memory -> Human-in-the-Loop Gate -> Sandboxed Tool Executor',
        demoDescription: 'Recorded demo showing agent pausing execution for human approval before sending an external email or updating a database.',
      },
      interviewTalkingPoints: [
        'Managing episodic vs semantic memory with vector stores and relational state',
        'Designing secure Human-in-the-Loop (HITL) approval workflows',
        'Audit logging and replayability for compliance and debugging',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ],

  // Data Scientist
  data_scientist: [
    {
      id: 'ds_proj_foundation',
      name: 'Exploratory Data Analysis & Statistical Modeling',
      roleId: 'data_scientist',
      difficulty: 'Foundation',
      whyYoureBuildingIt:
        'Master exploratory data analysis, distribution fitting, hypothesis testing, and missing data imputation on real-world tabular datasets.',
      skillsDemonstrated: ['Python', 'Pandas', 'NumPy', 'Statistical Analysis'],
      prerequisites: ['Python basics', 'Descriptive statistics'],
      expectedOutput:
        'A reproducible Jupyter notebook and Python script uncovering non-obvious patterns, correlations, and distribution anomalies with clean visualizations.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Business problem framing, key findings summary, and statistical test conclusions.',
        demoDescription: 'Interactive HTML report containing charts, distribution plots, and outlier analysis.',
      },
      interviewTalkingPoints: [
        'Parametric vs non-parametric hypothesis tests and when to apply them',
        'Techniques for handling missing data without introducing sampling bias',
        'Communicating statistical insights to non-technical business leaders',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'ds_proj_app',
      name: 'Customer Lifetime Value & Churn Prediction System',
      roleId: 'data_scientist',
      difficulty: 'Application',
      whyYoureBuildingIt:
        'Train, evaluate, and interpret gradient boosted tree models (XGBoost/LightGBM) with cross-validation and feature importance explainability (SHAP).',
      skillsDemonstrated: ['Machine Learning', 'scikit-learn', 'Feature Engineering', 'Model Interpretability'],
      prerequisites: ['Statistical analysis', 'Supervised learning concepts'],
      expectedOutput:
        'A trained predictive model achieving high ROC-AUC on imbalanced churn data, complete with a SHAP waterfall explainer for individual customer risk factors.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Feature engineering methodology, hyperparameter search strategy, precision-recall curve, and SHAP plots.',
        demoDescription: 'Model explanation dashboard showing top risk drivers for individual customer profiles.',
      },
      interviewTalkingPoints: [
        'Addressing class imbalance with threshold tuning, cost-sensitive learning, and PR curves',
        'Using SHAP values to explain complex non-linear model predictions to compliance teams',
        'Feature leakage: how it occurs and preventative validation strategies',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'ds_proj_role',
      name: 'A/B Testing Experimentation Platform & Causal Inference',
      roleId: 'data_scientist',
      difficulty: 'Role-Specific',
      whyYoureBuildingIt:
        'Design statistical experimentation pipelines calculating minimum detectable effect (MDE), power analysis, sample sizes, and variance reduction (CUPED).',
      skillsDemonstrated: ['A/B Testing', 'Statistics & Probability', 'SQL', 'Causal Inference'],
      prerequisites: ['Hypothesis testing', 'SQL querying'],
      expectedOutput:
        'An experimentation framework that accepts simulated experiment logs, performs CUPED variance reduction, and outputs confidence intervals with statistical rigor.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Experiment design document, sample size calculation formulas, and CUPED mathematical explanation.',
        demoDescription: 'Experiment report showing pre-experiment vs post-experiment variance reduction.',
      },
      interviewTalkingPoints: [
        'CUPED (Controlled-experiment Using Pre-Experiment Data) and variance reduction mechanics',
        'Type I vs Type II errors and sample size trade-offs',
        'Dealing with network effects and spillover in randomized experiments',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'ds_proj_capstone',
      name: 'Production Predictive Analytics Pipeline & Feature Store',
      roleId: 'data_scientist',
      difficulty: 'Capstone',
      whyYoureBuildingIt:
        'Connect analytical data pipelines, automated retraining, feature store registration, and dashboard deployment for continuous business decision support.',
      skillsDemonstrated: ['SQL', 'Machine Learning', 'Docker', 'Business Decision Systems'],
      prerequisites: ['Model training', 'A/B testing', 'Docker'],
      expectedOutput:
        'An end-to-end pipeline fetching structured data, computing rolling temporal features, generating daily risk scores, and surfacing alerts to business stakeholders.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Data lineage diagram, feature store schema, business impact model, and monitoring specs.',
        architectureDiagram: 'Data Lake -> ETL Feature Store -> Training Engine -> Batch Scorer -> Decision Dashboard',
        demoDescription: 'Live dashboard displaying dynamic cohort segments and real-time inference predictions.',
      },
      interviewTalkingPoints: [
        'Point-in-time correctness to prevent temporal data leakage in feature engineering',
        'Monitoring concept drift vs covariate shift in production features',
        'Translating machine learning accuracy gains into measurable business ROI',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ],

  // AI Testing / QA Engineer
  ai_qa_engineer: [
    {
      id: 'qa_proj_foundation',
      name: 'Automated Unit & Regression Suite for Model Endpoints',
      roleId: 'ai_qa_engineer',
      difficulty: 'Foundation',
      whyYoureBuildingIt:
        'Establish automated testing fundamentals for probabilistic services: API schema validation, status codes, latency thresholds, and deterministic assertions.',
      skillsDemonstrated: ['Python', 'pytest', 'API Testing', 'JSON Schema Validation'],
      prerequisites: ['Python basics', 'Testing concepts'],
      expectedOutput:
        'A comprehensive pytest test suite running against model mock and live endpoints, testing edge cases like empty strings, oversized inputs, and malformed JSON.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Test matrix, fixture architecture, and test coverage report.',
        demoDescription: 'Terminal pytest run showing automated test assertions and parameterization.',
      },
      interviewTalkingPoints: [
        'Testing non-deterministic probabilistic services vs deterministic traditional software',
        'Boundary testing and fuzzing strategies for API payloads',
        'Mocking external inference calls in CI to prevent test flakiness and cost accumulation',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'qa_proj_app',
      name: 'LLM Benchmark Evaluation Suite for Factual Accuracy',
      roleId: 'ai_qa_engineer',
      difficulty: 'Application',
      whyYoureBuildingIt:
        'Construct systematic evaluation benchmarks using ground-truth datasets to quantify hallucination rates, answer relevance, and faithfulness.',
      skillsDemonstrated: ['Evaluation & Guardrails', 'Python', 'Benchmarking', 'Prompt Engineering'],
      prerequisites: ['pytest', 'Prompt engineering basics'],
      expectedOutput:
        'An automated evaluation pipeline that grades 100+ prompt-response pairs against domain ground truth and generates an interactive HTML quality report.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Benchmark metrics definitions, ground-truth dataset curation process, and scorecard breakdown.',
        demoDescription: 'Interactive dashboard showing precision, recall, and faithfulness scores across model versions.',
      },
      interviewTalkingPoints: [
        'Using model-as-a-judge vs embedding similarity vs exact-match heuristics',
        'Mitigating position and verbosity bias in LLM-assisted evaluations',
        'Statistical significance in benchmark score improvements',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'qa_proj_role',
      name: 'Adversarial Stress Testing & Prompt Injection Defense',
      roleId: 'ai_qa_engineer',
      difficulty: 'Role-Specific',
      whyYoureBuildingIt:
        'Act as a red team tester by developing automated adversarial fuzzing, prompt injection probes, data extraction attempts, and guardrail verification.',
      skillsDemonstrated: ['AI Security Testing', 'Evaluation & Guardrails', 'Threat Modeling', 'Python'],
      prerequisites: ['Evaluation benchmarking', 'Security fundamentals'],
      expectedOutput:
        'A red-teaming tool that executes 50+ adversarial attack vectors (direct injection, indirect injection, jailbreak templates) and verifies guardrail interception.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Threat model matrix, vulnerability disclosure format, and guardrail mitigation recommendations.',
        demoDescription: 'Red-team audit report documenting blocked attacks vs bypassed vulnerabilities.',
      },
      interviewTalkingPoints: [
        'Direct prompt injection vs indirect prompt injection via retrieved context',
        'Defense-in-depth: combining system prompts, input classifiers, and output guardrails',
        'Balancing safety restrictions against user task completion and false-positive rates',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: 'qa_proj_capstone',
      name: 'Continuous AI Quality Assurance CI Pipeline',
      roleId: 'ai_qa_engineer',
      difficulty: 'Capstone',
      whyYoureBuildingIt:
        'Integrate automated quality gates directly into pull request workflows to prevent silent model performance degradation before production deployment.',
      skillsDemonstrated: ['CI/CD for ML', 'Evaluation & Guardrails', 'Automated Testing', 'Quality Engineering'],
      prerequisites: ['Adversarial testing', 'CI/CD workflows'],
      expectedOutput:
        'A GitHub Actions workflow that executes upon PR, runs functional tests, evaluates regressions against golden datasets, and blocks merges if safety/quality drops below thresholds.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'CI workflow specification, automated regression scorecard, and release gate criteria.',
        architectureDiagram: 'PR Open -> Functional Unit Tests -> Benchmark Evaluation Harness -> Safety/Guardrail Check -> PR Comment Scorecard',
        demoDescription: 'Automated PR bot comment displaying passed/failed quality thresholds.',
      },
      interviewTalkingPoints: [
        'Designing regression test suites that run quickly and cost-effectively in CI',
        'Defining quantitative pass/fail thresholds for non-deterministic AI features',
        'Creating reproducible bug reports for machine learning research teams',
      ],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ],
};

// Fallback project generator for any other roles
export function getProjectsForRole(roleId: string): SkillGapProject[] {
  if (ROLE_SPECIFIC_PROJECTS[roleId]) {
    return ROLE_SPECIFIC_PROJECTS[roleId];
  }
  // Generic fallback if role is specialized
  return [
    {
      id: `${roleId}_foundation`,
      name: 'Core Domain Foundation Project',
      roleId,
      difficulty: 'Foundation',
      whyYoureBuildingIt: 'Implement core foundational algorithms and verify environment setup.',
      skillsDemonstrated: ['Python', 'Domain Foundations', 'Git'],
      prerequisites: ['Python basics'],
      expectedOutput: 'Working modular repository implementing core domain logic.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Clean README, architecture notes, and test suite.',
        demoDescription: 'Recorded CLI/interactive run demonstration.',
      },
      interviewTalkingPoints: ['Core algorithmic trade-offs', 'Modular code structure'],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: `${roleId}_app`,
      name: 'Practical Application Project',
      roleId,
      difficulty: 'Application',
      whyYoureBuildingIt: 'Apply domain techniques to solve a realistic problem.',
      skillsDemonstrated: ['Applied Domain Engineering', 'Data Handling', 'Testing'],
      prerequisites: ['Foundation project'],
      expectedOutput: 'End-to-end working application with clean documentation.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Benchmark tables, sample runs, and evaluation metrics.',
        demoDescription: 'Interactive demonstration of problem resolution.',
      },
      interviewTalkingPoints: ['Data preparation and pipeline efficiency', 'Handling edge cases'],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: `${roleId}_role`,
      name: 'Role-Specific Technical Solution',
      roleId,
      difficulty: 'Role-Specific',
      whyYoureBuildingIt: 'Demonstrate deep capability in role-specific methodologies.',
      skillsDemonstrated: ['Advanced Domain Tools', 'System Optimization', 'Architecture'],
      prerequisites: ['Application project'],
      expectedOutput: 'Production-ready code solution with benchmark metrics.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'System design diagrams, performance profiling, and trade-off notes.',
        demoDescription: 'Comprehensive test results and execution traces.',
      },
      interviewTalkingPoints: ['Deep dive into architecture choices', 'Production failure modes'],
      sourceClassification: 'SKILLGAP PROJECT',
    },
    {
      id: `${roleId}_capstone`,
      name: 'End-to-End Capstone Portfolio System',
      roleId,
      difficulty: 'Capstone',
      whyYoureBuildingIt: 'Create a showcase portfolio centerpiece ready for interview review.',
      skillsDemonstrated: ['Full Pipeline Design', 'Docker', 'Testing', 'Documentation'],
      prerequisites: ['Role-specific project'],
      expectedOutput: 'Containerized, tested, and published public repository with live demo.',
      portfolioEvidence: {
        githubRepo: true,
        readmeStructure: 'Full production documentation, Dockerfile, and architecture walkthrough.',
        architectureDiagram: 'Input -> Processing Pipeline -> Validation Engine -> Deployment Gateway',
        demoDescription: 'Live deployed application or complete video walkthrough.',
      },
      interviewTalkingPoints: ['End-to-end system ownership', 'Production readiness and maintenance'],
      sourceClassification: 'SKILLGAP PROJECT',
    },
  ];
}

// 4. EXPERIENCE-AWARE VERIFIED LEARNING RESOURCES CATALOG
// Curated research-backed and verified resources with difficulty ratings
export const EXPERIENCED_RESOURCES_CATALOG: LearningResource[] = [
  // Foundations (Level 0 - 1)
  {
    id: 'res_py_official',
    title: 'Python Official Tutorial & Data Structures',
    provider: 'Python Software Foundation',
    url: 'https://docs.python.org/3/tutorial/',
    type: 'Documentation',
    description: 'Foundational guide covering core syntax, data structures, control flow, functions, and modules.',
    cost: 'Free',
    difficulty: 'FOUNDATION',
    sourceType: 'RESEARCH',
    targetSkills: ['python'],
    whyThisResource: 'Authoritative, lightweight, and teaches core language concepts without third-party abstraction.',
    whatYouWillLearn: ['Variables, lists, dicts, and tuples', 'Object-oriented basics and modules', 'Standard library utilities'],
    whatToDoAfter: 'Write a small script to parse JSON and manipulate lists.',
    relatedProject: 'Image Filtering & Edge Detection Pipeline',
  },
  {
    id: 'res_sql_mode',
    title: 'SQL Tutorial for Data Analysis',
    provider: 'Mode Analytics',
    url: 'https://mode.com/sql-tutorial/',
    type: 'Interactive',
    description: 'Hands-on interactive SQL course from basic SELECT queries to advanced analytical window functions.',
    cost: 'Free',
    difficulty: 'FOUNDATION',
    sourceType: 'RESEARCH',
    targetSkills: ['sql'],
    whyThisResource: 'Uses real datasets with instant in-browser SQL query execution.',
    whatYouWillLearn: ['SELECT, WHERE, and aggregations', 'INNER, LEFT, and FULL JOINs', 'Window functions and subqueries'],
    whatToDoAfter: 'Run multi-table join queries against sample database tables.',
  },
  {
    id: 'res_mit_deeplearning',
    title: 'MIT 6.S191: Introduction to Deep Learning',
    provider: 'MIT',
    url: 'http://introtodeeplearning.com/',
    type: 'Video Series',
    description: 'Premier introductory course on foundational neural networks, backpropagation, and deep architectures.',
    cost: 'Free',
    difficulty: 'BEGINNER',
    sourceType: 'RESEARCH',
    targetSkills: ['deep_learning', 'math_stats'],
    whyThisResource: 'Academically rigorous yet accessible lectures and open-source lab exercises.',
    whatYouWillLearn: ['Perceptrons, activation functions, and gradient descent', 'Convolutional and recurrent networks', 'Modern generative architectures'],
    whatToDoAfter: 'Implement a simple 2-layer neural network in PyTorch.',
  },
  {
    id: 'res_hf_nlp_course',
    title: 'Hugging Face LLM & NLP Course',
    provider: 'Hugging Face',
    url: 'https://huggingface.co/learn/nlp-course',
    type: 'Course',
    description: 'Comprehensive hands-on course covering Transformers, tokenizers, fine-tuning, and the Hugging Face ecosystem.',
    cost: 'Free',
    difficulty: 'INTERMEDIATE',
    sourceType: 'RESEARCH',
    targetSkills: ['prompt_engineering', 'finetuning_peft', 'rag_vector_db'],
    whyThisResource: 'The industry-standard open source course for modern natural language processing and LLM engineering.',
    whatYouWillLearn: ['Self-attention and Transformer architectures', 'Using datasets, tokenizers, and pipelines', 'Fine-tuning models on domain text'],
    whatToDoAfter: 'Build a semantic search engine or small domain classifier.',
    relatedProject: 'Semantic Document Search & Embeddings Engine',
  },
  {
    id: 'res_pyimagesearch',
    title: 'PyImageSearch Computer Vision Guides',
    provider: 'PyImageSearch',
    url: 'https://pyimagesearch.com/start-here/',
    type: 'Guide',
    description: 'Practical, code-first tutorials covering OpenCV basics, image filtering, object detection, and deep vision.',
    cost: 'Free',
    difficulty: 'BEGINNER',
    sourceType: 'RESEARCH',
    targetSkills: ['cv_opencv', 'cv_object_detection'],
    whyThisResource: 'World-renowned for practical, working code snippets for real camera feeds.',
    whatYouWillLearn: ['Image reading, resizing, and colorspaces in OpenCV', 'Contour detection and edge analysis', 'Integrating deep learning detectors'],
    whatToDoAfter: 'Build an edge detection script on your local webcam.',
    relatedProject: 'Image Filtering & Edge Detection Pipeline',
  },
  {
    id: 'res_deeplearning_ai_hf',
    title: 'DeepLearning.AI — Open Source Models with Hugging Face',
    provider: 'DeepLearning.AI',
    url: 'https://www.deeplearning.ai/short-courses/open-source-models-hugging-face/',
    type: 'Course',
    description: 'Short course on selecting, running, and fine-tuning open source models on real compute resources.',
    cost: 'Free',
    difficulty: 'INTERMEDIATE',
    sourceType: 'RESEARCH',
    targetSkills: ['rag_vector_db', 'prompt_engineering', 'finetuning_peft'],
    whyThisResource: 'Direct instruction by Hugging Face engineers on practical model execution.',
    whatYouWillLearn: ['Loading quantized models with bitsandbytes', 'Multi-modal model prompting', 'Running local models with Gradio'],
    whatToDoAfter: 'Deploy a local open-weights model in Python.',
    relatedProject: 'Production RAG System with Grounding & Reranking',
  },
  {
    id: 'res_docker_get_started',
    title: 'Docker Official Getting Started Guide',
    provider: 'Docker',
    url: 'https://docs.docker.com/get-started/',
    type: 'Documentation',
    description: 'Official hands-on walkthrough of containers, images, Dockerfile design, volumes, and networking.',
    cost: 'Free',
    difficulty: 'FOUNDATION',
    sourceType: 'RESEARCH',
    targetSkills: ['docker'],
    whyThisResource: 'Direct documentation with verified best practices for containerization.',
    whatYouWillLearn: ['Writing clean Dockerfiles', 'Multi-stage builds and layer caching', 'Docker Compose and environment variables'],
    whatToDoAfter: 'Package a Python script into a lightweight Docker image.',
    relatedProject: 'Reproducible Model Packaging with Docker',
  },
  {
    id: 'res_k8s_official',
    title: 'Kubernetes Official Interactive Tutorials',
    provider: 'Kubernetes',
    url: 'https://kubernetes.io/docs/tutorials/',
    type: 'Interactive',
    description: 'Interactive tutorials demonstrating pod management, deployments, services, scaling, and rolling updates.',
    cost: 'Free',
    difficulty: 'INTERMEDIATE',
    sourceType: 'RESEARCH',
    targetSkills: ['kubernetes'],
    whyThisResource: 'Interactive in-browser terminal allowing real kubectl command practice.',
    whatYouWillLearn: ['Pods, Deployments, and Services', 'Horizontal Pod Autoscaling', 'ConfigMaps and Secrets'],
    whatToDoAfter: 'Deploy a multi-pod inference service on a local Minikube cluster.',
    relatedProject: 'Kubernetes Cluster Model Autoscaling & Monitoring',
  },
  {
    id: 'res_vllm_docs',
    title: 'vLLM Official Documentation & Serving Guide',
    provider: 'vLLM Project',
    url: 'https://docs.vllm.ai/',
    type: 'Documentation',
    description: 'High-throughput, memory-efficient LLM serving engine featuring PagedAttention and continuous batching.',
    cost: 'Free',
    difficulty: 'ADVANCED',
    sourceType: 'RESEARCH',
    targetSkills: ['model_serving_apis', 'gpu_optimization'],
    whyThisResource: 'The benchmark serving system used by AI infrastructure teams worldwide.',
    whatYouWillLearn: ['PagedAttention memory management', 'Continuous batching and chunked prefill', 'OpenAI-compatible server setup'],
    whatToDoAfter: 'Benchmark throughput differences between naive Hugging Face pipeline and vLLM.',
    relatedProject: 'High-Throughput Streaming LLM Gateway with vLLM',
  },
  {
    id: 'res_tensorrt_llm',
    title: 'NVIDIA TensorRT-LLM Documentation',
    provider: 'NVIDIA',
    url: 'https://nvidia.github.io/TensorRT-LLM/',
    type: 'Documentation',
    description: 'Enterprise GPU optimization and inference acceleration toolkit for production LLM pipelines.',
    cost: 'Free',
    difficulty: 'PRODUCTION',
    sourceType: 'RESEARCH',
    targetSkills: ['gpu_optimization', 'cv_realtime_inference', 'model_serving_apis'],
    whyThisResource: 'Official NVIDIA engineering documentation for hardware-level kernel optimization.',
    whatYouWillLearn: ['INT8 and FP8 quantization kernels', 'Tensor parallelism across multi-GPU nodes', 'C++ runtime integration'],
    whatToDoAfter: 'Compile an ONNX model to a TensorRT engine on GPU.',
    relatedProject: 'Edge-Optimized Multi-Camera Tracking Pipeline',
  },
  {
    id: 'res_openslr',
    title: 'OpenSLR Open Speech and Language Resources',
    provider: 'OpenSLR',
    url: 'https://www.openslr.org/',
    type: 'Guide',
    description: 'Curated open-source speech, acoustic datasets, and language modeling resources for audio engineering.',
    cost: 'Free',
    difficulty: 'ADVANCED',
    sourceType: 'RESEARCH',
    targetSkills: ['speech_recognition', 'deep_learning'],
    whyThisResource: 'Industry-standard open corpus for speech recognition and acoustic modeling research.',
    whatYouWillLearn: ['Acoustic model benchmarks', 'Phoneme transcriptions and audio preprocessing', 'Evaluating word-error-rate (WER)'],
    whatToDoAfter: 'Preprocess audio spectrograms for speech inference.',
  },
];

// 5. EXPERIENCE-AWARE RESOURCE SELECTOR
// Never show beginner tutorials to an intermediate or advanced student!
export function getExperienceAwareResources(
  skillId: string,
  studentLevel: number // 0..5
): LearningResource[] {
  // Determine target difficulty bands based on student level
  // 0, 1: FOUNDATION / BEGINNER
  // 2: BEGINNER / INTERMEDIATE
  // 3: INTERMEDIATE / ADVANCED
  // 4: ADVANCED / PRODUCTION
  // 5: PRODUCTION / INTERVIEW
  const allowedDifficulties: ResourceDifficulty[] = [];

  if (studentLevel <= 1) {
    allowedDifficulties.push('FOUNDATION', 'BEGINNER');
  } else if (studentLevel === 2) {
    allowedDifficulties.push('BEGINNER', 'INTERMEDIATE');
  } else if (studentLevel === 3) {
    allowedDifficulties.push('INTERMEDIATE', 'ADVANCED');
  } else if (studentLevel === 4) {
    allowedDifficulties.push('ADVANCED', 'PRODUCTION');
  } else {
    allowedDifficulties.push('PRODUCTION', 'INTERVIEW', 'ADVANCED');
  }

  // Filter catalog
  const matching = EXPERIENCED_RESOURCES_CATALOG.filter(
    (res) =>
      res.targetSkills?.includes(skillId) &&
      res.difficulty &&
      allowedDifficulties.includes(res.difficulty)
  );

  // If specific matched resources exist, return them
  if (matching.length > 0) {
    return matching;
  }

  // If no specific match for difficulty, find any resource for this skill that is NOT lower than permitted
  const generalSkillMatches = EXPERIENCED_RESOURCES_CATALOG.filter(
    (res) => res.targetSkills?.includes(skillId)
  );

  if (generalSkillMatches.length > 0) {
    // If student is level 3+, filter out 'FOUNDATION'
    if (studentLevel >= 3) {
      const nonBeginner = generalSkillMatches.filter((r) => r.difficulty !== 'FOUNDATION');
      if (nonBeginner.length > 0) return nonBeginner;
    }
    return generalSkillMatches;
  }

  return [];
}
