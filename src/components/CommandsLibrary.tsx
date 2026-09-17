import React, { useState, useMemo } from 'react';
import { ALL_PROMPT_ITEMS, PROMPT_CATEGORIES, CategoryInfo } from '../data/promptsMaster';
import { PromptItem } from '../types';
import { useTheme } from '../context/ThemeContext';
import { getPromptImageUrl } from '../utils/promptImageResolver';
import {
  Search,
  Copy,
  Check,
  Plus,
  BookOpen,
  Image as ImageIcon,
  FileText,
  Layers,
  Sparkles,
  Share2,
  Eye,
  Maximize2,
  X,
  Grid,
  List
} from 'lucide-react';

interface CommandsLibraryProps {
  onInsertCommand: (code: string) => void;
  selectedCommands: string[];
  onViewRealSamples?: () => void;
}

export const CommandsLibrary: React.FC<CommandsLibraryProps> = ({
  onInsertCommand,
  selectedCommands,
  onViewRealSamples
}) => {
  const { isLight } = useTheme();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<'all' | 'image' | 'text'>('all');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<'code' | 'prompt' | null>(null);
  const [showImages, setShowImages] = useState<boolean>(true);
  const [previewingImage, setPreviewingImage] = useState<{
    url: string;
    titleKm: string;
    titleEn: string;
    prompt: string;
    code: string;
    categoryKm: string;
    aspectRatio?: string;
  } | null>(null);

  const handleCopy = (text: string, id: string, type: 'code' | 'prompt') => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedId(null);
      setCopiedType(null);
    }, 1800);
  };

  // Filter categories based on selected group
  const visibleCategories = useMemo(() => {
    if (selectedGroup === 'all') return PROMPT_CATEGORIES;
    return PROMPT_CATEGORIES.filter(cat => cat.groupType === selectedGroup);
  }, [selectedGroup]);

  // Filtered prompts
  const filteredPrompts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_PROMPT_ITEMS.filter(item => {
      // Group filter
      if (selectedGroup !== 'all' && item.groupType !== selectedGroup) {
        return false;
      }
      // Category filter
      if (selectedCategoryKey !== 'all' && item.categoryKey !== selectedCategoryKey) {
        return false;
      }
      // Search filter across Khmer and English
      if (q) {
        const matchesCode = item.command.toLowerCase().includes(q);
        const matchesId = item.id.includes(q);
        const matchesFnKm = item.functionKm.toLowerCase().includes(q);
        const matchesFnEn = item.functionEn.toLowerCase().includes(q);
        const matchesCatKm = item.categoryKm.toLowerCase().includes(q);
        const matchesCatEn = item.categoryEn.toLowerCase().includes(q);
        const matchesPrompt = item.copyPrompt.toLowerCase().includes(q);
        return (
          matchesCode ||
          matchesId ||
          matchesFnKm ||
          matchesFnEn ||
          matchesCatKm ||
          matchesCatEn ||
          matchesPrompt
        );
      }
      return true;
    });
  }, [searchQuery, selectedGroup, selectedCategoryKey]);

  // Current active category info for description banner
  const activeCategoryInfo = useMemo(() => {
    if (selectedCategoryKey === 'all') return null;
    return PROMPT_CATEGORIES.find(c => c.key === selectedCategoryKey);
  }, [selectedCategoryKey]);

  return (
    <div className="space-y-6">
      {/* Header & Search Controller */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border space-y-5 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/80 border-neutral-800 backdrop-blur-md'
        }`}
      >
        {/* Top bar: Title + Search input */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                <BookOpen className="w-4 h-4" />
              </div>
              <h2
                className={`text-lg sm:text-xl font-bold font-display ${
                  isLight ? 'text-stone-900' : 'text-white'
                }`}
              >
                បណ្ណាល័យ Prompts ផ្លូវការ (២០០ Prompts)
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                  isLight
                    ? 'bg-amber-50 text-amber-900 border-amber-200'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}
              >
                ១៦ ជំពូក • 200 Master Prompts
              </span>
            </div>
            <p className={`text-xs mt-1.5 max-w-2xl leading-relaxed ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              កម្រង Prompt ទាំង ២០០ បានរៀបចំតាមជំពូកច្បាស់លាស់ ដោយរក្សាពាក្យបច្ចេកទេស Slash Commands ដើម និងមានមុខងារជាភាសាខ្មែរសម្រាប់ងាយស្រួលចម្លងប្រើប្រាស់។
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search
              className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                isLight ? 'text-stone-400' : 'text-neutral-500'
              }`}
            />
            <input
              type="text"
              id="master-prompts-search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរក Search (e.g. photorealistic, ពន្លឺ, 16:9)..."
              className={`w-full rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm transition-all focus:outline-none ${
                isLight
                  ? 'bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-500 focus:bg-white focus:ring-1 focus:ring-amber-500'
                  : 'bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
              }`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-xs px-1 rounded ${
                  isLight ? 'text-stone-400 hover:text-stone-700' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Level 1: Major Group Filter (All 200 vs 150 Image vs 50 Text) */}
        <div className="flex items-center gap-2 border-b pb-3 pt-1 border-dashed border-stone-200 dark:border-neutral-800">
          <button
            type="button"
            id="filter-group-all"
            onClick={() => {
              setSelectedGroup('all');
              setSelectedCategoryKey('all');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedGroup === 'all'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ទាំងអស់ (200 Prompts)</span>
          </button>

          <button
            type="button"
            id="filter-group-image"
            onClick={() => {
              setSelectedGroup('image');
              setSelectedCategoryKey('all');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedGroup === 'image'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>រូបភាព AI (#001–150)</span>
          </button>

          <button
            type="button"
            id="filter-group-text"
            onClick={() => {
              setSelectedGroup('text');
              setSelectedCategoryKey('all');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedGroup === 'text'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>ការងារ និងសិក្សា (#151–200)</span>
          </button>

          {onViewRealSamples && (
            <button
              type="button"
              id="filter-view-real-samples"
              onClick={onViewRealSamples}
              className={`ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                isLight
                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>មើលគំរូរូបភាពពិត (Real AI Samples)</span>
            </button>
          )}
        </div>

        {/* Level 2: 16 Categorical Pills with Khmer Titles */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategoryKey('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
              selectedCategoryKey === 'all'
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                : isLight
                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-200'
                : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
            }`}
          >
            គ្រប់ជំពូក
          </button>

          {visibleCategories.map(cat => {
            const isSelected = selectedCategoryKey === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                id={`cat-filter-${cat.key}`}
                onClick={() => setSelectedCategoryKey(cat.key)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                    : isLight
                    ? 'bg-stone-100 text-stone-700 hover:text-stone-900 hover:bg-stone-200 border border-stone-200'
                    : 'bg-neutral-950 text-neutral-400 hover:text-neutral-200 border border-neutral-800'
                }`}
              >
                <span className={`text-[10px] px-1 rounded ${isSelected ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-700 dark:bg-neutral-800 dark:text-neutral-400'}`}>
                  {cat.number < 10 ? `0${cat.number}` : cat.number}
                </span>
                <span>{cat.nameKm}</span>
                <span className="text-[10px] opacity-75">
                  [{cat.range}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Category Explanatory Banner */}
        {activeCategoryInfo && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
              isLight
                ? 'bg-amber-50/70 border-amber-200/80 text-stone-800'
                : 'bg-amber-950/20 border-amber-500/20 text-neutral-300'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-800 dark:text-amber-400">
                ជំពូកទី {activeCategoryInfo.number}: {activeCategoryInfo.nameKm} [{activeCategoryInfo.range}]
              </div>
              <p className="mt-0.5 opacity-90 leading-relaxed">
                {activeCategoryInfo.descriptionKm}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Results Count & Current Filter Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs px-1">
        <span className={isLight ? 'text-stone-600 font-medium' : 'text-neutral-400'}>
          បង្ហាញ {filteredPrompts.length} នៃ ២០០ Prompts
          {searchQuery && (
            <span className="ml-1 text-amber-600 dark:text-amber-400 font-medium">
              (ត្រូវនឹង "{searchQuery}")
            </span>
          )}
        </span>
        
        <div className="flex items-center gap-3">
          <span className={`text-[11px] hidden md:inline ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
            ចុចលើរូបភាពដើម្បីពង្រីក ឬចម្លង Prompt
          </span>
          <button
            type="button"
            onClick={() => setShowImages(!showImages)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showImages
                ? isLight
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                : isLight
                ? 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:bg-neutral-800'
            }`}
            title="Toggle image previews on/off"
          >
            {showImages ? <ImageIcon className="w-3.5 h-3.5 text-amber-500" /> : <List className="w-3.5 h-3.5" />}
            <span>{showImages ? 'រូបភាពគំរូ (On)' : 'របៀបអក្សរសុទ្ធ (Off)'}</span>
          </button>
        </div>
      </div>

      {/* Grid of 200 Bilingual Prompt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map(item => {
          const isSelected = selectedCommands.includes(item.command);
          const isCodeCopied = copiedId === item.id && copiedType === 'code';
          const isPromptCopied = copiedId === item.id && copiedType === 'prompt';
          const imageUrl = getPromptImageUrl(item);

          return (
            <div
              key={item.id}
              id={`prompt-card-${item.id}`}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between group relative overflow-hidden ${
                isLight
                  ? 'bg-white border-stone-200 hover:border-amber-400 shadow-xs'
                  : 'bg-neutral-900/70 border-neutral-800 hover:border-amber-500/40'
              }`}
            >
              <div>
                {/* Top Row: #ID + Command badge + Actions */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                        isLight
                          ? 'bg-stone-100 text-stone-700 border border-stone-200'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}
                    >
                      #{item.id}
                    </span>
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded border transition-colors ${
                        isLight
                          ? 'text-amber-950 bg-amber-100/80 border-amber-300'
                          : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                      }`}
                    >
                      {item.command}
                    </span>
                    {item.formatRecommendation && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold border ${
                          isLight
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30'
                        }`}
                        title="Recommended Aspect Ratio"
                      >
                        {item.formatRecommendation}
                      </span>
                    )}
                  </div>

                  {/* Actions: Copy Code & Add to brief */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.command, item.id, 'code')}
                      className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
                        isCodeCopied
                          ? 'bg-emerald-500 text-white'
                          : isLight
                          ? 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                      title="Copy slash command code"
                    >
                      {isCodeCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="text-[10px] font-mono">Code</span>
                    </button>

                    {item.groupType === 'image' && (
                      <button
                        type="button"
                        onClick={() => onInsertCommand(item.command)}
                        className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          isSelected
                            ? isLight
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : isLight
                            ? 'bg-stone-100 text-stone-700 hover:bg-amber-500 hover:text-neutral-950 border border-stone-200'
                            : 'bg-neutral-800 text-neutral-300 hover:bg-amber-500 hover:text-neutral-950'
                        }`}
                        title={isSelected ? 'Remove from Studio Brief' : 'Add to Studio Brief'}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span className="text-[10px] hidden sm:inline">Brief</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Real Photographic Representation Image Preview */}
                {showImages && (
                  <div
                    className="relative w-full h-36 mb-3 rounded-xl overflow-hidden bg-black/5 dark:bg-black/50 group/img cursor-pointer border border-stone-200/80 dark:border-neutral-800 transition-all hover:shadow-md"
                    onClick={() => setPreviewingImage({
                      url: imageUrl,
                      titleKm: item.functionKm,
                      titleEn: item.functionEn,
                      prompt: item.copyPrompt,
                      code: item.command,
                      categoryKm: item.categoryKm,
                      aspectRatio: item.formatRecommendation
                    })}
                  >
                    <img
                      src={imageUrl}
                      alt={item.functionEn}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                      <span className="text-[11px] text-white font-medium flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>ចុចពង្រីកមើលរូបភាពពិត</span>
                      </span>
                      <Maximize2 className="w-4 h-4 text-white/90" />
                    </div>
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/75 text-amber-300 backdrop-blur-xs">
                        {item.categoryKm.split(' ')[0]}
                      </span>
                    </div>
                    {item.formatRecommendation && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-black/75 text-neutral-200 backdrop-blur-xs">
                        {item.formatRecommendation}
                      </span>
                    )}
                  </div>
                )}

                {/* Category name */}
                <div className={`text-[11px] font-medium mb-1 ${isLight ? 'text-amber-800' : 'text-amber-400/90'}`}>
                  {item.categoryKm}
                </div>

                {/* Khmer Function Title (Prominent) */}
                <h3
                  className={`text-sm font-bold leading-snug transition-colors ${
                    isLight ? 'text-stone-900' : 'text-neutral-100'
                  }`}
                >
                  {item.functionKm}
                </h3>

                {/* English Subtitle */}
                <div className={`text-xs mt-0.5 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                  {item.functionEn}
                </div>

                {/* Copy-Ready Template Box */}
                <div
                  className={`mt-3 p-2.5 rounded-xl border relative transition-colors ${
                    isLight
                      ? 'bg-stone-50/90 border-stone-200 text-stone-800'
                      : 'bg-neutral-950/80 border-neutral-800/80 text-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] uppercase font-bold tracking-wider ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                      គំរូ Prompt សម្រាប់ប្រើ
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.copyPrompt, item.id, 'prompt')}
                      className={`text-[10px] flex items-center gap-1 font-semibold px-2 py-0.5 rounded transition-all ${
                        isPromptCopied
                          ? 'bg-emerald-500 text-white'
                          : isLight
                          ? 'bg-stone-200/80 hover:bg-amber-500 hover:text-stone-950 text-stone-700'
                          : 'bg-neutral-800 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300'
                      }`}
                    >
                      {isPromptCopied ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed select-all break-words">
                    {item.copyPrompt}
                  </p>
                </div>
              </div>

              {/* Bottom tag bar */}
              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${isLight ? 'border-stone-200 text-stone-500' : 'border-neutral-800 text-neutral-500'}`}>
                <span>
                  {item.groupType === 'image' ? '📷 AI Image Prompt' : '📝 Text / Productivity Prompt'}
                </span>
                <span>
                  Cat #{item.groupNumber}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPrompts.length === 0 && (
        <div
          className={`p-12 text-center rounded-2xl border ${
            isLight ? 'bg-white border-stone-200' : 'bg-neutral-900 border-neutral-800'
          }`}
        >
          <Search className="w-8 h-8 mx-auto text-amber-500/50 mb-3" />
          <p className={`text-sm font-semibold ${isLight ? 'text-stone-800' : 'text-neutral-200'}`}>
            រកមិនឃើញ Prompt ត្រូវនឹង "{searchQuery}" ទេ
          </p>
          <p className={`text-xs mt-1 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
            សូមសាកល្បងពាក្យគន្លឹះផ្សេង ដូចជា `4:5`, `lighting`, `កាមេរ៉ា`, `គុណភាព`, ឬ `rubric`
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategoryKey('all');
              setSelectedGroup('all');
            }}
            className="mt-4 px-4 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors"
          >
            សម្អាតការស្វែងរក (Clear Filter)
          </button>
        </div>
      )}

      {/* Lightbox Modal for inspecting Real Image Sample & Copying Prompt */}
      {previewingImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          onClick={() => setPreviewingImage(null)}
        >
          <div
            className={`relative max-w-2xl w-full rounded-2xl border overflow-hidden shadow-2xl transition-all max-h-[90vh] flex flex-col ${
              isLight ? 'bg-white border-stone-200 text-stone-900' : 'bg-neutral-900 border-neutral-800 text-white'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setPreviewingImage(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Big Real Image Preview */}
            <div className="w-full h-72 sm:h-96 bg-black relative overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={previewingImage.url}
                alt={previewingImage.titleEn}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-2.5 left-3 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-amber-500 text-neutral-950">
                  {previewingImage.code}
                </span>
                {previewingImage.aspectRatio && (
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-black/75 text-white backdrop-blur-xs">
                    {previewingImage.aspectRatio}
                  </span>
                )}
                <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-black/75 text-amber-300 backdrop-blur-xs">
                  {previewingImage.categoryKm}
                </span>
              </div>
            </div>

            {/* Content Details & Copy Actions */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base sm:text-lg font-bold">
                    {previewingImage.titleKm}
                  </h3>
                  <p className={`text-xs sm:text-sm ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                    {previewingImage.titleEn}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(previewingImage.code);
                      setCopiedId('modal-code');
                      setCopiedType('code');
                      setTimeout(() => {
                        setCopiedId(null);
                        setCopiedType(null);
                      }, 1800);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all flex items-center gap-1.5 ${
                      copiedId === 'modal-code'
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : isLight
                        ? 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border-neutral-700'
                    }`}
                  >
                    {copiedId === 'modal-code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{previewingImage.code}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onInsertCommand(previewingImage.code)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>ដាក់ចូល Studio</span>
                  </button>
                </div>
              </div>

              {/* Ready-to-use Prompt Box */}
              <div
                className={`p-3.5 rounded-xl border ${
                  isLight
                    ? 'bg-stone-50 border-stone-200 text-stone-800'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                    គំរូ Prompt ជាក់ស្តែង (Ready-to-use Copy & Paste Prompt)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(previewingImage.prompt);
                      setCopiedId('modal-prompt');
                      setCopiedType('prompt');
                      setTimeout(() => {
                        setCopiedId(null);
                        setCopiedType(null);
                      }, 1800);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-colors shadow-xs"
                  >
                    {copiedId === 'modal-prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === 'modal-prompt' ? 'បានចម្លងជោគជ័យ!' : 'ចម្លង Prompt ទាំងមូល'}</span>
                  </button>
                </div>
                <p className="font-mono text-xs select-all break-words leading-relaxed p-2.5 rounded-lg bg-black/5 dark:bg-black/40 text-amber-900 dark:text-amber-300 border border-stone-200 dark:border-neutral-800">
                  {previewingImage.prompt}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
