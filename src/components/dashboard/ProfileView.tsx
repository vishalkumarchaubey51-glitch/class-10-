import React, { useState } from 'react';
import { StudentProfile } from '../../types';
import { storageService } from '../../services/storageService';
import { User, Mail, Shield, Award, CheckCircle2, ArrowLeft, Save, Sparkles } from 'lucide-react';

interface ProfileViewProps {
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  onBack: () => void;
}

const AVATARS = ['👨‍🎓', '👩‍🎓', '🧑‍🔬', '👩‍🔬', '🚀', '⚡', '🧠', '🌟'];

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile, onBack }) => {
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [board, setBoard] = useState(profile.board);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...profile,
      name,
      email,
      board,
      avatar,
    };
    storageService.saveProfile(updated);
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <span className="text-xs text-slate-400">Class 10 Student Account</span>
      </div>

      <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-800">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-4xl shadow-xl shadow-brand-500/25">
            {avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-white">{name}</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                Active Student
              </span>
            </div>
            <p className="text-xs text-slate-400">{email}</p>
            <p className="text-xs text-brand-400 font-semibold mt-1">
              {profile.classGrade} • {board}
            </p>
          </div>
        </div>

        {/* Choose Avatar */}
        <div>
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
            Select Student Avatar
          </label>
          <div className="flex flex-wrap gap-2.5">
            {AVATARS.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => setAvatar(av)}
                className={`w-11 h-11 rounded-xl text-2xl flex items-center justify-center transition-all ${
                  avatar === av
                    ? 'bg-brand-600 scale-110 shadow-lg ring-2 ring-brand-400'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Class</label>
              <input
                type="text"
                value={profile.classGrade}
                disabled
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-400 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Education Board</label>
              <select
                value={board}
                onChange={(e) => setBoard(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none"
              >
                <option value="CBSE (NCERT)">CBSE (NCERT)</option>
                <option value="ICSE">ICSE</option>
                <option value="State Board">State Board</option>
              </select>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-slate-400 block">Total XP</span>
              <span className="font-bold text-indigo-400 text-base">{profile.xp.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-slate-400 block">Study Streak</span>
              <span className="font-bold text-orange-400 text-base">{profile.streakDays} Days</span>
            </div>
            <div>
              <span className="text-slate-400 block">Completed Ch.</span>
              <span className="font-bold text-emerald-400 text-base">
                {profile.completedChapters.length}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-lg shadow-brand-500/25 transition-all"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
