import React, { useState } from 'react';
import { Adjudicator } from '../types';
import { Gavel, Star, Search, ShieldCheck, Award } from 'lucide-react';

interface AdjudicatorsViewProps {
  adjudicators: Adjudicator[];
}

export const AdjudicatorsView: React.FC<AdjudicatorsViewProps> = ({ adjudicators }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdjudicators = adjudicators.filter(
    (adj) =>
      adj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap">
          <Gavel className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>Tournament Adjudication Core</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-xl mx-auto px-2">
          Distinguished adjudication panel presiding over League of Spars Season 2 prelims and finals.
        </p>
      </div>

      {/* SEARCH */}
      <div className="los-glass-card p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#c9b8a7]" />
        <input
          type="text"
          placeholder="Search adjudicator by name, institution, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] px-4 py-2 rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
        />
      </div>

      {/* ADJUDICATOR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAdjudicators.map((adj) => (
          <div
            key={adj.id}
            className="los-glass-card p-5 space-y-4 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-lg text-[#f5e4cb]">{adj.name}</h3>
                  <p className="text-xs text-[#c9b8a7] font-medium">{adj.institution}</p>
                </div>
                
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                    adj.role.includes('Chief')
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400'
                      : adj.role.includes('Deputy')
                      ? 'bg-amber-800/30 text-amber-200 border-amber-600'
                      : 'bg-stone-800/80 text-stone-300 border-stone-600'
                  }`}
                >
                  {adj.role}
                </span>
              </div>

              <p className="text-xs text-[#e2d0ba] leading-relaxed line-clamp-3 bg-[#120f0d]/60 p-3 rounded-lg border border-[#684B35]/30">
                "{adj.bio}"
              </p>
            </div>

            {/* METRICS */}
            <div className="pt-3 border-t border-[#684B35]/40 flex items-center justify-between text-xs font-semibold text-[#c9b8a7]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>{adj.roundsJudged} Rounds Judged</span>
              </div>

              <div className="flex items-center gap-1 text-amber-300 font-['Orbitron'] font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{adj.rating.toFixed(1)} / 5.0</span>
              </div>
            </div>

          </div>
        ))}

        {filteredAdjudicators.length === 0 && (
          <div className="col-span-full los-glass-card p-12 text-center text-[#c9b8a7]">
            <Award className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
            <p className="font-semibold">No adjudicators found matching your search.</p>
          </div>
        )}
      </div>

    </div>
  );
};
