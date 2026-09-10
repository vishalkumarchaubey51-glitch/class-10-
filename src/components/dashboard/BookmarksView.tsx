import React, { useState } from 'react';
import { Bookmark, SubjectId } from '../../types';
import { storageService } from '../../services/storageService';
import { Bookmark as BookmarkIcon, Trash2, ArrowRight, BookOpen, Calculator, ArrowLeft } from 'lucide-react';

interface BookmarksViewProps {
  onBack: () => void;
  onOpenChapter: (chapterId: string) => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({ onBack, onOpenChapter }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => storageService.getBookmarks());
  const [filterType, setFilterType] = useState<'all' | 'formula' | 'note'>('all');

  const handleRemove = (targetId: string) => {
    storageService.removeBookmark(targetId);
    setBookmarks(bookmarks.filter((b) => b.targetId !== targetId));
  };

  const filtered = bookmarks.filter((b) => {
    if (filterType === 'all') return true;
    return b.type === filterType;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <span className="text-xs text-slate-400 font-semibold">
          Saved Items: <strong>{bookmarks.length}</strong>
        </span>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
          <BookmarkIcon className="w-5 h-5 text-amber-400" />
          <h1 className="text-2xl sm:text-3xl font-black text-white">My Bookmarks & Formulas</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Access your starred formulas, difficult concepts, and high-yield notes for quick board exam revision.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
              filterType === 'all'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All Bookmarks ({bookmarks.length})
          </button>
          <button
            onClick={() => setFilterType('formula')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
              filterType === 'formula'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Formulas
          </button>
          <button
            onClick={() => setFilterType('note')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${
              filterType === 'note'
                ? 'bg-brand-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Notes & Concepts
          </button>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-4 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">
                    {item.type}
                  </span>
                  <span className="text-xs text-slate-400 font-mono uppercase">
                    {item.subjectId}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-xs font-mono text-brand-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 inline-block">
                    {item.subtitle}
                  </p>
                )}
                <p className="text-[11px] text-slate-400">
                  Saved on {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenChapter(item.chapterId)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Go to Chapter <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleRemove(item.targetId)}
                  className="p-1.5 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400">
            <BookmarkIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium">No bookmarks saved yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Click the bookmark icon on any formula or concept card inside chapter notes to save it here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
