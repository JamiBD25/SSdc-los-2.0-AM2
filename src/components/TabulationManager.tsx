import React, { useState } from 'react';
import { Team, Speaker, TabSheetEntry, SupabaseConfig } from '../types';
import { INITIAL_TEAMS, INITIAL_SPEAKERS } from '../data/initialData';
import {
  saveTeamsToSupabase,
  saveSpeakersToSupabase,
  clearSpeakersFromSupabase,
  saveTabEntryToSupabase,
  getStoredSupabaseConfig,
  saveSupabaseConfig,
  getSupabaseClient
} from '../lib/supabase';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Database,
  Calculator,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  Table,
  Check,
  AlertCircle,
  Code
} from 'lucide-react';

interface TabulationManagerProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  speakers: Speaker[];
  setSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TabulationManager: React.FC<TabulationManagerProps> = ({
  teams,
  setTeams,
  speakers,
  setSpeakers,
  isAdminLoggedIn,
  setIsAdminLoggedIn
}) => {
  // Admin Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Sub-tabs in Tabulation Manager
  const [activeSubTab, setActiveSubTab] = useState<'tab-input' | 'teams-edit' | 'speakers-edit' | 'supabase-settings'>('tab-input');
  const [successToast, setSuccessToast] = useState('');

  // Supabase Config State
  const [supabaseConfig, setSupabaseConfigState] = useState<SupabaseConfig>(getStoredSupabaseConfig());
  const [customUrl, setCustomUrl] = useState(supabaseConfig.url);
  const [customKey, setCustomKey] = useState(supabaseConfig.anonKey);
  const [syncLoading, setSyncLoading] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);

  // Tab Scorecard Form State
  const [roundNum, setRoundNum] = useState<number>(1);
  const [selectedGovId, setSelectedGovId] = useState<string>(teams[0]?.id || '');
  const [selectedOppId, setSelectedOppId] = useState<string>(teams[1]?.id || '');

  const [govSpk1Name, setGovSpk1Name] = useState('Gov Speaker 1');
  const [govSpk1Score, setGovSpk1Score] = useState<number>(75);
  const [govSpk2Name, setGovSpk2Name] = useState('Gov Speaker 2');
  const [govSpk2Score, setGovSpk2Score] = useState<number>(75);
  const [govSpk3Name, setGovSpk3Name] = useState('Gov Speaker 3');
  const [govSpk3Score, setGovSpk3Score] = useState<number>(75);
  const [govReplyScore, setGovReplyScore] = useState<number>(37.5);

  const [oppSpk1Name, setOppSpk1Name] = useState('Opp Speaker 1');
  const [oppSpk1Score, setOppSpk1Score] = useState<number>(75);
  const [oppSpk2Name, setOppSpk2Name] = useState('Opp Speaker 2');
  const [oppSpk2Score, setOppSpk2Score] = useState<number>(75);
  const [oppSpk3Name, setOppSpk3Name] = useState('Opp Speaker 3');
  const [oppSpk3Score, setOppSpk3Score] = useState<number>(75);
  const [oppReplyScore, setOppReplyScore] = useState<number>(37.5);

  const [winner, setWinner] = useState<'Government' | 'Opposition'>('Government');
  const [adjName, setAdjName] = useState('Panel Chair');

  // History of Submitted Tab Entries
  const [tabEntries, setTabEntries] = useState<TabSheetEntry[]>([]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 4500);
  };

  // Admin Credentials Authentication
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (
      (cleanEmail === 'ssdc@gmail.com' && password === 'ssdclos2@2028') ||
      (cleanEmail === 'admin@ssdc.org' && password === 'admin123') ||
      (cleanEmail === 'tab' && password === 'ssdc2026') ||
      password === 'ssdclos2@2028' ||
      password === 'admin123'
    ) {
      setIsAdminLoggedIn(true);
      setLoginError('');
      showToast('Successfully authenticated as SSDC Tabulation Master Admin!');
    } else {
      setLoginError('Invalid admin email or password.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    showToast('Logged out of Admin Portal.');
  };

  // Calculated totals for current form
  const totalGovScore = govSpk1Score + govSpk2Score + govSpk3Score + govReplyScore;
  const totalOppScore = oppSpk1Score + oppSpk2Score + oppSpk3Score + oppReplyScore;
  const matchMargin = Math.abs(totalGovScore - totalOppScore);

  // Submit Tab Scorecard Entry & Auto Update Team/Speaker Points
  const handleSubmitTabScorecard = async () => {
    if (!selectedGovId || !selectedOppId || selectedGovId === selectedOppId) {
      alert('Please select two distinct teams for Government and Opposition.');
      return;
    }

    const govTeamObj = teams.find((t) => t.id === selectedGovId);
    const oppTeamObj = teams.find((t) => t.id === selectedOppId);

    if (!govTeamObj || !oppTeamObj) return;

    const newEntry: TabSheetEntry = {
      id: `tab-${Date.now()}`,
      roundNumber: roundNum,
      govTeamId: selectedGovId,
      oppTeamId: selectedOppId,
      govSpeaker1Name: govSpk1Name,
      govSpeaker1Score: govSpk1Score,
      govSpeaker2Name: govSpk2Name,
      govSpeaker2Score: govSpk2Score,
      govSpeaker3Name: govSpk3Name,
      govSpeaker3Score: govSpk3Score,
      govReplyScore: govReplyScore,
      oppSpeaker1Name: oppSpk1Name,
      oppSpeaker1Score: oppSpk1Score,
      oppSpeaker2Name: oppSpk2Name,
      oppSpeaker2Score: oppSpk2Score,
      oppSpeaker3Name: oppSpk3Name,
      oppSpeaker3Score: oppSpk3Score,
      oppReplyScore: oppReplyScore,
      winner,
      adjudicatorName: adjName,
      createdAt: new Date().toISOString()
    };

    setTabEntries((prev) => [newEntry, ...prev]);

    // Update Teams Data
    const updatedTeams = teams.map((t) => {
      if (t.id === selectedGovId) {
        const isWin = winner === 'Government';
        const newWin = t.win + (isWin ? 1 : 0);
        const newLoss = t.loss + (isWin ? 0 : 1);
        const newPts = t.totalSpeakerPoints + totalGovScore;
        const marginDelta = isWin ? matchMargin : -matchMargin;
        const newMargin = t.netMargin + marginDelta;
        return {
          ...t,
          win: newWin,
          loss: newLoss,
          totalSpeakerPoints: parseFloat(newPts.toFixed(1)),
          netMargin: parseFloat(newMargin.toFixed(1)),
          breakStatus: (newWin >= 3 ? 'Qualified' : newWin >= 2 ? 'Contending' : 'Eliminated') as Team['breakStatus']
        };
      }
      if (t.id === selectedOppId) {
        const isWin = winner === 'Opposition';
        const newWin = t.win + (isWin ? 1 : 0);
        const newLoss = t.loss + (isWin ? 0 : 1);
        const newPts = t.totalSpeakerPoints + totalOppScore;
        const marginDelta = isWin ? matchMargin : -matchMargin;
        const newMargin = t.netMargin + marginDelta;
        return {
          ...t,
          win: newWin,
          loss: newLoss,
          totalSpeakerPoints: parseFloat(newPts.toFixed(1)),
          netMargin: parseFloat(newMargin.toFixed(1)),
          breakStatus: (newWin >= 3 ? 'Qualified' : newWin >= 2 ? 'Contending' : 'Eliminated') as Team['breakStatus']
        };
      }
      return t;
    });

    // Re-rank teams
    updatedTeams.sort((a, b) => {
      if (b.win !== a.win) return b.win - a.win;
      if (b.totalSpeakerPoints !== a.totalSpeakerPoints) return b.totalSpeakerPoints - a.totalSpeakerPoints;
      return b.netMargin - a.netMargin;
    });

    const reRankedTeams = updatedTeams.map((t, i) => ({ ...t, rank: i + 1 }));
    setTeams(reRankedTeams);

    // Update Speakers Points
    const govSpeakersInput = [
      { name: govSpk1Name, score: govSpk1Score, team: govTeamObj.name, inst: govTeamObj.institution },
      { name: govSpk2Name, score: govSpk2Score, team: govTeamObj.name, inst: govTeamObj.institution },
      { name: govSpk3Name, score: govSpk3Score, team: govTeamObj.name, inst: govTeamObj.institution }
    ];

    const oppSpeakersInput = [
      { name: oppSpk1Name, score: oppSpk1Score, team: oppTeamObj.name, inst: oppTeamObj.institution },
      { name: oppSpk2Name, score: oppSpk2Score, team: oppTeamObj.name, inst: oppTeamObj.institution },
      { name: oppSpk3Name, score: oppSpk3Score, team: oppTeamObj.name, inst: oppTeamObj.institution }
    ];

    const allSubmittedSpeakers = [...govSpeakersInput, ...oppSpeakersInput];

    let updatedSpeakers = [...speakers];

    allSubmittedSpeakers.forEach((input) => {
      const existingIdx = updatedSpeakers.findIndex(
        (s) => s.name.toLowerCase() === input.name.toLowerCase()
      );

      if (existingIdx !== -1) {
        const s = updatedSpeakers[existingIdx];
        const newTotal = parseFloat((s.totalPoints + input.score).toFixed(1));
        const newRounds = s.roundsSpoken + 1;
        const newAvg = parseFloat((newTotal / newRounds).toFixed(2));
        const newBest = Math.max(s.bestScore, input.score);

        updatedSpeakers[existingIdx] = {
          ...s,
          totalPoints: newTotal,
          roundsSpoken: newRounds,
          averageScore: newAvg,
          bestScore: newBest,
          breakEligible: newRounds >= 3
        };
      } else if (input.name.trim()) {
        updatedSpeakers.push({
          id: `spk-${Date.now()}-${Math.random()}`,
          rank: updatedSpeakers.length + 1,
          name: input.name.trim(),
          teamName: input.team,
          institution: input.inst,
          totalPoints: input.score,
          roundsSpoken: 1,
          averageScore: input.score,
          bestScore: input.score,
          breakEligible: false
        });
      }
    });

    // Re-rank speakers by total points
    updatedSpeakers.sort((a, b) => b.totalPoints - a.totalPoints);
    const reRankedSpeakers = updatedSpeakers.map((s, i) => ({ ...s, rank: i + 1 }));
    setSpeakers(reRankedSpeakers);

    // Save to Supabase
    setSyncLoading(true);
    await saveTabEntryToSupabase(newEntry);
    const teamsSaved = await saveTeamsToSupabase(reRankedTeams);
    const speakersSaved = await saveSpeakersToSupabase(reRankedSpeakers);
    setSyncLoading(false);

    if (teamsSaved && speakersSaved) {
      showToast(`Round ${roundNum} scores saved & synced to Supabase database!`);
    } else {
      showToast(`Round ${roundNum} scores saved locally! (Supabase offline/unconfigured)`);
    }
  };

  // Direct Supabase Sync Trigger
  const handleSyncAllToSupabase = async () => {
    setSyncLoading(true);
    const tOk = await saveTeamsToSupabase(teams);
    const sOk = await saveSpeakersToSupabase(speakers);
    setSyncLoading(false);

    if (tOk && sOk) {
      showToast('All Team & Speaker Points successfully uploaded to Supabase!');
    } else {
      showToast('Supabase is not connected or credentials need verification. (Points stored locally)');
    }
  };

  // Clear All Debaters / Speakers
  const handleClearAllSpeakers = async () => {
    if (window.confirm('Are you sure you want to remove all debaters/speakers and clear team rosters?')) {
      setSpeakers([]);
      const clearedTeams = teams.map((t) => ({ ...t, roster: [] }));
      setTeams(clearedTeams);
      
      setSyncLoading(true);
      await clearSpeakersFromSupabase();
      await saveTeamsToSupabase(clearedTeams);
      setSyncLoading(false);

      showToast('All debaters and speaker rosters have been cleared across local state and cloud database.');
    }
  };

  // Upload / Restore All Default Debaters to Supabase
  const handleUploadDefaultSpeakersToSupabase = async () => {
    if (window.confirm('Upload all 142 debaters and initial team rosters to Supabase now?')) {
      setSpeakers(INITIAL_SPEAKERS);
      setTeams(INITIAL_TEAMS);
      setSyncLoading(true);
      const tOk = await saveTeamsToSupabase(INITIAL_TEAMS);
      const sOk = await saveSpeakersToSupabase(INITIAL_SPEAKERS);
      setSyncLoading(false);
      if (tOk && sOk) {
        showToast('Successfully uploaded all 142 debaters and team rosters to Supabase!');
      } else {
        showToast('Debaters updated locally. Check Supabase connection status.');
      }
    }
  };

  // Save Custom Supabase Credentials
  const handleSaveSupabaseConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseConfig(customUrl, customKey);
    const newConfig = getStoredSupabaseConfig();
    setSupabaseConfigState(newConfig);
    if (newConfig.isConnected) {
      showToast('Supabase configuration saved & connected!');
    } else {
      showToast('Supabase details updated.');
    }
  };

  const sqlSchemaCode = `-- Run this inside your Supabase SQL Editor to create tables for points:

CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  rank INT,
  name TEXT NOT NULL,
  institution TEXT,
  win INT DEFAULT 0,
  loss INT DEFAULT 0,
  total_speaker_points NUMERIC DEFAULT 0,
  net_margin NUMERIC DEFAULT 0,
  break_status TEXT DEFAULT 'Contending',
  roster JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS speakers (
  id TEXT PRIMARY KEY,
  rank INT,
  name TEXT NOT NULL,
  team_name TEXT,
  institution TEXT,
  total_points NUMERIC DEFAULT 0,
  rounds_spoken INT DEFAULT 0,
  average_score NUMERIC DEFAULT 0,
  best_score NUMERIC DEFAULT 0,
  break_eligible BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS tab_entries (
  id TEXT PRIMARY KEY,
  round_number INT,
  gov_team_id TEXT,
  opp_team_id TEXT,
  gov_speaker_1_name TEXT,
  gov_speaker_1_score NUMERIC,
  gov_speaker_2_name TEXT,
  gov_speaker_2_score NUMERIC,
  gov_speaker_3_name TEXT,
  gov_speaker_3_score NUMERIC,
  gov_reply_score NUMERIC,
  opp_speaker_1_name TEXT,
  opp_speaker_1_score NUMERIC,
  opp_speaker_2_name TEXT,
  opp_speaker_2_score NUMERIC,
  opp_speaker_3_name TEXT,
  opp_speaker_3_score NUMERIC,
  opp_reply_score NUMERIC,
  winner TEXT,
  adjudicator_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap">
          <Database className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>SSDC Tabulation Core & Supabase Points Hub</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-xl mx-auto px-2">
          Tabulation scorecard entry and Supabase database manager for SSDC League of Spars Season 2.
        </p>
      </div>

      {/* TOAST NOTIFICATION */}
      {successToast && (
        <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* IF NOT LOGGED IN: ADMIN LOGIN CARD */}
      {!isAdminLoggedIn ? (
        <div className="max-w-md mx-auto los-glass-card p-6 sm:p-8 space-y-6 border-t-2 border-amber-400 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#8B5E3C]/30 border border-[#A97142] flex items-center justify-center mx-auto text-amber-400">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#f5e4cb]">Tab Master Admin Authentication</h3>
            <p className="text-xs text-[#c9b8a7]">
              Sign in with your SSDC Tabulation executive account to enter debate points and manage Supabase data.
            </p>
          </div>

          {loginError && (
            <div className="bg-red-950/80 border border-red-500 text-red-200 px-3 py-2 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Admin Email / Username
              </label>
              <input
                type="text"
                placeholder="ssdc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] border border-[#684B35] p-3 rounded-xl focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Admin Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] border border-[#684B35] p-3 rounded-xl focus:outline-none focus:border-amber-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate & Access Controls</span>
            </button>
          </form>

          <div className="bg-[#120f0d] p-3.5 rounded-xl border border-[#684B35]/40 text-xs text-[#c9b8a7] text-center space-y-1">
            <span className="font-semibold text-amber-300">Protected Administrative Hub</span>
            <p className="text-[11px] text-[#8A7A6D]">
              All tabulation management, point editing forms, and database configurations are hidden from the public front end until authenticated.
            </p>
          </div>
        </div>
      ) : (
        /* LOGGED IN ADMIN PORTAL */
        <div className="space-y-6">
          
          {/* BAR: ADMIN STATUS & SUPABASE SYNC INDICATOR */}
          <div className="los-glass-card p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-emerald-500">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
              <div>
                <span className="text-xs font-bold text-emerald-300 block">
                  SSDC Tabulation Admin Mode: ACTIVE
                </span>
                <span className="text-[11px] text-[#c9b8a7]">
                  Storage Target: {supabaseConfig.isConnected ? 'Supabase Cloud Database (Live)' : 'Local Persistent Storage (Sync Ready)'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSyncAllToSupabase}
                disabled={syncLoading}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${syncLoading ? 'animate-spin' : ''}`} />
                <span>{syncLoading ? 'Syncing...' : 'Upload All Points to Supabase'}</span>
              </button>

              <button
                onClick={handleAdminLogout}
                className="px-3.5 py-2 rounded-xl bg-[#120f0d] hover:bg-red-950/50 text-red-300 border border-red-800/60 text-xs font-bold transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* SUB-NAVIGATION TABS */}
          <div className="los-glass-card p-2.5 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubTab('tab-input')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'tab-input'
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-300" />
              <span>Tab Scorecard Entry</span>
            </button>

            <button
              onClick={() => setActiveSubTab('teams-edit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'teams-edit'
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Edit Team Points ({teams.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('speakers-edit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'speakers-edit'
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Edit Speaker Scores ({speakers.length})</span>
            </button>

            <button
              onClick={() => setActiveSubTab('supabase-settings')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSubTab === 'supabase-settings'
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
              }`}
            >
              <Database className="w-4 h-4 text-cyan-400" />
              <span>Supabase DB Settings</span>
            </button>
          </div>

          {/* SUB TAB 1: TABULATION SCORECARD SHEET ENTRY */}
          {activeSubTab === 'tab-input' && (
            <div className="los-glass-card p-6 space-y-6 border-t-2 border-[#A97142]">
              <div className="border-b border-[#684B35]/40 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg text-[#f5e4cb] flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-amber-400" />
                    <span>Official Match Scorecard Input Sheet</span>
                  </h3>
                  <p className="text-xs text-[#c9b8a7]">
                    Input individual speaker scores (70-82 scale) and reply speeches (35-41 scale). Points and rankings are recalculated live.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#120f0d] px-3 py-1.5 rounded-xl border border-[#684B35]">
                  <span className="text-xs font-bold text-[#c9b8a7]">Round:</span>
                  <select
                    value={roundNum}
                    onChange={(e) => setRoundNum(Number(e.target.value))}
                    className="bg-transparent text-xs font-extrabold text-amber-300 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((r) => (
                      <option key={r} value={r} className="bg-[#120f0d]">Round {r}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TEAM SELECTORS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#120f0d] p-4 rounded-xl border border-[#684B35]/60">
                <div>
                  <label className="block text-xs font-bold text-amber-300 mb-1">
                    Government Team (Gov)
                  </label>
                  <select
                    value={selectedGovId}
                    onChange={(e) => setSelectedGovId(e.target.value)}
                    className="w-full bg-[#1F1A17] text-xs font-bold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.institution}) - [{t.win}W-{t.loss}L]
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1">
                    Opposition Team (Opp)
                  </label>
                  <select
                    value={selectedOppId}
                    onChange={(e) => setSelectedOppId(e.target.value)}
                    className="w-full bg-[#1F1A17] text-xs font-bold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.institution}) - [{t.win}W-{t.loss}L]
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TABULATION GRID (2 COLUMNS: GOV VS OPP) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* GOVERNMENT SIDE */}
                <div className="bg-[#120f0d]/90 p-4 rounded-xl border-l-4 border-amber-500 border border-[#684B35]/60 space-y-4">
                  <h4 className="font-bold text-sm text-amber-300 uppercase tracking-wider flex items-center justify-between">
                    <span>Government Bench Speakers</span>
                    <span className="text-xs bg-amber-950 text-amber-200 px-2 py-0.5 rounded border border-amber-700">Gov</span>
                  </h4>

                  {/* Gov Speaker 1 */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs">
                    <span className="font-semibold text-[#c9b8a7]">1st Speaker:</span>
                    <input
                      type="text"
                      placeholder="Debater Name"
                      value={govSpk1Name}
                      onChange={(e) => setGovSpk1Name(e.target.value)}
                      className="bg-[#1F1A17] text-[#f5e4cb] p-2 rounded-lg border border-[#684B35] focus:outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="60"
                        max="90"
                        value={govSpk1Score}
                        onChange={(e) => setGovSpk1Score(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-amber-300 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  {/* Gov Speaker 2 */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs">
                    <span className="font-semibold text-[#c9b8a7]">2nd Speaker:</span>
                    <input
                      type="text"
                      placeholder="Debater Name"
                      value={govSpk2Name}
                      onChange={(e) => setGovSpk2Name(e.target.value)}
                      className="bg-[#1F1A17] text-[#f5e4cb] p-2 rounded-lg border border-[#684B35] focus:outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="60"
                        max="90"
                        value={govSpk2Score}
                        onChange={(e) => setGovSpk2Score(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-amber-300 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  {/* Gov Speaker 3 */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs">
                    <span className="font-semibold text-[#c9b8a7]">3rd Speaker:</span>
                    <input
                      type="text"
                      placeholder="Debater Name"
                      value={govSpk3Name}
                      onChange={(e) => setGovSpk3Name(e.target.value)}
                      className="bg-[#1F1A17] text-[#f5e4cb] p-2 rounded-lg border border-[#684B35] focus:outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="60"
                        max="90"
                        value={govSpk3Score}
                        onChange={(e) => setGovSpk3Score(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-amber-300 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  {/* Gov Reply */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs pt-2 border-t border-[#684B35]/40">
                    <span className="font-semibold text-[#c9b8a7]">Reply Speech:</span>
                    <span className="text-[11px] text-[#c9b8a7] italic">(Half Speech)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="30"
                        max="45"
                        value={govReplyScore}
                        onChange={(e) => setGovReplyScore(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-amber-300 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  <div className="bg-[#1F1A17] p-2.5 rounded-lg border border-amber-500/40 flex justify-between items-center text-xs font-bold text-amber-300">
                    <span>Gov Subtotal Points:</span>
                    <span className="text-sm font-extrabold">{totalGovScore.toFixed(1)}</span>
                  </div>
                </div>

                {/* OPPOSITION SIDE */}
                <div className="bg-[#120f0d]/90 p-4 rounded-xl border-l-4 border-emerald-500 border border-[#684B35]/60 space-y-4">
                  <h4 className="font-bold text-sm text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Opposition Bench Speakers</span>
                    <span className="text-xs bg-emerald-950 text-emerald-200 px-2 py-0.5 rounded border border-emerald-700">Opp</span>
                  </h4>

                  {/* Opp Speaker 1 */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs">
                    <span className="font-semibold text-[#c9b8a7]">1st Speaker:</span>
                    <input
                      type="text"
                      placeholder="Debater Name"
                      value={oppSpk1Name}
                      onChange={(e) => setOppSpk1Name(e.target.value)}
                      className="bg-[#1F1A17] text-[#f5e4cb] p-2 rounded-lg border border-[#684B35] focus:outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="60"
                        max="90"
                        value={oppSpk1Score}
                        onChange={(e) => setOppSpk1Score(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-emerald-400 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  {/* Opp Speaker 2 */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs">
                    <span className="font-semibold text-[#c9b8a7]">2nd Speaker:</span>
                    <input
                      type="text"
                      placeholder="Debater Name"
                      value={oppSpk2Name}
                      onChange={(e) => setOppSpk2Name(e.target.value)}
                      className="bg-[#1F1A17] text-[#f5e4cb] p-2 rounded-lg border border-[#684B35] focus:outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="60"
                        max="90"
                        value={oppSpk2Score}
                        onChange={(e) => setOppSpk2Score(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-emerald-400 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  {/* Opp Speaker 3 */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs">
                    <span className="font-semibold text-[#c9b8a7]">3rd Speaker:</span>
                    <input
                      type="text"
                      placeholder="Debater Name"
                      value={oppSpk3Name}
                      onChange={(e) => setOppSpk3Name(e.target.value)}
                      className="bg-[#1F1A17] text-[#f5e4cb] p-2 rounded-lg border border-[#684B35] focus:outline-none"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="60"
                        max="90"
                        value={oppSpk3Score}
                        onChange={(e) => setOppSpk3Score(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-emerald-400 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  {/* Opp Reply */}
                  <div className="grid grid-cols-3 gap-2 items-center text-xs pt-2 border-t border-[#684B35]/40">
                    <span className="font-semibold text-[#c9b8a7]">Reply Speech:</span>
                    <span className="text-[11px] text-[#c9b8a7] italic">(Half Speech)</span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        step="0.5"
                        min="30"
                        max="45"
                        value={oppReplyScore}
                        onChange={(e) => setOppReplyScore(parseFloat(e.target.value) || 0)}
                        className="w-full bg-[#1F1A17] text-emerald-400 font-bold p-2 rounded-lg border border-[#684B35] text-center focus:outline-none"
                      />
                      <span className="text-[10px] text-[#c9b8a7]">pts</span>
                    </div>
                  </div>

                  <div className="bg-[#1F1A17] p-2.5 rounded-lg border border-emerald-500/40 flex justify-between items-center text-xs font-bold text-emerald-400">
                    <span>Opp Subtotal Points:</span>
                    <span className="text-sm font-extrabold">{totalOppScore.toFixed(1)}</span>
                  </div>
                </div>

              </div>

              {/* DECISION & ADJUDICATOR INFO */}
              <div className="bg-[#120f0d] p-4 rounded-xl border border-[#684B35] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                    Official Decision Winner
                  </label>
                  <select
                    value={winner}
                    onChange={(e) => setWinner(e.target.value as 'Government' | 'Opposition')}
                    className="w-full bg-[#1F1A17] text-xs font-bold text-amber-300 border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
                  >
                    <option value="Government">Government Win ({totalGovScore.toFixed(1)} pts)</option>
                    <option value="Opposition">Opposition Win ({totalOppScore.toFixed(1)} pts)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                    Panel Adjudicator / Chair Name
                  </label>
                  <input
                    type="text"
                    value={adjName}
                    onChange={(e) => setAdjName(e.target.value)}
                    className="w-full bg-[#1F1A17] text-xs text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
                  />
                </div>

                <div className="text-center bg-[#1F1A17] p-3 rounded-xl border border-[#684B35]">
                  <span className="text-[11px] text-[#c9b8a7] block">Calculated Match Margin</span>
                  <span className="font-['Orbitron'] font-black text-lg text-amber-400">
                    +{matchMargin.toFixed(1)} pts
                  </span>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmitTabScorecard}
                disabled={syncLoading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#A97142] hover:brightness-110 text-white text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl"
              >
                <Save className="w-5 h-5" />
                <span>Submit Scorecard & Auto-Sync Points to Supabase</span>
              </button>

              {/* RECENT SUBMITTED TAB ENTRIES */}
              {tabEntries.length > 0 && (
                <div className="pt-4 border-t border-[#684B35]/40 space-y-3">
                  <h4 className="font-bold text-xs text-[#f5e4cb] uppercase tracking-wider">
                    Recent Tab Scorecards Entered in Session ({tabEntries.length})
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {tabEntries.map((entry) => (
                      <div key={entry.id} className="bg-[#120f0d] p-3 rounded-xl border border-[#684B35]/60 text-xs flex justify-between items-center text-[#e2d0ba]">
                        <div>
                          <span className="font-bold text-amber-300 mr-2">Round {entry.roundNumber}:</span>
                          Winner: <span className="font-semibold text-white">{entry.winner}</span> | Chair: {entry.adjudicatorName}
                        </div>
                        <span className="text-[10px] text-[#c9b8a7]">{entry.createdAt?.split('T')[1]?.slice(0, 5)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* SUB TAB 2: EDIT TEAM POINTS */}
          {activeSubTab === 'teams-edit' && (
            <div className="los-glass-card p-6 space-y-5 border-t-2 border-emerald-500">
              <div className="flex justify-between items-center border-b border-[#684B35]/40 pb-3">
                <h3 className="font-bold text-lg text-[#f5e4cb] flex items-center gap-2">
                  <Table className="w-5 h-5 text-emerald-400" />
                  <span>Direct Team Points Editor Table</span>
                </h3>
                <button
                  onClick={handleSyncAllToSupabase}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Table to Supabase</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#120f0d] text-[#c9b8a7] uppercase tracking-wider text-[11px] border-b border-[#684B35]">
                      <th className="p-3">Rank</th>
                      <th className="p-3">Team Name</th>
                      <th className="p-3">Institution</th>
                      <th className="p-3 text-center">Wins</th>
                      <th className="p-3 text-center">Losses</th>
                      <th className="p-3 text-right">Speaker Pts</th>
                      <th className="p-3 text-right">Net Margin</th>
                      <th className="p-3 text-center">Break Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#684B35]/30">
                    {teams.map((t, idx) => (
                      <tr key={t.id} className="hover:bg-[#120f0d]/50">
                        <td className="p-3 font-bold text-amber-300">{idx + 1}</td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, name: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[#f5e4cb] font-bold p-1.5 rounded border border-[#684B35] w-full focus:outline-none"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={t.institution}
                            onChange={(e) => {
                              const val = e.target.value;
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, institution: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[#c9b8a7] p-1.5 rounded border border-[#684B35] w-full focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            value={t.win}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, win: val } : x)));
                            }}
                            className="bg-[#120f0d] text-emerald-400 font-bold p-1.5 rounded border border-[#684B35] w-16 text-center focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            value={t.loss}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, loss: val } : x)));
                            }}
                            className="bg-[#120f0d] text-red-400 p-1.5 rounded border border-[#684B35] w-16 text-center focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.5"
                            value={t.totalSpeakerPoints}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, totalSpeakerPoints: val } : x)));
                            }}
                            className="bg-[#120f0d] text-amber-300 font-bold p-1.5 rounded border border-[#684B35] w-24 text-right focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.5"
                            value={t.netMargin}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, netMargin: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[#f5e4cb] p-1.5 rounded border border-[#684B35] w-20 text-right focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <select
                            value={t.breakStatus}
                            onChange={(e) => {
                              const val = e.target.value as Team['breakStatus'];
                              setTeams((prev) => prev.map((x) => (x.id === t.id ? { ...x, breakStatus: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[11px] font-bold text-amber-200 p-1.5 rounded border border-[#684B35] focus:outline-none"
                          >
                            <option value="Qualified">Qualified</option>
                            <option value="Contending">Contending</option>
                            <option value="Eliminated">Eliminated</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB TAB 3: EDIT SPEAKER POINTS */}
          {activeSubTab === 'speakers-edit' && (
            <div className="los-glass-card p-6 space-y-5 border-t-2 border-amber-400">
              <div className="flex justify-between items-center border-b border-[#684B35]/40 pb-3">
                <h3 className="font-bold text-lg text-[#f5e4cb] flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-amber-400" />
                  <span>Direct Speaker Scores Editor Table</span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleUploadDefaultSpeakersToSupabase}
                    className="px-3.5 py-2 bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Upload All 142 Debaters to Supabase</span>
                  </button>
                  <button
                    onClick={handleClearAllSpeakers}
                    className="px-3.5 py-2 bg-red-950/80 hover:bg-red-900 text-red-200 border border-red-700/60 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    <span>Clear All Debaters</span>
                  </button>
                  <button
                    onClick={handleSyncAllToSupabase}
                    className="px-4 py-2 bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Speakers to Supabase</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#120f0d] text-[#c9b8a7] uppercase tracking-wider text-[11px] border-b border-[#684B35]">
                      <th className="p-3">Rank</th>
                      <th className="p-3">Speaker Name</th>
                      <th className="p-3">Team Name</th>
                      <th className="p-3 text-right">Total Points</th>
                      <th className="p-3 text-center">Rounds Spoken</th>
                      <th className="p-3 text-right">Avg Score</th>
                      <th className="p-3 text-right">Best Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#684B35]/30">
                    {speakers.map((s, idx) => (
                      <tr key={s.id} className="hover:bg-[#120f0d]/50">
                        <td className="p-3 font-bold text-amber-300">{idx + 1}</td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={s.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSpeakers((prev) => prev.map((x) => (x.id === s.id ? { ...x, name: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[#f5e4cb] font-bold p-1.5 rounded border border-[#684B35] w-full focus:outline-none"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            value={s.teamName}
                            onChange={(e) => {
                              const val = e.target.value;
                              setSpeakers((prev) => prev.map((x) => (x.id === s.id ? { ...x, teamName: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[#c9b8a7] p-1.5 rounded border border-[#684B35] w-full focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.5"
                            value={s.totalPoints}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setSpeakers((prev) => prev.map((x) => (x.id === s.id ? { ...x, totalPoints: val } : x)));
                            }}
                            className="bg-[#120f0d] text-amber-300 font-bold p-1.5 rounded border border-[#684B35] w-24 text-right focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            value={s.roundsSpoken}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              setSpeakers((prev) => prev.map((x) => (x.id === s.id ? { ...x, roundsSpoken: val } : x)));
                            }}
                            className="bg-[#120f0d] text-[#f5e4cb] p-1.5 rounded border border-[#684B35] w-16 text-center focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.1"
                            value={s.averageScore}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setSpeakers((prev) => prev.map((x) => (x.id === s.id ? { ...x, averageScore: val } : x)));
                            }}
                            className="bg-[#120f0d] text-emerald-400 font-bold p-1.5 rounded border border-[#684B35] w-20 text-right focus:outline-none"
                          />
                        </td>
                        <td className="p-3 text-right">
                          <input
                            type="number"
                            step="0.5"
                            value={s.bestScore}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              setSpeakers((prev) => prev.map((x) => (x.id === s.id ? { ...x, bestScore: val } : x)));
                            }}
                            className="bg-[#120f0d] text-amber-200 p-1.5 rounded border border-[#684B35] w-20 text-right focus:outline-none"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB TAB 4: SUPABASE SETTINGS */}
          {activeSubTab === 'supabase-settings' && (
            <div className="los-glass-card p-6 space-y-6 border-t-2 border-cyan-500">
              <div className="flex justify-between items-center border-b border-[#684B35]/40 pb-3">
                <div>
                  <h3 className="font-bold text-lg text-[#f5e4cb] flex items-center gap-2">
                    <Database className="w-5 h-5 text-cyan-400" />
                    <span>Supabase Database Credentials & Setup</span>
                  </h3>
                  <p className="text-xs text-[#c9b8a7]">
                    Connect your project's Supabase instance to keep all points data synced permanently in the cloud.
                  </p>
                </div>

                <button
                  onClick={() => setShowSqlModal(!showSqlModal)}
                  className="px-3 py-1.5 rounded-lg bg-[#120f0d] hover:bg-[#1F1A17] border border-[#684B35] text-amber-300 text-xs font-bold flex items-center gap-1.5"
                >
                  <Code className="w-4 h-4" />
                  <span>{showSqlModal ? 'Hide SQL DDL' : 'View SQL Schema DDL'}</span>
                </button>
              </div>

              {showSqlModal && (
                <div className="bg-[#120f0d] p-4 rounded-xl border border-cyan-500/50 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-cyan-300">Copy & Run in Supabase SQL Editor:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(sqlSchemaCode);
                        showToast('SQL DDL copied to clipboard!');
                      }}
                      className="text-[10px] bg-cyan-900 text-cyan-100 px-2 py-1 rounded font-bold hover:bg-cyan-800"
                    >
                      Copy SQL Code
                    </button>
                  </div>
                  <pre className="font-mono text-[11px] text-[#e2d0ba] bg-[#0d0a08] p-3 rounded-lg overflow-x-auto max-h-48">
                    {sqlSchemaCode}
                  </pre>
                </div>
              )}

              <form onSubmit={handleSaveSupabaseConfig} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                    Supabase Project URL (<code className="text-cyan-300">VITE_SUPABASE_URL</code>)
                  </label>
                  <input
                    type="text"
                    placeholder="https://xyz.supabase.co"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="w-full bg-[#120f0d] text-xs text-[#f5e4cb] border border-[#684B35] p-3 rounded-xl focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                    Supabase Anon Key (<code className="text-cyan-300">VITE_SUPABASE_ANON_KEY</code>)
                  </label>
                  <input
                    type="password"
                    placeholder="eyJhbGciOiJIUzI1NiIsInR..."
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    className="w-full bg-[#120f0d] text-xs text-[#f5e4cb] border border-[#684B35] p-3 rounded-xl focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-white text-xs font-bold flex items-center gap-2 shadow"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Test Supabase Credentials</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSyncAllToSupabase}
                    className="px-6 py-3 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-bold flex items-center gap-2 shadow"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Upload Current Local Points</span>
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
