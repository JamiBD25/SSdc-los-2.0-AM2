import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Team, Speaker, Adjudicator, TabSheetEntry, SupabaseConfig } from '../types';

const STORAGE_KEY_URL = 'ssdc_supabase_url';
const STORAGE_KEY_KEY = 'ssdc_supabase_key';

let inMemoryServerUrl = '';
let inMemoryServerKey = '';

export async function initGlobalSupabaseConfig(): Promise<SupabaseConfig> {
  try {
    const res = await fetch('/api/config/supabase');
    if (res.ok) {
      const data = await res.json();
      if (data.url && data.anonKey) {
        inMemoryServerUrl = data.url.trim();
        inMemoryServerKey = data.anonKey.trim();
        localStorage.setItem(STORAGE_KEY_URL, inMemoryServerUrl);
        localStorage.setItem(STORAGE_KEY_KEY, inMemoryServerKey);
        cachedClient = null; // Clear cached client so getSupabaseClient picks up new config immediately
      }
    }
  } catch (e) {
    console.warn('Failed to fetch global Supabase config from server:', e);
  }
  return getStoredSupabaseConfig();
}

export function getStoredSupabaseConfig(): SupabaseConfig {
  const metaEnv = (import.meta as any).env || {};
  const envUrl = metaEnv.VITE_SUPABASE_URL || '';
  const envKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  const localUrl = localStorage.getItem(STORAGE_KEY_URL) || inMemoryServerUrl || envUrl;
  const localKey = localStorage.getItem(STORAGE_KEY_KEY) || inMemoryServerKey || envKey;

  const isConnected = Boolean(
    localUrl &&
    localKey &&
    localUrl.startsWith('http') &&
    localUrl !== 'https://your-supabase-project.supabase.co'
  );

  return {
    url: localUrl,
    anonKey: localKey,
    isConnected
  };
}

export async function saveSupabaseConfig(url: string, anonKey: string): Promise<boolean> {
  const cleanUrl = url.trim();
  const cleanKey = anonKey.trim();

  localStorage.setItem(STORAGE_KEY_URL, cleanUrl);
  localStorage.setItem(STORAGE_KEY_KEY, cleanKey);

  inMemoryServerUrl = cleanUrl;
  inMemoryServerKey = cleanKey;
  cachedClient = null; // reset client cache

  try {
    const res = await fetch('/api/config/supabase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleanUrl, anonKey: cleanKey })
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to persist Supabase config to server:', err);
    return false;
  }
}

let cachedClient: SupabaseClient | null = null;
let lastClientUrl = '';
let lastClientKey = '';

export function getSupabaseClient(): SupabaseClient | null {
  const config = getStoredSupabaseConfig();
  if (!config.isConnected) return null;

  if (cachedClient && lastClientUrl === config.url && lastClientKey === config.anonKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    lastClientUrl = config.url;
    lastClientKey = config.anonKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

// ==========================================
// SUPABASE API HELPER FUNCTIONS FOR POINTS
// ==========================================

export async function fetchTeamsFromSupabase(): Promise<Team[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('teams')
      .select('*')
      .range(0, 9999)
      .order('rank', { ascending: true });

    if (error) {
      console.warn('Supabase fetch teams error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map((t: any) => ({
        id: t.id,
        rank: Number(t.rank) || 1,
        name: t.name,
        institution: t.institution,
        win: Number(t.win) || 0,
        loss: Number(t.loss) || 0,
        totalSpeakerPoints: Number(t.total_speaker_points || t.totalSpeakerPoints) || 0,
        netMargin: Number(t.net_margin || t.netMargin) || 0,
        breakStatus: t.break_status || t.breakStatus || 'N/A',
        roster: Array.isArray(t.roster) ? t.roster : JSON.parse(t.roster || '[]')
      }));
    }
  } catch (err) {
    console.warn('Error connecting to Supabase teams:', err);
  }
  return null;
}

export async function saveTeamsToSupabase(teams: Team[], clearFirst = false): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    if (clearFirst) {
      await client.from('teams').delete().neq('id', 'clear_override');
    }

    const records = teams.map((t) => ({
      id: t.id,
      rank: t.rank,
      name: t.name,
      institution: t.institution,
      win: t.win,
      loss: t.loss,
      total_speaker_points: t.totalSpeakerPoints,
      net_margin: t.netMargin,
      break_status: t.breakStatus,
      roster: JSON.stringify(t.roster)
    }));

    const { error } = await client.from('teams').upsert(records, { onConflict: 'id' });
    if (error) {
      console.warn('Supabase upsert teams failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving teams to Supabase:', err);
    return false;
  }
}

export async function fetchSpeakersFromSupabase(): Promise<Speaker[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('speakers')
      .select('*')
      .range(0, 9999)
      .order('rank', { ascending: true });

    if (error) {
      console.warn('Supabase fetch speakers error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map((s: any) => ({
        id: s.id,
        rank: Number(s.rank) || 1,
        name: s.name,
        teamName: s.team_name || s.teamName,
        institution: s.institution,
        totalPoints: Number(s.total_points || s.totalPoints) || 0,
        roundsSpoken: Number(s.rounds_spoken || s.roundsSpoken) || 0,
        averageScore: Number(s.average_score || s.averageScore) || 0,
        bestScore: Number(s.best_score || s.bestScore) || 0,
        breakEligible: Boolean(s.break_eligible ?? s.breakEligible)
      }));
    }
  } catch (err) {
    console.warn('Error connecting to Supabase speakers:', err);
  }
  return null;
}

