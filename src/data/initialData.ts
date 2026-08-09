import { Team, Speaker, Adjudicator, MatchFixture, TournamentAnnouncement, DebateMaterial } from '../types';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 't1',
    rank: 1,
    name: 'Collegiate Debaters Guild Alpha',
    institution: 'Chittagong Collegiate School (CCS)',
    win: 5,
    loss: 0,
    totalSpeakerPoints: 1145.5,
    netMargin: +32.5,
    breakStatus: 'Qualified',
    roster: ['Rayhan Chowdhury', 'Tahmid Hasan', 'Arafat Rahman', 'Samiul Islam', 'Nafis Abdullah']
  },
  {
    id: 't2',
    rank: 2,
    name: 'St. Placids Elite',
    institution: "St. Placid's School & College",
    win: 4,
    loss: 1,
    totalSpeakerPoints: 1132.0,
    netMargin: +21.0,
    breakStatus: 'Qualified',
    roster: ['Kayes Adnan', 'Saad Mahmud', 'Tanvir Ahmed', 'Emon Hossain', 'Minhaz Uddin']
  },
  {
    id: 't3',
    rank: 3,
    name: 'CGS Vanguard',
    institution: 'Chittagong Grammar School (CGS)',
    win: 4,
    loss: 1,
    totalSpeakerPoints: 1128.5,
    netMargin: +18.5,
    breakStatus: 'Qualified',
    roster: ['Zayan Ahmed', 'Adiba Anjum', 'Farhan Kabir', 'Samira Nawar', 'Adnan Sami']
  },
  {
    id: 't4',
    rank: 4,
    name: 'CESC Titans',
    institution: 'Cantonment English School & College',
    win: 3,
    loss: 2,
    totalSpeakerPoints: 1118.0,
    netMargin: +12.0,
    breakStatus: 'Contending',
    roster: ['Rownak Kulsum', 'Mahir Asif', 'Ahsan Habib', 'Jubayer Hossain', 'Sabit Zaman']
  },
  {
    id: 't5',
    rank: 5,
    name: 'Faujdarhat Warriors',
    institution: 'Faujdarhat Cadet College (FCC)',
    win: 3,
    loss: 2,
    totalSpeakerPoints: 1112.5,
    netMargin: +8.0,
    breakStatus: 'Contending',
    roster: ['Shahriar Nafis', 'Tamim Iqbal', 'Arman Hossain', 'Hamza Ali', 'Rakib Hasan']
  },
  {
    id: 't6',
    rank: 6,
    name: 'Mohsinian Speakers',
    institution: 'Govt. Hazi Mohammad Mohsin College',
    win: 3,
    loss: 2,
    totalSpeakerPoints: 1098.0,
    netMargin: +4.5,
    breakStatus: 'Contending',
    roster: ['Anik Dutta', 'Wasif Abdullah', 'Miraz Hossain', 'Sumaiya Yasmin', 'Fahim Faisal']
  },
  {
    id: 't7',
    rank: 7,
    name: 'Chittagong College DC',
    institution: 'Chittagong College',
    win: 2,
    loss: 3,
    totalSpeakerPoints: 1085.0,
    netMargin: -6.0,
    breakStatus: 'Contending',
    roster: ['Nafis Jami', 'Ismail Siraji', 'Faria Tazrin', 'Alvi Chowdhury', 'Riaz Uddin']
  },
  {
    id: 't8',
    rank: 8,
    name: 'Ispahani Eagles',
    institution: 'Ispahani Public School & College',
    win: 2,
    loss: 3,
    totalSpeakerPoints: 1072.5,
    netMargin: -11.5,
    breakStatus: 'Contending',
    roster: ['Sakib Ahmed', 'Mehedi Hasan', 'Taniza Rahman', 'Siam Ahmed', 'Sifat Hossain']
  },
  {
    id: 't9',
    rank: 9,
    name: 'Navy Anchorage Spars',
    institution: 'Navy Anchorage School & College',
    win: 1,
    loss: 4,
    totalSpeakerPoints: 1056.0,
    netMargin: -24.0,
    breakStatus: 'Eliminated',
    roster: ['Kazi Rohan', 'Naimur Rahman', 'Jaber Hossain', 'Humaira Kabir', 'Tasnim Ahmed']
  },
  {
    id: 't10',
    rank: 10,
    name: 'Bakalia Govt College Guild',
    institution: 'Bakalia Govt. College',
    win: 0,
    loss: 5,
    totalSpeakerPoints: 1030.0,
    netMargin: -45.0,
    breakStatus: 'Eliminated',
    roster: ['Safwan Ahmed', 'Arif Mahmud', 'Nusrat Jahan', 'Fahad Bin Saif', 'Ashiqur Rahman']
  }
];

