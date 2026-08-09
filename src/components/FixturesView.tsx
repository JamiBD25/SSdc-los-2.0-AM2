import React, { useState } from 'react';
import { MatchFixture } from '../types';
import { Calendar, Search, EyeOff, CheckCircle2, Clock, MessageSquare, AlertCircle } from 'lucide-react';

interface FixturesViewProps {
  fixtures: MatchFixture[];
}

export const FixturesView: React.FC<FixturesViewProps> = ({ fixtures }) => {
  const [selectedRound, setSelectedRound] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const rounds = (Array.from(new Set(fixtures.map((f) => f.round))) as number[]).sort((a, b) => a - b);

  const filteredFixtures = fixtures.filter((f) => {
    const matchesRound = selectedRound === 'all' || f.round === selectedRound;
    const matchesSearch =
      f.govTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.oppTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.govInstitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.oppInstitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.motion && f.motion.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesRound && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Calendar className="w-8 h-8 text-amber-400" />
          <span>Match Schedule & Fixtures</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Official AP-ISC round pairings, motion releases, Discord channel allocations, and match results.
        </p>
      </div>

      {/* ROUND SELECTOR TABS & SEARCH */}
      <div className="los-glass-card p-4 sm:p-5 space-y-4">
        
        {/* Round Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedRound('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedRound === 'all'
                ? 'bg-[#8B5E3C] text-white border border-[#A97142] shadow-md'
                : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white border border-[#684B35]/50'
            }`}
          >
            All Rounds
          </button>

          {rounds.map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRound(r)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedRound === r
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142] shadow-md'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white border border-[#684B35]/50'
              }`}
            >
              <span>Round {r}</span>
              {r === 4 && <span className="text-[10px] bg-purple-900 text-purple-200 px-1.5 py-0.2 rounded-full">Silent</span>}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search fixtures by team name, institution, or motion keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>
      </div>

      {/* FIXTURE CARDS */}
      <div className="space-y-4">
        {filteredFixtures.map((fixture) => (
          <div
            key={fixture.id}
            className={`los-glass-card p-5 sm:p-6 space-y-4 border-l-4 transition-all duration-300 ${
              fixture.isSilentWeek
                ? 'border-purple-500 bg-purple-950/20'
                : fixture.status === 'Completed'
                ? 'border-emerald-600'
                : 'border-amber-500'
            }`}
          >
            {/* CARD TOP INFO */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#684B35]/40 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-['Orbitron'] font-extrabold text-amber-300 text-sm">
                  {fixture.roundName}
                </span>

                {fixture.isSilentWeek && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-900/90 text-purple-200 border border-purple-500">
                    <EyeOff className="w-3 h-3" /> Silent Week (Rule 6)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 text-[#c9b8a7] font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {fixture.dateTime}
                </span>

                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#120f0d] border border-[#684B35]/60 text-amber-200">
                  <MessageSquare className="w-3 h-3" />
                  {fixture.channel}
                </span>
              </div>
            </div>

            {/* TEAMS VS MATCHUP */}
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              
              {/* GOV TEAM */}
              <div className="md:col-span-5 bg-[#120f0d] p-4 rounded-xl border border-[#684B35]/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-0.5">
                    Government
                  </span>
                  <h4 className="font-bold text-base text-[#f5e4cb]">{fixture.govTeam}</h4>
                  <p className="text-xs text-[#c9b8a7]">{fixture.govInstitution}</p>
                </div>

                {!fixture.isSilentWeek && fixture.status === 'Completed' && (
                  <div className="text-right">
                    <span className="font-['Orbitron'] font-extrabold text-lg text-amber-300">
                      {fixture.govPoints?.toFixed(1) || '-'}
                    </span>
                    {fixture.winner === 'Government' && (
                      <span className="block text-[10px] font-extrabold text-emerald-400 uppercase">
                        Winner
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* VS BADGE */}
              <div className="md:col-span-1 text-center">
                <span className="inline-block w-8 h-8 rounded-full bg-[#8B5E3C]/40 border border-[#8B5E3C] leading-8 font-['Orbitron'] font-black text-amber-300 text-xs">
                  VS
                </span>
              </div>

              {/* OPP TEAM */}
              <div className="md:col-span-5 bg-[#120f0d] p-4 rounded-xl border border-[#684B35]/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block mb-0.5">
                    Opposition
                  </span>
                  <h4 className="font-bold text-base text-[#f5e4cb]">{fixture.oppTeam}</h4>
                  <p className="text-xs text-[#c9b8a7]">{fixture.oppInstitution}</p>
                </div>

                {!fixture.isSilentWeek && fixture.status === 'Completed' && (
                  <div className="text-right">
                    <span className="font-['Orbitron'] font-extrabold text-lg text-amber-300">
                      {fixture.oppPoints?.toFixed(1) || '-'}
                    </span>
                    {fixture.winner === 'Opposition' && (
                      <span className="block text-[10px] font-extrabold text-emerald-400 uppercase">
                        Winner
                      </span>
                    )}
                  </div>
                )}
              </div>

            </div>

            {/* MOTION RELEASE OR SILENT NOTICE */}
            <div className="pt-2">
              {fixture.isSilentWeek ? (
                <div className="bg-purple-950/40 p-3 rounded-xl border border-purple-800/60 text-xs text-purple-200 flex items-center gap-2">
                  <EyeOff className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>
                    <b>Silent Week Protocol:</b> Debates are conducted normally, but round results and scores are hidden until the conclusion of the league.
                  </span>
                </div>
              ) : fixture.motion ? (
                <div className="bg-[#120f0d]/80 p-3.5 rounded-xl border border-[#684B35]/40 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400">
                    Official Motion
                  </span>
                  <p className="text-sm italic font-medium text-[#f5e4cb] leading-relaxed">
                    "{fixture.motion}"
                  </p>
                </div>
              ) : (
                <div className="bg-[#120f0d]/40 p-3 rounded-xl text-xs text-[#c9b8a7] italic flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Motion will be released 15 minutes prior to debate start time on Discord.</span>
                </div>
              )}
            </div>

          </div>
        ))}

        {filteredFixtures.length === 0 && (
          <div className="los-glass-card p-12 text-center text-[#c9b8a7]">
            <Calendar className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
            <p className="font-semibold text-lg">No fixtures match selected filters.</p>
          </div>
        )}
      </div>

    </div>
  );
};
