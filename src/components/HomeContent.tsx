import React, { useState } from 'react';
import { NavTab } from '../types';
import { BookOpen, ShieldCheck, HelpCircle, ChevronDown, ChevronUp, ExternalLink, Sparkles, Trophy, Crown, Award, Medal, Swords, ArrowRight } from 'lucide-react';

interface HomeContentProps {
  setActiveTab: (tab: NavTab) => void;
}

export const HomeContent: React.FC<HomeContentProps> = ({ setActiveTab }) => {
  const [showMoreAbout, setShowMoreAbout] = useState(false);

  return (
    <div className="container max-w-5xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 sm:space-y-10 w-full max-w-full overflow-x-hidden">
      
      {/* 🏆 TOURNAMENT CHAMPIONS & HONORS SHOWCASE */}
      <div className="los-glass-card p-5 sm:p-8 space-y-6 border-2 border-yellow-500/80 bg-gradient-to-b from-[#1E1712] via-[#16120e] to-[#0f0c0a] shadow-2xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/60 text-yellow-300 text-xs font-black uppercase tracking-widest shadow-md">
            <Trophy className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>Tournament Champions & Accolades</span>
          </div>
          <h2 className="font-['Orbitron'] text-2xl sm:text-3xl md:text-4xl font-black text-yellow-300 tracking-wide uppercase drop-shadow-md">
            League of Spars Season 2
          </h2>
          <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-xl mx-auto">
            Honoring the official Grand Champion, Finalists, and Outstanding Debaters of the Season
          </p>
        </div>

        {/* TEAM HONORS: CHAMPION & RUNNER-UP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* CHAMPION CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2a1e15] to-[#1a130e] border-2 border-yellow-400 shadow-xl relative overflow-hidden group hover:border-yellow-300 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-yellow-400 text-black inline-flex items-center gap-1 shadow">
                  <Crown className="w-3 h-3 text-black fill-black" />
                  <span>Grand Champion</span>
                </span>
                <h3 className="font-['Orbitron'] font-black text-xl sm:text-2xl text-yellow-200 pt-1">
                  GMHSDS
                </h3>
                <p className="text-xs text-[#d1bfad] font-medium">
                  Govt Muslim High Debating Society
                </p>
              </div>
              <div className="p-3 bg-yellow-400/20 rounded-2xl border border-yellow-400/50 text-yellow-300 shrink-0 shadow-inner">
                <Trophy className="w-8 h-8 text-yellow-400 fill-yellow-400/40" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-yellow-500/30 flex items-center justify-between text-xs">
              <span className="text-[#a89582] font-semibold">Final Status:</span>
              <span className="font-bold text-yellow-300 bg-yellow-950/60 px-2.5 py-0.5 rounded border border-yellow-600/40">
                Champion & Title Winner
              </span>
            </div>
          </div>

          {/* RUNNER-UP CARD */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1F1915] to-[#14100d] border border-amber-500/50 shadow-lg relative overflow-hidden group hover:border-amber-400 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-300 text-slate-950 inline-flex items-center gap-1 shadow">
                  <Medal className="w-3 h-3 text-slate-950" />
                  <span>Runner-Up</span>
                </span>
                <h3 className="font-['Orbitron'] font-black text-xl sm:text-2xl text-[#f5e4cb] pt-1">
                  CCPC Q
                </h3>
                <p className="text-xs text-[#a89582] font-medium">
                  Chittagong Cantonment Public College
                </p>
              </div>
              <div className="p-3 bg-amber-900/30 rounded-2xl border border-amber-600/40 text-amber-300 shrink-0">
                <Medal className="w-8 h-8 text-amber-300" />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#684B35]/40 flex items-center justify-between text-xs">
              <span className="text-[#a89582] font-semibold">Final Status:</span>
              <span className="font-bold text-amber-200 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-700/40">
                Grand Finalist
              </span>
            </div>
          </div>

        </div>

        {/* INDIVIDUAL DEBATER HONORS: SAADMAAN SARAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          
          {/* DEBATER OF THE FINAL */}
          <div className="p-4 rounded-xl bg-[#120f0d] border border-amber-500/60 hover:border-amber-400 transition-all space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                <Award className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-400 block">
                  Individual Accolade
                </span>
                <h4 className="font-bold text-sm text-[#f5e4cb]">
                  Debater of the Final
                </h4>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#1a1410] border border-[#684B35]/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-base text-amber-200 block">
                  Saadmaan Sarar
                </span>
                <span className="text-[11px] text-[#a89582] block">
                  GMHSDS (Govt Muslim High)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-950 text-amber-300 border border-amber-600/50">
                Final MVP
              </span>
            </div>
          </div>

          {/* DEBATER OF THE TOURNAMENT */}
          <div className="p-4 rounded-xl bg-[#120f0d] border border-yellow-500/60 hover:border-yellow-400 transition-all space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shrink-0">
                <Crown className="w-5 h-5 text-yellow-400 fill-yellow-400/30" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider text-yellow-400 block">
                  Premier Accolade
                </span>
                <h4 className="font-bold text-sm text-yellow-200">
                  Debater of the Tournament
                </h4>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#1a1410] border border-[#684B35]/60 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-base text-yellow-200 block">
                  Saadmaan Sarar
                </span>
                <span className="text-[11px] text-[#a89582] block">
                  GMHSDS (Govt Muslim High)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-950 text-yellow-300 border border-yellow-600/50">
                Tournament MVP
              </span>
            </div>
          </div>

        </div>

        {/* BUTTON TO VIEW MATCHUP */}
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveTab('matchup')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Swords className="w-4 h-4 text-amber-200" />
            <span>View Knockout Matchups & Final Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 🔷 ABOUT SSDC SECTION */}
      <div className="los-glass-card p-4 sm:p-8 space-y-4 border-l-4 border-[#8B5E3C] max-w-full">
        <div className="hl flex items-center justify-center gap-2 flex-wrap">
          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-amber-400 shrink-0" />
          <span>About SSDC</span>
        </div>

        <div className="des text-base sm:text-lg leading-relaxed text-[#f5e4cb]">
          The Society for School Debaters of Chattogram (SSDC), established in 2020,
          works to build a strong and sustainable debating culture across Chattogram.
          Over the years, SSDC has become one of the most active platforms for school
          and college debaters, promoting confidence, critical thinking, and respectful dialogue.
          
          {!showMoreAbout && (
            <span id="dots" className="text-amber-400 font-bold cursor-pointer ml-1" onClick={() => setShowMoreAbout(true)}>
              ... <span className="underline text-xs">(Read More)</span>
            </span>
          )}

          {showMoreAbout && (
            <span id="more" className="block mt-3 space-y-3 pt-2 border-t border-[#684B35]/40 animate-fadeIn">
              <p>
                SSDC believes debate is not limited to competition alone. The organisation
                focuses on creating opportunities for students from all backgrounds by
                supporting both established and emerging debate clubs.
              </p>
              <p>
                Through inter-school championships, workshops, training sessions, and
                practice rounds, SSDC continues to strengthen the debating circuit both
                online and offline.
              </p>
              <p className="font-semibold text-amber-300">
                Its alumni are currently studying at leading institutions including
                BUET, CUET, Dhaka Medical College, and Chittagong Medical College.
              </p>
            </span>
          )}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={() => setShowMoreAbout(!showMoreAbout)}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 inline-flex items-center gap-1 bg-[#120f0d] px-4 py-2 rounded-lg border border-[#684B35]"
          >
            {showMoreAbout ? (
              <>Show Less <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Read Full SSDC Overview <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        </div>
      </div>

      {/* 🔷 ABOUT LOS 2.0 SECTION */}
      <div className="los-glass-card p-6 sm:p-8 space-y-4 border-l-4 border-[#A97142]">
        <div className="hl flex items-center justify-center gap-2">
          <Sparkles className="w-7 h-7 text-amber-400" />
          <span>About LOS 2.0</span>
        </div>

        <div className="des text-base sm:text-lg leading-relaxed text-[#f5e4cb]">
          After a successful debut featuring 100+ participants and 150+ debates, SSDC League of Spars returns with Season 2—more competitive, structured, and impactful. Over time, it has evolved into one of the leading debate platforms in Chattogram, bringing together school and college debaters from across the circuit.
          <br /><br />
          Organized entirely by students, LOS S2 reflects the strength of youth leadership, collaboration, and intellectual exchange. More than just a tournament, the league continues as a movement that celebrates debate, expression, critical thinking, and community building.
          <br /><br />
          The league <b className="text-amber-300 font-extrabold underline decoration-amber-400">will follow the AP ISC format,</b> where every participating institution competes against every other institution once during the season. The institution that finishes at the top of the standings at the end of the league will be declared Champion.
          <br /><br />
          All preliminary rounds will be conducted online via Discord, while the Grand Finals will be held physically on <b>14th August 2026</b>.
        </div>
      </div>

      {/* 🔷 RULES SECTION */}
      <div className="los-glass-card p-6 sm:p-8 space-y-6">
        <div className="hl flex items-center justify-center gap-2">
          <ShieldCheck className="w-7 h-7 text-amber-400" />
          <span>Rules & Regulations</span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="hl2">1. Mandatory Compliance</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>All participating clubs must thoroughly review the rules and regulations.</li>
              <li>Submission of the required form is mandatory.</li>
              <li>Participation in every scheduled debate is compulsory for all institutions.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">2. Debate Format</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>The league will follow the AP ISC debate format.</li>
              <li>Each institution will face every other institution once.</li>
              <li>Both school and college teams will compete together in the same league table.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">3. Preliminary Rounds</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>All preliminary rounds will take place online through Discord.</li>
              <li>Matchups for each round will be announced by the Organizing Committee.</li>
              <li>Institutions must complete all assigned rounds within the provided weekly deadline.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">4. Walkover Rule</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>If an institution fails to schedule or attend a debate within the given timeframe, the opposing institution will receive a walkover victory.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">5. Round Scheduling</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>A complete fixture list for the league will be provided by the Organizing Committee.</li>
              <li>One executive representative from each institution will be added to a coordination group.</li>
              <li>After fixtures are announced, executives must:
                <ul className="list-circle list-inside pl-6 mt-1 space-y-1 text-amber-200">
                  <li>Contact the opposing institution</li>
                  <li>Mutually decide a date and time</li>
                  <li>Ensure the debate is completed before the deadline</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <div className="hl2">6. Silent Weeks</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>One week out of every four weeks will be considered a “Silent Week.”</li>
              <li>Results from debates held during silent weeks will not be disclosed immediately.</li>
              <li>Silent weeks will only be revealed at the conclusion of the league.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">7. Finals</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>All rounds except the Finals will be conducted online.</li>
              <li>The Finals will be organized physically in Chattogram.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">8. Speaker Break</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>Any debater must complete a minimum of <b className="text-amber-300">3 rounds</b> to qualify for the Speaker Break.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">9. Team Break</div>
            <ul className="des list-disc list-inside pl-4 space-y-1 text-sm sm:text-base">
              <li>Have a roster consisting of at least 5 debaters.</li>
              <li>Ensure that at least 5 debaters each complete a minimum of 5 rounds during the tournament.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔷 GUIDELINES SECTION */}
      <div className="los-glass-card p-6 sm:p-8 space-y-6">
        <div className="hl flex items-center justify-center gap-2">
          <BookOpen className="w-7 h-7 text-amber-400" />
          <span>Participation Guidelines</span>
        </div>

        <div className="space-y-6">
          <div>
            <div className="hl2">1. Team Composition</div>
            <ul className="des list-disc list-inside pl-4 space-y-1">
              <li>Every institution must maintain a minimum roster of 5 debaters throughout the league.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">2. Participation Requirement</div>
            <ul className="des list-disc list-inside pl-4 space-y-1">
              <li>Each debater must participate in at least two-thirds of the debates to remain eligible.</li>
              <li>Institutions are encouraged to maintain a balanced distribution of participation among members.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">3. Participation Distribution Example</div>
            <ul className="des list-disc list-inside pl-4 space-y-1">
              <li>If there are 16 rounds and 5 debaters, each debater should ideally participate in around 5 rounds.</li>
              <li>Exact equality is not mandatory, but major imbalance should be avoided.</li>
            </ul>
          </div>

          <div>
            <div className="hl2">4. Additional Activities</div>
            <ul className="des list-disc list-inside pl-4 space-y-1">
              <li>The league may also feature:
                <ul className="list-circle list-inside pl-6 mt-1 space-y-1 text-amber-200">
                  <li>Matter sessions</li>
                  <li>Motion discussions</li>
                  <li>Other engaging debate-related activities</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <div className="hl2">5. Accolades & Recognition</div>
            <ul className="des list-disc list-inside pl-4 space-y-1">
              <li>To encourage excellence and active participation, LOS S2 will feature recognitions such as:
                <ul className="list-circle list-inside pl-6 mt-1 space-y-1 text-amber-200">
                  <li>Debater of the Month</li>
                  <li>Team of the Month</li>
                  <li>Emerging Debater</li>
                  <li>Additional featured awards and acknowledgements</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 🔷 COMMUNICATION & QUERIES */}
      <div className="los-glass-card p-6 sm:p-8 space-y-6">
        <div className="hl flex items-center justify-center gap-2">
          <HelpCircle className="w-7 h-7 text-amber-400" />
          <span>Communication & Queries</span>
        </div>

        <p className="des text-center">
          For any tournament queries, scheduling adjustments, or administrative assistance, participants may contact the executive team:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#120f0d] p-5 rounded-xl border border-[#684B35] text-center space-y-2 hover:border-amber-400 transition-colors">
            <h4 className="font-bold text-amber-300 text-lg">Adiba Anjum</h4>
            <p className="text-xs text-[#c9b8a7]">Head of Debate Development</p>
            <a
              href="https://www.facebook.com/share/14atHinuf2t/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-semibold shadow transition-all"
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-[#120f0d] p-5 rounded-xl border border-[#684B35] text-center space-y-2 hover:border-amber-400 transition-colors">
            <h4 className="font-bold text-amber-300 text-lg">Kayes Adnan</h4>
            <p className="text-xs text-[#c9b8a7]">Head of Event Management</p>
            <a
              href="https://www.facebook.com/share/17T8DxWAYW/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-semibold shadow transition-all"
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="bg-[#120f0d] p-5 rounded-xl border border-[#684B35] text-center space-y-2 hover:border-amber-400 transition-colors">
            <h4 className="font-bold text-amber-300 text-lg">Rownak Kulsum</h4>
            <p className="text-xs text-[#c9b8a7]">Head of Public Relations</p>
            <a
              href="https://www.facebook.com/share/1DuhEEhVVR/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877f2] hover:bg-[#166fe5] text-white text-xs font-semibold shadow transition-all"
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook Profile</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

    </div>
  );
};
