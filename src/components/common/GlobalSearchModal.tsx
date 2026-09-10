import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Calculator, Atom, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_CHAPTERS, INITIAL_SUBJECTS } from '../../data/syllabusData';
import { CURATED_CHAPTER_NOTES } from '../../data/sampleNotes';
import { NUMERICAL_PROBLEMS } from '../../data/sampleNumericals';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
  onSelectSection: (chapterId: string, section: 'notes' | 'mcq' | 'numericals') => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectChapter,
  onSelectSection,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Search results
  const matchedChapters = trimmed
    ? INITIAL_CHAPTERS.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed) ||
          c.topics.some((t) => t.toLowerCase().includes(trimmed))
      ).slice(0, 5)
    : [];

  const matchedNumericals = trimmed
    ? NUMERICAL_PROBLEMS.filter(
        (n) =>
          n.question.toLowerCase().includes(trimmed) ||
          n.topic.toLowerCase().includes(trimmed) ||
          n.formula.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-slate-900/90">
          <Search className="w-5 h-5 text-brand-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search chapters, topics, formulas (e.g., Quadratic Equation, Ohm's law)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-400 hover:text-white rounded-md bg-slate-800 border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-4 space-y-4">
          {!trimmed && (
            <div className="text-xs text-slate-400 space-y-3">
              <p className="font-semibold text-slate-300 uppercase tracking-wider">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {['Quadratic Equations', 'Light Reflection', 'Electricity', 'Chemical Reactions', 'Nationalism in India'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700/60"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {trimmed && matchedChapters.length === 0 && matchedNumericals.length === 0 && (
            <div className="text-center py-10 text-slate-400">
              <p className="text-sm">No exact matches found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for chapter names like <i>Real Numbers</i>, <i>Trigonometry</i>, or <i>Life Processes</i>.
              </p>
            </div>
          )}

          {/* Chapters Results */}
          {matchedChapters.length > 0 && (
            <div>
              <p className="text-xs font-bold text-brand-400 uppercase tracking-wider mb-2">Chapters ({matchedChapters.length})</p>
              <div className="space-y-2">
                {matchedChapters.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                          {c.subjectId}
                        </span>
                        <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                          {c.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{c.description}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-3">
                      <button
                        onClick={() => {
                          onSelectSection(c.id, 'notes');
                          onClose();
                        }}
                        className="px-2.5 py-1 text-xs rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600/40 border border-blue-500/30"
                      >
                        Notes
                      </button>
                      <button
                        onClick={() => {
                          onSelectSection(c.id, 'mcq');
                          onClose();
                        }}
                        className="px-2.5 py-1 text-xs rounded-lg bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/40 border border-emerald-500/30"
                      >
                        500 MCQs
                      </button>
                      <button
                        onClick={() => {
                          onSelectChapter(c.id);
                          onClose();
                        }}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700"
                        title="Open Chapter Dashboard"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Numericals Results */}
          {matchedNumericals.length > 0 && (
            <div>
              <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Step-by-Step Numericals ({matchedNumericals.length})</p>
              <div className="space-y-2">
                {matchedNumericals.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onSelectSection(n.chapterId, 'numericals');
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                      <span>{n.topic}</span>
                      <span className="text-slate-400">{n.difficulty}</span>
                    </div>
                    <p className="text-xs text-slate-200 line-clamp-2">{n.question}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
