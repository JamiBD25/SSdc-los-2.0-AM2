import React from 'react';
import { Trophy, Swords, MapPin, Crown, Flame } from 'lucide-react';

export const MatchupView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-8 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/50 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-sm">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Knockout Fixtures & Bracket</span>
        </div>
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap text-2xl sm:text-4xl font-extrabold text-[#f5e4cb]">
          <Swords className="w-8 h-8 text-amber-400 shrink-0" />
          <span>Tournament Matchups</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-2xl mx-auto px-2">
          Official Semi-Finals & Grand Final Championship Schedule for SSDC League of Spars Season 2
        </p>
      </div>

      {/* QUICK SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-4xl mx-auto">
        <div className="los-glass-card p-4 text-center border-l-4 border-l-amber-500">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Semi-Final 1</span>
          <p className="font-['Orbitron'] font-black text-sm text-[#f5e4cb] mt-1">Venue 1</p>
          <p className="text-xs text-amber-300 font-semibold mt-0.5">CCPC Q vs CSDS Metaphor</p>
        </div>

        <div className="los-glass-card p-4 text-center border-l-4 border-l-amber-500">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Semi-Final 2</span>
          <p className="font-['Orbitron'] font-black text-sm text-[#f5e4cb] mt-1">Venue 2</p>
          <p className="text-xs text-amber-300 font-semibold mt-0.5">GMHSDS vs DKSDS</p>
        </div>

        <div className="los-glass-card p-4 text-center border-l-4 border-l-yellow-400 bg-gradient-to-br from-amber-950/30 to-transparent">
          <span className="text-[10px] uppercase font-bold text-yellow-400/90 flex items-center justify-center gap-1">
            <Crown className="w-3 h-3 text-yellow-400" />
            <span>Grand Final</span>
          </span>
          <p className="font-['Orbitron'] font-black text-sm text-[#f5e4cb] mt-1">Championship Stage</p>
          <p className="text-xs text-yellow-300 font-semibold mt-0.5">Winner V1 vs Winner V2</p>
        </div>
      </div>

      {/* BRACKET VIEW */}
      <div className="space-y-6">
        <div className="los-glass-card p-4 sm:p-8 relative overflow-x-auto shadow-2xl">
          <div className="min-w-[720px] max-w-5xl mx-auto">
            
            {/* STAGE HEADERS */}
            <div className="grid grid-cols-2 gap-12 sm:gap-20 mb-8 border-b border-[#684B35]/50 pb-3 text-center">
              <div>
                <h3 className="font-['Orbitron'] font-black text-base sm:text-lg text-amber-400 uppercase tracking-wider flex items-center justify-center gap-2">
                  <Swords className="w-4 h-4" />
                  <span>Semi-Finals</span>
                </h3>
                <p className="text-xs text-[#c9b8a7]">2 Matchups &bull; Venue 1 & Venue 2</p>
              </div>
              <div>
                <h3 className="font-['Orbitron'] font-black text-base sm:text-lg text-yellow-400 uppercase tracking-wider flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400/20" />
                  <span>Grand Championship Final</span>
                </h3>
                <p className="text-xs text-[#c9b8a7]">Winner V1 vs Winner V2</p>
              </div>
            </div>

            {/* TOURNAMENT BRACKET TREE */}
            <div className="grid grid-cols-2 gap-12 sm:gap-20 items-center relative">

              {/* LEFT COLUMN: SEMI-FINALS */}
              <div className="space-y-8 relative">
                
                {/* SEMI-FINAL 1 */}
                <div className="relative group">
                  <div className="los-glass-card bg-[#15110e] p-4 rounded-xl border-2 border-amber-500/50 hover:border-amber-400 transition-all shadow-lg space-y-3">
                    
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between border-b border-[#684B35]/40 pb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>Venue 1</span>
                      </span>
                      <span className="text-[11px] font-bold text-[#c9b8a7]">Semi-Final 1</span>
                    </div>

                    {/* TEAMS */}
                    <div className="space-y-2">
                      {/* GOVERNMENT */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1F1915] border border-[#684B35]/60 hover:bg-[#28211c] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-900/60 text-amber-200 border border-amber-700/50 uppercase">
                              GOVERNMENT
                            </span>
                            <span className="font-extrabold text-sm text-[#f5e4cb]">CCPC Q</span>
                          </div>
                          <p className="text-[10px] text-[#8A7A6D]">Chittagong Cantonment Public College</p>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-amber-400 px-2 py-1 rounded bg-[#120f0d] border border-[#684B35]">
                          Government
                        </span>
                      </div>

                      {/* VS DIVIDER */}
                      <div className="text-center text-[10px] font-black tracking-widest text-[#8A7A6D] uppercase py-0.5">
                        &bull; VS &bull;
                      </div>

                      {/* OPPOSITION */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1F1915] border border-[#684B35]/60 hover:bg-[#28211c] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950/80 text-cyan-200 border border-cyan-700/50 uppercase">
                              OPPOSITION
                            </span>
                            <span className="font-extrabold text-sm text-[#f5e4cb]">CSDS Metaphor</span>
                          </div>
                          <p className="text-[10px] text-[#8A7A6D]">Collegiate School Debating Society</p>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-cyan-300 px-2 py-1 rounded bg-[#120f0d] border border-[#684B35]">
                          Opposition
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BRACKET LINE SF1 TO FINAL */}
                  <div className="hidden sm:block absolute right-[-48px] top-1/2 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-[#8B5E3C]" />
                </div>

                {/* SEMI-FINAL 2 */}
                <div className="relative group">
                  <div className="los-glass-card bg-[#15110e] p-4 rounded-xl border-2 border-amber-500/50 hover:border-amber-400 transition-all shadow-lg space-y-3">
                    
                    {/* CARD HEADER */}
                    <div className="flex items-center justify-between border-b border-[#684B35]/40 pb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-400" />
                        <span>Venue 2</span>
                      </span>
                      <span className="text-[11px] font-bold text-[#c9b8a7]">Semi-Final 2</span>
                    </div>

                    {/* TEAMS */}
                    <div className="space-y-2">
                      {/* GOVERNMENT */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1F1915] border border-[#684B35]/60 hover:bg-[#28211c] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-900/60 text-amber-200 border border-amber-700/50 uppercase">
                              GOVERNMENT
                            </span>
                            <span className="font-extrabold text-sm text-[#f5e4cb]">GMHSDS</span>
                          </div>
                          <p className="text-[10px] text-[#8A7A6D]">Govt Muslim High Debating Society</p>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-amber-400 px-2 py-1 rounded bg-[#120f0d] border border-[#684B35]">
                          Government
                        </span>
                      </div>

                      {/* VS DIVIDER */}
                      <div className="text-center text-[10px] font-black tracking-widest text-[#8A7A6D] uppercase py-0.5">
                        &bull; VS &bull;
                      </div>

                      {/* OPPOSITION */}
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1F1915] border border-[#684B35]/60 hover:bg-[#28211c] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950/80 text-cyan-200 border border-cyan-700/50 uppercase">
                              OPPOSITION
                            </span>
                            <span className="font-extrabold text-sm text-[#f5e4cb]">DKSDS</span>
                          </div>
                          <p className="text-[10px] text-[#8A7A6D]">Dr Khastagir School Debating Society</p>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-cyan-300 px-2 py-1 rounded bg-[#120f0d] border border-[#684B35]">
                          Opposition
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BRACKET LINE SF2 TO FINAL */}
                  <div className="hidden sm:block absolute right-[-48px] top-1/2 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-[#8B5E3C]" />
                </div>

              </div>

              {/* RIGHT COLUMN: GRAND FINAL */}
              <div className="relative">
                
                {/* GRAND FINAL CARD */}
                <div className="los-glass-card bg-gradient-to-b from-[#1C1612] to-[#120f0d] p-5 sm:p-6 rounded-2xl border-2 border-yellow-400/90 shadow-2xl space-y-4 relative overflow-hidden">
                  
                  {/* TROPHY GLOW ACCENT */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* CARD HEADER */}
                  <div className="flex items-center justify-between border-b border-amber-600/40 pb-3">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      <div>
                        <h4 className="font-['Orbitron'] font-black text-base text-yellow-300 uppercase">
                          Grand Final
                        </h4>
                        <p className="text-[10px] text-amber-200 font-semibold">Championship Decider</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-yellow-400/20 text-yellow-300 border border-yellow-400/60 shadow-sm flex items-center gap-1">
                      <Crown className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span>Title Match</span>
                    </span>
                  </div>

                  {/* FINALISTS */}
                  <div className="space-y-3">
                    
                    {/* FINALIST 1: VENUE 1 WINNER */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#241D17] to-[#1A1410] border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-between gap-2 shadow">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-black tracking-wider text-amber-400 block">
                          Semi-Final 1 Winner
                        </span>
                        <span className="font-extrabold text-sm sm:text-base text-[#f5e4cb] block">
                          Winner of Venue 1
                        </span>
                        <span className="text-[10px] text-[#a39382] block">
                          (CCPC Q vs CSDS Metaphor)
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-amber-900/40 text-amber-200 border border-amber-700/40">
                        Finalist 1
                      </span>
                    </div>

                    {/* VS BADGE */}
                    <div className="text-center">
                      <span className="px-3 py-0.5 rounded-full text-[10px] font-black bg-[#120f0d] text-amber-300 border border-[#684B35] uppercase tracking-widest inline-block shadow">
                        ⚔️ Championship Clashing ⚔️
                      </span>
                    </div>

                    {/* FINALIST 2: VENUE 2 WINNER */}
                    <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#241D17] to-[#1A1410] border border-amber-500/40 hover:border-amber-400 transition-all flex items-center justify-between gap-2 shadow">
                      <div className="space-y-0.5">
                        <span className="text-[9px] uppercase font-black tracking-wider text-amber-400 block">
                          Semi-Final 2 Winner
                        </span>
                        <span className="font-extrabold text-sm sm:text-base text-[#f5e4cb] block">
                          Winner of Venue 2
                        </span>
                        <span className="text-[10px] text-[#a39382] block">
                          (GMHSDS vs DKSDS)
                        </span>
                      </div>
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-amber-900/40 text-amber-200 border border-amber-700/40">
                        Finalist 2
                      </span>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
