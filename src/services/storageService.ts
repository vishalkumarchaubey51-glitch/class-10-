import { StudentProfile, TestAttempt, Bookmark, Badge, DailyChallenge, Question, Chapter, Subject } from '../types';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS } from '../data/syllabusData';

const STORAGE_KEYS = {
  PROFILE: 'rankrise_profile_v1',
  TEST_ATTEMPTS: 'rankrise_attempts_v1',
  BOOKMARKS: 'rankrise_bookmarks_v1',
  BADGES: 'rankrise_badges_v1',
  DAILY_CHALLENGE: 'rankrise_daily_v1',
  CUSTOM_CHAPTERS: 'rankrise_custom_chapters_v1',
};

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.class10@rankrise.io',
  classGrade: 'Class 10',
  board: 'CBSE (NCERT)',
  avatar: '👨‍🎓',
  xp: 1450,
  streakDays: 6,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyChallengeCompleted: false,
  completedChapters: ['math-real-numbers', 'math-quadratic-equations', 'sci-chemical-reactions', 'sci-life-processes', 'eng-letter-to-god', 'hin-surdas-pad'],
  recentViewedChapters: ['math-quadratic-equations', 'sci-light', 'sci-electricity']
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-first-test',
    title: 'First Test Passed',
    description: 'Complete your first chapter test',
    icon: '🏆',
    color: 'from-amber-400 to-yellow-600',
    isUnlocked: true,
    progress: 100
  },
  {
    id: 'badge-7day-streak',
    title: '7 Day Streak',
    description: 'Study 7 days continuously without missing',
    icon: '🔥',
    color: 'from-orange-500 to-red-600',
    isUnlocked: false,
    progress: 85
  },
  {
    id: 'badge-100-solved',
    title: 'Centurion Solver',
    description: 'Solve 100+ questions correctly',
    icon: '🧠',
    color: 'from-blue-500 to-indigo-600',
    isUnlocked: true,
    progress: 100
  },
  {
    id: 'badge-90-score',
    title: '90%+ Distinction',
    description: 'Score 90% or above in any 50-question test set',
    icon: '⭐',
    color: 'from-emerald-400 to-teal-600',
    isUnlocked: true,
    progress: 100
  },
  {
    id: 'badge-10-chapters',
    title: 'Curriculum Master',
    description: 'Complete notes & test sets for 10 chapters',
    icon: '📚',
    color: 'from-purple-500 to-pink-600',
    isUnlocked: false,
    progress: 60
  },
  {
    id: 'badge-numerical-pro',
    title: 'Numerical Prodigy',
    description: 'Master 20 Physics and Math numericals step-by-step',
    icon: '🔢',
    color: 'from-cyan-400 to-blue-600',
    isUnlocked: false,
    progress: 40
  }
];

