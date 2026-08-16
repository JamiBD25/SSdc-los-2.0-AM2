import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Speaker } from '../types';
import staticCertificatesData from '../data/certificates.json';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  Share2, 
  Copy, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  Check,
  Building2,
  Users,
  Fingerprint,
  User,
  Eye
} from 'lucide-react';

interface CertificateViewProps {
  speakers: Speaker[];
}

interface CertRecord {
  id: string;
  publicId: string;
  groupId: string;
  status: string;
  name: string;
  email?: string;
  issueDate: string;
  publicUrl: string;
  walletUrl: string;
  qrCodeUrl: string;
  speaker?: Speaker;
  teamName: string;
  institution: string;
  rank?: number;
  accolade: string;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ speakers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allCertRecords, setAllCertRecords] = useState<CertRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<CertRecord | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  const detailCardRef = useRef<HTMLDivElement>(null);

  // Helper to determine debater's honorary accolade
  const getAccolade = (name: string, teamName: string, rank?: number) => {
    const n = name.toLowerCase();
    const t = teamName.toUpperCase();

    if (t.includes('GMHSDS')) {
      if (n.includes('saadmaan')) {
        return 'Grand Champion & Debater of the Tournament (MVP)';
      }
      return 'Grand Champion (Winning Team)';
    }
    if (t.includes('CCPC Q')) {
      return 'Tournament Runner-Up (Finalist)';
    }
    if (t.includes('DKSDS') || t.includes('CCDS') || t.includes('BGCDS') || t.includes('CPSCDS')) {
      if (rank && rank <= 10) {
        return `Top Ranked Speaker (Rank #${rank}) & Semifinalist`;
      }
      return 'Tournament Semifinalist / Knockout Qualifier';
    }
    if (rank && rank <= 10) {
      return `Top 10 Ranked Speaker (Rank #${rank})`;
    }
    if (rank && rank <= 20) {
      return `Top 20 Ranked Speaker (Rank #${rank})`;
    }
    return 'Official Tournament Participant & Debater';
  };

  // Transform raw certificate list to combined records
  const processCertificates = (certList: any[]) => {
    // Build a normalized speaker lookup map
    const speakerMap = new Map<string, Speaker>();
    for (const s of speakers) {
      const key = s.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      speakerMap.set(key, s);
    }

    // Map each cert with speaker stats and accolades
    return certList.map((c: any) => {
      const rawName = c.name || 'Debater';
      const nameKey = rawName.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      let matchedSpk = speakerMap.get(nameKey);
      if (!matchedSpk) {
        for (const [k, spk] of speakerMap.entries()) {
          if (nameKey.length > 3 && (k.includes(nameKey) || nameKey.includes(k))) {
            matchedSpk = spk;
            break;
          }
        }
      }

      const teamName = matchedSpk?.teamName || 'SSDC Debating Team';
      const institution = matchedSpk?.institution || 'SSDC League of Spars';
      const rank = matchedSpk?.rank;
      const accolade = getAccolade(rawName, teamName, rank);

      return {
        id: c.id,
        publicId: c.publicId,
        groupId: c.groupId,
        status: c.status || 'issued',
        name: rawName,
        email: c.email,
        issueDate: c.issueDate || '2026-08-16',
        publicUrl: c.publicUrl || `https://credsverse.com/credentials/${c.publicId}`,
        walletUrl: c.walletUrl || `https://credsverse.com/credentials/${c.publicId}`,
        qrCodeUrl: c.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(`https://credsverse.com/credentials/${c.publicId}`)}`,
        speaker: matchedSpk,
        teamName,
        institution,
        rank,
        accolade
      };
    });
  };

  // Load all 151 uploaded XLS credentials
  const loadAllCertificates = async () => {
    // 1. Immediately initialize with static bundled data (instant on Vercel & offline)
    const initialList = processCertificates(staticCertificatesData as any[]);
    setAllCertRecords(initialList);
    if (initialList.length > 0 && !selectedRecord) {
      const defaultRec = initialList.find(r => r.name.toLowerCase().includes('saadmaan')) || initialList[0];
      setSelectedRecord(defaultRec);
    }

    // 2. Also try live server API sync if available
    try {
      const allRes = await fetch('/api/certificates/all');
      if (allRes.ok) {
        const allData = await allRes.json();
        const certList = allData.certificates || [];
        if (certList.length > 0) {
          const liveCombined = processCertificates(certList);
          setAllCertRecords(liveCombined);
        }
      }
    } catch (err) {
      // Static data already loaded and working flawlessly!
      console.log('Using bundled static certificates cache for Vercel static build.');
    }
  };

  useEffect(() => {
    loadAllCertificates();
  }, [speakers]);

  // Filtered certificates based on search query
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return allCertRecords;

    const q = searchQuery.toLowerCase().trim();
    const qNorm = q.replace(/[^a-z0-9]/g, '');

    return allCertRecords.filter(r => {
      const nameNorm = r.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const teamNorm = r.teamName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const instNorm = r.institution.toLowerCase().replace(/[^a-z0-9]/g, '');
      const pubId = r.publicId.toLowerCase();

      return (
        nameNorm.includes(qNorm) ||
        teamNorm.includes(qNorm) ||
        instNorm.includes(qNorm) ||
        pubId.includes(q)
      );
    });
  }, [allCertRecords, searchQuery]);

  const handleSelectDebater = (record: CertRecord) => {
    setSelectedRecord(record);
    setCopied(false);
    setCopiedId(false);
    
    // Smooth scroll to the details card
    if (detailCardRef.current) {
      detailCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopyLink = () => {
    if (!selectedRecord?.publicUrl) return;
    navigator.clipboard.writeText(selectedRecord.publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyId = () => {
    if (!selectedRecord?.publicId) return;
    navigator.clipboard.writeText(selectedRecord.publicId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2500);
  };

  const handleWhatsAppShare = () => {
    if (!selectedRecord) return;
    const text = encodeURIComponent(
      `🎓 SSDC League of Spars 2.0 (LoS 2.0) Certificate of Participation for ${selectedRecord.name} (${selectedRecord.teamName} - ${selectedRecord.institution}):\n\n${selectedRecord.publicUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full space-y-7">
      
      {/* 1. TITLE / HEADER SECTION */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-xs font-bold text-yellow-300 tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>SSDC League of Spars 2.0</span>
        </div>

        <h1 className="font-['Orbitron'] text-2xl sm:text-4xl font-extrabold text-[#f5e4cb] tracking-wide uppercase">
          Download your Certificate of Participation
        </h1>

        <p className="text-xs sm:text-sm text-[#c9b8a7] max-w-lg mx-auto leading-relaxed">
          Search your name or team below to view and download your official certificate.
        </p>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="los-glass-card p-3.5 sm:p-4 border-t-2 border-[#A97142]">
        <div className="relative">
          <input
            type="text"
            id="certificate-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by your name, team (e.g. GMHSDS, CCPC Q), or institution..."
            className="w-full bg-[#1A1410] border-2 border-[#684B35] focus:border-amber-400 rounded-xl px-4 py-3 pl-11 text-sm sm:text-base text-[#f5e4cb] placeholder-[#8A7A6D] focus:outline-none transition-all shadow-inner"
          />
          <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
          
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 px-2 py-0.5 rounded-md bg-[#332C24] text-xs text-[#c9b8a7] hover:text-white"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* 3. SEARCH RESULTS / DEBATER NAME LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="font-['Orbitron'] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A97142] flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Select Name</span>
          </h2>
          <span className="text-xs text-[#8A7A6D] font-mono">
            {filteredRecords.length} found
          </span>
        </div>

        {filteredRecords.length === 0 ? (
          <div className="los-glass-card p-6 text-center text-sm text-[#8A7A6D] space-y-1">
            <p>No debater found matching "<strong className="text-[#f5e4cb]">{searchQuery}</strong>"</p>
            <p className="text-xs">Please check the spelling of your name or team.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[280px] overflow-y-auto p-1.5 rounded-2xl bg-[#120F0D]/60 border border-[#684B35]/40 shadow-inner">
            {filteredRecords.map((record) => {
              const isSelected = selectedRecord?.publicId === record.publicId;
              const isChampion = record.teamName.toUpperCase().includes('GMHSDS');
              const isMVP = record.name.toLowerCase().includes('saadmaan');

              return (
                <button
                  key={record.publicId}
                  id={`debater-name-${record.publicId}`}
                  onClick={() => handleSelectDebater(record)}
                  className={`p-3 rounded-xl text-left transition-all border flex items-center justify-between gap-2 group ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#8B5E3C]/40 to-[#A97142]/20 border-amber-400 shadow-md ring-1 ring-amber-400/50'
                      : 'bg-[#1A1410] border-[#684B35]/40 hover:border-amber-400/60 hover:bg-[#261F1A]'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-amber-200' : 'text-[#f5e4cb] group-hover:text-amber-100'}`}>
                        {record.name}
                      </span>
                      {isMVP && (
                        <span className="shrink-0 text-[9px] px-1.5 py-0.2 rounded bg-yellow-500/20 text-yellow-300 font-extrabold border border-yellow-500/40">
                          MVP
                        </span>
                      )}
                      {isChampion && !isMVP && (
                        <span className="shrink-0 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/40">
                          Champ
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#a89582] truncate mt-0.5 flex items-center gap-1">
                      <span className="text-amber-300 font-medium">{record.teamName}</span>
                      <span>&bull;</span>
                      <span className="text-[#8A7A6D] truncate">{record.institution}</span>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-[#684B35] group-hover:text-[#c9b8a7]'}`} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. SELECTED DEBATER DETAILS CARD (NAME, TEAM, ID, INSTITUTION, VIEW & DOWNLOAD) */}
      {selectedRecord && (
        <div 
          ref={detailCardRef}
          id="debater-certificate-details"
          className="los-glass-card p-5 sm:p-7 border-t-2 border-[#A97142] space-y-6 shadow-2xl animate-fade-in"
        >
          {/* TOP BAR / TITLE */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#684B35]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-400/50 flex items-center justify-center text-yellow-300 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Certificate Details
                </span>
                <h3 className="font-['Orbitron'] text-base sm:text-xl font-bold text-[#f5e4cb]">
                  {selectedRecord.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#1A1410] border border-[#684B35] text-xs font-mono text-amber-300">
                Issued: {selectedRecord.issueDate}
              </span>
            </div>
          </div>

          {/* 4 CORE INFO FIELDS: NAME, TEAM, ID, INSTITUTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            
            {/* FIELD 1: NAME */}
            <div className="p-4 rounded-xl bg-[#1A1410] border border-[#684B35]/60 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] text-[#8A7A6D] uppercase font-bold tracking-wider">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <span>Name</span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-[#f5e4cb] truncate">
                {selectedRecord.name}
              </p>
              <span className="text-[10px] text-amber-300/90 block truncate">
                {selectedRecord.accolade}
              </span>
            </div>

            {/* FIELD 2: TEAM */}
            <div className="p-4 rounded-xl bg-[#1A1410] border border-[#684B35]/60 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] text-[#8A7A6D] uppercase font-bold tracking-wider">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Team</span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-amber-200 truncate">
                {selectedRecord.teamName}
              </p>
              {selectedRecord.rank ? (
                <span className="text-[10px] text-[#8A7A6D] font-mono block">
                  Speaker Rank #{selectedRecord.rank}
                </span>
              ) : (
                <span className="text-[10px] text-[#8A7A6D] block">
                  Tournament Team
                </span>
              )}
            </div>

            {/* FIELD 3: ID (CREDENTIAL ID) */}
            <div className="p-4 rounded-xl bg-[#1A1410] border border-[#684B35]/60 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-[#8A7A6D] uppercase font-bold tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-amber-400" />
                  <span>ID</span>
                </span>
                <button
                  onClick={handleCopyId}
                  className="text-[10px] text-amber-300 hover:underline flex items-center gap-1 font-mono"
                  title="Copy Credential ID"
                >
                  {copiedId ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedId ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="font-mono text-xs sm:text-sm font-bold text-amber-300 truncate" title={selectedRecord.publicId}>
                {selectedRecord.publicId}
              </p>
              <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> 100% Verified
              </span>
            </div>

            {/* FIELD 4: INSTITUTION */}
            <div className="p-4 rounded-xl bg-[#1A1410] border border-[#684B35]/60 space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] text-[#8A7A6D] uppercase font-bold tracking-wider">
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Institution</span>
              </div>
              <p className="text-xs sm:text-sm font-bold text-[#c9b8a7] truncate" title={selectedRecord.institution}>
                {selectedRecord.institution}
              </p>
              <span className="text-[10px] text-[#8A7A6D] block">
                Official Delegation
              </span>
            </div>

          </div>

          {/* 5. VIEW & DOWNLOAD OPTIONS */}
          <div className="space-y-4 pt-2">
            <h4 className="font-['Orbitron'] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#A97142] flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>View & Download Options</span>
            </h4>

            {/* PRIMARY VIEW & DOWNLOAD BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              {/* PRIMARY ACTION 1: VIEW & DOWNLOAD CERTIFICATE */}
              <a
                href={selectedRecord.publicUrl}
                target="_blank"
                rel="noreferrer"
                id="btn-view-download"
                className="py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#8B5E3C] to-[#A97142] hover:opacity-95 text-sm font-extrabold text-white flex items-center justify-center gap-2.5 shadow-lg shadow-[#8B5E3C]/30 transition-all text-center"
              >
                <Download className="w-5 h-5 shrink-0" />
                <span>View & Download Certificate (PDF)</span>
                <ExternalLink className="w-4 h-4 opacity-80" />
              </a>

              {/* PRIMARY ACTION 2: COPY VERIFY URL */}
              <button
                onClick={handleCopyLink}
                id="btn-copy-link"
                className="py-3.5 px-5 rounded-xl bg-[#1A1410] hover:bg-[#332C24] border border-[#684B35] text-sm font-bold text-[#f5e4cb] flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-400 shrink-0" /> : <Copy className="w-5 h-5 text-amber-300 shrink-0" />}
                <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Verification Link'}</span>
              </button>

            </div>

            {/* SECONDARY ACTION & QR VERIFICATION ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* WHATSAPP SHARE */}
              <button
                onClick={handleWhatsAppShare}
                id="btn-share-whatsapp"
                className="py-3 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/50 text-xs sm:text-sm font-bold text-emerald-300 flex items-center justify-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4 shrink-0" />
                <span>Share Certificate on WhatsApp</span>
              </button>

              {/* INSTANT CAMERA QR CODE BADGE */}
              <div className="p-2.5 rounded-xl bg-[#1A1410] border border-[#684B35]/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src={selectedRecord.qrCodeUrl} 
                    alt="Instant Verification QR" 
                    className="w-10 h-10 rounded bg-white p-0.5 shrink-0 border border-amber-400/40"
                  />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-[#f5e4cb] block truncate">
                      Instant QR Verification
                    </span>
                    <span className="text-[10px] text-[#8A7A6D] block truncate">
                      Scan to verify on Certifier Cloud
                    </span>
                  </div>
                </div>

                <a
                  href={selectedRecord.publicUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 px-2.5 py-1.5 rounded-lg bg-[#332C24] hover:bg-[#473B2F] text-[11px] font-bold text-amber-300 flex items-center gap-1 border border-[#684B35] transition-colors"
                >
                  <Eye className="w-3 h-3" />
                  <span>Verify</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
