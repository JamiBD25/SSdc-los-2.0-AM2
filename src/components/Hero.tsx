import React, { useState, useEffect } from 'react';
import { NavTab } from '../types';
import { Trophy, Calendar, Users, Mic, ChevronRight, Award } from 'lucide-react';

interface HeroProps {
  setActiveTab: (tab: NavTab) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  // Target tournament date: May 10, 2026
  const targetDate = new Date('2026-05-10T10:00:00');

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
      {/* COVER IMAGE & FADE OVERLAY */}
      <div className="cover relative w-full">
        <img
          src="https://i.postimg.cc/T17MH27K/Cover-2.png"
          alt="League of Spars Season 2 Cover Banner"
          className="cover-img max-h-[480px] object-cover object-center w-full shadow-2xl"
        />
        <div className="cover-bottom-fade"></div>
      </div>

      {/* OVERLAY CONTENT PANEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-6">
        <div className="los-glass-card p-6 sm:p-8 text-center border-t-2 border-[#A97142]">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B5E3C]/30 border border-[#8B5E3C] text-xs font-bold text-amber-300 mb-3 tracking-wider uppercase">
            <Award className="w-4 h-4 text-amber-400" /> Official Competition Platform &bull; AP ISC Format
          </div>

          <h1 className="font-['Orbitron'] text-2xl sm:text-4xl md:text-5xl font-black text-[#f5e4cb] tracking-wide mb-2 uppercase drop-shadow-md">
            League of Spars <span className="text-[#A97142]">Season 2</span>
          </h1>

          <p className="text-sm sm:text-base text-[#e2d0ba] max-w-2xl mx-auto mb-6 leading-relaxed">
            The premier institutional debate league of Chattogram organized by SSDC. 
            16+ top school & college debate clubs battling for supreme dominance.
          </p>

          {/* COUNTDOWN CLOCK */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-amber-300 uppercase tracking-widest mb-3 flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" /> League Kick-Off Countdown (May 10, 2026)
            </p>

            <div className="flex justify-center items-center gap-3 sm:gap-6 text-[#f5e4cb]">
              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-3 sm:px-5 py-2.5 min-w-[70px] shadow-inner">
                <span className="font-['Orbitron'] font-bold text-xl sm:text-3xl text-amber-400">
                  {timeLeft.days}
                </span>
                <span className="block text-[10px] text-[#c9b8a7] uppercase tracking-wider">Days</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#8B5E3C]">:</span>

              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-3 sm:px-5 py-2.5 min-w-[70px] shadow-inner">
                <span className="font-['Orbitron'] font-bold text-xl sm:text-3xl text-amber-400">
                  {timeLeft.hours}
                </span>
                <span className="block text-[10px] text-[#c9b8a7] uppercase tracking-wider">Hours</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#8B5E3C]">:</span>

              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-3 sm:px-5 py-2.5 min-w-[70px] shadow-inner">
                <span className="font-['Orbitron'] font-bold text-xl sm:text-3xl text-amber-400">
                  {timeLeft.minutes}
                </span>
                <span className="block text-[10px] text-[#c9b8a7] uppercase tracking-wider">Mins</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#8B5E3C]">:</span>

              <div className="bg-[#120f0d]/90 border border-[#684B35] rounded-xl px-3 sm:px-5 py-2.5 min-w-[70px] shadow-inner">
                <span className="font-['Orbitron'] font-bold text-xl sm:text-3xl text-amber-400">
                  {timeLeft.seconds}
                </span>
                <span className="block text-[10px] text-[#c9b8a7] uppercase tracking-wider">Secs</span>
              </div>
            </div>
          </div>

          {/* QUICK STATS TICKER */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
            <div className="bg-[#120f0d]/70 p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-3 text-left">
              <div className="p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Orbitron'] font-bold text-base sm:text-lg text-[#f5e4cb]">100+</span>
                <p className="text-[11px] text-[#c9b8a7] font-medium">Debaters Enrolled</p>
              </div>
            </div>

            <div className="bg-[#120f0d]/70 p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-3 text-left">
              <div className="p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Orbitron'] font-bold text-base sm:text-lg text-[#f5e4cb]">150+</span>
                <p className="text-[11px] text-[#c9b8a7] font-medium">Scheduled Debates</p>
              </div>
            </div>

            <div className="bg-[#120f0d]/70 p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-3 text-left">
              <div className="p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Orbitron'] font-bold text-base sm:text-lg text-[#f5e4cb]">AP-ISC</span>
                <p className="text-[11px] text-[#c9b8a7] font-medium">League Format</p>
              </div>
            </div>

            <div className="bg-[#120f0d]/70 p-3 rounded-xl border border-[#684B35]/60 flex items-center gap-3 text-left">
              <div className="p-2.5 bg-[#8B5E3C]/20 rounded-lg text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-['Orbitron'] font-bold text-base sm:text-lg text-[#f5e4cb]">May-Aug</span>
                <p className="text-[11px] text-[#c9b8a7] font-medium">2026 Season Duration</p>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => setActiveTab('teams')}
              className="prep-btn"
            >
              <span>View Teams & Points Table</span>
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('speakers')}
              className="px-6 py-3.5 rounded-xl bg-[#1F1A17] hover:bg-[#332C24] text-[#f5e4cb] font-bold text-sm border border-[#684B35] transition-all flex items-center gap-2 shadow-lg hover:border-amber-400"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Speaker Rankings</span>
            </button>

            <button
              onClick={() => setActiveTab('tabulation')}
              className="px-6 py-3.5 rounded-xl bg-[#1F1A17] hover:bg-[#332C24] text-amber-300 font-bold text-sm border border-[#8B5E3C] transition-all flex items-center gap-2 shadow-lg hover:border-amber-400"
            >
              <span>Admin Tabulation & Supabase Sync</span>
            </button>
          </div>


        </div>
      </div>
    </section>
  );
};
