import React, { useState } from 'react';
import { TournamentAnnouncement } from '../types';
import { Bell, Tag, Search, Calendar, User } from 'lucide-react';

interface AnnouncementsViewProps {
  announcements: TournamentAnnouncement[];
}

export const AnnouncementsView: React.FC<AnnouncementsViewProps> = ({ announcements }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = ['all', 'Urgent', 'Pairings', 'Notice', 'Rule Update'];

  const filtered = announcements.filter((ann) => {
    const matchesTag = selectedTag === 'all' || ann.tag === selectedTag;
    const matchesSearch =
      ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTag && matchesSearch;
  });

  const getTagBadge = (tag: TournamentAnnouncement['tag']) => {
    switch (tag) {
      case 'Urgent':
        return 'bg-rose-950 text-rose-300 border-rose-700';
      case 'Pairings':
        return 'bg-amber-950 text-amber-300 border-amber-700';
      case 'Rule Update':
        return 'bg-purple-950 text-purple-300 border-purple-700';
      case 'Notice':
      default:
        return 'bg-stone-900 text-stone-300 border-stone-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-8 px-3 sm:px-6 space-y-6 w-full max-w-full overflow-x-hidden">
      
      {/* HEADER TITLE */}
      <div className="text-center space-y-2">
        <h2 className="hl flex items-center justify-center gap-2 flex-wrap">
          <Bell className="w-7 h-7 sm:w-8 sm:h-8 text-amber-400 shrink-0" />
          <span>Tournament Announcements & Notices</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#e2d0ba] max-w-xl mx-auto px-2">
          Official bulletins, round scheduling notices, pairings announcements, and executive directives.
        </p>
      </div>

      {/* FILTER & SEARCH */}
      <div className="los-glass-card p-4 sm:p-5 space-y-4">
        
        {/* Tag Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedTag === tag
                  ? 'bg-[#8B5E3C] text-white border border-[#A97142] shadow-md'
                  : 'bg-[#120f0d] text-[#c9b8a7] hover:text-white border border-[#684B35]/50'
              }`}
            >
              {tag === 'all' ? 'All Bulletins' : tag}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#c9b8a7]" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#120f0d] text-sm text-[#f5e4cb] rounded-xl border border-[#684B35] focus:outline-none focus:border-amber-400 placeholder-[#8A7A6D]"
          />
        </div>
      </div>

      {/* ANNOUNCEMENT CARDS */}
      <div className="space-y-4">
        {filtered.map((ann) => (
          <div
            key={ann.id}
            className="los-glass-card p-6 space-y-3 border-l-4 border-[#8B5E3C] hover:border-amber-400 transition-all duration-300"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-extrabold uppercase border ${getTagBadge(
                  ann.tag
                )}`}
              >
                {ann.tag}
              </span>

              <div className="flex items-center gap-4 text-xs text-[#c9b8a7] font-medium">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-400" /> {ann.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> {ann.date}
                </span>
              </div>
            </div>

            <h3 className="font-bold text-lg text-[#f5e4cb]">{ann.title}</h3>

            <p className="text-sm text-[#e2d0ba] leading-relaxed whitespace-pre-line">
              {ann.content}
            </p>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="los-glass-card p-12 text-center text-[#c9b8a7]">
            <Bell className="w-10 h-10 mx-auto text-[#684B35] mb-2" />
            <p className="font-semibold text-lg">No announcements match search.</p>
          </div>
        )}
      </div>

    </div>
  );
};
