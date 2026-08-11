import React, { useState, useMemo } from 'react';
import { Team } from '../types';
import { Search, Trophy, Shield, Users, CheckCircle, AlertCircle, XCircle, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamsViewProps {
  teams: Team[];
  onSelectSpeaker?: (speakerName: string) => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreakStatus, setSelectedBreakStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'wins' | 'points' | 'margin'>('rank');
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const filteredTeams = useMemo(() => {
    return teams
      .filter((team) => {
        const matchesSearch =
          team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.roster.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
          selectedBreakStatus === 'all' ||
          (selectedBreakStatus === 'N/A'
            ? team.breakStatus === 'N/A' || (team.win === 0 && team.loss === 0)
            : team.breakStatus === selectedBreakStatus);

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'wins') return b.win - a.win || b.totalSpeakerPoints - a.totalSpeakerPoints;
        if (sortBy === 'points') return b.totalSpeakerPoints - a.totalSpeakerPoints;
        if (sortBy === 'margin') return b.netMargin - a.netMargin;
        return a.rank - b.rank;
      });
  }, [teams, searchTerm, selectedBreakStatus, sortBy]);

  const getBreakBadge = (status: Team['breakStatus'], hasPlayed: boolean = true) => {
    if (!hasPlayed || status === 'N/A') {
      return (
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-stone-900 text-stone-400 border border-stone-700 whitespace-nowrap">
          <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 text-stone-500" />
          <span>N/A</span>
        </span>
      );
    }
    switch (status) {
      case 'Qualified':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700 whitespace-nowrap">
            <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden sm:inline">Qualified</span>
            <span className="sm:hidden">Qual</span>
          </span>
        );
      case 'Contending':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700 whitespace-nowrap">
            <AlertCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden sm:inline">Contending</span>
            <span className="sm:hidden">Cont</span>
          </span>
        );
      case 'Eliminated':
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold bg-stone-900 text-stone-400 border border-stone-700 whitespace-nowrap">
            <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="hidden sm:inline">Eliminated</span>
            <span className="sm:hidden">Elim</span>
          </span>
        );
    }
  };

  const handleExportCSV = () => {
    const headers = ['Rank', 'Team Name', 'Institution', 'Wins', 'Losses', 'Win Rate %', 'Total Speaker Points', 'Net Margin', 'Break Status', 'Roster'];
    const rows = filteredTeams.map((t) => {
      const totalGames = t.win + t.loss;
      const winRate = totalGames > 0 ? ((t.win / totalGames) * 100).toFixed(1) + '%' : '0%';
      return [
        t.rank,
        `"${t.name.replace(/"/g, '""')}"`,
        `"${t.institution.replace(/"/g, '""')}"`,
        t.win,
        t.loss,
        winRate,
        t.totalSpeakerPoints,
        t.netMargin,
        t.breakStatus,
        `"${t.roster.join(', ').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'SSDC_LoS_S2_Teams_Data_Table.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-2 sm:px-6 space-y-5 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-1.5">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap">
          <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>Participating Teams & Standings</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-xl mx-auto px-2">
          Official team rosters, institutional representation, win-loss records, and AP-ISC standings.
        </p>
      </div>

      {/* QUICK SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <div className="los-glass-card p-2.5 sm:p-3.5 text-center">
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#8A7A6D]">Total Teams</span>
          <span className="block font-['Orbitron'] font-black text-base sm:text-xl text-amber-300">{teams.length}</span>
        </div>
        <div className="los-glass-card p-2.5 sm:p-3.5 text-center">
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#8A7A6D]">Qualified Teams</span>
          <span className="block font-['Orbitron'] font-black text-base sm:text-xl text-emerald-400">
            {teams.filter((t) => t.breakStatus === 'Qualified').length}
          </span>
        </div>
        <div className="los-glass-card p-2.5 sm:p-3.5 text-center">
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#8A7A6D]">Contending</span>
          <span className="block font-['Orbitron'] font-black text-base sm:text-xl text-amber-400">
            {teams.filter((t) => t.breakStatus === 'Contending').length}
          </span>
        </div>
        <div className="los-glass-card p-2.5 sm:p-3.5 text-center">
          <span className="text-[9px] sm:text-[10px] uppercase font-bold text-[#8A7A6D]">Avg Speaker Pts</span>
          <span className="block font-['Orbitron'] font-black text-base sm:text-xl text-[#f5e4cb]">
            {teams.length > 0 && teams.some((t) => t.totalSpeakerPoints > 0)
              ? (teams.reduce((acc, t) => acc + t.totalSpeakerPoints, 0) / teams.length).toFixed(1)
              : 'N/A'}
          </span>
        </div>
      </div>

      {/* SEARCH & FILTERS CONTROLS */}
      <div className="los-glass-card p-3 sm:p-5 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-between gap-2.5 sm:gap-4 max-w-full">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-0 sm:min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search team, institution, debater..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[#120f0d] text-xs sm:text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        {/* Filter & Sort & Export Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          
          {/* Status Filter */}
          <select
            value={selectedBreakStatus}
            onChange={(e) => setSelectedBreakStatus(e.target.value)}
            className="flex-1 sm:flex-none bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-2 py-1.5 sm:py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Statuses</option>
            <option value="Qualified">Qualified</option>
            <option value="Contending">Contending</option>
            <option value="Eliminated">Eliminated</option>
            <option value="N/A">N/A (Pending)</option>
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'wins' | 'points' | 'margin')}
            className="flex-1 sm:flex-none bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-2 py-1.5 sm:py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="rank">Sort by Rank</option>
            <option value="wins">Sort by Wins</option>
            <option value="points">Sort by Points</option>
            <option value="margin">Sort by Margin</option>
          </select>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="px-2.5 py-1.5 sm:py-2 bg-[#120f0d] hover:bg-[#8B5E3C] text-[#f5e4cb] hover:text-white border border-[#684B35] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Download CSV Table"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* SOLE COMPONENT: FULLY RESPONSIVE TEAMS DATA TABLE (NO HORIZONTAL SCROLL NEEDED) */}
      <div className="los-glass-card overflow-hidden shadow-2xl max-w-full">
        <div className="w-full overflow-x-hidden">
          <table className="w-full text-left border-collapse table-auto">
            <thead>
              <tr className="bg-[#1F1A17] text-[#c9b8a7] text-[10px] sm:text-xs font-bold uppercase tracking-wider border-b border-[#684B35]">
                <th className="py-2.5 px-1.5 sm:px-3 text-center w-[10%] sm:w-auto">#</th>
                <th className="py-2.5 px-1.5 sm:px-3">Team</th>
                <th className="py-2.5 px-3 hidden md:table-cell">Institution</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-center">W-L</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-right">Pts</th>
                <th className="py-2.5 px-3 text-right hidden sm:table-cell">Margin</th>
                <th className="py-2.5 px-1.5 sm:px-3 text-center">Status</th>
                <th className="py-2.5 px-1 sm:px-3 text-center">Roster</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#684B35]/40 text-xs sm:text-sm">
              {filteredTeams.map((team, idx) => {
                const isExpanded = expandedTeamId === team.id;
                const displayRank = idx + 1;
                const totalGames = team.win + team.loss;
                const winPct = totalGames > 0 ? Math.round((team.win / totalGames) * 100) : 0;
                const hasPlayed = totalGames > 0 || team.totalSpeakerPoints > 0;

                return (
                  <React.Fragment key={team.id}>
                    <tr className="hover:bg-[#332C24]/60 transition-colors duration-150">
                      {/* RANK */}
                      <td className="py-2.5 px-1 sm:px-3 text-center font-['Orbitron'] font-extrabold text-[11px] sm:text-sm">
                        {hasPlayed ? (
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

                      {/* TEAM NAME & INSTITUTION (NESTED ON MOBILE) */}
                      <td className="py-2.5 px-1.5 sm:px-3 font-bold text-[#f5e4cb]">
                        <div className="text-[11px] sm:text-sm leading-tight break-words">{team.name}</div>
                        <div className="text-[9px] sm:text-xs text-[#c9b8a7] md:hidden font-normal truncate max-w-[120px] sm:max-w-none">
                          {team.institution}
                        </div>
                      </td>

                      {/* INSTITUTION (DESKTOP) */}
                      <td className="py-2.5 px-3 text-xs font-semibold text-[#e2d0ba] hidden md:table-cell">
                        {team.institution}
                      </td>

                      {/* RECORD */}
                      <td className="py-2.5 px-1 sm:px-3 text-center font-['Orbitron'] font-extrabold text-[#f5e4cb] whitespace-nowrap">
                        <span className="text-[11px] sm:text-sm text-amber-300">
                          {hasPlayed ? `${team.win}W-${team.loss}L` : '0W-0L'}
                        </span>
                        <span className="block text-[8px] sm:text-[10px] font-normal text-[#8A7A6D] hidden sm:block">
                          {hasPlayed ? `${winPct}% Win` : 'N/A'}
                        </span>
                      </td>

                      {/* SPEAKER PTS & MARGIN (NESTED ON MOBILE) */}
                      <td className="py-2.5 px-1.5 sm:px-3 text-right font-['Orbitron'] font-bold text-[#f5e4cb] whitespace-nowrap">
                        <div className="text-[11px] sm:text-sm">
                          {hasPlayed ? team.totalSpeakerPoints.toFixed(1) : 'N/A'}
                        </div>
                        <div className={`sm:hidden text-[9px] font-medium ${
                          !hasPlayed ? 'text-[#8A7A6D]' : team.netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}>
                          {hasPlayed ? (team.netMargin >= 0 ? `+${team.netMargin}` : team.netMargin) : ''}
                        </div>
                      </td>

                      {/* NET MARGIN (DESKTOP) */}
                      <td
                        className={`py-2.5 px-3 text-right font-['Orbitron'] font-bold hidden sm:table-cell text-xs sm:text-sm ${
                          !hasPlayed ? 'text-[#8A7A6D]' : team.netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {hasPlayed ? (team.netMargin >= 0 ? `+${team.netMargin}` : team.netMargin) : 'N/A'}
                      </td>

                      {/* BREAK STATUS */}
                      <td className="py-2.5 px-1 sm:px-3 text-center">
                        {getBreakBadge(team.breakStatus, hasPlayed)}
                      </td>

                      {/* ROSTER TOGGLE */}
                      <td className="py-2.5 px-1 sm:px-3 text-center">
                        <button
                          onClick={() => setExpandedTeamId(isExpanded ? null : team.id)}
                          className="px-1.5 py-0.5 sm:px-2.5 sm:py-1 bg-[#120f0d] hover:bg-[#8B5E3C] text-[10px] sm:text-xs text-[#f5e4cb] border border-[#684B35] rounded-lg transition-colors inline-flex items-center gap-0.5 sm:gap-1 font-semibold"
                          title="View Debaters Roster"
                        >
                          <Users className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{team.roster.length}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3 shrink-0" /> : <ChevronDown className="w-3 h-3 shrink-0" />}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDABLE ROSTER DETAIL ROW */}
                    {isExpanded && (
                      <tr className="bg-[#120f0d]/90 border-b border-[#684B35]/40">
                        <td colSpan={8} className="p-3">
                          <div className="space-y-1.5 max-w-3xl mx-auto bg-[#1F1A17] p-2.5 rounded-xl border border-[#684B35]/60">
                            <span className="text-xs font-bold text-amber-300 block">
                              Debaters Roster ({team.name}):
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {team.roster.map((debater, dIdx) => (
                                <span
                                  key={dIdx}
                                  className="px-2 py-0.5 sm:px-3 sm:py-1 bg-[#120f0d] text-[11px] sm:text-xs text-[#f5e4cb] font-medium border border-[#684B35] rounded-lg flex items-center gap-1"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                  {debater}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {filteredTeams.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-[#c9b8a7]">
                    <Trophy className="w-8 h-8 mx-auto text-[#684B35] mb-2" />
                    <p className="font-semibold text-sm">No teams found matching search filters.</p>
                    <p className="text-xs text-[#8A7A6D]">Try clearing search or status filter.</p>
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