export const INITIAL_SPEAKERS: Speaker[] = [
  {
    id: 's1',
    rank: 1,
    name: 'Rayhan Chowdhury',
    teamName: 'Collegiate Debaters Guild Alpha',
    institution: 'Chittagong Collegiate School',
    totalPoints: 387.5,
    roundsSpoken: 5,
    averageScore: 77.5,
    bestScore: 79.0,
    breakEligible: true
  },
  {
    id: 's2',
    rank: 2,
    name: 'Adiba Anjum',
    teamName: 'CGS Vanguard',
    institution: 'Chittagong Grammar School',
    totalPoints: 384.0,
    roundsSpoken: 5,
    averageScore: 76.8,
    bestScore: 78.5,
    breakEligible: true
  },
  {
    id: 's3',
    rank: 3,
    name: 'Kayes Adnan',
    teamName: 'St. Placids Elite',
    institution: "St. Placid's School & College",
    totalPoints: 382.5,
    roundsSpoken: 5,
    averageScore: 76.5,
    bestScore: 78.0,
    breakEligible: true
  },
  {
    id: 's4',
    rank: 4,
    name: 'Tahmid Hasan',
    teamName: 'Collegiate Debaters Guild Alpha',
    institution: 'Chittagong Collegiate School',
    totalPoints: 380.0,
    roundsSpoken: 5,
    averageScore: 76.0,
    bestScore: 77.5,
    breakEligible: true
  },
  {
    id: 's5',
    rank: 5,
    name: 'Rownak Kulsum',
    teamName: 'CESC Titans',
    institution: 'Cantonment English School & College',
    totalPoints: 378.5,
    roundsSpoken: 5,
    averageScore: 75.7,
    bestScore: 77.0,
    breakEligible: true
  },
  {
    id: 's6',
    rank: 6,
    name: 'Shahriar Nafis',
    teamName: 'Faujdarhat Warriors',
    institution: 'Faujdarhat Cadet College',
    totalPoints: 376.0,
    roundsSpoken: 5,
    averageScore: 75.2,
    bestScore: 76.5,
    breakEligible: true
  },
  {
    id: 's7',
    rank: 7,
    name: 'Nafis Jami',
    teamName: 'Chittagong College DC',
    institution: 'Chittagong College',
    totalPoints: 374.5,
    roundsSpoken: 5,
    averageScore: 74.9,
    bestScore: 76.5,
    breakEligible: true
  },
  {
    id: 's8',
    rank: 8,
    name: 'Saad Mahmud',
    teamName: 'St. Placids Elite',
    institution: "St. Placid's School & College",
    totalPoints: 373.0,
    roundsSpoken: 5,
    averageScore: 74.6,
    bestScore: 76.0,
    breakEligible: true
  },
  {
    id: 's9',
    rank: 9,
    name: 'Anik Dutta',
    teamName: 'Mohsinian Speakers',
    institution: 'Govt. Hazi Mohammad Mohsin College',
    totalPoints: 370.0,
    roundsSpoken: 5,
    averageScore: 74.0,
    bestScore: 75.5,
    breakEligible: true
  },
  {
    id: 's10',
    rank: 10,
    name: 'Zayan Ahmed',
    teamName: 'CGS Vanguard',
    institution: 'Chittagong Grammar School',
    totalPoints: 368.5,
    roundsSpoken: 5,
    averageScore: 73.7,
    bestScore: 75.0,
    breakEligible: true
  },
  {
    id: 's11',
    rank: 11,
    name: 'Arafat Rahman',
    teamName: 'Collegiate Debaters Guild Alpha',
    institution: 'Chittagong Collegiate School',
    totalPoints: 298.0,
    roundsSpoken: 4,
    averageScore: 74.5,
    bestScore: 76.0,
    breakEligible: true
  },
  {
    id: 's12',
    rank: 12,
    name: 'Sakib Ahmed',
    teamName: 'Ispahani Eagles',
    institution: 'Ispahani Public School & College',
    totalPoints: 292.0,
    roundsSpoken: 4,
    averageScore: 73.0,
    bestScore: 74.5,
    breakEligible: true
  },
  {
    id: 's13',
    rank: 13,
    name: 'Samiul Islam',
    teamName: 'Collegiate Debaters Guild Alpha',
    institution: 'Chittagong Collegiate School',
    totalPoints: 147.0,
    roundsSpoken: 2,
    averageScore: 73.5,
    bestScore: 74.0,
    breakEligible: false // Needs >= 3 rounds
  },
  {
    id: 's14',
    rank: 14,
    name: 'Nusrat Jahan',
    teamName: 'Bakalia Govt College Guild',
    institution: 'Bakalia Govt. College',
    totalPoints: 142.0,
    roundsSpoken: 2,
    averageScore: 71.0,
    bestScore: 72.0,
    breakEligible: false
  }
];

