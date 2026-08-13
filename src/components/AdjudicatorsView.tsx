import React, { useState } from 'react';
import { Adjudicator } from '../types';
import { Gavel, Search, Award, Maximize2, X, User, Star, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface AdjudicatorsViewProps {
  adjudicators: Adjudicator[];
}

export const AdjudicatorsView: React.FC<AdjudicatorsViewProps> = ({ adjudicators }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);

  const filteredAdjudicators = adjudicators.filter((adj) => {
    const matchesSearch =
      adj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (roleFilter === 'all') return matchesSearch;
    if (roleFilter === 'ca') return matchesSearch && adj.role.toLowerCase().includes('chief');
    if (roleFilter === 'dca') return matchesSearch && adj.role.toLowerCase().includes('deputy');
    if (roleFilter === 'ia') return matchesSearch && adj.role.toLowerCase().includes('independent');
    if (roleFilter === 'accredited') return matchesSearch && adj.role.toLowerCase().includes('accredited');
    return matchesSearch;
  });

  const caCount = adjudicators.filter((a) => a.role.toLowerCase().includes('chief') || a.role.toLowerCase().includes('deputy')).length;
  const iaCount = adjudicators.filter((a) => a.role.toLowerCase().includes('independent')).length;
  const accreditedCount = adjudicators.filter((a) => a.role.toLowerCase().includes('accredited')).length;

  const getRoleBadgeStyle = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes('chief')) {
      return 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-400 text-amber-300 font-extrabold shadow-sm';
    }
    if (r.includes('deputy')) {
      return 'bg-amber-950/80 border-amber-600/80 text-amber-200 font-bold';
    }
    if (r.includes('independent')) {
      return 'bg-cyan-950/80 border-cyan-600/80 text-cyan-200 font-semibold';
    }
    return 'bg-emerald-950/80 border-emerald-600/80 text-emerald-200 font-medium';
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap text-xl sm:text-3xl">
          <Gavel className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>Tournament Adjudication Panel</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-2xl mx-auto px-2">
          Official Adjudication Panel presiding over League of Spars Season 2 ({adjudicators.length} Adjudicators)
        </p>
      </div>

      {/* SUMMARY STAT CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-full">
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Total Judges</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-[#f5e4cb]">
            {adjudicators.length}
          </span>
        </div>
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">CAs & DCAs</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-amber-400">
            {caCount}
          </span>
        </div>
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Independent</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-cyan-400">
            {iaCount}
          </span>
        </div>
        <div className="los-glass-card p-3 sm:p-3.5 text-center">
          <span className="text-[10px] uppercase font-bold text-[#8A7A6D]">Accredited</span>
          <span className="block font-['Orbitron'] font-black text-lg sm:text-xl text-emerald-400">
            {accreditedCount}
          </span>
        </div>
      </div>

      {/* SEARCH AND FILTER */}
      <div className="los-glass-card p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search adjudicator by name or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] pl-10 pr-4 py-2 rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-[#120f0d] text-xs font-semibold text-[#f5e4cb] border border-[#684B35] px-3 py-2 rounded-xl focus:outline-none focus:border-amber-400 cursor-pointer"
        >
          <option value="all">All Roles</option>
          <option value="ca">Chief Adjudicators (CA)</option>
          <option value="dca">Deputy CAs (DCA)</option>
          <option value="ia">Independent Adjudicators</option>
          <option value="accredited">Accredited Panel Judges</option>
        </select>
      </div>

      {/* ADJUDICATOR CARDS PHOTO GALLERY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredAdjudicators.map((adj) => (
          <div
            key={adj.id}
            onClick={() => adj.imageUrl && setSelectedImage({ url: adj.imageUrl, name: adj.name })}
            className="los-glass-card p-2.5 space-y-2 hover:border-amber-400/90 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-lg"
          >
            {/* PHOTO CONTAINER */}
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-[#070504] border border-[#684B35]/60 flex items-center justify-center">
              {adj.imageUrl ? (
                <>
                  <img
                    src={adj.imageUrl}
                    alt={adj.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1.5 text-white text-xs font-bold bg-gradient-to-t from-black/80 via-transparent to-transparent">
                    <Maximize2 className="w-4 h-4 text-amber-300" />
                    <span className="text-[11px]">Enlarge</span>
                  </div>
                </>
              ) : (
                <div className="p-4 text-center text-[#8A7A6D] flex flex-col items-center justify-center">
                  <User className="w-10 h-10 mb-1 text-[#684B35]" />
                  <span className="text-[10px]">No Photo</span>
                </div>
              )}
            </div>

            {/* ADJUDICATOR NAME */}
            <div className="text-center px-1 py-0.5">
              <h3 className="font-bold text-xs sm:text-sm text-[#f5e4cb] leading-tight group-hover:text-amber-300 transition-colors line-clamp-1">
                {adj.name}
              </h3>
            </div>
          </div>
        ))}

        {filteredAdjudicators.length === 0 && (
          <div className="col-span-full los-glass-card p-12 text-center text-[#c9b8a7]">
            <Award className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
            <p className="font-semibold">No adjudicators found matching your search.</p>
          </div>
        )}
      </div>

      {/* FULL-SIZE IMAGE LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 transition-all duration-300 animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[92vh] w-full bg-[#120f0d] border border-[#684B35] rounded-2xl overflow-hidden flex flex-col items-center p-3 sm:p-5 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="w-full flex items-center justify-between border-b border-[#684B35]/40 pb-3 px-2">
              <h3 className="font-bold text-base sm:text-xl text-[#f5e4cb]">{selectedImage.name}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-[#1F1A17] hover:bg-[#332C24] text-[#c9b8a7] hover:text-white transition-colors border border-[#684B35]"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* FULL SIZE IMAGE */}
            <div className="w-full flex-1 overflow-auto flex items-center justify-center bg-[#070504] rounded-xl p-2 border border-[#684B35]/30">
              <img
                src={selectedImage.url}
                alt={selectedImage.name}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
