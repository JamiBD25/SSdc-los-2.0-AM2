import React, { useState, useMemo } from 'react';
import { Speaker } from '../types';
import { Search, Mic, Award, CheckCircle, AlertTriangle, Download } from 'lucide-react';

interface SpeakersViewProps {
  speakers: Speaker[];
}

export const SpeakersView: React.FC<SpeakersViewProps> = ({ speakers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breakFilter, setBreakFilter] = useState<'all' | 'eligible' | 'ineligible'>('all');
  const [sortBy, setSortBy] = useState<'avg' | 'points' | 'rounds' | 'best'>('avg');

  const filteredSpeakers = useMemo(() => {
    return speakers
      .filter((speaker) => {
        const matchesSearch =
          speaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          speaker.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
          speaker.teamName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesBreak =
          breakFilter === 'all' ||
          (breakFilter === 'eligible' && speaker.breakEligible) ||
          (breakFilter === 'ineligible' && !speaker.breakEligible);

        return matchesSearch && matchesBreak;
      })
      .sort((a, b) => {
        if (sortBy === 'points') return b.totalPoints - a.totalPoints;
        if (sortBy === 'rounds') return b.roundsSpoken - a.roundsSpoken;
        if (sortBy === 'best') return b.bestScore - a.bestScore;
        return b.averageScore - a.averageScore;
      });
  }, [speakers, searchTerm, breakFilter, sortBy]);

  const handleExportCSV = () => {
    const headers = ['Rank', 'Speaker Name', 'Team Name', 'Institution', 'Rounds Spoken', 'Total Points', 'Average Score', 'Best Score', 'Break Eligible'];
    const rows = filteredSpeakers.map((s, idx) => [
      idx + 1,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.teamName.replace(/"/g, '""')}"`,
      `"${s.institution.replace(/"/g, '""')}"`,
      s.roundsSpoken,
      s.totalPoints,
      s.averageScore,
      s.bestScore,
      s.breakEligible ? 'Eligible' : 'Ineligible'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SSDC_LoS_S2_Speaker_Leaderboard.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const bestSpeakerObj = speakers.length > 0
    ? [...speakers].sort((a, b) => b.averageScore - a.averageScore)[0]
    : null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap">
          <Mic className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>Speaker Leaderboard Table</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-xl mx-auto px-2">
          Individual debater rankings, speaker points, and AP-ISC break eligibility tracking data.
        </p>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Total Debaters</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-amber-300">{speakers.length}</span>
        </div>
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Best Speaker Avg</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-emerald-400">
            {bestSpeakerObj && bestSpeakerObj.averageScore > 0 ? bestSpeakerObj.averageScore.toFixed(2) : 'N/A'}
          </span>
        </div>
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Break Eligible</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-amber-400">
            {speakers.filter((s) => s.breakEligible).length}
          </span>
        </div>
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">League Avg Score</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-[#f5e4cb]">
            {speakers.length > 0 && speakers.some((s) => s.averageScore > 0)
              ? (speakers.reduce((acc, s) => acc + s.averageScore, 0) / speakers.length).toFixed(2)
              : 'N/A'}
          </span>
        </div>
      </div>

      {/* SEARCH & FILTERS & EXPORT */}
      <div className="los-glass-card p-3.5 sm:p-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-3 sm:gap-4 max-w-full">
        
        {/* Search */}
        <div className="relative flex-1 min-w-0 sm:min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search speaker by name, institution, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-xs sm:text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <select
            value={breakFilter}
            onChange={(e) => setBreakFilter(e.target.value as 'all' | 'eligible' | 'ineligible')}
            className="flex-1 sm:flex-none bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-2.5 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Debaters</option>
            <option value="eligible">Break Eligible (3+ Rounds)</option>
            <option value="ineligible">Needs More Rounds (&lt;3)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'avg' | 'points' | 'rounds' | 'best')}
            className="flex-1 sm:flex-none bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-2.5 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="avg">Sort by Average Score</option>
            <option value="points">Sort by Total Points</option>
            <option value="rounds">Sort by Rounds Spoken</option>
            <option value="best">Sort by Best Score</option>
          </select>

          <button
            onClick={handleExportCSV}
            className="px-2.5 py-2 bg-[#120f0d] hover:bg-[#8B5E3C] text-[#f5e4cb] hover:text-white border border-[#684B35] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Download CSV Table"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* LEADERBOARD TABLE */}
      <div className="los-glass-card overflow-hidden shadow-2xl max-w-full">
        <div className="w-full overflow-x-hidden">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#1F1A17] text-[#c9b8a7] text-[10px] sm:text-xs font-bold uppercase tracking-wider border-b border-[#684B35]">
                <th className="py-2.5 px-1.5 sm:px-3 text-center w-[10%] sm:w-auto">#</th>
                <th className="py-2.5 px-1.5 sm:px-3">Debater</th>
                <th className="py-2.5 px-3 hidden md:table-cell">Institution & Team</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-center">Rds</th>
                <th className="py-2.5 px-3 text-right hidden sm:table-cell">Total Pts</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-right">Avg Score</th>
                <th className="py-2.5 px-3 text-right hidden md:table-cell">Best</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-center">Break</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#684B35]/40 text-xs sm:text-sm">
              {filteredSpeakers.map((speaker, index) => {
                const displayRank = index + 1;
                const hasSpoken = speaker.roundsSpoken > 0 || speaker.totalPoints > 0;

                return (
                  <tr
                    key={speaker.id}
                    className="hover:bg-[#332C24]/60 transition-colors duration-150"
                  >
                    {/* RANK */}
                    <td className="py-2.5 px-1 sm:px-3 text-center font-['Orbitron'] font-extrabold text-[11px] sm:text-sm">
                      {hasSpoken ? (
                        <>
                          {displayRank === 1 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400">
                              🥇
                            </span>
                          )}
                          {displayRank === 2 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300">
                              🥈
                            </span>
                          )}
                          {displayRank === 3 && (
                            <span className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-700/20 text-amber-500 border border-amber-600">
                              🥉
                            </span>
                          )}
                          {displayRank > 3 && <span className="text-[#c9b8a7]">#{displayRank}</span>}
                        </>
                      ) : (
                        <span className="text-[#8A7A6D] text-[10px] font-semibold">N/A</span>
                      )}
                    </td>

                    {/* NAME & TEAM/INST (NESTED ON MOBILE) */}
                    <td className="py-2.5 px-1.5 sm:px-3 font-bold text-[#f5e4cb]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] sm:text-sm">{speaker.name}</span>
                        {hasSpoken && displayRank === 1 && (
                          <span className="text-[9px] bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider shrink-0">
                            Best
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] sm:text-xs text-[#c9b8a7] md:hidden font-normal truncate max-w-[120px] sm:max-w-none">
                        {speaker.teamName} &bull; {speaker.institution}
                      </div>
                    </td>

                    {/* INSTITUTION & TEAM (DESKTOP) */}
                    <td className="py-2.5 px-3 text-xs hidden md:table-cell">
                      <div className="font-semibold text-[#f5e4cb]">{speaker.teamName}</div>
                      <div className="text-[#c9b8a7]">{speaker.institution}</div>
                    </td>

                    {/* ROUNDS */}
                    <td className="py-2.5 px-1 sm:px-3 text-center font-['Orbitron'] font-bold text-[#f5e4cb] text-[11px] sm:text-sm">
                      {hasSpoken ? speaker.roundsSpoken : 'N/A'}
                    </td>

                    {/* TOTAL POINTS (DESKTOP) */}
                    <td className="py-2.5 px-3 text-right font-['Orbitron'] font-bold text-amber-300 hidden sm:table-cell text-xs sm:text-sm">
                      {hasSpoken ? speaker.totalPoints.toFixed(1) : 'N/A'}
                    </td>

                    {/* AVG SCORE */}
                    <td className="py-2.5 px-1.5 sm:px-3 text-right font-['Orbitron'] font-black text-emerald-400 whitespace-nowrap">
                      <div className="text-[11px] sm:text-sm">
                        {hasSpoken ? speaker.averageScore.toFixed(2) : 'N/A'}
                      </div>
                      <div className="sm:hidden text-[9px] font-mono text-[#c9b8a7] font-normal">
                        Tot: {hasSpoken ? speaker.totalPoints.toFixed(0) : '0'}
                      </div>
                    </td>

                    {/* BEST SCORE (DESKTOP) */}
                    <td className="py-2.5 px-3 text-right font-['Orbitron'] font-bold text-[#f5e4cb] hidden md:table-cell text-xs sm:text-sm">
                      {hasSpoken ? speaker.bestScore.toFixed(1) : 'N/A'}
                    </td>

                    {/* BREAK ELIGIBILITY */}
                    <td className="py-2.5 px-1 sm:px-3 text-center">
                      {hasSpoken ? (
                        speaker.breakEligible ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700 whitespace-nowrap">
                            <CheckCircle className="w-3 h-3 shrink-0" />
                            <span className="hidden sm:inline">Eligible</span>
                            <span className="sm:hidden">Elig</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-700 whitespace-nowrap" title="Needs at least 3 rounds to break">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span className="hidden sm:inline">{3 - speaker.roundsSpoken} More Rd</span>
                            <span className="sm:hidden">+{3 - speaker.roundsSpoken} Rd</span>
                          </span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[11px] font-bold bg-stone-900 text-stone-400 border border-stone-700 whitespace-nowrap">
                          N/A
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredSpeakers.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[#c9b8a7]">
                    <Award className="w-8 h-8 mx-auto text-[#684B35] mb-2" />
                    <p className="font-semibold text-sm">No debaters found matching filters.</p>
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

