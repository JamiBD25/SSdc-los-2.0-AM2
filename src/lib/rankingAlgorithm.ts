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
    const rank = idx + 1;

    if (totalGames === 0) {
      breakStatus = 'N/A';
    } else if (rank <= 8) {
      breakStatus = 'Qualified';
    } else if (rank <= 12) {
      breakStatus = 'Contending';
    } else {
      breakStatus = 'Eliminated';
    }

    return {
      ...team,
      rank,
      totalSpeakerPoints: parseFloat((team.totalSpeakerPoints || 0).toFixed(1)),
      netMargin: parseFloat((team.netMargin || 0).toFixed(2)),
      breakStatus
    };
  });
};

/**
 * Official Tournament Auto-Ranking Algorithm for Individual Speakers / Debaters
 *
 * Rules:
 * 1. Minimum 5 Rounds Requirement: Debaters with >= 5 rounds (breakEligible) rank above those with < 5 rounds.
 * 2. Primary Rank Metric: Average Speaker Score (descending)
 * 3. Secondary Tie-Breaker: Rounds Spoken (descending)
 * 4. Tertiary Tie-Breaker (for sorting order): Total Points (descending), Best Single Round Score (descending), Speaker Name (ascending)
 * 5. Tied Position Assignment (1, 1, 3 rule): If eligibility, averageScore, and roundsSpoken are ALL equal,
 *    speakers receive the EXACT SAME rank number, and the next position skips accordingly.
 */
export const autoRankSpeakers = (speakersList: Speaker[], minRoundsThreshold: number = 5): Speaker[] => {
  const calculated = speakersList.map((s) => {
    const rounds = Math.max(0, s.roundsSpoken || 0);
    const totalPts = parseFloat((s.totalPoints || 0).toFixed(1));
    const avgScore = s.averageScore > 0 ? s.averageScore : (rounds > 0 ? parseFloat((totalPts / rounds).toFixed(2)) : 0);
    const bestScore = parseFloat((s.bestScore || 0).toFixed(1));
    const breakEligible = rounds >= minRoundsThreshold;

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
    // 1. Minimum 5 rounds requirement first
    if (a.breakEligible !== b.breakEligible) {
      return a.breakEligible ? -1 : 1;
    }
    // 2. Primary: Average Speaker Score (desc)
    if (b.averageScore !== a.averageScore) {
      return b.averageScore - a.averageScore;
    }
    // 3. Secondary: Rounds Spoken (desc)
    if (b.roundsSpoken !== a.roundsSpoken) {
      return b.roundsSpoken - a.roundsSpoken;
    }
    // 4. Tertiary: Total Speaker Points (desc)
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    // 5. Quaternary: Best Single Round Score (desc)
    if (b.bestScore !== a.bestScore) {
      return b.bestScore - a.bestScore;
    }
    // 6. Name (asc)
    return a.name.localeCompare(b.name);
  });

  let currentRank = 1;
  return calculated.map((s, idx) => {
    if (idx > 0) {
      const prev = calculated[idx - 1];
      const isTied =
        prev.breakEligible === s.breakEligible &&
        prev.averageScore === s.averageScore &&
        prev.roundsSpoken === s.roundsSpoken;

      if (!isTied) {
        currentRank = idx + 1;
      }
    } else {
      currentRank = 1;
    }

    return {
      ...s,
      rank: currentRank
    };
  });
};
