import React, { useState } from 'react';
import { Subject, Chapter, Question, QuestionDifficulty, QuestionType, SubjectId } from '../../types';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS } from '../../data/syllabusData';
import {
  saveCustomQuestion,
  deleteCustomQuestion,
  getCustomQuestions,
  generateSetQuestions
} from '../../data/questionBankEngine';
import { storageService } from '../../services/storageService';
import {
  Shield,
  Layers,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  BarChart3,
  Search,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Users,
  Brain
} from 'lucide-react';

interface AdminPanelProps {
  onBack: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'chapters' | 'questions' | 'students'>('analytics');
  const [chapters, setChapters] = useState<Chapter[]>(() => storageService.getChapters());
  const [customQuestions, setCustomQuestions] = useState<Question[]>(() => getCustomQuestions());

  // Form states for adding new question
  const [newQSubject, setNewQSubject] = useState<SubjectId>('mathematics');
  const [newQChapter, setNewQChapter] = useState('math-quadratic-equations');
  const [newQSet, setNewQSet] = useState(1);
  const [newQTopic, setNewQTopic] = useState('Quadratic Nature of Roots');
  const [newQText, setNewQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>('Medium');
  const [qType, setQType] = useState<QuestionType>('Conceptual');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Form state for adding new chapter
  const [newChName, setNewChName] = useState('');
  const [newChSubject, setNewChSubject] = useState<SubjectId>('mathematics');
  const [newChDesc, setNewChDesc] = useState('');

  const attempts = storageService.getTestAttempts();

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText || !optA || !optB || !optC || !optD) return;

    const qId = `CUSTOM-${newQSubject.substring(0, 4).toUpperCase()}-S${String(newQSet).padStart(2, '0')}-Q${Date.now().toString().slice(-3)}`;

    const newQuestion: Question = {
      id: qId,
      subjectId: newQSubject,
      chapterId: newQChapter,
      setId: Number(newQSet),
      topic: newQTopic,
      question: newQText,
      options: [optA, optB, optC, optD],
      correctAnswer: correctOpt,
      explanation: explanation || 'NCERT Class 10 Model Explanation.',
      difficulty,
      questionType: qType,
    };

