import React, { useState } from 'react';
import { SoftSkillVideo, SoftSkillCategory } from '../types/career';
import { VERIFIED_SOFT_SKILL_VIDEOS } from '../data/learningProjectsData';
import {
  Play,
  Check,
  ExternalLink,
  X,
  Sparkles,
  MessageSquare,
  User,
  Filter,
  AlertCircle,
  Video,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SoftSkillsPageProps {
  completedSoftSkillIds?: string[];
  onToggleSoftSkillCompleted?: (videoId: string) => void;
}

export const SoftSkillsPage: React.FC<SoftSkillsPageProps> = ({
  completedSoftSkillIds = [],
  onToggleSoftSkillCompleted,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<SoftSkillCategory>('ALL');
  const [creatorFilter, setCreatorFilter] = useState<string>('ALL');
  const [activeVideo, setActiveVideo] = useState<SoftSkillVideo | null>(null);
  const [videoError, setVideoError] = useState(false);

  // Extract distinct creators
  const distinctCreators = Array.from(
    new Set(VERIFIED_SOFT_SKILL_VIDEOS.map((v) => v.creator))
  );

  // Filter video catalog
  const filteredVideos = VERIFIED_SOFT_SKILL_VIDEOS.filter((v) => {
    if (categoryFilter !== 'ALL' && v.category !== categoryFilter) return false;
    if (creatorFilter !== 'ALL' && v.creator !== creatorFilter) return false;
    return true;
  });

  const categories: SoftSkillCategory[] = [
    'ALL',
    'PRESENTATION',
    'PUBLIC SPEAKING',
    'COMMUNICATION',
    'INTERVIEW PREPARATION',
    'BEHAVIORAL INTERVIEWS',
    'TECHNICAL INTERVIEWS',
    'SELF INTRODUCTION',
    'NETWORKING',
    'WORKPLACE COMMUNICATION',
    'LEADERSHIP',
    'PROFESSIONAL CONFIDENCE',
    'LOGICAL COMMUNICATION',
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* 1. Header */}
      <div className="border-b border-[#DCE8F5] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#8B7CFF] bg-[#F2EFFF] px-2.5 py-0.5 rounded-md border border-[#8B7CFF]/20 inline-block mb-1">
            CURATED PROFESSIONAL VIDEO MASTERCLASS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#172B4D]">
            SOFT SKILLS & INTERVIEW PREPARATION
          </h1>
          <p className="text-xs sm:text-sm text-[#687A93] mt-0.5 font-medium leading-relaxed">
            "Learn from people who specialize in this." Presentation, public speaking, interview mastery, and executive communication.
          </p>
        </div>
      </div>

      {/* 2. Filter Rows: Creators & Categories */}
      <div className="space-y-3">
        {/* Creator Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-black uppercase text-[#687A93] shrink-0 mr-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>Creators:</span>
          </span>
          <button
            type="button"
            onClick={() => setCreatorFilter('ALL')}
            className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              creatorFilter === 'ALL'
                ? 'bg-[#172B4D] text-white shadow-2xs'
                : 'bg-white border border-[#DCE8F5] text-[#687A93] hover:text-[#172B4D]'
            }`}
          >
            All Creators
          </button>
          {distinctCreators.map((creator) => (
            <button
              key={creator}
              type="button"
              onClick={() => setCreatorFilter(creator)}
              className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
                creatorFilter === creator
                  ? 'bg-[#4D9FFF] text-white shadow-2xs'
                  : 'bg-white border border-[#DCE8F5] text-[#687A93] hover:text-[#172B4D]'
              }`}
            >
              {creator}
            </button>
          ))}
        </div>

        {/* 14 Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-black uppercase text-[#687A93] shrink-0 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Topic:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#8B7CFF] text-white shadow-2xs'
                  : 'bg-[#F6FAFF] border border-[#DCE8F5] text-[#687A93] hover:text-[#172B4D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Curated Video Library Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredVideos.map((video) => {
          const isDone = completedSoftSkillIds.includes(video.id);
          const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

          return (
            <div
              key={video.id}
              className="p-5 bg-white border border-[#DCE8F5] rounded-3xl space-y-4 flex flex-col justify-between hover:border-[#8B7CFF]/50 transition-colors shadow-2xs"
            >
              <div>
                {/* Thumbnail Preview */}
                <div
                  onClick={() => {
                    setVideoError(false);
                    setActiveVideo(video);
                  }}
                  className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer shadow-xs mb-3 border border-[#DCE8F5]"
                >
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/95 text-[#8B7CFF] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 left-2 text-[10px] font-black uppercase text-white bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
                    {video.creator} · {video.language.toUpperCase()}
                  </span>
                </div>

                {/* Metadata */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-extrabold uppercase text-[#8B7CFF] bg-[#F2EFFF] px-2 py-0.5 rounded">
                      {video.category}
                    </span>
                    <span className="font-semibold text-[#687A93]">
                      {video.difficulty || 'FOUNDATION'}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-[#172B4D] leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-xs text-[#687A93] font-medium leading-relaxed">
                    {video.whyItMatters}
                  </p>
                </div>

                {/* Practice This Callout */}
                <div className="mt-3 p-3.5 bg-[#F6FAFF] border border-[#DCE8F5] rounded-2xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#347DD9]">
                      PRACTICE THIS
                    </span>
                    {isDone && (
                      <span className="text-[10px] font-extrabold text-[#42C98A] flex items-center gap-1">
                        <Check className="w-3 h-3 stroke-[3]" />
                        <span>Practiced</span>
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#172B4D] font-medium leading-relaxed">
                    "{video.practicePrompt}"
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#DCE8F5] flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setVideoError(false);
                    setActiveVideo(video);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#8B7CFF] hover:bg-[#7867F5] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>WATCH VIDEO</span>
                </button>

                {onToggleSoftSkillCompleted && (
                  <button
                    type="button"
                    onClick={() => onToggleSoftSkillCompleted(video.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isDone
                        ? 'bg-[#EBFBF3] text-[#42C98A] border border-[#42C98A]/30'
                        : 'bg-white hover:bg-[#F2F7FC] text-[#687A93] hover:text-[#172B4D] border border-[#DCE8F5]'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>{isDone ? 'Completed' : 'Mark Done'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Embedded Player Modal */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="fixed inset-0 bg-[#172B4D]/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-4xl bg-white border border-[#DCE8F5] rounded-3xl shadow-[0_20px_60px_rgba(23,43,77,0.25)] z-10 overflow-hidden"
            >
              <div className="p-4 sm:p-5 border-b border-[#DCE8F5] flex items-center justify-between gap-4 bg-[#F6FAFF]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#8B7CFF] block">
                    {activeVideo.creator} · {activeVideo.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-[#172B4D]">
                    {activeVideo.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 rounded-xl bg-white hover:bg-[#F2F7FC] border border-[#DCE8F5] flex items-center justify-center text-[#687A93] hover:text-[#172B4D] transition-colors cursor-pointer shrink-0 shadow-2xs"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 16:9 Video Player */}
              <div className="relative aspect-video w-full bg-black">
                {!videoError ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setVideoError(true)}
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
                    <AlertCircle className="w-10 h-10 text-[#FF8A72]" />
                    <div>
                      <h4 className="text-base font-bold">Unable to load the video.</h4>
                      <p className="text-xs text-white/70 max-w-sm mt-1">
                        Network connectivity or browser security policies may have prevented embedded playback.
                      </p>
                    </div>
                    <a
                      href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4D9FFF] hover:bg-[#347DD9] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <span>OPEN ON YOUTUBE</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Practice Banner */}
              <div className="p-4 sm:p-5 bg-white border-t border-[#DCE8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-black uppercase text-[#8B7CFF] block">
                    RECOMMENDED PRACTICE EXERCISE
                  </span>
                  <p className="text-xs text-[#172B4D] font-bold">
                    "{activeVideo.practicePrompt}"
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onToggleSoftSkillCompleted && (
                    <button
                      type="button"
                      onClick={() => onToggleSoftSkillCompleted(activeVideo.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        completedSoftSkillIds.includes(activeVideo.id)
                          ? 'bg-[#EBFBF3] text-[#42C98A] border border-[#42C98A]/30'
                          : 'bg-[#8B7CFF] hover:bg-[#7867F5] text-white shadow-xs'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>
                        {completedSoftSkillIds.includes(activeVideo.id)
                          ? 'Completed'
                          : 'Mark Practice as Done'}
                      </span>
                    </button>
                  )}

                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#687A93] hover:text-[#4D9FFF] transition-colors"
                    title="Open on YouTube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
