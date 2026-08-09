import React, { useState, useEffect } from 'react';
import { NavTab, Team, Speaker, TournamentAnnouncement } from './types';
import {
  INITIAL_TEAMS,
  INITIAL_SPEAKERS,
  INITIAL_ADJUDICATORS,
  INITIAL_ANNOUNCEMENTS
} from './data/initialData';
import {
  fetchTeamsFromSupabase,
  fetchSpeakersFromSupabase
} from './lib/supabase';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeContent } from './components/HomeContent';
import { TeamsView } from './components/TeamsView';
import { SpeakersView } from './components/SpeakersView';
import { AdjudicatorsView } from './components/AdjudicatorsView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { TabulationManager } from './components/TabulationManager';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  // Shared Master Tournament State
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [speakers, setSpeakers] = useState<Speaker[]>(INITIAL_SPEAKERS);
  const [adjudicators] = useState(INITIAL_ADJUDICATORS);
  const [announcements] = useState<TournamentAnnouncement[]>(INITIAL_ANNOUNCEMENTS);

  // Fetch initial points data from Supabase if connected
  useEffect(() => {
    async function loadCloudPoints() {
      try {
        const cloudTeams = await fetchTeamsFromSupabase();
        if (cloudTeams && cloudTeams.length > 0) {
          setTeams(cloudTeams);
        }

        const cloudSpeakers = await fetchSpeakersFromSupabase();
        if (cloudSpeakers && cloudSpeakers.length > 0) {
          setSpeakers(cloudSpeakers);
        }
      } catch (err) {
        console.warn('Supabase initial fetch skipped:', err);
      }
    }
    loadCloudPoints();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#8B5E3C] selection:text-white">
      <div>
        {/* TOP STICKY NAVBAR */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* HERO COVER BANNER & COUNTDOWN (Shown on Home view) */}
        {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}

        {/* MAIN TAB CONTENT */}
        <main className="transition-all duration-300">
          {activeTab === 'home' && <HomeContent setActiveTab={setActiveTab} />}
          {activeTab === 'teams' && <TeamsView teams={teams} />}
          {activeTab === 'speakers' && <SpeakersView speakers={speakers} />}
          {activeTab === 'adjudicators' && <AdjudicatorsView adjudicators={adjudicators} />}
          {activeTab === 'announcements' && <AnnouncementsView announcements={announcements} />}
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