export const storageService = {
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (err) {
      console.error(err);
    }
  },

  addXP(amount: number): number {
    const profile = this.getProfile();
    profile.xp += amount;
    this.saveProfile(profile);
    return profile.xp;
  },

  toggleChapterCompleted(chapterId: string): boolean {
    const profile = this.getProfile();
    const index = profile.completedChapters.indexOf(chapterId);
    let isCompletedNow = false;
    if (index >= 0) {
      profile.completedChapters.splice(index, 1);
    } else {
      profile.completedChapters.push(chapterId);
      profile.xp += 100; // Bonus XP for chapter completion
      isCompletedNow = true;
    }
    this.saveProfile(profile);
    return isCompletedNow;
  },

  getTestAttempts(): TestAttempt[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TEST_ATTEMPTS);
      if (!data) {
        // Pre-populate realistic sample test attempt
        const sampleAttempt: TestAttempt = {
          id: 'attempt-sample-1',
          testId: 'math-quad-s01',
          testTitle: 'Quadratic Equations — Set 01',
          subjectId: 'mathematics',
          chapterId: 'math-quadratic-equations',
          setNumber: 1,
          timestamp: Date.now() - 3600 * 1000 * 4,
          totalQuestions: 50,
          correctAnswers: 44,
          incorrectAnswers: 4,
          unattempted: 2,
          score: 44,
          percentage: 88,
          accuracy: 91.6,
          timeSpentSeconds: 2150,
          strongAreas: ['Nature of Roots & Discriminant D', 'Solving by Factorisation'],
          weakAreas: ['Word Problems on Speed, Time & Work'],
          questionResults: []
        };
        localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify([sampleAttempt]));
        return [sampleAttempt];
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  saveTestAttempt(attempt: TestAttempt): void {
    try {
      const attempts = this.getTestAttempts();
      attempts.unshift(attempt);
      localStorage.setItem(STORAGE_KEYS.TEST_ATTEMPTS, JSON.stringify(attempts));

      // Update XP (+10 per correct answer, +50 completion bonus)
      const earnedXP = attempt.correctAnswers * 10 + 50;
      this.addXP(earnedXP);

      // Check badges
      this.evaluateBadges(attempt);
    } catch (err) {
      console.error(err);
    }
  },

  getBookmarks(): Bookmark[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      if (!data) {
        const sampleBookmarks: Bookmark[] = [
          {
            id: 'bm-1',
            type: 'formula',
            title: 'Quadratic Formula (Sridharacharya)',
            subtitle: 'x = (-b ± √(b² - 4ac)) / 2a',
            targetId: 'f3',
            chapterId: 'math-quadratic-equations',
            subjectId: 'mathematics',
            createdAt: Date.now() - 86400000
          },
          {
            id: 'bm-2',
            type: 'formula',
            title: 'Snell’s Law of Refraction',
            subtitle: 'sin i / sin r = constant (Refractive Index n)',
            targetId: 'fl2',
            chapterId: 'sci-light',
            subjectId: 'science',
            createdAt: Date.now() - 43200000
          }
        ];
        localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(sampleBookmarks));
        return sampleBookmarks;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  addBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark {
    const list = this.getBookmarks();
    const existing = list.find(b => b.targetId === bookmark.targetId && b.type === bookmark.type);
    if (existing) return existing;

    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bm-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: Date.now()
    };
    list.unshift(newBookmark);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return newBookmark;
  },

  removeBookmark(targetId: string): void {
    const list = this.getBookmarks().filter(b => b.targetId !== targetId);
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
  },

  isBookmarked(targetId: string): boolean {
    return this.getBookmarks().some(b => b.targetId === targetId);
  },

  getBadges(): Badge[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BADGES);
      return data ? JSON.parse(data) : INITIAL_BADGES;
    } catch {
      return INITIAL_BADGES;
    }
  },

  evaluateBadges(recentAttempt?: TestAttempt): void {
    const badges = this.getBadges();
    const attempts = this.getTestAttempts();

    // First test
    if (attempts.length >= 1) {
      const b1 = badges.find(b => b.id === 'badge-first-test');
      if (b1) { b1.isUnlocked = true; b1.progress = 100; }
    }

    // 90%+ score
    if (recentAttempt && recentAttempt.percentage >= 90) {
      const b90 = badges.find(b => b.id === 'badge-90-score');
      if (b90) { b90.isUnlocked = true; b90.progress = 100; }
    }

    // 100 solved
    const totalCorrect = attempts.reduce((acc, a) => acc + a.correctAnswers, 0);
    const b100 = badges.find(b => b.id === 'badge-100-solved');
    if (b100) {
      b100.progress = Math.min(100, Math.round((totalCorrect / 100) * 100));
      if (totalCorrect >= 100) b100.isUnlocked = true;
    }

    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  },

  getChapters(): Chapter[] {
    try {
      const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_CHAPTERS);
      const customList: Chapter[] = custom ? JSON.parse(custom) : [];
      const profile = this.getProfile();
      
      // Merge initial with custom and apply user completion
      const all = [...INITIAL_CHAPTERS, ...customList];
      return all.map(ch => ({
        ...ch,
        isCompleted: profile.completedChapters.includes(ch.id)
      }));
    } catch {
      return INITIAL_CHAPTERS;
    }
  },

  saveCustomChapter(chapter: Chapter): void {
    try {
      const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_CHAPTERS);
      const list: Chapter[] = custom ? JSON.parse(custom) : [];
      const updated = [chapter, ...list.filter(c => c.id !== chapter.id)];
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CHAPTERS, JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }
  }
};