export const INITIAL_ADJUDICATORS: Adjudicator[] = [
  {
    id: 'adj1',
    name: 'Tanvir Hossain',
    institution: 'BUET Debating Club Alumnus',
    role: 'Chief Adjudicator',
    roundsJudged: 12,
    rating: 4.9,
    bio: 'Champion debater with 6+ years of adjudication experience in National & AP ISC circuits.'
  },
  {
    id: 'adj2',
    name: 'Dr. Shahriar Kabir',
    institution: 'Chittagong Medical College',
    role: 'Deputy CA',
    roundsJudged: 10,
    rating: 4.8,
    bio: 'Former SSDC President and experienced adjudicator across school & college platforms.'
  },
  {
    id: 'adj3',
    name: 'Nusrat Jahan Chowdhury',
    institution: 'CUET Debating Society',
    role: 'Deputy CA',
    roundsJudged: 9,
    rating: 4.8,
    bio: 'Specialist in economics, geopolitics, and international relations motion evaluation.'
  },
  {
    id: 'adj4',
    name: 'Abrar Zahin',
    institution: 'Dhaka Medical College',
    role: 'Independent Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Adjudicated over 100+ rounds across national AP and Parliamentary leagues.'
  },
  {
    id: 'adj5',
    name: 'Mehreen Farooq',
    institution: 'Chittagong University Debate Forum',
    role: 'Accredited Judge',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Focuses on structured matter analysis, POI engagement, and speaker feedback delivery.'
  }
];

export const INITIAL_FIXTURES: MatchFixture[] = [
  {
    id: 'f1',
    round: 1,
    roundName: 'Round 1 - Preliminary',
    govTeam: 'Collegiate Debaters Guild Alpha',
    oppTeam: 'St. Placids Elite',
    govInstitution: 'Chittagong Collegiate School',
    oppInstitution: "St. Placid's School & College",
    winner: 'Government',
    govPoints: 229.5,
    oppPoints: 225.0,
    motion: 'This House Would mandate state funding for youth skill development hubs in regional districts.',
    isSilentWeek: false,
    channel: 'discord-#room-1',
    dateTime: 'May 10, 2026 - 4:00 PM',
    status: 'Completed'
  },
  {
    id: 'f2',
    round: 1,
    roundName: 'Round 1 - Preliminary',
    govTeam: 'CGS Vanguard',
    oppTeam: 'CESC Titans',
    govInstitution: 'Chittagong Grammar School',
    oppInstitution: 'Cantonment English School & College',
    winner: 'Government',
    govPoints: 226.0,
    oppPoints: 222.5,
    motion: 'This House Regrets the prioritization of STEM over Humanities in secondary education.',
    isSilentWeek: false,
    channel: 'discord-#room-2',
    dateTime: 'May 10, 2026 - 5:30 PM',
    status: 'Completed'
  },
  {
    id: 'f3',
    round: 2,
    roundName: 'Round 2 - Preliminary',
    govTeam: 'Faujdarhat Warriors',
    oppTeam: 'Mohsinian Speakers',
    govInstitution: 'Faujdarhat Cadet College',
    oppInstitution: 'Govt. Hazi Mohammad Mohsin College',
    winner: 'Government',
    govPoints: 224.0,
    oppPoints: 220.5,
    motion: 'This House Would ban algorithmic content recommendation targeting minors.',
    isSilentWeek: false,
    channel: 'discord-#room-1',
    dateTime: 'May 17, 2026 - 4:00 PM',
    status: 'Completed'
  },
  {
    id: 'f4',
    round: 3,
    roundName: 'Round 3 - Preliminary',
    govTeam: 'Chittagong College DC',
    oppTeam: 'Ispahani Eagles',
    govInstitution: 'Chittagong College',
    oppInstitution: 'Ispahani Public School & College',
    winner: 'Government',
    govPoints: 221.0,
    oppPoints: 218.0,
    motion: 'This House Supports carbon taxation on heavy industrial manufacturing in developing economies.',
    isSilentWeek: false,
    channel: 'discord-#room-3',
    dateTime: 'May 24, 2026 - 4:00 PM',
    status: 'Completed'
  },
  {
    id: 'f5',
    round: 4,
    roundName: 'Round 4 - Silent Week',
    govTeam: 'Collegiate Debaters Guild Alpha',
    oppTeam: 'CGS Vanguard',
    govInstitution: 'Chittagong Collegiate School',
    oppInstitution: 'Chittagong Grammar School',
    govPoints: 231.0,
    oppPoints: 228.5,
    winner: 'Government',
    motion: 'This House Would replace high-stakes standardized exams with continuous portfolio assessments.',
    isSilentWeek: true, // Results hidden during silent week until conclusion
    channel: 'discord-#silent-room-a',
    dateTime: 'June 01, 2026 - 5:00 PM',
    status: 'Completed'
  },
  {
    id: 'f6',
    round: 5,
    roundName: 'Round 5 - Upcoming',
    govTeam: 'St. Placids Elite',
    oppTeam: 'Faujdarhat Warriors',
    govInstitution: "St. Placid's School & College",
    oppInstitution: 'Faujdarhat Cadet College',
    isSilentWeek: false,
    channel: 'discord-#room-1',
    dateTime: 'June 15, 2026 - 4:00 PM',
    status: 'Upcoming'
  },
  {
    id: 'f7',
    round: 6,
    roundName: 'Round 6 - Upcoming',
    govTeam: 'CESC Titans',
    oppTeam: 'Mohsinian Speakers',
    govInstitution: 'Cantonment English School & College',
    oppInstitution: 'Govt. Hazi Mohammad Mohsin College',
    isSilentWeek: false,
    channel: 'discord-#room-2',
    dateTime: 'June 22, 2026 - 4:00 PM',
    status: 'Upcoming'
  }
];

