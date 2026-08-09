import React, { useState, useMemo } from 'react';
import { Speaker } from '../types';
import { Search, Mic, Award, CheckCircle, AlertTriangle, ArrowUpDown } from 'lucide-react';

interface SpeakersViewProps {
  speakers: Speaker[];
}

export const SpeakersView: React.FC<SpeakersViewProps> = ({ speakers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [breakFilter, setBreakFilter] = useState<'all' | 'eligible' | 'ineligible'>('all');
  const [sortBy, setSortBy] = useState<'avg' | 'points' | 'rounds'>('avg');

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
        return b.averageScore - a.averageScore;
      });
  }, [speakers, searchTerm, breakFilter, sortBy]);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Mic className="w-8 h-8 text-amber-400" />
          <span>Speaker Leaderboard</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Individual debater rankings, speaker points, and AP-ISC break eligibility tracking (Rule 8: Minimum 3 rounds required).
        </p>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="los-glass-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search speaker by name, institution, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={breakFilter}
            onChange={(e) => setBreakFilter(e.target.value as 'all' | 'eligible' | 'ineligible')}
            className="bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="all">All Debaters</option>
            <option value="eligible">Break Eligible (3+ Rounds)</option>
            <option value="ineligible">Needs More Rounds (&lt;3)</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'avg' | 'points' | 'rounds')}
            className="bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400"
          >
            <option value="avg">Sort by Average Score</option>
            <option value="points">Sort by Total Points</option>
            <option value="rounds">Sort by Rounds Spoken</option>
          </select>
        </div>
      </div>

      {/* LEADERBOARD TABLE */}
      <div className="los-glass-card overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1F1A17] text-[#c9b8a7] text-xs font-bold uppercase tracking-wider border-b border-[#684B35]">
                <th className="py-4 px-4 text-center">Rank</th>
                <th className="py-4 px-4">Debater</th>
                <th className="py-4 px-4">Institution & Team</th>
                <th className="py-4 px-4 text-center">Rounds</th>
                <th className="py-4 px-4 text-right">Total Pts</th>
                <th className="py-4 px-4 text-right">Avg Score</th>
                <th className="py-4 px-4 text-center">Break Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#684B35]/40 text-sm">
              {filteredSpeakers.map((speaker, index) => {
                const displayRank = index + 1;
                const isTop3 = displayRank <= 3;

                return (
                  <tr
                    key={speaker.id}
                    className="hover:bg-[#332C24]/60 transition-colors duration-150"
                  >
                    {/* RANK */}
                    <td className="py-3.5 px-4 text-center font-['Orbitron'] font-extrabold">
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
                      {!isTop3 && <span className="text-[#c9b8a7]">#{displayRank}</span>}
                    </td>

                    {/* NAME */}
                    <td className="py-3.5 px-4 font-bold text-[#f5e4cb]">
                      <div className="flex items-center gap-2">
                        <span>{speaker.name}</span>
                        {displayRank === 1 && (
                          <span className="text-[10px] bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Best Speaker
                          </span>
                        )}
                      </div>
                    </td>

                    {/* INSTITUTION & TEAM */}
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-semibold text-[#f5e4cb]">{speaker.teamName}</div>
                      <div className="text-[#c9b8a7]">{speaker.institution}</div>
                    </td>

                    {/* ROUNDS */}
                    <td className="py-3.5 px-4 text-center font-['Orbitron'] font-bold text-[#f5e4cb]">
                      {speaker.roundsSpoken}
                    </td>

                    {/* TOTAL POINTS */}
                    <td className="py-3.5 px-4 text-right font-['Orbitron'] font-bold text-amber-300">
                      {speaker.totalPoints.toFixed(1)}
                    </td>

                    {/* AVG SCORE */}
                    <td className="py-3.5 px-4 text-right font-['Orbitron'] font-black text-emerald-400">
                      {speaker.averageScore.toFixed(2)}
                    </td>

                    {/* BREAK ELIGIBILITY */}
                    <td className="py-3.5 px-4 text-center">
                      {speaker.breakEligible ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-700">
                          <CheckCircle className="w-3 h-3" /> Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-950/80 text-amber-300 border border-amber-700" title="Needs at least 3 rounds to break">
                          <AlertTriangle className="w-3 h-3" /> {3 - speaker.roundsSpoken} More Rd
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredSpeakers.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#c9b8a7]">
                    <Award className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
                    <p className="font-semibold">No debaters found matching filters.</p>
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
