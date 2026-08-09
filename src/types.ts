export type NavTab = 
  | 'home'
  | 'teams'
  | 'speakers'
  | 'adjudicators'
  | 'fixtures'
  | 'standings'
  | 'materials'
  | 'announcements'
  | 'ai-assistant'
  | 'admin';

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
  breakStatus: 'Qualified' | 'Contending' | 'Eliminated';
  roster: string[]; // speaker names
}

export interface Adjudicator {
  id: string;
  name: string;
  institution: string;
  role: 'Chief Adjudicator' | 'Deputy CA' | 'Independent Adjudicator' | 'Accredited Judge';
  roundsJudged: number;
  rating: number;
  bio: string;
}

export interface MatchFixture {
  id: string;
  round: number;
  roundName: string;
  govTeam: string;
  oppTeam: string;
  govInstitution: string;
  oppInstitution: string;
  winner?: 'Government' | 'Opposition' | 'Draw' | 'Walkover (Gov)' | 'Walkover (Opp)';
  govPoints?: number;
  oppPoints?: number;
  motion?: string;
  isSilentWeek: boolean;
  channel: string;
  dateTime: string;
  status: 'Completed' | 'Upcoming' | 'Live' | 'Walkover';
}

export interface TournamentAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  tag: 'Urgent' | 'Pairings' | 'Notice' | 'Rule Update';
  author: string;
}

export interface DebateMaterial {
  id: string;
  title: string;
  category: 'AP-ISC Format' | 'Matter Files' | 'Rules & Regulations' | 'Motion Resources';
  description: string;
  linkUrl: string;
  fileType: 'PDF' | 'DOC' | 'Link' | 'Discord';
  downloadCount: number;
}