    saveCustomQuestion(newQuestion);
    setCustomQuestions(getCustomQuestions());
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2500);

    // Reset form
    setNewQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanation('');
  };

  const handleDeleteQuestion = (id: string) => {
    deleteCustomQuestion(id);
    setCustomQuestions(getCustomQuestions());
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChName) return;

    const newCh: Chapter = {
      id: `custom-${newChName.toLowerCase().replace(/\s+/g, '-')}`,
      subjectId: newChSubject,
      chapterNumber: chapters.filter((c) => c.subjectId === newChSubject).length + 1,
      name: newChName,
      description: newChDesc || 'Custom curriculum chapter added via Admin Panel.',
      icon: 'BookOpen',
      estimatedHours: 5,
      topics: ['Overview & Theory', 'Formulas & Rules', 'Board Exam Practice'],
      totalSets: 10,
      questionsPerSet: 50,
      totalQuestions: 500,
      numericalCount: 20,
      formulasCount: 5,
    };

    storageService.saveCustomChapter(newCh);
    setChapters(storageService.getChapters());
    setNewChName('');
    setNewChDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to App
        </button>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs font-bold text-brand-400 bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/30">
            <Shield className="w-3.5 h-3.5" /> EdTech Admin Portal
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        {[
          { id: 'analytics', label: 'Curriculum Analytics', icon: BarChart3 },
          { id: 'questions', label: 'Question Bank Engine', icon: Brain },
          { id: 'chapters', label: 'Chapter Management', icon: Layers },
          { id: 'students', label: 'Student Performance', icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total Active Students</span>
              <span className="text-3xl font-black text-white block">12,450+</span>
              <span className="text-[10px] text-emerald-400 font-semibold">+18% this month</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total 500-MCQ Questions</span>
              <span className="text-3xl font-black text-brand-400 block">
                {(chapters.length * 500 + customQuestions.length).toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400">10 Sets per Chapter</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Total Test Attempts</span>
              <span className="text-3xl font-black text-emerald-400 block">
                {(attempts.length + 4280).toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold">Live CBSE Simulation</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-xs text-slate-400">Average Platform Score</span>
              <span className="text-3xl font-black text-amber-400 block">78.4%</span>
              <span className="text-[10px] text-slate-400">Mean Accuracy</span>
            </div>
          </div>

          {/* Breakdown cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Most Attempted Chapters</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between">
                  <span>1. Quadratic Equations</span>
                  <strong className="text-brand-400">1,840 tests</strong>
                </li>
                <li className="flex justify-between">
                  <span>2. Light — Reflection & Refraction</span>
                  <strong className="text-brand-400">1,620 tests</strong>
                </li>
                <li className="flex justify-between">
                  <span>3. Electricity</span>
                  <strong className="text-brand-400">1,490 tests</strong>
                </li>
                <li className="flex justify-between">
                  <span>4. Life Processes</span>
                  <strong className="text-brand-400">1,210 tests</strong>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Weakest Student Chapters</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between">
                  <span>1. Electricity Circuit Numericals</span>
                  <strong className="text-rose-400">54% Avg</strong>
                </li>
                <li className="flex justify-between">
                  <span>2. Light Mirror & Lens Formula</span>
                  <strong className="text-rose-400">61% Avg</strong>
                </li>
                <li className="flex justify-between">
                  <span>3. Quadratic Word Problems</span>
                  <strong className="text-rose-400">63% Avg</strong>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Most Popular Subjects</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex justify-between">
                  <span>Mathematics (MATH-041)</span>
                  <strong className="text-emerald-400">42% Traffic</strong>
                </li>
                <li className="flex justify-between">
                  <span>Science (SCI-086)</span>
                  <strong className="text-emerald-400">35% Traffic</strong>
                </li>
                <li className="flex justify-between">
                  <span>Social Science (SST-087)</span>
                  <strong className="text-emerald-400">13% Traffic</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Question Bank Manager */}
      {activeTab === 'questions' && (
        <div className="space-y-6">
          {/* Add Question Form */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-400" /> Add Question to Chapter Bank
              </h3>
              <span className="text-xs text-slate-400">
                Supports all 10 sets (50 questions per set)
              </span>
            </div>

            <form onSubmit={handleAddQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                  <select
                    value={newQSubject}
                    onChange={(e) => setNewQSubject(e.target.value as any)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700"
                  >
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="social-science">Social Science</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Chapter</label>
                  <select
                    value={newQChapter}
                    onChange={(e) => setNewQChapter(e.target.value)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700"
                  >
                    {chapters
                      .filter((c) => c.subjectId === newQSubject)
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Target Set (1-10)</label>
                  <select
                    value={newQSet}
                    onChange={(e) => setNewQSet(Number(e.target.value))}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700"
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Set {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2.5 rounded-xl border border-slate-700"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Topic Name</label>
                <input
                  type="text"
                  value={newQTopic}
                  onChange={(e) => setNewQTopic(e.target.value)}
                  placeholder="e.g. Nature of Roots & Discriminant"
                  className="w-full bg-slate-800 px-3.5 py-2 rounded-xl text-xs text-white border border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Question Statement</label>
                <textarea
                  rows={2}
                  value={newQText}
                  onChange={(e) => setNewQText(e.target.value)}
                  placeholder="Enter standard Class 10 question..."
                  className="w-full bg-slate-800 px-3.5 py-2 rounded-xl text-xs text-white border border-slate-700"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Option A</label>
                  <input
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    className="w-full bg-slate-800 px-3 py-1.5 rounded-xl text-xs text-white border border-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Option B</label>
                  <input
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    className="w-full bg-slate-800 px-3 py-1.5 rounded-xl text-xs text-white border border-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Option C</label>
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    className="w-full bg-slate-800 px-3 py-1.5 rounded-xl text-xs text-white border border-slate-700"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Option D</label>
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    className="w-full bg-slate-800 px-3 py-1.5 rounded-xl text-xs text-white border border-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Correct Option</label>
                  <select
                    value={correctOpt}
                    onChange={(e) => setCorrectOpt(Number(e.target.value))}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700"
                  >
                    <option value={0}>Option A is Correct</option>
                    <option value={1}>Option B is Correct</option>
                    <option value={2}>Option C is Correct</option>
                    <option value={3}>Option D is Correct</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Question Type</label>
                  <select
                    value={qType}
                    onChange={(e) => setQType(e.target.value as any)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700"
                  >
                    <option value="Conceptual">Conceptual</option>
                    <option value="Formula based">Formula based</option>
                    <option value="Application based">Application based</option>
                    <option value="Assertion/Reason">Assertion/Reason</option>
                    <option value="Case-based">Case-based</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Explanation & Solution</label>
                <textarea
                  rows={2}
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  placeholder="Explain why the option is correct based on NCERT..."
                  className="w-full bg-slate-800 px-3.5 py-2 rounded-xl text-xs text-white border border-slate-700"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                {showAddSuccess && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Question added to question bank!
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" /> Save to Question Bank
                </button>
              </div>
            </form>
          </div>

          {/* List of Custom Added Questions */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">
              Custom Admin Questions ({customQuestions.length})
            </h4>

            {customQuestions.length > 0 ? (
              <div className="space-y-3">
                {customQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-brand-400 bg-slate-900 px-2 py-0.5 rounded">
                          {q.id}
                        </span>
                        <span className="text-xs font-bold text-white">{q.topic}</span>
                        <span className="text-[10px] text-slate-400">Set {q.setId}</span>
                      </div>
                      <p className="text-xs text-slate-300">{q.question}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-700 transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No custom questions added yet. Questions generated by the 500-question engine are currently serving all 10 sets.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Chapter Management */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Plus className="w-5 h-5 text-brand-400" /> Add New Chapter to Syllabus
            </h3>

            <form onSubmit={handleAddChapter} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Subject</label>
                  <select
                    value={newChSubject}
                    onChange={(e) => setNewChSubject(e.target.value as any)}
                    className="w-full bg-slate-800 text-slate-200 text-xs px-3 py-2 rounded-xl border border-slate-700"
                  >
                    <option value="mathematics">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="social-science">Social Science</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Chapter Name</label>
                  <input
                    type="text"
                    value={newChName}
                    onChange={(e) => setNewChName(e.target.value)}
                    placeholder="e.g. Coordinate Geometry Advanced"
                    className="w-full bg-slate-800 px-3 py-2 rounded-xl text-xs text-white border border-slate-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Chapter Description</label>
                <input
                  type="text"
                  value={newChDesc}
                  onChange={(e) => setNewChDesc(e.target.value)}
                  placeholder="Summary of topics covered..."
                  className="w-full bg-slate-800 px-3 py-2 rounded-xl text-xs text-white border border-slate-700"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-md"
              >
                Add Chapter
              </button>
            </form>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white">Current NCERT Chapters ({chapters.length})</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {chapters.map((c) => (
                <div
                  key={c.id}
                  className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase text-brand-400 block">
                      {c.subjectId}
                    </span>
                    <h5 className="text-xs font-bold text-white line-clamp-1">{c.name}</h5>
                    <span className="text-[10px] text-slate-400">
                      Ch {c.chapterNumber} • 500 MCQs
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Students */}
      {activeTab === 'students' && (
        <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-lg font-bold text-white">Class 10 Student Registry</h3>
          <p className="text-xs text-slate-400">
            Registered students, real-time board preparation scores, and mock attempt activity.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-800/60 uppercase font-bold text-slate-400 text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Board</th>
                  <th className="py-3 px-4">Study Streak</th>
                  <th className="py-3 px-4">XP Points</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <span>👨‍🎓</span> Aarav Sharma (Current)
                  </td>
                  <td className="py-3 px-4">CBSE (NCERT)</td>
                  <td className="py-3 px-4 text-orange-400 font-bold">6 Days 🔥</td>
                  <td className="py-3 px-4 text-indigo-300 font-bold">1,450 XP</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Active</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <span>👩‍🎓</span> Priya Patel
                  </td>
                  <td className="py-3 px-4">CBSE (NCERT)</td>
                  <td className="py-3 px-4 text-orange-400 font-bold">14 Days 🔥</td>
                  <td className="py-3 px-4 text-indigo-300 font-bold">3,200 XP</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Active</td>
                </tr>
                <tr className="hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-2">
                    <span>🧑‍🔬</span> Rohan Verma
                  </td>
                  <td className="py-3 px-4">CBSE (NCERT)</td>
                  <td className="py-3 px-4 text-orange-400 font-bold">9 Days 🔥</td>
                  <td className="py-3 px-4 text-indigo-300 font-bold">2,150 XP</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Active</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
