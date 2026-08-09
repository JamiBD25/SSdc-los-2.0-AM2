import React, { useState, useMemo } from 'react';
import { Team } from '../types';
import { Search, Trophy, Shield, Users, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface TeamsViewProps {
  teams: Team[];
  onSelectSpeaker?: (speakerName: string) => void;
}

export const TeamsView: React.FC<TeamsViewProps> = ({ teams }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreakStatus, setSelectedBreakStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rank' | 'wins' | 'points'>('rank');

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

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-amber-400" />
          <span>Participating Teams & Clubs</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Official team rosters, institutional representation, win-loss records, and current AP-ISC standings.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="los-glass-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search by team name, institution, or debater..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          
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
            onChange={(e) => setSortBy(e.target.value as 'rank' | 'wins' | 'points')}
            className="bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="rank">Sort by Rank</option>
            <option value="wins">Sort by Wins</option>
            <option value="points">Sort by Speaker Points</option>
          </select>
        </div>
      </div>

      {/* TEAMS GRID */}
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
                <span className="text-[10px] text-[#8A7A6D]">Min 5 debaters required</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {team.roster.map((debater, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-[#120f0d] border border-[#684B35]/60 text-xs font-medium text-[#f5e4cb] hover:border-amber-400 transition-colors cursor-default"
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

    </div>
  );
};
