import React, { useState, useMemo } from 'react';
import { Team } from '../types';
import { Search, Trophy, Shield, Users, CheckCircle, AlertCircle, XCircle, Table as TableIcon, LayoutGrid, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface TeamsViewProps {
  teams: Team[];
  onSelectSpeaker?: (speakerName: string) => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreakStatus, setSelectedBreakStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'wins' | 'points' | 'margin'>('rank');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);

  const filteredTeams = useMemo(() => {
    return teams
      .filter((team) => {
        const matchesSearch =
          team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
          team.roster.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
          selectedBreakStatus === 'all' || team.breakStatus === selectedBreakStatus;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'wins') return b.win - a.win || b.totalSpeakerPoints - a.totalSpeakerPoints;
        if (sortBy === 'points') return b.totalSpeakerPoints - a.totalSpeakerPoints;
        if (sortBy === 'margin') return b.netMargin - a.netMargin;
        return a.rank - b.rank;
      });
  }, [teams, searchTerm, selectedBreakStatus, sortBy]);

  const getBreakBadge = (status: Team['breakStatus']) => {
    switch (status) {
      case 'Qualified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700">
            <CheckCircle className="w-3.5 h-3.5" /> Qualified
          </span>
        );
      case 'Contending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-300 border border-amber-700">
            <AlertCircle className="w-3.5 h-3.5" /> Contending
          </span>
        );
      case 'Eliminated':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-stone-900 text-stone-400 border border-stone-700">
            <XCircle className="w-3.5 h-3.5" /> Eliminated
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
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-amber-400" />
          <span>Participating Teams & League Standings Table</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Official team rosters, institutional representation, win-loss records, and current AP-ISC standings data.
        </p>
      </div>

      {/* QUICK SUMMARY CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="los-glass-card p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Total Teams</span>
          <span className="block font-['Orbitron'] font-black text-xl text-amber-300">{teams.length}</span>
        </div>
        <div className="los-glass-card p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Qualified Teams</span>
          <span className="block font-['Orbitron'] font-black text-xl text-emerald-400">
            {teams.filter((t) => t.breakStatus === 'Qualified').length}
          </span>
        </div>
        <div className="los-glass-card p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Contending</span>
          <span className="block font-['Orbitron'] font-black text-xl text-amber-400">
            {teams.filter((t) => t.breakStatus === 'Contending').length}
          </span>
        </div>
        <div className="los-glass-card p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Avg Speaker Pts</span>
          <span className="block font-['Orbitron'] font-black text-xl text-[#f5e4cb]">
            {teams.length > 0 && teams.some((t) => t.totalSpeakerPoints > 0)
              ? (teams.reduce((acc, t) => acc + t.totalSpeakerPoints, 0) / teams.length).toFixed(1)
              : 'N/A'}
          </span>
        </div>
      </div>

      {/* SEARCH, FILTERS & VIEW MODE CONTROLS */}
      <div className="los-glass-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search team, institution, debater..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        {/* Filter & Sort & Export Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Status Filter */}
          <select
            value={selectedBreakStatus}
            onChange={(e) => setSelectedBreakStatus(e.target.value)}
            className="bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Break Statuses</option>
            <option value="Qualified">Qualified</option>
            <option value="Contending">Contending</option>
            <option value="Eliminated">Eliminated</option>
          </select>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'wins' | 'points' | 'margin')}
            className="bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="rank">Sort by Rank</option>
            <option value="wins">Sort by Wins</option>
            <option value="points">Sort by Speaker Points</option>
            <option value="margin">Sort by Net Margin</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex bg-[#120f0d] p-1 rounded-xl border border-[#684B35]">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'table' ? 'bg-[#8B5E3C] text-white' : 'text-[#c9b8a7] hover:text-white'
              }`}
              title="Table View"
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid' ? 'bg-[#8B5E3C] text-white' : 'text-[#c9b8a7] hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>

          {/* CSV Export */}
          <button
            onClick={handleExportCSV}
            className="px-3 py-2 bg-[#120f0d] hover:bg-[#8B5E3C] text-[#f5e4cb] hover:text-white border border-[#684B35] rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all"
            title="Download CSV Table"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: DATA TABLE VIEW */}
      {viewMode === 'table' ? (
        <div className="los-glass-card overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1F1A17] text-[#c9b8a7] text-xs font-bold uppercase tracking-wider border-b border-[#684B35]">
                  <th className="py-4 px-4 text-center">Rank</th>
                  <th className="py-4 px-4">Team Name</th>
                  <th className="py-4 px-4">Institution</th>
                  <th className="py-4 px-4 text-center">Record</th>
                  <th className="py-4 px-4 text-right">Speaker Pts</th>
                  <th className="py-4 px-4 text-right">Net Margin</th>
                  <th className="py-4 px-4 text-center">Break Status</th>
                  <th className="py-4 px-4 text-center">Roster</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#684B35]/40 text-sm">
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
                        <td className="py-3.5 px-4 text-center font-['Orbitron'] font-extrabold">
                          {hasPlayed ? (
                            <>
                              {displayRank === 1 && (
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400">
                                  🥇
                                </span>
                              )}
                              {displayRank === 2 && (
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300">
                                  🥈
                                </span>
                              )}
                              {displayRank === 3 && (
                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-500 border border-amber-600">
                                  🥉
                                </span>
                              )}
                              {displayRank > 3 && <span className="text-[#c9b8a7]">#{displayRank}</span>}
                            </>
                          ) : (
                            <span className="text-[#8A7A6D] text-xs font-semibold">N/A</span>
                          )}
                        </td>

                        {/* TEAM NAME */}
                        <td className="py-3.5 px-4 font-bold text-[#f5e4cb]">
                          <div>{team.name}</div>
                          <span className="text-[10px] text-[#8A7A6D] font-mono">ID: {team.id}</span>
                        </td>

                        {/* INSTITUTION */}
                        <td className="py-3.5 px-4 text-xs font-semibold text-[#e2d0ba]">
                          {team.institution}
                        </td>

                        {/* RECORD */}
                        <td className="py-3.5 px-4 text-center font-['Orbitron'] font-extrabold text-amber-300">
                          {hasPlayed ? `${team.win}W - ${team.loss}L` : '0W - 0L'}
                          <span className="block text-[10px] font-normal text-[#8A7A6D]">
                            {hasPlayed ? `${winPct}% Win Rate` : 'N/A'}
                          </span>
                        </td>

                        {/* SPEAKER PTS */}
                        <td className="py-3.5 px-4 text-right font-['Orbitron'] font-bold text-[#f5e4cb]">
                          {hasPlayed ? team.totalSpeakerPoints.toFixed(1) : 'N/A'}
                        </td>

                        {/* NET MARGIN */}
                        <td
                          className={`py-3.5 px-4 text-right font-['Orbitron'] font-bold ${
                            !hasPlayed ? 'text-[#8A7A6D]' : team.netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {hasPlayed ? (team.netMargin >= 0 ? `+${team.netMargin}` : team.netMargin) : 'N/A'}
                        </td>

                        {/* BREAK STATUS */}
                        <td className="py-3.5 px-4 text-center">
                          {getBreakBadge(team.breakStatus)}
                        </td>

                        {/* ROSTER TOGGLE */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => setExpandedTeamId(isExpanded ? null : team.id)}
                            className="px-2.5 py-1 bg-[#120f0d] hover:bg-[#8B5E3C] text-xs text-[#f5e4cb] border border-[#684B35] rounded-lg transition-colors inline-flex items-center gap-1 font-semibold"
                          >
                            <Users className="w-3.5 h-3.5 text-amber-400" />
                            <span>{team.roster.length}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </td>
                      </tr>

                      {/* EXPANDABLE ROSTER DETAIL ROW */}
                      {isExpanded && (
                        <tr className="bg-[#120f0d]/90 border-b border-[#684B35]/40">
                          <td colSpan={8} className="p-4">
                            <div className="space-y-2 max-w-3xl mx-auto bg-[#1F1A17] p-3 rounded-xl border border-[#684B35]/60">
                              <span className="text-xs font-bold text-amber-300 block">
                                Registered Debaters Roster for {team.name}:
                              </span>
                              <div className="flex flex-wrap gap-2">
                                {team.roster.map((debater, dIdx) => (
                                  <span
                                    key={dIdx}
                                    className="px-3 py-1 bg-[#120f0d] text-xs text-[#f5e4cb] font-medium border border-[#684B35] rounded-lg flex items-center gap-1.5"
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
                    <td colSpan={8} className="py-12 text-center text-[#c9b8a7]">
                      <Trophy className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
                      <p className="font-semibold text-base">No teams found matching search filters.</p>
                      <p className="text-xs text-[#8A7A6D]">Try clearing search or filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: CARDS GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="los-glass-card p-5 space-y-4 hover:border-amber-400 transition-all duration-300 relative group"
            >
              {/* TOP HEADER */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#684B35]/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8B5E3C]/30 border border-[#8B5E3C] flex items-center justify-center font-['Orbitron'] font-black text-amber-300 text-base shadow">
                    #{team.rank}
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-[#f5e4cb] group-hover:text-amber-200 transition-colors">
                      {team.name}
                    </h3>
                    <p className="text-xs text-[#c9b8a7] font-medium">{team.institution}</p>
                  </div>
                </div>

                <div>{getBreakBadge(team.breakStatus)}</div>
              </div>

              {/* PERFORMANCE METRICS */}
              <div className="grid grid-cols-3 gap-2 bg-[#120f0d] p-3 rounded-xl border border-[#684B35]/40 text-center">
                <div>
                  <span className="block text-[10px] text-[#8A7A6D] uppercase font-bold">Record</span>
                  <span className="font-['Orbitron'] font-extrabold text-sm text-amber-300">
                    {team.win}W - {team.loss}L
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] text-[#8A7A6D] uppercase font-bold">Speaker Pts</span>
                  <span className="font-['Orbitron'] font-extrabold text-sm text-[#f5e4cb]">
                    {team.totalSpeakerPoints.toFixed(1)}
                  </span>
                </div>

                <div>
                  <span className="block text-[10px] text-[#8A7A6D] uppercase font-bold">Net Margin</span>
                  <span
                    className={`font-['Orbitron'] font-extrabold text-sm ${
                      team.netMargin >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {team.netMargin >= 0 ? `+${team.netMargin}` : team.netMargin}
                  </span>
                </div>
              </div>

              {/* ROSTER MEMBERS */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#c9b8a7] mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-amber-400" /> Team Roster ({team.roster.length} debaters)
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {team.roster.map((debater, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#120f0d] border border-[#684B35]/60 text-xs font-medium text-[#f5e4cb]"
                    >
                      {debater}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredTeams.length === 0 && (
            <div className="col-span-full los-glass-card p-12 text-center text-[#c9b8a7]">
              <Trophy className="w-12 h-12 mx-auto text-[#684B35] mb-2" />
              <p className="font-semibold text-lg">No teams match your search filters.</p>
              <p className="text-xs text-[#8A7A6D]">Try clearing search or changing status filter.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

