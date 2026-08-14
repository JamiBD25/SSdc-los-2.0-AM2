import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { Trophy, Calendar, Users, Mic, ChevronRight, Award } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  // Target tournament date: August 14, 2026 Grand Final
  const targetDate = new Date('2026-08-14T10:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero relative overflow-hidden">
      {/* COVER IMAGE - FULLY VISIBLE & UNCUT */}
      <div className="cover relative w-full max-w-7xl mx-auto px-2 sm:px-4 pt-2 sm:pt-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#684B35]/70 bg-[#0a0807]">
          <img
            src="https://i.postimg.cc/T17MH27K/Cover-2.png"
            alt="League of Spars Season 2 Cover Banner"
            className="w-full h-auto object-contain block max-w-full"
          />
        </div>
      </div>

      {/* OVERLAY CONTENT PANEL */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-4 sm:mt-6 relative z-10 pb-6 w-full">
        <div className="los-glass-card p-4 sm:p-8 text-center border-t-2 border-[#A97142] max-w-full">
          
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/60 text-[10px] sm:text-xs font-black text-yellow-300 tracking-wider uppercase shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span>Champion: GMHSDS &bull; MVP: Saadmaan Sarar</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5E3C]/30 border border-[#8B5E3C] text-[10px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>AP ISC Format</span>
            </div>
          </div>

          <h1 className="font-['Orbitron'] text-xl sm:text-4xl md:text-5xl font-black text-[#f5e4cb] tracking-wide mb-2 uppercase drop-shadow-md break-words">
            League of Spars <span className="text-[#A97142]">Season 2</span>
          </h1>

          <p className="text-xs sm:text-base text-[#e2d0ba] max-w-2xl mx-auto mb-6 leading-relaxed">
            The premier institutional debate league of Chattogram organized by SSDC. 
            16+ top school & college debate clubs battling for supreme dominance.
          </p>

          {/* COUNTDOWN CLOCK */}
          <div className="mb-8 w-full">
            <p className="text-[11px] sm:text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5 text-center">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" /> League Grand Final Countdown (August 14, 2026)
            </p>

            <div className="grid grid-cols-4 sm:flex justify-center items-center gap-1.5 sm:gap-4 text-[#f5e4cb] max-w-full">
              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-1.5 sm:px-5 py-2 sm:py-2.5 min-w-0 sm:min-w-[70px] shadow-inner text-center">
                <span className="font-['Orbitron'] font-bold text-lg sm:text-3xl text-amber-400">
                  {timeLeft.days}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-[#c9b8a7] uppercase tracking-wider">Days</span>
              </div>

              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-1.5 sm:px-5 py-2 sm:py-2.5 min-w-0 sm:min-w-[70px] shadow-inner text-center">
                <span className="font-['Orbitron'] font-bold text-lg sm:text-3xl text-amber-400">
                  {timeLeft.hours}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-[#c9b8a7] uppercase tracking-wider">Hours</span>
              </div>

              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-1.5 sm:px-5 py-2 sm:py-2.5 min-w-0 sm:min-w-[70px] shadow-inner text-center">
                <span className="font-['Orbitron'] font-bold text-lg sm:text-3xl text-amber-400">
                  {timeLeft.minutes}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-[#c9b8a7] uppercase tracking-wider">Mins</span>
              </div>

              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-1.5 sm:px-5 py-2 sm:py-2.5 min-w-0 sm:min-w-[70px] shadow-inner text-center">
                <span className="font-['Orbitron'] font-bold text-lg sm:text-3xl text-amber-400">
                  {timeLeft.seconds}
                </span>
                <span className="block text-[9px] sm:text-[10px] text-[#c9b8a7] uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>

          {/* QUICK STATS TICKER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-[#120f0d]/70 p-2.5 sm:p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-2 sm:gap-3 text-left">
              <div className="p-2 sm:p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400 shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-['Orbitron'] font-bold text-sm sm:text-lg text-[#f5e4cb] block truncate">100+</span>
                <p className="text-[10px] sm:text-[11px] text-[#c9b8a7] font-medium truncate">Debaters Enrolled</p>
              </div>
            </div>

            <div className="bg-[#120f0d]/70 p-2.5 sm:p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-2 sm:gap-3 text-left">
              <div className="p-2 sm:p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400 shrink-0">
                <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-['Orbitron'] font-bold text-sm sm:text-lg text-[#f5e4cb] block truncate">150+</span>
                <p className="text-[10px] sm:text-[11px] text-[#c9b8a7] font-medium truncate">Scheduled Debates</p>
              </div>
            </div>

            <div className="bg-[#120f0d]/70 p-2.5 sm:p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-2 sm:gap-3 text-left">
              <div className="p-2 sm:p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400 shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-['Orbitron'] font-bold text-sm sm:text-lg text-[#f5e4cb] block truncate">AP-ISC</span>
                <p className="text-[10px] sm:text-[11px] text-[#c9b8a7] font-medium truncate">League Format</p>
              </div>
            </div>

            <div className="bg-[#120f0d]/70 p-2.5 sm:p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-2 sm:gap-3 text-left">
              <div className="p-2 sm:p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400 shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-['Orbitron'] font-bold text-sm sm:text-lg text-[#f5e4cb] block truncate">May-Aug</span>
                <p className="text-[10px] sm:text-[11px] text-[#c9b8a7] font-medium truncate">2026 Season</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 w-full">
            <button
              onClick={() => setActiveTab('teams')}
              className="prep-btn w-full sm:w-auto"
            >
              <span>View Teams & Points Table</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
            </button>

            <button
              onClick={() => setActiveTab('speakers')}
              className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-[#1F1A17] hover:bg-[#332C24] text-[#f5e4cb] font-bold text-xs sm:text-sm border border-[#684B35] transition-all flex items-center justify-center gap-2 shadow-lg hover:border-amber-400"
            >
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Speaker Rankings</span>
            </button>

            <button
              onClick={() => setActiveTab('tabulation')}
              className="w-full sm:w-auto px-5 py-3 sm:py-3.5 rounded-xl bg-[#1F1A17] hover:bg-[#332C24] text-amber-300 font-bold text-xs sm:text-sm border border-[#8B5E3C] transition-all flex items-center justify-center gap-2 shadow-lg hover:border-amber-400"
            >
              <span>Admin Tab</span>
            </button>
          </div>


        </div>
      </div>
    </section>
  );
};
