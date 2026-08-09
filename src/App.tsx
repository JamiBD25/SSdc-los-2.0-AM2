import React, { useState } from 'react';
import { NavTab, Team, Speaker, MatchFixture, TournamentAnnouncement, DebateMaterial } from './types';
import {
  INITIAL_TEAMS,
  INITIAL_SPEAKERS,
  INITIAL_ADJUDICATORS,
  INITIAL_FIXTURES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_MATERIALS
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HomeContent } from './components/HomeContent';
import { TeamsView } from './components/TeamsView';
import { SpeakersView } from './components/SpeakersView';
import { AdjudicatorsView } from './components/AdjudicatorsView';
import { FixturesView } from './components/FixturesView';
import { StandingsView } from './components/StandingsView';
import { MaterialsView } from './components/MaterialsView';
import { AnnouncementsView } from './components/AnnouncementsView';
import { AiDebateAssistant } from './components/AiDebateAssistant';
import { AdminManager } from './components/AdminManager';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // Shared Master Tournament State
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [speakers, setSpeakers] = useState<Speaker[]>(INITIAL_SPEAKERS);
  const [adjudicators] = useState(INITIAL_ADJUDICATORS);
  const [fixtures, setFixtures] = useState<MatchFixture[]>(INITIAL_FIXTURES);
  const [announcements, setAnnouncements] = useState<TournamentAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [materials] = useState<DebateMaterial[]>(INITIAL_MATERIALS);

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
          {activeTab === 'fixtures' && <FixturesView fixtures={fixtures} />}
          {activeTab === 'standings' && <StandingsView teams={teams} />}
          {activeTab === 'materials' && <MaterialsView materials={materials} />}
          {activeTab === 'announcements' && <AnnouncementsView announcements={announcements} />}
          {activeTab === 'ai-assistant' && <AiDebateAssistant />}
          {activeTab === 'admin' && (
            <AdminManager
              teams={teams}
              setTeams={setTeams}
              speakers={speakers}
              setSpeakers={setSpeakers}
              fixtures={fixtures}
              setFixtures={setFixtures}
              announcements={announcements}
              setAnnouncements={setAnnouncements}
            />
          )}
        </main>
      </div>

      {/* DEVELOPER FOOTER MATCHING USER SPEC */}
      <Footer />
    </div>
  );
}
