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
      'Durjoy biswas',
      'Anindita Chowdhury',
      'Anannya Sen',
      'Antara Al Azmee Fabiha',
      'Ibrar Mahmud',
      'Mahir Uddin',
      'Abo Bakar',
      'Ahnaf Imteaz Tawsif',
      'Shreeporna Dutta',
      'Saiontee Shil',
      'Tanvir Hossain',
      'Arman Chowdhury',
      'Mitu Rani Debi',
      'Md. Tahmid Sami',
      'Rahatul Zannat'
    ]
  },
  {
    id: 't2',
    rank: 0,
    name: 'CCDS প্রত্যুৎপন্নমতি',
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
      'Ayshawrja Chakraborty Purna',
      'labib Hasan'
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
    name: 'SPSC 1',
    institution: "St. Placid's School & College",
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Ziaul Hasib',
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
    roster: [
      'Md Ayaz Muhtasim',
      'Araf Mortuza',
      'Nirjhor',
      'Tajwar Bin Taiyab',
      'Shimanto',
      'Jabir',
      'Nabil Rahman'
    ]
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
    roster: [
      'Wasima Rahman',
      'Maliha Hossain',
      'Arafa Islam Rafiah',
      'Ainun Zaria',
      'Takia Tafannum',
      'Tamjida Sultana',
      'Hujaifa jannat Alifa',
      'Fariha Tasnim',
      'Arshi Humayra',
      'Aliya Farzeen Arisha',
      'Jeba tahsin',
      'Maimuna binte Azad',
      'Tohfatul Kobra'
    ]
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
    roster: [
      'Samara',
      'Bidushi',
      'Simrah',
      'Rajkumari',
      'Rufaida',
      'Jikra',
      'Abeedah',
      'Maleha',
      'Amrita Sen',
      'Anusmrita Chowdhury'
    ]
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
    roster: [
      'Anupa ruliya',
      'Alisha jashim',
      'Sanjida Fairoj Nithu',
      'Nusaiba islam Chy',
      'Homyra Fairuz',
      'Oindrela das Gupta'
    ]
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
    roster: [
      'Tamim Iqbal',
      'Raiyan Siddique Talha',
      'Nour Mohammed Nayem',
      'Abdullah Al Zeenan',
      'Noor Mohammad'
    ]
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
    roster: [
      'Mohammad Tahmidul Alam',
      'Adiyath Arish',
      'Syed Shadman Adib',
      'Samanta Barua',
      'Prodipto Sarkar',
      'Utshob Roy'
    ]
  },
  {
    id: 't11',
    rank: 0,
    name: 'MCDC Casuals',
    institution: 'Cantonment English School & College',
    win: 0,
    loss: 0,
    totalSpeakerPoints: 0,
    netMargin: 0,
    breakStatus: 'N/A',
    roster: [
      'Anindo Chowdhury',
      'Rownak Kulsum',
      'Purnota Jahan',
      'Tasnia Kamal Radiba',
      'Tamim Faisal',
      'Araf Rahman',
      'Nuha Alam',
      'Rujhan Al Shabeeb',
      'Arham Hanif',
      'Ahmed Shaihan',
      'Asadullah Saad',
      'Abida Sultana Arnima'
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
    roster: [
      'Sarar',
      'Aslam Sadaf',
      'Hasin Mejbah Arian',
      'Omar Faruk Tamim',
      'Saafir Al Islam'
    ]
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
    name: 'Veritas',
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
      'safiul karim',
      'Syed Sajid rahman',
      'Anusha Shehreen Islam',
      'Arisha Subah Siddique'
    ]
  },
  {
    id: 't15',
    rank: 0,
    name: 'CESCDC',
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
      'Samantha Makareem',
      'Radeya Jahra'
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
    roster: [
      'Hafsa Binte Ayub',
      'Umaima Mobin',
      'Rabita Tabassum',
      'Miskatun Noor Payel',
      'Shohrah Rakshan'
    ]
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
    id: 'adj_1',
    name: 'Abdullah Abeer',
    institution: 'SSDC Core Adjudicator',
    role: 'Adjudicator',
    roundsJudged: 12,
    rating: 4.9,
    bio: 'Core adjudication panelist with extensive experience in Asian Parliamentary & AP-ISC circuits.',
    imageUrl: 'https://i.postimg.cc/GtZq8cTN/Abdullah-Abeer-(2).png'
  },
  {
    id: 'adj_2',
    name: 'Adil Raihan',
    institution: 'CUET Debating Society',
    role: 'Adjudicator',
    roundsJudged: 10,
    rating: 4.8,
    bio: 'Specialist in public policy, economics, and international relations motion evaluation.',
    imageUrl: 'https://i.postimg.cc/GmnXbmR0/Adil-Raihan.png'
  },
  {
    id: 'adj_3',
    name: 'Anas Faisal',
    institution: 'Chittagong Medical College',
    role: 'Adjudicator',
    roundsJudged: 10,
    rating: 4.8,
    bio: 'Experienced debater and adjudicator across national & regional inter-school platforms.',
    imageUrl: 'https://i.postimg.cc/x1Ph7zzX/Anas-Faisal-(1).png'
  },
  {
    id: 'adj_4',
    name: 'Asadullahil Galib',
    institution: 'BUET Debating Club',
    role: 'Adjudicator',
    roundsJudged: 9,
    rating: 4.7,
    bio: 'Distinguished AP circuit adjudicator specializing in logic frameworks & POI evaluation.',
    imageUrl: 'https://i.postimg.cc/GtBXmB9d/Asadullahil-Galib-(1).png'
  },
  {
    id: 'adj_5',
    name: 'Barua Param',
    institution: 'Chittagong University Debate Forum',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Seasoned debater with 50+ rounds judged in national debating championships.',
    imageUrl: 'https://i.postimg.cc/vBTz01rY/Barua-Param.png'
  },
  {
    id: 'adj_6',
    name: 'Dhiman Bhattacharjee',
    institution: 'Dhaka University Debating Society',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.6,
    bio: 'Experienced in evaluating philosophical, social, and geopolitical debate motions.',
    imageUrl: 'https://i.postimg.cc/fknfWB6Q/Dhiman-Bhattacharjee-(1).png'
  },
  {
    id: 'adj_7',
    name: 'Erfan Apurbo',
    institution: 'IUT Debating Society',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Focuses on structured matter analysis, argument breakdown, and speaker feedback.',
    imageUrl: 'https://i.postimg.cc/J7gTdQd4/Erfan-Apurbo.png'
  },
  {
    id: 'adj_8',
    name: 'Esrat Jahan Sumpa',
    institution: 'North South University Debate Club',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Adjudicated regional tournaments with focus on speaker presentation & rebuttals.',
    imageUrl: 'https://i.postimg.cc/fbw50qk0/Esrat-Jahan-Sumpa.png'
  },
  {
    id: 'adj_9',
    name: 'F. A. M. Ayon',
    institution: 'BUP Economics Club & Debate',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Active circuit adjudicator with high rating across preliminary & break rounds.',
    imageUrl: 'https://i.postimg.cc/0yvhcfbr/FAM-Ayon-(1).png'
  },
  {
    id: 'adj_10',
    name: 'Inzamamul Haque Ayon',
    institution: 'Chittagong College Debate Club',
    role: 'Adjudicator',
    roundsJudged: 9,
    rating: 4.7,
    bio: 'Senior circuit debater and experienced adjudicator for League of Spars.',
    imageUrl: 'https://i.postimg.cc/fy0vh6qK/Inzamamul-Haque-Ayon.png'
  },
  {
    id: 'adj_11',
    name: 'Kamrul Ahsan Mahir',
    institution: 'Dhaka College Debating Club',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Expert judge focusing on case construction, reply speech impact, and engagement.',
    imageUrl: 'https://i.postimg.cc/xdt5GGbh/Kamrul-Ahsan-Mahir.png'
  },
  {
    id: 'adj_12',
    name: 'Koushick Kabbya',
    institution: 'Shahjalal University Debating Society',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Comprehensive matter and manner evaluator in parliamentary debate formats.',
    imageUrl: 'https://i.postimg.cc/MKVh74Kw/Koushick-Kabbya-(1).png'
  },
  {
    id: 'adj_13',
    name: 'Koushik Dev Nath',
    institution: 'CUET Debating Society',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Specialist in scientific ethics and technology policy motions.',
    imageUrl: 'https://i.postimg.cc/rst9LvY6/Koushik-Dev-Nath.png'
  },
  {
    id: 'adj_14',
    name: 'Maruf Islam Munna',
    institution: 'Rajshahi University Debating Organization',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.6,
    bio: 'National level debater with extensive adjudication credits across divisional leagues.',
    imageUrl: 'https://i.postimg.cc/rmsJfd15/Maruf-Islam-Munna.png'
  },
  {
    id: 'adj_15',
    name: 'MD. Ridwan Ahmed',
    institution: 'Jahangirnagar University Debate Organization',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Focused on clash identification and comparative analysis in team arguments.',
    imageUrl: 'https://i.postimg.cc/g2p1NDnk/MD-Ridwan-Ahmed-(1).png'
  },
  {
    id: 'adj_16',
    name: 'Minhazul Monowar',
    institution: 'Khulna University Debating Club',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Adjudicator with background in economics & constitutional debate motions.',
    imageUrl: 'https://i.postimg.cc/fT9H406y/Minhazul-Monowar.png'
  },
  {
    id: 'adj_17',
    name: 'Misbah Uz Zamal',
    institution: 'Brac University Debate Club',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Regular adjudicator for national inter-college and inter-university tournaments.',
    imageUrl: 'https://i.postimg.cc/ZqVHPPys/Misbah-Uz-Zamal.png'
  },
  {
    id: 'adj_18',
    name: 'Mobarak Hossen Sojib',
    institution: 'Comilla University Debating Society',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Detailed note-taker providing constructive feedback to debaters.',
    imageUrl: 'https://i.postimg.cc/ZYBkRnGt/Mobarak-Hossen-Sojib-(1).png'
  },
  {
    id: 'adj_19',
    name: 'Mohammad Yasir Afnan Rafin',
    institution: 'SSDC Senior Panelist',
    role: 'Adjudicator',
    roundsJudged: 9,
    rating: 4.8,
    bio: 'Senior SSDC adjudicator presiding over high-stakes preliminary rounds.',
    imageUrl: 'https://i.postimg.cc/nL02KKDH/Mohammad-Yasir-Afnan-Rafin.png'
  },
  {
    id: 'adj_20',
    name: 'Mubarrat-E-Ishmum',
    institution: 'Independent University Bangladesh (IUB)',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Parliamentary debate enthusiast with multiple judging credits.',
    imageUrl: 'https://i.postimg.cc/nzrk3s4L/Mubarrat-E-Ishmum.png'
  },
  {
    id: 'adj_21',
    name: 'Mubdee Rafin',
    institution: 'East West University Debating Club',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Precision-focused judge with expertise in burden of proof distribution.',
    imageUrl: 'https://i.postimg.cc/d3T9KzN5/Mubdee-Rafin.png'
  },
  {
    id: 'adj_22',
    name: 'Muhammad Bakhtiar',
    institution: 'Chittagong Cantonment Public College',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Experienced college adjudicator specializing in structural debate principles.',
    imageUrl: 'https://i.postimg.cc/PfpGxJgd/Muhammad-Bakhtiar-(1).png'
  },
  {
    id: 'adj_23',
    name: 'Nayeem Uddin Rafi',
    institution: 'Foujdarhat Cadet College Alumnus',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Distinguished cadet debate alumnus with keen eye for strategic POIs.',
    imageUrl: 'https://i.postimg.cc/Y2J5mk7r/Nayeem-Uddin-Rafi.png'
  },
  {
    id: 'adj_24',
    name: 'Protik Talukder',
    institution: 'Chittagong University',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Active debater and judge across regional inter-school debate championships.',
    imageUrl: 'https://i.postimg.cc/90qBjvNm/Protik-Talukder.png'
  },
  {
    id: 'adj_25',
    name: 'Quazi Mohammad Aldin Fardin',
    institution: 'St. Joseph Higher Secondary School Alumnus',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Renowned school circuit debater turned accredited judge.',
    imageUrl: 'https://i.postimg.cc/tJL2ZXnw/Quazi-Mohammad-Aldin-Fardin.png'
  },
  {
    id: 'adj_26',
    name: 'Ratul Paul',
    institution: 'Sylhet Engineering College',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Specialist in tech ethics and international governance motions.',
    imageUrl: 'https://i.postimg.cc/qM3mfC9X/Ratul-Paul.png'
  },
  {
    id: 'adj_27',
    name: 'Ratul Sheikh',
    institution: 'Notre Dame Debating Club Alumnus',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Former national champion speaker turned panel adjudicator.',
    imageUrl: 'https://i.postimg.cc/W4bCP1G9/Ratul-Sheikh-(1).png'
  },
  {
    id: 'adj_28',
    name: 'Saima Ahmed Chowdhury',
    institution: 'Asian University for Women (AUW)',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Expert on gender studies, human rights, and socio-economic motions.',
    imageUrl: 'https://i.postimg.cc/W3dyhYff/Saima-Ahmed-Chowdhury-(1).png'
  },
  {
    id: 'adj_29',
    name: 'Sarjil Mahmud Khan',
    institution: 'Dhaka Residential Model College Alumnus',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Veteran circuit adjudicator with high participant feedback ratings.',
    imageUrl: 'https://i.postimg.cc/2yBxfPXY/Sarjil-Mahmud-Khan.png'
  },
  {
    id: 'adj_30',
    name: 'Shamima Sharif',
    institution: "Chittagong Govt. Women's College",
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Dedicated debate mentor and experienced panel member.',
    imageUrl: 'https://i.postimg.cc/7Y2BvTpS/Shamima-Sharif.png'
  },
  {
    id: 'adj_31',
    name: 'Shariful Kader Rakib',
    institution: 'International Islamic University Chittagong',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Focused on logical rigor and strategic extension analysis.',
    imageUrl: 'https://i.postimg.cc/pTSB42Cp/Shariful-Kader-Rakib.png'
  },
  {
    id: 'adj_32',
    name: 'Shimanta Das',
    institution: 'Chittagong Govt. High School Alumnus',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Passionate adjudicator supporting school-level debater development.',
    imageUrl: 'https://i.postimg.cc/3xhznBdd/Shimanta-Das-(1).png'
  },
  {
    id: 'adj_33',
    name: 'Simanta Majumdar Utsho',
    institution: 'Premier University Debate Club',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Analytic judge focused on rebuttal effectiveness and team dynamics.',
    imageUrl: 'https://i.postimg.cc/765RftQM/Simanta-Majumdar-Utsho-(1).png'
  },
  {
    id: 'adj_34',
    name: 'SK Abdullah Mahdi',
    institution: 'SSDC Organizing Core',
    role: 'Adjudicator',
    roundsJudged: 9,
    rating: 4.8,
    bio: 'Key contributor to League of Spars motion review and adjudication quality.',
    imageUrl: 'https://i.postimg.cc/nL02KKDf/SK-Abdullah-Mahdi.png'
  },
  {
    id: 'adj_35',
    name: 'Tahmid Efty',
    institution: 'Chittagong Collegiate School Alumnus',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Experienced school league adjudicator with high rating metrics.',
    imageUrl: 'https://i.postimg.cc/T1yt3yhG/Tahmid-Efty.png'
  },
  {
    id: 'adj_36',
    name: 'Tonmoy Tahsin',
    institution: 'MIST Debating Club',
    role: 'Adjudicator',
    roundsJudged: 6,
    rating: 4.5,
    bio: 'Focuses on structured argument weights and evidence evaluation.',
    imageUrl: 'https://i.postimg.cc/ZYBkRnGS/Tonmoy-Tahsin-(1).png'
  },
  {
    id: 'adj_37',
    name: 'Wahidul Islam Akib',
    institution: 'Bakalia Govt. College Alumnus',
    role: 'Adjudicator',
    roundsJudged: 7,
    rating: 4.6,
    bio: 'Active judge across divisional AP and parliamentary tournaments.',
    imageUrl: 'https://i.postimg.cc/NMKn5CPJ/Wahidul-Islam-Akib-(1).png'
  },
  {
    id: 'adj_38',
    name: 'Abdullah Al Muhtasim',
    institution: 'Government Hazi Mohammad Mohsin College',
    role: 'Adjudicator',
    roundsJudged: 8,
    rating: 4.7,
    bio: 'Senior debate enthusiast with extensive adjudication feedback records.',
    imageUrl: 'https://i.postimg.cc/GhkCrzsp/Abdullah-Al-Muhtasim.png'
  },
  {
    id: 'adj_39',
    name: 'Shafayet Maruf',
    institution: 'SSDC Core Adjudicator',
    role: 'Adjudicator',
    roundsJudged: 10,
    rating: 4.8,
    bio: 'Presiding adjudicator ensuring fair, balanced, and transparent tab results.',
    imageUrl: 'https://i.postimg.cc/dt8YvnTV/Shafayet-Maruf.png'
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
