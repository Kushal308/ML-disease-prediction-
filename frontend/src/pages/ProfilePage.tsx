import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getUnifiedHistory } from '../services/historyStorage';
import { User, Mail, Calendar, ShieldCheck, CheckCircle2, Lock, Save } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, isConfigured } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [totalTests, setTotalTests] = useState(0);
  const [savedStatus, setSavedStatus] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.full_name) {
      setFullName(user.full_name);
    }
    getUnifiedHistory(user?.id).then((items) => {
      setTotalTests(items.length);
    });
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await updateProfile(fullName);
    setSaving(false);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-mediblue-700">
          Account Settings
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
          User Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your account preferences, clinician metadata, and security settings.
        </p>
      </div>

      {savedStatus && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile changes updated successfully!</span>
        </div>
      )}

      {/* Profile Card */}
      <div className="glass-card rounded-3xl p-8 bg-white border border-slate-200 shadow-sm space-y-8">
        
        {/* User Identity Banner */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-100">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-mediblue-700 to-mediteal-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-mediblue-500/20">
            {fullName ? fullName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-black text-slate-900">
              {fullName || user?.email}
            </h2>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{user?.email}</span>
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                {totalTests} Lifetime Assessments
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-mediblue-50 text-mediblue-700 text-[10px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-mediblue-600" />
                {isConfigured ? 'Supabase RLS Enabled' : 'Local Encryption Sandbox'}
              </span>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Full Clinical / User Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-mediblue-500 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-mediblue-600 transition flex items-center gap-2 shadow-sm disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Updating...' : 'Save Profile'}</span>
            </button>
          </div>
        </form>

      </div>

    </div>
  );
};
