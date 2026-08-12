import React, { useState, useEffect } from 'react';
import { NavTab, Team, Speaker } from './types';
import {
  INITIAL_TEAMS,
  INITIAL_SPEAKERS,
  INITIAL_ADJUDICATORS
} from './data/initialData';
import { autoRankTeams, autoRankSpeakers } from './lib/rankingAlgorithm';
import {
  fetchTeamsFromSupabase,
  fetchSpeakersFromSupabase,
  saveTeamsToSupabase,
  saveSpeakersToSupabase,
  initGlobalSupabaseConfig
} from './lib/supabase';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeContent } from './components/HomeContent';
import { TeamsView } from './components/TeamsView';
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
  const [adjudicators] = useState(INITIAL_ADJUDICATORS);

  // Fetch initial points data from Supabase if connected
  useEffect(() => {
    async function loadCloudPoints() {
      try {
        const config = await initGlobalSupabaseConfig();

        const cloudTeams = await fetchTeamsFromSupabase();
        if (cloudTeams && cloudTeams.length > 0) {
          const formatted = cloudTeams.map((ct) => {
            const localMatch = INITIAL_TEAMS.find((it) => it.id === ct.id || it.name === ct.name);
            return {
              ...ct,
              roster: ct.roster && ct.roster.length > 0 ? ct.roster : localMatch ? localMatch.roster : []
            };
          });
          setTeams(autoRankTeams(formatted));
        } else if (config.isConnected) {
          const ranked = autoRankTeams(INITIAL_TEAMS);
          setTeams(ranked);
          await saveTeamsToSupabase(ranked);
        }

        const cloudSpeakers = await fetchSpeakersFromSupabase();
        if (cloudSpeakers && cloudSpeakers.length > 0) {
          setSpeakers(autoRankSpeakers(cloudSpeakers));
        } else if (config.isConnected) {
          // If cloud has no speakers, upload initial debater roster to Supabase
          const ranked = autoRankSpeakers(INITIAL_SPEAKERS);
          setSpeakers(ranked);
          await saveSpeakersToSupabase(ranked);
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
          {activeTab === 'teams' && <TeamsView teams={teams} />}
          {activeTab === 'speakers' && <SpeakersView speakers={speakers} />}
          {activeTab === 'adjudicators' && <AdjudicatorsView adjudicators={adjudicators} />}
          {activeTab === 'tabulation' && (
            <TabulationManager
              teams={teams}
              setTeams={setTeams}
              speakers={speakers}
              setSpeakers={setSpeakers}
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
