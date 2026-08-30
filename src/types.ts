export type GradeLevel = 'all' | 'solbit-1' | 'solbit-2' | 'hello-maple' | 'elementary-low' | 'elementary-high' | 'middle' | 'high';

export type PortfolioItemType = 'lesson_plan' | 'photo' | 'student_work' | 'ppt' | 'curriculum' | 'review' | 'video' | 'gallery_link';

export interface PortfolioItem {
  id: string;
  title: string;
  type: PortfolioItemType;
  typeIcon: string; // e.g. "📑", "📷", "👑", "✳️", "🏢", "🚗", "🪴", "🎥"
  categoryKey: string; // e.g. "entry", "ai", "hamster", "arvr", "dream_school", "middle", "neobot"
  categoryTitle: string;
  summary: string;
  detailDescription?: string;
  imageUrl?: string;
  youtubeUrl?: string;
  fileDownloadUrl?: string;
  lessonOutline?: {
    lessonNumber: number;
    title: string;
    objective: string;
    defaultImage?: string;
  }[];
  tags: string[];
  schoolLocation?: string;
  targetGrade?: string;
}

export interface PortfolioCategory {
  key: string;
  title: string;
  icon: string;
  badgeColor?: string;
  items: PortfolioItem[];
}

export interface CurriculumSession {
  sessionNumber: number;
  title: string;
  concept: string;
  description: string;
  defaultImage?: string;
}

export interface CurriculumStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
  tools: string[];
  duration: string;
  outcomes: string[];
  icon: string;
  sessions?: CurriculumSession[];
  imageStorageKey?: string;
}

export interface GradeCurriculum {
  id: GradeLevel;
  gradeTitle: string;
  targetAge: string;
  badgeText: string;
  themeColor: string;
  accentColor: string;
  bgGradient: string;
  icon: string;
  summary: string;
  keyFeatures: string[];
  recommendedTools: string[];
  steps: CurriculumStep[];
  curriculumImageKey?: string;
}

export interface ActivityPhoto {
  id: string;
  title: string;
  gradeCategory: GradeLevel;
  categoryLabel: string;
  imageUrl: string;
  date: string;
  location: string;
  description: string;
  tags: string[];
  highlights: string[];
  studentCount?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: '학생' | '학부모' | '교사';
  grade: string;
  content: string;
  avatarUrl: string;
  rating: number;
  courseTaken: string;
}

export interface CodeMission {
  id: string;
  title: string;
  description: string;
  difficulty: '쉬움' | '보통' | '도전';
  characterEmoji: string;
  targetGoal: string;
  availableBlocks: { id: string; text: string; action: string; category: 'move' | 'control' | 'action' }[];
  correctSequence: string[];
}

