import React, { useState, useEffect } from 'react';
import { NavTab, Team, Speaker, Adjudicator } from './types';
import {
  INITIAL_TEAMS,
  INITIAL_SPEAKERS,
  INITIAL_ADJUDICATORS
} from './data/initialData';
import { autoRankTeams, autoRankSpeakers } from './lib/rankingAlgorithm';
import {
  fetchTeamsFromSupabase,
  fetchSpeakersFromSupabase,
  fetchAdjudicatorsFromSupabase,
  saveTeamsToSupabase,
  saveSpeakersToSupabase,
  saveAdjudicatorsToSupabase,
  initGlobalSupabaseConfig
} from './lib/supabase';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeContent } from './components/HomeContent';
import { TeamsView } from './components/TeamsView';
import { MatchupView } from './components/MatchupView';
import { SpeakersView } from './components/SpeakersView';
import { AdjudicatorsView } from './components/AdjudicatorsView';
import { TabulationManager } from './components/TabulationManager';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Shared Master Tournament State with Auto-Ranking Algorithm Applied
  const [teams, setTeams] = useState<Team[]>(() => autoRankTeams(INITIAL_TEAMS));
  const [speakers, setSpeakers] = useState<Speaker[]>(() => autoRankSpeakers(INITIAL_SPEAKERS));
  const [adjudicators, setAdjudicators] = useState<Adjudicator[]>(INITIAL_ADJUDICATORS);

  // Fetch initial points data from Supabase if connected
  useEffect(() => {
    async function loadCloudPoints() {
      try {
        const config = await initGlobalSupabaseConfig();

        const cloudTeams = await fetchTeamsFromSupabase();
        if (cloudTeams && cloudTeams.length >= INITIAL_TEAMS.length) {
          const formatted = cloudTeams.map((ct) => {
            const localMatch = INITIAL_TEAMS.find((it) => it.id === ct.id || it.name === ct.name);
            return {
              ...ct,
              roster: ct.roster && ct.roster.length > 0 ? ct.roster : localMatch ? localMatch.roster : []
            };
          });
          setTeams(autoRankTeams(formatted));
        } else {
          const ranked = autoRankTeams(INITIAL_TEAMS);
          setTeams(ranked);
          if (config.isConnected) {
            await saveTeamsToSupabase(ranked);
          }
        }

        const cloudSpeakers = await fetchSpeakersFromSupabase();
        if (cloudSpeakers && cloudSpeakers.length >= INITIAL_SPEAKERS.length) {
          // Deduplicate by name + teamName to prevent duplicate rows
          const uniqueMap = new Map<string, Speaker>();
          cloudSpeakers.forEach((s) => {
            const key = `${s.name.trim().toLowerCase()}_${s.teamName.trim().toLowerCase()}`;
            if (!uniqueMap.has(key)) {
              uniqueMap.set(key, s);
            }
          });
          setSpeakers(autoRankSpeakers(Array.from(uniqueMap.values())));
        } else {
          // Upload complete attachment debater roster (147 speakers) to Supabase (clearing stale duplicate rows)
          const ranked = autoRankSpeakers(INITIAL_SPEAKERS);
          setSpeakers(ranked);
          if (config.isConnected) {
            await saveSpeakersToSupabase(ranked, true);
          }
        }

        const cloudAdjudicators = await fetchAdjudicatorsFromSupabase();
        if (cloudAdjudicators && cloudAdjudicators.length > 0) {
          setAdjudicators(cloudAdjudicators);
        } else {
          setAdjudicators(INITIAL_ADJUDICATORS);
          if (config.isConnected) {
            await saveAdjudicatorsToSupabase(INITIAL_ADJUDICATORS, true);
          }
        }
      } catch (err) {
        console.warn('Supabase initial fetch skipped:', err);
      }
    }
    loadCloudPoints();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#8B5E3C] selection:text-white max-w-full overflow-x-hidden">
      <div className="w-full max-w-full overflow-x-hidden">
        {/* TOP STICKY NAVBAR */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* HERO COVER BANNER & COUNTDOWN (Shown on Home view) */}
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}

        {/* MAIN TAB CONTENT */}
        <main className="transition-all duration-300 w-full max-w-full overflow-x-hidden">
          {activeTab === 'home' && <HomeContent setActiveTab={setActiveTab} />}
          {activeTab === 'matchup' && <MatchupView />}
          {activeTab === 'teams' && <TeamsView teams={teams} />}
          {activeTab === 'speakers' && <SpeakersView speakers={speakers} />}
          {activeTab === 'adjudicators' && <AdjudicatorsView adjudicators={adjudicators} />}
          {activeTab === 'tabulation' && (
            <TabulationManager
              teams={teams}
              setTeams={setTeams}
              speakers={speakers}
              setSpeakers={setSpeakers}
              adjudicators={adjudicators}
              setAdjudicators={setAdjudicators}
              isAdminLoggedIn={isAdminLoggedIn}
              setIsAdminLoggedIn={setIsAdminLoggedIn}
            />
          )}
        </main>
      </div>

      {/* DEVELOPER FOOTER */}
      <Footer />
    </div>
  );
}
