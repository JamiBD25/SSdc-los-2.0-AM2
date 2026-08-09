import React, { useState } from 'react';
import { Team, Speaker, MatchFixture, TournamentAnnouncement } from '../types';
import { Sliders, Plus, FileSpreadsheet, Save, Trash2, CheckCircle2, RefreshCw, Upload, AlertCircle } from 'lucide-react';

interface AdminManagerProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  speakers: Speaker[];
  setSpeakers: React.Dispatch<React.SetStateAction<Speaker[]>>;
  fixtures: MatchFixture[];
  setFixtures: React.Dispatch<React.SetStateAction<MatchFixture[]>>;
  announcements: TournamentAnnouncement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<TournamentAnnouncement[]>>;
}

export const AdminManager: React.FC<AdminManagerProps> = ({
  teams,
  setTeams,
  speakers,
  setSpeakers,
  fixtures,
  setFixtures,
  announcements,
  setAnnouncements
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'csv' | 'match' | 'teams' | 'announcements'>('csv');
  const [successMsg, setSuccessMsg] = useState('');

  // CSV Import Raw Text
  const [rawCsvText, setRawCsvText] = useState('');
  const [importType, setImportType] = useState<'teams' | 'speakers'>('teams');

  // Match Result Update Form
  const [selectedFixtureId, setSelectedFixtureId] = useState<string>(fixtures[0]?.id || '');
  const [govScore, setGovScore] = useState<number>(225);
  const [oppScore, setOppScore] = useState<number>(220);
  const [winner, setWinner] = useState<'Government' | 'Opposition'>('Government');

  // Announcement Form
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annTag, setAnnTag] = useState<TournamentAnnouncement['tag']>('Notice');

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // CSV Parser
  const handleProcessCsv = () => {
    if (!rawCsvText.trim()) return;

    const lines = rawCsvText.trim().split('\n');
    if (lines.length < 2) {
      alert('CSV must contain a header row and at least one data row.');
      return;
    }

    if (importType === 'teams') {
      const newTeams: Team[] = [];
      // Expecting columns: Name, Institution, Wins, Losses, SpeakerPoints, NetMargin
      lines.slice(1).forEach((line, index) => {
        const parts = line.split(',').map((p) => p.replace(/"/g, '').trim());
        if (parts.length >= 2) {
          const name = parts[0];
          const inst = parts[1];
          const win = parseInt(parts[2] || '0') || 0;
          const loss = parseInt(parts[3] || '0') || 0;
          const pts = parseFloat(parts[4] || '1000') || 1000;
          const margin = parseFloat(parts[5] || '0') || 0;

          newTeams.push({
            id: `imported-team-${Date.now()}-${index}`,
            rank: teams.length + index + 1,
            name,
            institution: inst,
            win,
            loss,
            totalSpeakerPoints: pts,
            netMargin: margin,
            breakStatus: win >= 3 ? 'Qualified' : win >= 2 ? 'Contending' : 'Eliminated',
            roster: ['Debater 1', 'Debater 2', 'Debater 3', 'Debater 4', 'Debater 5']
          });
        }
      });

      if (newTeams.length > 0) {
        setTeams((prev) => [...prev, ...newTeams]);
        showToast(`Successfully imported ${newTeams.length} new teams from Excel/CSV!`);
        setRawCsvText('');
      }
    } else {
      const newSpeakers: Speaker[] = [];
      // Expecting columns: Name, Team, Institution, TotalPoints, RoundsSpoken
      lines.slice(1).forEach((line, index) => {
        const parts = line.split(',').map((p) => p.replace(/"/g, '').trim());
        if (parts.length >= 2) {
          const name = parts[0];
          const teamName = parts[1];
          const inst = parts[2] || 'Institution';
          const totalPoints = parseFloat(parts[3] || '225') || 225;
          const rounds = parseInt(parts[4] || '3') || 3;
          const avg = totalPoints / (rounds || 1);

          newSpeakers.push({
            id: `imported-spk-${Date.now()}-${index}`,
            rank: speakers.length + index + 1,
            name,
            teamName,
            institution: inst,
            totalPoints,
            roundsSpoken: rounds,
            averageScore: avg,
            bestScore: avg + 2,
            breakEligible: rounds >= 3
          });
        }
      });

      if (newSpeakers.length > 0) {
        setSpeakers((prev) => [...prev, ...newSpeakers]);
        showToast(`Successfully imported ${newSpeakers.length} debaters from Excel/CSV!`);
        setRawCsvText('');
      }
    }
  };

  // Match Result Submission
  const handleUpdateMatchResult = () => {
    if (!selectedFixtureId) return;

    setFixtures((prev) =>
      prev.map((f) => {
        if (f.id === selectedFixtureId) {
          return {
            ...f,
            govPoints: govScore,
            oppPoints: oppScore,
            winner: winner,
            status: 'Completed'
          };
        }
        return f;
      })
    );

    showToast('Match result updated successfully!');
  };

  // Announcement Creation
  const handleCreateAnnouncement = () => {
    if (!annTitle.trim() || !annContent.trim()) return;

    const newAnn: TournamentAnnouncement = {
      id: `ann-${Date.now()}`,
      title: annTitle,
      content: annContent,
      date: new Date().toISOString().split('T')[0],
      tag: annTag,
      author: 'SSDC Tabulation Core'
    };

    setAnnouncements((prev) => [newAnn, ...prev]);
    setAnnTitle('');
    setAnnContent('');
    showToast('New announcement published to website feed!');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Sliders className="w-8 h-8 text-amber-400" />
          <span>SSDC Tabulation Core & Data Portal</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Tournament administrator controls: Import Excel/CSV data, enter debate match scores, and publish official notices.
        </p>
      </div>

      {/* TOAST NOTIFICATION */}
      {successMsg && (
        <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* ADMIN SUB-TAB NAVIGATION */}
      <div className="los-glass-card p-3 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveAdminTab('csv')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeAdminTab === 'csv'
              ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
              : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Excel / CSV Import</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('match')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeAdminTab === 'match'
              ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
              : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          <span>Enter Match Results</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('announcements')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeAdminTab === 'announcements'
              ? 'bg-[#8B5E3C] text-white border border-[#A97142]'
              : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice</span>
        </button>
      </div>

      {/* TAB 1: CSV / EXCEL DATA IMPORT */}
      {activeAdminTab === 'csv' && (
        <div className="los-glass-card p-6 space-y-5 border-t-2 border-[#A97142]">
          <div className="flex items-center justify-between border-b border-[#684B35]/40 pb-3">
            <div>
              <h3 className="font-bold text-lg text-[#f5e4cb] flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-400" />
                <span>Paste or Upload Excel / CSV Data</span>
              </h3>
              <p className="text-xs text-[#c9b8a7]">
                Paste rows copied directly from Excel, Google Sheets, or CSV files to quickly populate teams or speaker rankings.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-[#c9b8a7]">Target:</label>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value as 'teams' | 'speakers')}
                className="bg-[#120f0d] text-xs font-bold text-[#f5e4cb] border border-[#684B35] px-3 py-1.5 rounded-xl focus:outline-none"
              >
                <option value="teams">Import Teams</option>
                <option value="speakers">Import Debaters / Speakers</option>
              </select>
            </div>
          </div>

          <div className="bg-[#120f0d] p-3 rounded-xl border border-[#684B35]/40 text-xs text-[#e2d0ba] space-y-1">
            <span className="font-bold text-amber-300 block uppercase text-[10px]">Expected CSV Columns:</span>
            {importType === 'teams' ? (
              <code>Team Name, Institution Name, Wins, Losses, Speaker Points, Net Margin</code>
            ) : (
              <code>Debater Name, Team Name, Institution Name, Total Points, Rounds Spoken</code>
            )}
          </div>

          <textarea
            rows={8}
            placeholder={
              importType === 'teams'
                ? 'Collegiate Debaters Alpha, Chittagong Collegiate School, 5, 0, 1145.5, 32.5\nSt. Placids Elite, St. Placids School, 4, 1, 1132.0, 21.0'
                : 'Rayhan Chowdhury, Collegiate Alpha, Chittagong Collegiate School, 387.5, 5\nAdiba Anjum, CGS Vanguard, Chittagong Grammar School, 384.0, 5'
            }
            value={rawCsvText}
            onChange={(e) => setRawCsvText(e.target.value)}
            className="w-full bg-[#120f0d] text-xs text-[#f5e4cb] p-4 rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 font-mono"
          ></textarea>

          <button
            onClick={handleProcessCsv}
            className="px-6 py-3 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-extrabold flex items-center gap-2 shadow"
          >
            <Upload className="w-4 h-4" />
            <span>Process & Merge Excel/CSV Data</span>
          </button>
        </div>
      )}

      {/* TAB 2: MATCH RESULT SCORE ENTRY */}
      {activeAdminTab === 'match' && (
        <div className="los-glass-card p-6 space-y-5 border-t-2 border-emerald-500">
          <h3 className="font-bold text-lg text-[#f5e4cb] border-b border-[#684B35]/40 pb-3">
            Enter / Update Match Scores
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Select Fixture / Match
              </label>
              <select
                value={selectedFixtureId}
                onChange={(e) => setSelectedFixtureId(e.target.value)}
                className="w-full bg-[#120f0d] text-xs font-bold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
              >
                {fixtures.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.roundName}: {f.govTeam} vs {f.oppTeam}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Declared Winner
              </label>
              <select
                value={winner}
                onChange={(e) => setWinner(e.target.value as 'Government' | 'Opposition')}
                className="w-full bg-[#120f0d] text-xs font-bold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
              >
                <option value="Government">Government Win</option>
                <option value="Opposition">Opposition Win</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Government Total Speaker Score
              </label>
              <input
                type="number"
                step="0.5"
                value={govScore}
                onChange={(e) => setGovScore(parseFloat(e.target.value))}
                className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Opposition Total Speaker Score
              </label>
              <input
                type="number"
                step="0.5"
                value={oppScore}
                onChange={(e) => setOppScore(parseFloat(e.target.value))}
                className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleUpdateMatchResult}
            className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-2 shadow"
          >
            <Save className="w-4 h-4" />
            <span>Save & Update AP-ISC Match Scores</span>
          </button>
        </div>
      )}

      {/* TAB 3: PUBLISH ANNOUNCEMENTS */}
      {activeAdminTab === 'announcements' && (
        <div className="los-glass-card p-6 space-y-5 border-t-2 border-amber-400">
          <h3 className="font-bold text-lg text-[#f5e4cb] border-b border-[#684B35]/40 pb-3">
            Publish New Tournament Bulletin
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Announcement Title
              </label>
              <input
                type="text"
                placeholder="e.g. Round 5 Pairing Matrix Released"
                value={annTitle}
                onChange={(e) => setAnnTitle(e.target.value)}
                className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Tag / Category
              </label>
              <select
                value={annTag}
                onChange={(e) => setAnnTag(e.target.value as TournamentAnnouncement['tag'])}
                className="w-full bg-[#120f0d] text-xs font-bold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none"
              >
                <option value="Notice">Notice</option>
                <option value="Urgent">Urgent</option>
                <option value="Pairings">Pairings</option>
                <option value="Rule Update">Rule Update</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#c9b8a7] mb-1">
                Bulletin Content
              </label>
              <textarea
                rows={4}
                placeholder="Enter official notice body text..."
                value={annContent}
                onChange={(e) => setAnnContent(e.target.value)}
                className="w-full bg-[#120f0d] text-xs text-[#f5e4cb] p-3 rounded-xl border border-[#684B35] focus:outline-none"
              ></textarea>
            </div>

            <button
              onClick={handleCreateAnnouncement}
              className="px-6 py-3 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-extrabold flex items-center gap-2 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Notice to Portal</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
