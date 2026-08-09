import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Pause, RotateCcw, Clock, Volume2, Lightbulb, BookOpen, ChevronRight, Award } from 'lucide-react';

export const AiDebateAssistant: React.FC = () => {
  // Motion Generator State
  const [category, setCategory] = useState<string>('Geopolitics');
  const [difficulty, setDifficulty] = useState<string>('Intermediate');
  const [currentMotion, setCurrentMotion] = useState<string>(
    'This House Would impose mandatory liability frameworks on AI developers for autonomous decision-making outcomes.'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [motionAnalysis, setMotionAnalysis] = useState<{
    definition: string;
    govArguments: string[];
    oppArguments: string[];
    keyClashes: string[];
  }>({
    definition: 'Evaluating whether software developers should bear legal and financial culpability when autonomous AI systems produce harmful or discriminatory real-world actions.',
    govArguments: [
      'Encourages safety-first development standards and internal auditing before deployment.',
      'Provides actionable legal restitution and recourse for affected citizens and victims.',
      'Prevents corporate negligence where companies externalize system failure risks onto the public.'
    ],
    oppArguments: [
      'Stifles technological innovation and places disproportionate burden on open-source developers.',
      'AI decision-making relies on unpredictable user prompts and external training data environments.',
      'Existing negligence and product liability laws already suffice without targeted anti-AI overregulation.'
    ],
    keyClashes: [
      'Innovation vs Liability Protection',
      'Individual Harm Restitution vs Broad Economic Growth',
      'Feasibility of Causal Attribution in Autonomous Neural Networks'
    ]
  });

  // Prep Timer State (15 minutes = 900 seconds)
  const PREP_TIME_SECONDS = 15 * 60;
  const [timeLeft, setTimeLeft] = useState<number>(PREP_TIME_SECONDS);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerateMotion = async () => {
    setIsGenerating(true);

    try {
      // Call Gemini API route or fallback to smart generator
      const res = await fetch('/api/gemini/generate-motion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, difficulty })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentMotion(data.motion);
        setMotionAnalysis(data.analysis);
      } else {
        throw new Error('API route unavailable');
      }
    } catch {
      // Fallback motions array
      const motionsDatabase: Record<string, Array<{ motion: string; analysis: typeof motionAnalysis }>> = {
        Geopolitics: [
          {
            motion: 'This House Regrets the dominance of multilateral financial institutions in dictating fiscal policies of developing nations.',
            analysis: {
              definition: 'Critiquing conditionality clauses attached to IMF and World Bank loans to sovereign nations.',
              govArguments: ['Loss of sovereign economic policy autonomy', 'Austerity measures harm public welfare programs', 'Exacerbates neo-colonial economic dependency'],
              oppArguments: ['Ensures fiscal discipline and corruption prevention', 'Provides stability to failing economies', 'Restores international market investor confidence'],
              keyClashes: ['Sovereign Autonomy vs Fiscal Responsibility', 'Short-term Social Welfare vs Long-term Economic Solvency']
            }
          },
          {
            motion: 'This House Would establish a binding global tribunal for corporate environmental damages.',
            analysis: {
              definition: 'Creating an international judicial body capable of prosecuting multinational corporations for ecological destruction.',
              govArguments: ['Closes jurisdictional loopholes used by global conglomerates', 'Enforces true polluter-pays principle', 'Protects vulnerable Global South communities'],
              oppArguments: ['Enforcement mechanisms would lack sovereign compliance', 'May cause capital flight from developing host countries', 'Duplicate of existing national regulatory bodies'],
              keyClashes: ['Global Jurisdiction vs National Sovereignty', 'Environmental Protection vs FDI Attraction']
            }
          }
        ],
        Economy: [
          {
            motion: 'This House Would replace targeted social welfare programs with a Universal Basic Income (UBI).',
            analysis: {
              definition: 'Replacing conditional welfare assistance with unconditional periodic cash transfers to all citizens.',
              govArguments: ['Eliminates bureaucratic overhead and paternalism', 'Guarantees dignity and safety net for automation era', 'Prevents welfare traps and stigma'],
              oppArguments: ['Huge fiscal strain requiring unsustainable tax burdens', 'Reduces targeted aid for severe disabilities', 'Potential inflationary pressure on baseline goods'],
              keyClashes: ['Universal Coverage vs Means-Tested Efficiency', 'Fiscal Sustainability vs Universal Social Safety Net']
            }
          }
        ],
        Education: [
          {
            motion: 'This House Would mandate student representation with voting power on university governing boards.',
            analysis: {
              definition: 'Giving student union representatives direct votes in institutional budget allocations and policy decisions.',
              govArguments: ['Ensures institutional decisions reflect primary consumer interests', 'Enhances transparency in tuition hikes', 'Empowers democratic governance'],
              oppArguments: ['Students lack long-term institutional financial stewardship focus', 'Conflicts of interest on academic standards', 'Transient population dynamics'],
              keyClashes: ['Consumer Empowerment vs Experienced Institutional Stewardship', 'Democracy in Academia vs Academic Rigor']
            }
          }
        ]
      };

      const selected = motionsDatabase[category] || motionsDatabase['Geopolitics'];
      const randomChoice = selected[Math.floor(Math.random() * selected.length)];
      setCurrentMotion(randomChoice.motion);
      setMotionAnalysis(randomChoice.analysis);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-amber-400" />
          <span>AI Motion Generator & 15-Min Prep Arena</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Generate official AP-ISC motions, analyze argument clashes, and run your 15-minute motion prep timer with official alerts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: MOTION GENERATOR & CLASH ANALYZER (8 COLS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* GENERATOR CONTROLS */}
          <div className="los-glass-card p-6 space-y-4 border-t-2 border-[#A97142]">
            <div className="flex items-center justify-between border-b border-[#684B35]/40 pb-3">
              <span className="font-bold text-amber-300 text-sm flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Motion Customization
              </span>
              <span className="text-xs text-[#c9b8a7]">AP-ISC Standard</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#c9b8a7] mb-1.5">
                  Debate Field / Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                >
                  <option value="Geopolitics">Geopolitics & Int. Relations</option>
                  <option value="Economy">Economy & Development</option>
                  <option value="Education">Education & Youth Policy</option>
                  <option value="Technology">AI, Tech & Cyber-Ethics</option>
                  <option value="Philosophy">Social Justice & Ethics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#c9b8a7] mb-1.5">
                  Circuit Complexity
                </label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] p-2.5 rounded-xl focus:outline-none focus:border-amber-400"
                >
                  <option value="Beginner">Novice / School Level</option>
                  <option value="Intermediate">Intermediate AP ISC</option>
                  <option value="Advanced">Advanced Open Circuit</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerateMotion}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#A97142] hover:from-[#A97142] hover:to-[#8B5E3C] text-white font-extrabold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Synthesizing AP Motion...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Generate New Motion</span>
                </>
              )}
            </button>
          </div>

          {/* ACTIVE MOTION DISPLAY */}
          <div className="los-glass-card p-6 space-y-4 border-l-4 border-amber-400">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-700">
              Generated AP-ISC Motion
            </span>

            <h3 className="font-['Playfair_Display'] font-bold text-xl sm:text-2xl text-[#f5e4cb] leading-relaxed italic">
              "{currentMotion}"
            </h3>

            {/* DEFINITION */}
            <div className="bg-[#120f0d] p-3.5 rounded-xl border border-[#684B35]/40 text-xs text-[#e2d0ba] space-y-1">
              <span className="font-bold text-amber-300 block uppercase tracking-wider text-[10px]">
                Model & Context Definition:
              </span>
              <p>{motionAnalysis.definition}</p>
            </div>
          </div>

          {/* ARGUMENT CLASH BREAKDOWN */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* GOV CASE */}
            <div className="los-glass-card p-5 space-y-3 border-t-2 border-emerald-500">
              <span className="font-bold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Prime Minister / Gov Case
              </span>
              <ul className="space-y-2 text-xs text-[#e2d0ba]">
                {motionAnalysis.govArguments.map((arg, idx) => (
                  <li key={idx} className="bg-[#120f0d] p-2.5 rounded-lg border border-[#684B35]/40 flex gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span>{arg}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* OPP CASE */}
            <div className="los-glass-card p-5 space-y-3 border-t-2 border-rose-500">
              <span className="font-bold text-xs uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" /> Opposition Leader Case
              </span>
              <ul className="space-y-2 text-xs text-[#e2d0ba]">
                {motionAnalysis.oppArguments.map((arg, idx) => (
                  <li key={idx} className="bg-[#120f0d] p-2.5 rounded-lg border border-[#684B35]/40 flex gap-2">
                    <span className="text-rose-400 font-bold">&bull;</span>
                    <span>{arg}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: 15-MINUTE PREP CLOCK (5 COLS) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="los-glass-card p-6 text-center space-y-6 border-2 border-[#8B5E3C] shadow-2xl sticky top-24">
            
            <div className="flex items-center justify-center gap-2 text-amber-300 font-bold text-sm uppercase tracking-wider">
              <Clock className="w-5 h-5 text-amber-400" />
              <span>AP-ISC 15-Min Prep Clock</span>
            </div>

            {/* CIRCULAR TIMER DISPLAY */}
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center rounded-full bg-[#120f0d] border-4 border-[#8B5E3C] shadow-inner">
              <div className="text-center">
                <span className="font-['Orbitron'] font-black text-4xl text-amber-300 tracking-wider block">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[10px] text-[#c9b8a7] font-bold uppercase tracking-widest mt-1 block">
                  {isRunning ? 'Prep In Progress' : 'Prep Paused'}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#c9b8a7] leading-relaxed">
              Official AP-ISC format grants exactly <b>15 minutes</b> of unassisted motion prep following release.
            </p>

            {/* TIMER CONTROLS */}
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-3 rounded-xl font-extrabold text-xs text-white flex items-center gap-2 shadow-lg transition-all ${
                  isRunning ? 'bg-amber-700 hover:bg-amber-600' : 'bg-emerald-700 hover:bg-emerald-600'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause Clock
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Start Prep Clock
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(PREP_TIME_SECONDS);
                }}
                className="p-3 rounded-xl bg-[#120f0d] hover:bg-[#332C24] text-[#f5e4cb] border border-[#684B35] transition-all"
                title="Reset to 15:00"
              >
                <RotateCcw className="w-4 h-4 text-amber-300" />
              </button>
            </div>

            {/* SPEECH TIMINGS GUIDE */}
            <div className="bg-[#120f0d] p-4 rounded-xl border border-[#684B35]/50 text-left text-xs space-y-2">
              <span className="font-bold text-amber-300 block uppercase text-[10px] tracking-wider">
                AP-ISC Speech Timing Standard
              </span>
              <ul className="space-y-1 text-[#e2d0ba]">
                <li>&bull; <b>Substantive Speeches:</b> 7 Minutes (POI allowed 1m-6m)</li>
                <li>&bull; <b>Reply Speeches:</b> 4 Minutes (No POIs allowed)</li>
                <li>&bull; <b>Single Knock Bell:</b> 1:00 min & 6:00 min</li>
                <li>&bull; <b>Double Knock Bell:</b> 7:00 min (Grace 15 secs)</li>
              </ul>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
