import React, { useState } from 'react';
import { Team } from '../types';
import { Trophy, CheckCircle, AlertCircle, XCircle, Search, HelpCircle, Download } from 'lucide-react';

interface StandingsViewProps {
  teams: Team[];
}

export const StandingsView: React.FC<StandingsViewProps> = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // AP-ISC Standing sorting rule:
  // 1. Total Wins (descending)
  // 2. Total Speaker Points (descending)
  // 3. Net Margin (descending)
  const sortedTeams = [...teams].sort((a, b) => {
    if (b.win !== a.win) return b.win - a.win;
    if (b.totalSpeakerPoints !== a.totalSpeakerPoints)
      return b.totalSpeakerPoints - a.totalSpeakerPoints;
    return b.netMargin - a.netMargin;
  });

  const filteredTeams = sortedTeams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportStandingsCSV = () => {
    const headers = ['Rank', 'Team Name', 'Institution', 'Wins', 'Losses', 'Total Speaker Pts', 'Net Margin', 'Break Status'];
    const rows = filteredTeams.map((t, idx) => [
      idx + 1,
      `"${t.name}"`,
      `"${t.institution}"`,
      t.win,
      t.loss,
      t.totalSpeakerPoints,
      t.netMargin,
      t.breakStatus
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SSDC_LoS_S2_Standings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-amber-400" />
          <span>AP-ISC League Standings</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Official points table for SSDC League of Spars Season 2. Rank determined by Match Wins, Speaker Points & Net Margins.
        </p>
      </div>

      {/* AP-ISC TIE-BREAKER EXPLANATION BOX */}
      <div className="los-glass-card p-4 sm:p-5 border-l-4 border-amber-400 text-xs text-[#e2d0ba] space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>AP-ISC Format Standing Calculation Criteria</span>
        </div>
        <p className="leading-relaxed">
          In accordance with AP-ISC league rules, every institution plays every other institution. 
          Standard ranking priority: <b>1. Total Wins</b> &rarr; <b>2. Total Speaker Points</b> &rarr; <b>3. Net Speaker Point Margin</b>.
        </p>
      </div>

      {/* CONTROLS */}
      <div className="los-glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search team or institution in standings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        <button
          onClick={exportStandingsCSV}
          className="px-4 py-2 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-bold transition-all flex items-center gap-2 shadow"
        >
          <Download className="w-4 h-4" />
          <span>Export Standings (CSV)</span>
        </button>
      </div>

      {/* LEADERBOARD TABLE */}
      <div className="los-glass-card overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F1A17] text-[#c9b8a7] text-xs font-bold uppercase tracking-wider border-b border-[#684B35]">
                <th className="py-4 px-4 text-center">Rank</th>
                <th className="py-4 px-4">Institution & Team</th>
                <th className="py-4 px-4 text-center">Wins</th>
                <th className="py-4 px-4 text-center">Losses</th>
                <th className="py-4 px-4 text-right">Speaker Pts</th>
                <th className="py-4 px-4 text-right">Net Margin</th>
                <th className="py-4 px-4 text-center">Break Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#684B35]/40 text-sm">
              {filteredTeams.map((team, index) => {
                const rank = index + 1;
                const isTop3 = rank <= 3;

                return (
                  <tr
                    key={team.id}
                    className={`hover:bg-[#332C24]/60 transition-colors duration-150 ${
                      rank <= 4 ? 'bg-[#8B5E3C]/10' : ''
                    }`}
                  >
                    {/* RANK */}
                    <td className="py-4 px-4 text-center font-['Orbitron'] font-extrabold">
                      {rank === 1 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400 shadow">
                          🥇
                        </span>
                      )}
                      {rank === 2 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300 shadow">
                          🥈
                        </span>
                      )}
                      {rank === 3 && (
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-500 border border-amber-600 shadow">
                          🥉
                        </span>
                      )}
                      {!isTop3 && <span className="text-[#c9b8a7]">#{rank}</span>}
                    </td>

                    {/* TEAM & INSTITUTION */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-[#f5e4cb] text-base">{team.name}</div>
                      <div className="text-xs text-[#c9b8a7]">{team.institution}</div>
                    </td>

                    {/* WINS */}
                    <td className="py-4 px-4 text-center font-['Orbitron'] font-black text-emerald-400 text-base">
                      {team.win}
                    </td>

                    {/* LOSSES */}
                    <td className="py-4 px-4 text-center font-['Orbitron'] font-bold text-rose-400">
                      {team.loss}
                    </td>

                    {/* TOTAL SPEAKER POINTS */}
                    <td className="py-4 px-4 text-right font-['Orbitron'] font-bold text-amber-300">
                      {team.totalSpeakerPoints.toFixed(1)}
                    </td>

                    {/* NET MARGIN */}
                    <td
                      className={`py-4 px-4 text-right font-['Orbitron'] font-extrabold ${
                        team.netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {team.netMargin >= 0 ? `+${team.netMargin}` : team.netMargin}
                    </td>

                    {/* BREAK STATUS */}
                    <td className="py-4 px-4 text-center">
                      {team.breakStatus === 'Qualified' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                          <CheckCircle className="w-3.5 h-3.5" /> Qualified
                        </span>
                      )}
                      {team.breakStatus === 'Contending' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700">
                          <AlertCircle className="w-3.5 h-3.5" /> Contending
                        </span>
                      )}
                      {team.breakStatus === 'Eliminated' && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-stone-900 text-stone-400 border border-stone-700">
                          <XCircle className="w-3.5 h-3.5" /> Eliminated
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#c9b8a7]">
                    <Trophy className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
                    <p className="font-semibold">No teams found matching search.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
