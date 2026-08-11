export type NavTab = 
  | 'home'
  | 'teams'
  | 'speakers'
  | 'adjudicators'
  | 'announcements'
  | 'tabulation';

export interface Speaker {
  id: string;
  rank: number;
  name: string;
  teamName: string;
  institution: string;
  totalPoints: number;
  roundsSpoken: number;
  averageScore: number;
  bestScore: number;
  breakEligible: boolean; // >= 3 rounds
}

export interface Team {
  id: string;
  rank: number;
  name: string;
  institution: string;
  win: number;
  loss: number;
  totalSpeakerPoints: number;
  netMargin: number;
  breakStatus: 'Qualified' | 'Contending' | 'Eliminated' | 'N/A';
  roster: string[]; // speaker names
}

export interface Adjudicator {
  id: string;
  name: string;
  institution: string;
  role: 'Chief Adjudicator' | 'Deputy CA' | 'Independent Adjudicator' | 'Accredited Judge' | string;
  roundsJudged: number;
  rating: number;
  bio: string;
  imageUrl?: string;
}

export interface TournamentAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: 'Urgent' | 'Pairings' | 'Notice' | 'Rule Update';
  author: string;
}

export interface TabSheetEntry {
  id: string;
  roundNumber: number;
  govTeamId: string;
  oppTeamId: string;
  govSpeaker1Name: string;
  govSpeaker1Score: number;
  govSpeaker2Name: string;
  govSpeaker2Score: number;
  govSpeaker3Name: string;
  govSpeaker3Score: number;
  govReplyScore: number;
  oppSpeaker1Name: string;
  oppSpeaker1Score: number;
  oppSpeaker2Name: string;
  oppSpeaker2Score: number;
  oppSpeaker3Name: string;
  oppSpeaker3Score: number;
  oppReplyScore: number;
  winner: 'Government' | 'Opposition';
  adjudicatorName: string;
  createdAt?: string;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
}

