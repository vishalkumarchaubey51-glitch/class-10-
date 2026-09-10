import React from 'react';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  stats?: {
    answered: number;
    unanswered: number;
    markedForReview: number;
    total: number;
  };
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  stats,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex items-center gap-3 text-amber-400">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{message}</p>

        {stats && (
          <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs">
            <div className="text-center">
              <span className="block text-emerald-400 font-bold text-base">{stats.answered}</span>
              <span className="text-slate-400">Answered</span>
            </div>
            <div className="text-center border-x border-slate-700">
              <span className="block text-yellow-400 font-bold text-base">{stats.markedForReview}</span>
              <span className="text-slate-400">In Review</span>
            </div>
            <div className="text-center">
              <span className="block text-slate-400 font-bold text-base">{stats.unanswered}</span>
              <span className="text-slate-400">Unanswered</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 transition-colors"
          >
            Cancel & Return to Test
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white shadow-lg shadow-brand-500/25 transition-all"
          >
            Yes, Submit Test
          </button>
        </div>
      </div>
    </div>
  );
};
