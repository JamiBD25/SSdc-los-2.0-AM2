import { Team, Speaker } from '../types';

/**
 * Official Tournament Auto-Ranking Algorithm for Teams
 * Tie-Breaker Logic:
 * 1. Primary: Wins (desc)
 * 2. Secondary: Total Speaker Points (desc)
 * 3. Tertiary: Net Speaker Margin (desc)
 * 4. Quaternary: Fewest Losses (asc)
 * 5. Quinquenary: Team Name (asc)
 */
export const autoRankTeams = (teamsList: Team[]): Team[] => {
  const sorted = [...teamsList].sort((a, b) => {
    if (b.win !== a.win) return b.win - a.win;
    if (b.totalSpeakerPoints !== a.totalSpeakerPoints) return b.totalSpeakerPoints - a.totalSpeakerPoints;
    if (b.netMargin !== a.netMargin) return b.netMargin - a.netMargin;
    if (a.loss !== b.loss) return a.loss - b.loss;
    return a.name.localeCompare(b.name);
  });

  return sorted.map((team, idx) => {
    const totalGames = team.win + team.loss;
    let breakStatus: Team['breakStatus'] = 'N/A';

    if (totalGames === 0) {
      breakStatus = 'N/A';
    } else if (team.win >= 3) {
      breakStatus = 'Qualified';
    } else if (team.win >= 2) {
      breakStatus = 'Contending';
    } else {
      breakStatus = 'Eliminated';
    }

    return {
      ...team,
      rank: idx + 1,
      totalSpeakerPoints: parseFloat((team.totalSpeakerPoints || 0).toFixed(1)),
      netMargin: parseFloat((team.netMargin || 0).toFixed(1)),
      breakStatus
    };
  });
};

/**
 * Official Tournament Auto-Ranking Algorithm for Individual Speakers / Debaters
 * Tie-Breaker Logic:
 * 1. Primary: Total Speaker Points (desc)
 * 2. Secondary: Average Speaker Score (desc)
 * 3. Tertiary: Best Single Round Score (desc)
 * 4. Quaternary: Rounds Spoken (desc)
 * 5. Quinquenary: Speaker Name (asc)
 */
export const autoRankSpeakers = (speakersList: Speaker[]): Speaker[] => {
  const calculated = speakersList.map((s) => {
    const rounds = Math.max(0, s.roundsSpoken || 0);
    const totalPts = parseFloat((s.totalPoints || 0).toFixed(1));
    const avgScore = rounds > 0 ? parseFloat((totalPts / rounds).toFixed(2)) : 0;
    const bestScore = parseFloat((s.bestScore || 0).toFixed(1));
    const breakEligible = rounds >= 3;

    return {
      ...s,
      roundsSpoken: rounds,
      totalPoints: totalPts,
      averageScore: avgScore,
      bestScore,
      breakEligible
    };
  });

  calculated.sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.averageScore !== a.averageScore) return b.averageScore - a.averageScore;
    if (b.bestScore !== a.bestScore) return b.bestScore - a.bestScore;
    if (b.roundsSpoken !== a.roundsSpoken) return b.roundsSpoken - a.roundsSpoken;
    return a.name.localeCompare(b.name);
  });

  return calculated.map((s, idx) => ({
    ...s,
    rank: idx + 1
  }));
};
