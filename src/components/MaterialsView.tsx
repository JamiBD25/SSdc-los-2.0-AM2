import React, { useState } from 'react';
import { DebateMaterial } from '../types';
import { FileText, Download, ExternalLink, Search, Sparkles } from 'lucide-react';

interface MaterialsViewProps {
  materials: DebateMaterial[];
}

export const MaterialsView: React.FC<MaterialsViewProps> = ({ materials: initialMaterials }) => {
  const [materials, setMaterials] = useState<DebateMaterial[]>(initialMaterials);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'AP-ISC Format', 'Matter Files', 'Rules & Regulations', 'Motion Resources'];

  const filteredMaterials = materials.filter((m) => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (id: string) => {
    setMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, downloadCount: m.downloadCount + 1 } : m))
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2">
          <FileText className="w-8 h-8 text-amber-400" />
          <span>Tournament Resources & Materials</span>
        </h2>
        <p className="text-sm text-[#e2d0ba] max-w-xl mx-auto">
          Official AP-ISC format documentation, matter session files, Discord guides, and practice motion archives.
        </p>
      </div>

      {/* CATEGORY TABS & SEARCH */}
      <div className="los-glass-card p-4 sm:p-5 space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142] shadow-md'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white border border-[#684B35]/50'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search materials by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>
      </div>

      {/* MATERIAL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className="los-glass-card p-5 space-y-4 hover:border-amber-400 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#8B5E3C]/30 text-amber-300 border border-[#8B5E3C]">
                  {mat.category}
                </span>

                <span className="text-[10px] font-bold text-[#c9b8a7] bg-[#120f0d] px-2 py-0.5 rounded border border-[#684B35]/40 uppercase">
                  {mat.fileType}
                </span>
              </div>

              <h3 className="font-bold text-base sm:text-lg text-[#f5e4cb] leading-snug">
                {mat.title}
              </h3>

              <p className="text-xs text-[#e2d0ba] leading-relaxed">
                {mat.description}
              </p>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-3 border-t border-[#684B35]/40 flex items-center justify-between">
              <span className="text-xs text-[#c9b8a7] font-medium">
                {mat.downloadCount} downloads
              </span>

              <a
                href={mat.linkUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => handleDownload(mat.id)}
                className="px-4 py-2 rounded-xl bg-[#8B5E3C] hover:bg-[#A97142] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow"
              >
                {mat.fileType === 'Discord' ? (
                  <>
                    <span>Join Discord Arena</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Download Resource</span>
                    <Download className="w-3.5 h-3.5" />
                  </>
                )}
              </a>
            </div>

          </div>
        ))}

        {filteredMaterials.length === 0 && (
          <div className="col-span-full los-glass-card p-12 text-center text-[#c9b8a7]">
            <FileText className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
            <p className="font-semibold text-lg">No materials found matching search.</p>
          </div>
        )}
      </div>

    </div>
  );
};
