import React, { useState } from 'react';
import { Adjudicator } from '../types';
import { Gavel, Search, Award, Maximize2, X, User } from 'lucide-react';

interface AdjudicatorsViewProps {
  adjudicators: Adjudicator[];
}

export const AdjudicatorsView: React.FC<AdjudicatorsViewProps> = ({ adjudicators }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);

  const filteredAdjudicators = adjudicators.filter(
    (adj) => adj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap text-xl sm:text-3xl">
          <Gavel className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>Tournament Adjudication Panel</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-2xl mx-auto px-2">
          Official Adjudication Panel presiding over League of Spars Season 2. ({adjudicators.length} Adjudicators)
        </p>
      </div>

      {/* SEARCH */}
      <div className="los-glass-card p-4 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#c9b8a7]" />
        <input
          type="text"
          placeholder="Search adjudicator by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#120f0d] text-sm text-[#f5e4cb] px-4 py-2 rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
        />
      </div>

      {/* ADJUDICATOR CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAdjudicators.map((adj) => (
          <div
            key={adj.id}
            className="los-glass-card p-4 space-y-3 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-3">
              
              {/* ADJUDICATOR IMAGE */}
              <div 
                className="relative w-full rounded-xl overflow-hidden bg-[#0a0807] border border-[#684B35]/50 flex items-center justify-center min-h-[220px] cursor-pointer group/img"
                onClick={() => adj.imageUrl && setSelectedImage({ url: adj.imageUrl, name: adj.name })}
              >
                {adj.imageUrl ? (
                  <>
                    <img
                      src={adj.imageUrl}
                      alt={adj.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[380px] object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 text-white text-xs font-bold bg-gradient-to-t from-black/80 via-transparent to-transparent">
                      <Maximize2 className="w-4 h-4 text-amber-300" />
                      <span>View Full Image</span>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center text-[#8A7A6D]">
                    <User className="w-12 h-12 mx-auto mb-2 text-[#684B35]" />
                    <span className="text-xs">No Photo Available</span>
                  </div>
                )}
              </div>

              {/* NAME ONLY */}
              <div className="pt-1 text-center">
                <h3 className="font-bold text-base sm:text-lg text-[#f5e4cb] leading-snug">{adj.name}</h3>
              </div>
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

