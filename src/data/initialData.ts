import { Team, Speaker, Adjudicator, TournamentAnnouncement } from '../types';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 't1',
    rank: 0,
    name: 'ROD Avash',
    institution: 'Regional Organization Debaters',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Prithwi Rajonna Purenota',
      'Durjoy Biswas',
      'Anindita Chowdhury',
      'Anannya Sen',
      'Antara Al Azmee Fabiha',
      'Ibrar Mahmud',
      'Syeda Rahatul Jannat',
      'Mahir Uddin',
      'Abo Bakar',
      'Ahnaf Imteaz Tawsif',
      'Shreeporna Dutta',
      'Saiontee Shil',
      'Tanvir Hossain',
      'Arman Chowdhury',
      'Mitu Rani Debi',
      'Md. Tahmid Sami'
    ]
  },
  {
    id: 't2',
    rank: 0,
    name: 'CCDS-প্রত্যুপন্নমতি',
    institution: 'Chittagong Collegiate Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Sabbir Hossain',
      'Ahnaf Azim',
      'Mahiya Marzan',
      'Fairoj Zahin Ahona',
      'Iftekhar Ahmad Sifat',
      'Jit Chowdhury',
      'Ayshawrja Chakraborty Purna'
    ]
  },
  {
    id: 't3',
    rank: 0,
    name: 'CCPC—Q',
    institution: 'Chittagong Cantonment Public College',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Adnan Hasan Fuad',
      'Hossain Mansur Khaleed',
      'Tahsin Jahan Bhuiyan',
      'Shah Poran',
      'Pritu Dhar'
    ]
  },
  {
    id: 't4',
    rank: 0,
    name: 'SPSC—1',
    institution: "St. Placid's School & College",
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Ashan Bari',
      'Azaan Sarwar',
      'Arjya Dhar',
      'Wali Islam Khan',
      'Tamhid Noor',
      'Aritra Das Gupta',
      'Rudranil Chakraborty'
    ]
  },
  {
    id: 't5',
    rank: 0,
    name: 'NGHSDS Enzyme',
    institution: 'Nasirabad Govt. High School Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Araf Mortuza', 'Nirjhor', 'Tajwar Bin Taiyab', 'Shimanto', 'Jabir']
  },
  {
    id: 't6',
    rank: 0,
    name: 'BMSDS',
    institution: 'Bangladesh Mahila Samiti Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Wasima Rahman', 'Maliha Hossain', 'Arafa Islam Rafiah', 'Ainun Zaria', 'Takia Tafannum']
  },
  {
    id: 't7',
    rank: 0,
    name: 'DKSDS',
    institution: "Dr. Khastagir Govt. Girls' High School Debating Society",
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Samara', 'Bidushi', 'Simrah', 'Rajkumari', 'Rufaida', 'Jikra', 'Abeedah', 'Maleha']
  },
  {
    id: 't8',
    rank: 0,
    name: 'Kccmc',
    institution: "Kapasgola City Corp. Women's College",
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Anupa Ruliya', 'Alisha Jashim', 'Sanjida Fairoj Nithu', 'Nusaiba Islam Chy', 'Homyra Fairuz']
  },
  {
    id: 't9',
    rank: 0,
    name: 'BSDC পলাশীর প্রান্তর',
    institution: 'Bakalia Government High School Debating Club',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Tamim Iqbal', 'Raiyan Siddique Talha', 'Nour Mohammed Nayem', 'Abdullah Al Zeenan', 'Noor Mohammad']
  },
  {
    id: 't10',
    rank: 0,
    name: 'CSDS Metaphor',
    institution: 'Chittagong Sunshine Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Mohammad Tahmidul Alam', 'Adiyath Arish', 'Syed Shadman Adib', 'Samanta Barua', 'Prodipto Sarkar', 'Utshob Roy']
  },
  {
    id: 't11',
    rank: 0,
    name: 'MCDC',
    institution: 'Cantonment English School & College',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Rownak Kulsum',
      'Purnota Jahan',
      'Tasnia Kamal Radiba',
      'Tamim Faisal',
      'Araf Rahman',
      'Nuha Alam',
      'Rujhan Al Shabeeb',
      'Arham Hanif',
      'Ahmed Shaihan',
      'Asadullah Saad'
    ]
  },
  {
    id: 't12',
    rank: 0,
    name: 'GMHSDS',
    institution: 'Govt. Muslim High School Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Sarar', 'Aslam Sadaf', 'Hasin Mejbah Arian', 'Omar Faruk Tamim', 'Saafir Al Islam']
  },
  {
    id: 't13',
    rank: 0,
    name: 'BGCDS প্রত্যাবর্তন',
    institution: 'Bakalia Govt. College Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Nowad Islam Chowdhury',
      'Rehan Hossain',
      'Shalbina Dil Afruz',
      'Meheraz Azfar Chowdhury',
      'Maisha Jabin',
      'Rasheda Begum Rupa',
      'Wrigdha Paul Turnab',
      'Tasdique Al Wahid Chowdhury',
      'Faria Mahin',
      'Rahima Kawser Maya Chowdhury',
      'Tasimol Irin Khan',
      'Tamim Hassan Sikder'
    ]
  },
  {
    id: 't14',
    rank: 0,
    name: 'ccpc Veritas',
    institution: 'Chittagong Cantonment Public College',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Manha Mukarrama',
      'Nadira Anjum',
      'Jannathut Taieba',
      'Tahsin Nanziba',
      'Fawzia Binte Abdullah',
      'Safiul Karim',
      'Syed Sajid Rahman',
      'Anusha Shehreen Islam',
      'Arisha Subah Siddique'
    ]
  },
  {
    id: 't15',
    rank: 0,
    name: 'CESDS',
    institution: 'Chittagong Engineering University School',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Zahin Sharif Khan',
      'Mohammad Al-Jayed Uddin Trisan',
      'Mahiur Rahman',
      'Md Tasnimul Chy Tawsif',
      'Samantha Makareem'
    ]
  },
  {
    id: 't16',
    rank: 0,
    name: 'ADSAkashChowa',
    institution: 'Anwara Debating Society',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: ['Hafsa Binte Ayub', 'Umaima Mobin', 'Rabita Tabassum', 'Miskatun Noor Payel', 'Shohrah Rakshan']
  }
];

export const INITIAL_SPEAKERS: Speaker[] = INITIAL_TEAMS.flatMap((team) =>
  team.roster.map((debaterName, debaterIdx) => ({
    id: `s_${team.id}_${debaterIdx + 1}`,
    rank: 0,
    name: debaterName,
    teamName: team.name,
    institution: team.institution,
    totalPoints: 0,
    roundsSpoken: 0,
    averageScore: 0,
    bestScore: 0,
    breakEligible: false
  }))
);

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