export async function saveSpeakersToSupabase(speakers: Speaker[], clearFirst = false): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    if (clearFirst) {
      await client.from('speakers').delete().neq('id', 'clear_override');
    }

    const records = speakers.map((s) => ({
      id: s.id,
      rank: s.rank,
      name: s.name,
      team_name: s.teamName,
      institution: s.institution,
      total_points: s.totalPoints,
      rounds_spoken: s.roundsSpoken,
      average_score: s.averageScore,
      best_score: s.bestScore,
      break_eligible: s.breakEligible
    }));

    const { error } = await client.from('speakers').upsert(records, { onConflict: 'id' });
    if (error) {
      console.warn('Supabase upsert speakers failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving speakers to Supabase:', err);
    return false;
  }
}

export async function clearSpeakersFromSupabase(): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('speakers').delete().neq('id', 'clear_all_override');
    if (error) {
      console.warn('Supabase clear speakers failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error clearing speakers from Supabase:', err);
    return false;
  }
}

// ==========================================
// SUPABASE ADJUDICATOR FUNCTIONS
// ==========================================

export async function fetchAdjudicatorsFromSupabase(): Promise<Adjudicator[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('adjudicators')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.warn('Supabase fetch adjudicators error:', error.message);
      return null;
    }

    if (data && data.length > 0) {
      return data.map((a: any) => ({
        id: a.id,
        name: a.name,
        institution: a.institution || '',
        role: a.role || 'Accredited Judge',
        roundsJudged: Number(a.rounds_judged || a.roundsJudged) || 0,
        rating: Number(a.rating) || 8.0,
        bio: a.bio || '',
        imageUrl: a.image_url || a.imageUrl || ''
      }));
    }
  } catch (err) {
    console.warn('Error connecting to Supabase adjudicators:', err);
  }
  return null;
}

export async function saveAdjudicatorsToSupabase(adjudicators: Adjudicator[], clearFirst = false): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    if (clearFirst) {
      await client.from('adjudicators').delete().neq('id', 'clear_override');
    }

    const records = adjudicators.map((a) => ({
      id: a.id,
      name: a.name,
      institution: a.institution,
      role: a.role,
      rounds_judged: a.roundsJudged,
      rating: a.rating,
      bio: a.bio,
      image_url: a.imageUrl || ''
    }));

    const { error } = await client.from('adjudicators').upsert(records, { onConflict: 'id' });
    if (error) {
      console.warn('Supabase upsert adjudicators failed:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving adjudicators to Supabase:', err);
    return false;
  }
}

export async function deleteAdjudicatorFromSupabase(id: string): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const { error } = await client.from('adjudicators').delete().eq('id', id);
    if (error) {
      console.warn('Error deleting adjudicator from Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Exception deleting adjudicator:', err);
    return false;
  }
}

export async function fetchTabEntriesFromSupabase(): Promise<TabSheetEntry[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('tab_entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return null;

    if (data && data.length > 0) {
      return data.map((e: any) => ({
        id: e.id,
        roundNumber: Number(e.round_number || e.roundNumber) || 1,
        govTeamId: e.gov_team_id || e.govTeamId,
        oppTeamId: e.opp_team_id || e.oppTeamId,
        govSpeaker1Name: e.gov_speaker_1_name || '',
        govSpeaker1Score: Number(e.gov_speaker_1_score) || 75,
        govSpeaker2Name: e.gov_speaker_2_name || '',
        govSpeaker2Score: Number(e.gov_speaker_2_score) || 75,
        govSpeaker3Name: e.gov_speaker_3_name || '',
        govSpeaker3Score: Number(e.gov_speaker_3_score) || 75,
        govReplyScore: Number(e.gov_reply_score) || 37.5,
        oppSpeaker1Name: e.opp_speaker_1_name || '',
        oppSpeaker1Score: Number(e.opp_speaker_1_score) || 75,
        oppSpeaker2Name: e.opp_speaker_2_name || '',
        oppSpeaker2Score: Number(e.opp_speaker_2_score) || 75,
        oppSpeaker3Name: e.opp_speaker_3_name || '',
        oppSpeaker3Score: Number(e.opp_speaker_3_score) || 75,
        oppReplyScore: Number(e.opp_reply_score) || 37.5,
        winner: e.winner || 'Government',
        adjudicatorName: e.adjudicator_name || 'Panel CA',
        createdAt: e.created_at
      }));
    }
  } catch (err) {
    console.warn('Error fetching tab entries from Supabase:', err);
  }
  return null;
}

export async function saveTabEntryToSupabase(entry: TabSheetEntry): Promise<boolean> {
  const client = getSupabaseClient();
  if (!client) return false;

  try {
    const record = {
      id: entry.id,
      round_number: entry.roundNumber,
      gov_team_id: entry.govTeamId,
      opp_team_id: entry.oppTeamId,
      gov_speaker_1_name: entry.govSpeaker1Name,
      gov_speaker_1_score: entry.govSpeaker1Score,
      gov_speaker_2_name: entry.govSpeaker2Name,
      gov_speaker_2_score: entry.govSpeaker2Score,
      gov_speaker_3_name: entry.govSpeaker3Name,
      gov_speaker_3_score: entry.govSpeaker3Score,
      gov_reply_score: entry.govReplyScore,
      opp_speaker_1_name: entry.oppSpeaker1Name,
      opp_speaker_1_score: entry.oppSpeaker1Score,
      opp_speaker_2_name: entry.oppSpeaker2Name,
      opp_speaker_2_score: entry.oppSpeaker2Score,
      opp_speaker_3_name: entry.oppSpeaker3Name,
      opp_speaker_3_score: entry.oppSpeaker3Score,
      opp_reply_score: entry.oppReplyScore,
      winner: entry.winner,
      adjudicator_name: entry.adjudicatorName
    };

    const { error } = await client.from('tab_entries').upsert([record], { onConflict: 'id' });
    if (error) {
      console.warn('Error saving tab entry to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase exception saving tab entry:', err);
    return false;
  }
}