export const INITIAL_ANNOUNCEMENTS: TournamentAnnouncement[] = [
  {
    id: 'ann1',
    title: '🔥 League of Spars Season 2 Officially Announced!',
    content: 'SSDC is thrilled to launch LoS 2.0 following a record-breaking Season 1! Pre-league orientation and captain briefings are set for May 05, 2026 on Discord.',
    date: '2026-04-28',
    tag: 'Notice',
    author: 'SSDC Organizing Committee'
  },
  {
    id: 'ann2',
    title: '📌 AP-ISC Format Rules & Silent Week Clarifications',
    content: 'Every participating institution will play every other once. Note that 1 week out of 4 is designated as a Silent Week—scores will be tallied internally and revealed at the grand finale.',
    date: '2026-05-02',
    tag: 'Rule Update',
    author: 'Adiba Anjum (Executive Convener)'
  },
  {
    id: 'ann3',
    title: '📢 Round 1 & Round 2 Fixtures Released',
    content: 'Fixtures for Round 1 and Round 2 are now live on the portal. Institutional executive representatives must reach out on the coordination group to finalize schedule slots.',
    date: '2026-05-08',
    tag: 'Pairings',
    author: 'Kayes Adnan (Tabulation Core)'
  }
];

export const INITIAL_MATERIALS: DebateMaterial[] = [
  {
    id: 'mat1',
    title: 'Official SSDC AP-ISC Debate Rulebook (LoS 2.0)',
    category: 'AP-ISC Format',
    description: 'Comprehensive guidelines detailing AP-ISC format, speaker timing (7 mins), POI rules, reply speeches, and tie-breaking criteria.',
    linkUrl: '#',
    fileType: 'PDF',
    downloadCount: 412
  },
  {
    id: 'mat2',
    title: 'Discord Tournament Arena Guide',
    category: 'Rules & Regulations',
    description: 'Step-by-step instructions on audio setup, roll call procedure, motion reveal protocol, and text chat POI etiquette on the SSDC Discord server.',
    linkUrl: 'https://discord.gg',
    fileType: 'Discord',
    downloadCount: 289
  },
  {
    id: 'mat3',
    title: 'International Relations & Geopolitics Matter Files',
    category: 'Matter Files',
    description: 'Curated briefings on contemporary international conflicts, multilateral trade agreements, sanction mechanisms, and climate diplomacy.',
    linkUrl: '#',
    fileType: 'PDF',
    downloadCount: 520
  },
  {
    id: 'mat4',
    title: 'SSDC Motion Bank (Season 1 Archive & Practice)',
    category: 'Motion Resources',
    description: 'Over 150+ motions used during LoS Season 1 and regional sparring competitions, categorized by theme and difficulty.',
    linkUrl: '#',
    fileType: 'DOC',
    downloadCount: 680
  }
];
