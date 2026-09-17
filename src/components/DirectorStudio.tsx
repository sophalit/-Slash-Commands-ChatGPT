import React, { useState } from 'react';
import { PromptInput, PresetIdea } from '../types';
import { PRESET_IDEAS } from '../data/commands';
import { ALL_PROMPT_ITEMS, PROMPT_CATEGORIES } from '../data/promptsMaster';
import { REAL_PROMPT_SAMPLES, RealPromptSample } from '../data/realPromptSamples';
import { useTheme } from '../context/ThemeContext';
import { 
  Sparkles, 
  Wand2, 
  Layers, 
  Sliders, 
  X, 
  Check, 
  Plus, 
  Info,
  ChevronRight,
  Ratio,
  Maximize2,
  Trash2,
  BookmarkPlus,
  Image as ImageIcon,
  ExternalLink,
  Eye,
  Copy
} from 'lucide-react';

interface DirectorStudioProps {
  input: PromptInput;
  setInput: React.Dispatch<React.SetStateAction<PromptInput>>;
  onGenerate: () => void;
  isLoading: boolean;
  onViewRealSamples?: () => void;
}

export const DirectorStudio: React.FC<DirectorStudioProps> = ({
  input,
  setInput,
  onGenerate,
  isLoading,
  onViewRealSamples
}) => {
  const { isLight } = useTheme();
  const [commandSearch, setCommandSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [showCommandsPicker, setShowCommandsPicker] = useState(false);
  const [previewPreset, setPreviewPreset] = useState<PresetIdea | null>(null);
  const [copiedPresetId, setCopiedPresetId] = useState<string | null>(null);

  const handleCopyPresetPrompt = (preset: PresetIdea, e: React.MouseEvent) => {
    e.stopPropagation();
    const promptToCopy = preset.copyPrompt || preset.idea;
    navigator.clipboard.writeText(promptToCopy);
    setCopiedPresetId(preset.id);
    setTimeout(() => {
      setCopiedPresetId(null);
    }, 2000);
  };

  const aspectRatios = [
    { label: '16:9 Landscape', value: '16:9', desc: 'Cinematic / Presentation' },
    { label: '9:16 Vertical', value: '9:16', desc: 'Stories / TikTok' },
    { label: '1:1 Square', value: '1:1', desc: 'Instagram Feed / Avatar' },
    { label: '4:5 Portrait', value: '4:5', desc: 'Social Ad / Editorial' },
    { label: '3:2 Classic 35mm', value: '3:2', desc: 'Fine Art Photography' },
    { label: '21:9 Ultra Anamorphic', value: '21:9', desc: 'Cinema Widescreen' }
  ];

  const handleApplyPreset = (preset: PresetIdea) => {
    setInput({
      idea: preset.idea,
      audience: preset.audience,
      references: preset.references,
      requiredText: preset.requiredText,
      aspectRatio: preset.aspectRatio,
      mustKeep: preset.mustKeep,
      mustAvoid: preset.mustAvoid,
      selectedCommands: [...preset.recommendedCommands]
    });
  };

  const handleToggleCommand = (cmdCode: string) => {
    setInput(prev => {
      const exists = prev.selectedCommands.includes(cmdCode);
      return {
        ...prev,
        selectedCommands: exists
          ? prev.selectedCommands.filter(c => c !== cmdCode)
          : [...prev.selectedCommands, cmdCode]
      };
    });
  };

  const handleClearAll = () => {
    setInput({
      idea: '',
      audience: '',
      references: '',
      requiredText: 'NO TEXT',
      aspectRatio: '16:9',
      mustKeep: '',
      mustAvoid: '',
      selectedCommands: []
    });
  };

  const filteredCommands = ALL_PROMPT_ITEMS.filter(cmd => {
    const q = commandSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      cmd.command.toLowerCase().includes(q) ||
      cmd.functionKm.toLowerCase().includes(q) ||
      cmd.functionEn.toLowerCase().includes(q) ||
      cmd.id.includes(q);
    const matchesCategory = activeCategoryFilter === 'All' || cmd.categoryKey === activeCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Real Visual Image & Prompt Showcase Strip */}
      <div
        className={`border rounded-2xl p-4 sm:p-5 transition-colors relative overflow-hidden ${
          isLight
            ? 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-white border-amber-200 shadow-sm'
            : 'bg-gradient-to-r from-amber-500/15 via-neutral-900/80 to-neutral-900/60 border-amber-500/30'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-neutral-950 flex items-center justify-center font-bold">
              <ImageIcon className="w-4 h-4" />
            </span>
            <div>
              <h3
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
                  isLight ? 'text-stone-900' : 'text-white'
                }`}
              >
                <span>គំរូរូបភាពពិត & Prompts តាម Command (/)</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-neutral-950">
                  New
                </span>
              </h3>
              <p className={`text-[11px] ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                ចុចលើរូបដើម្បីផ្ទុកចូលស្ទូឌីយោ ឬពិនិត្យមើលរូបភាពពិតមុននឹង Copy & Paste ទៅ Generate ក្នុង AI
              </p>
            </div>
          </div>
          {onViewRealSamples && (
            <button
              type="button"
              onClick={onViewRealSamples}
              className="text-xs font-bold text-amber-500 hover:text-amber-400 flex items-center gap-1 shrink-0 self-start sm:self-auto transition-colors"
            >
              <span>មើលផ្ទាំងរូបភាពលម្អិតទាំងអស់</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {REAL_PROMPT_SAMPLES.map(sample => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setInput({
                  idea: sample.sampleBrief.idea,
                  audience: sample.sampleBrief.audience,
                  references: sample.sampleBrief.references,
                  requiredText: sample.sampleBrief.requiredText,
                  aspectRatio: sample.sampleBrief.aspectRatio,
                  mustKeep: sample.sampleBrief.mustKeep,
                  mustAvoid: sample.sampleBrief.mustAvoid,
                  selectedCommands: [...sample.sampleBrief.selectedCommands]
                });
              }}
              className={`group text-left rounded-xl border overflow-hidden transition-all relative flex flex-col ${
                isLight
                  ? 'bg-white border-stone-200 hover:border-amber-500 hover:shadow-md'
                  : 'bg-neutral-950 border-neutral-800 hover:border-amber-500/60'
              }`}
            >
              <div className="h-28 sm:h-32 w-full overflow-hidden relative bg-black">
                <img
                  src={sample.imageUrl}
                  alt={sample.titleEn}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/75 text-amber-400 backdrop-blur-xs">
                  {sample.badge.split(' ')[0]}
                </span>
              </div>
              <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-between">
                <div>
                  <h4
                    className={`text-xs font-bold line-clamp-1 transition-colors ${
                      isLight ? 'text-stone-900 group-hover:text-amber-700' : 'text-neutral-200 group-hover:text-amber-300'
                    }`}
                  >
                    {sample.titleKm.split('(')[0]}
                  </h4>
                  <p className={`text-[10px] font-mono mt-0.5 ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    {sample.commands[0]?.code} {sample.commands[1]?.code}
                  </p>
                </div>
                <span className="text-[10px] text-stone-500 dark:text-neutral-500 mt-1.5 flex items-center gap-1 font-medium">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  <span>ចុចប្រើប្រាស់</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Preset Bar with Real Representative Images */}
      <div
        className={`border rounded-2xl p-4 sm:p-5 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <BookmarkPlus className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            <span
              className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                isLight ? 'text-stone-900' : 'text-neutral-200'
              }`}
            >
              គំរូ និងករណីសិក្សាឆាប់រហ័ស (Quick Presets)
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/20 text-amber-300'
            }`}>
              រូបភាពពិត 5 គំរូ
            </span>
          </div>
          <span className={`text-xs ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
            ជ្រើសយកគំរូនីមួយៗដើម្បីផ្ទុកចូល Studio ឬចម្លង Prompt ប្រើប្រាស់ភ្លាមៗ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PRESET_IDEAS.map(preset => {
            const isCopied = copiedPresetId === preset.id;
            return (
              <div
                key={preset.id}
                id={`preset-card-${preset.id}`}
                className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
                  isLight
                    ? 'bg-stone-50/90 border-stone-200 hover:border-amber-400 hover:shadow-md'
                    : 'bg-neutral-950/80 border-neutral-800 hover:border-amber-500/40 hover:bg-neutral-900/90'
                }`}
              >
                {/* Preset Real Representative Image Preview */}
                <div
                  className="relative w-full h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
                  onClick={() => setPreviewPreset(preset)}
                  title="ចុចដើម្បីពង្រីកមើលរូបភាព និង Prompt ពេញលេញ"
                >
                  <img
                    src={preset.imageUrl || '/samples/executive_portrait_1789616896838.jpg'}
                    alt={preset.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2">
                    <span className="text-[10px] text-white font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3 text-amber-400" />
                      <span>ពង្រីកមើល</span>
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-white/90" />
                  </div>
                  
                  {/* Overlay Badges */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span
                      className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30"
                    >
                      {preset.badge}
                    </span>
                  </div>
                  <span className="absolute top-2 right-2 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/75 text-neutral-200 backdrop-blur-xs">
                    {preset.aspectRatio}
                  </span>
                </div>

                {/* Preset Content Info */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className={`text-xs font-bold leading-tight line-clamp-1 transition-colors ${
                        isLight
                          ? 'text-stone-900 group-hover:text-amber-800'
                          : 'text-neutral-100 group-hover:text-amber-300'
                      }`}
                    >
                      {preset.titleKm || preset.title}
                    </h4>
                    <p className={`text-[10px] font-medium mt-0.5 line-clamp-1 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                      {preset.title}
                    </p>
                    <p
                      className={`text-[11px] line-clamp-2 mt-1.5 leading-snug ${
                        isLight ? 'text-stone-600' : 'text-neutral-400'
                      }`}
                    >
                      {preset.idea}
                    </p>

                    {/* Command tag pills */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {preset.recommendedCommands.slice(0, 3).map(cmd => (
                        <span
                          key={cmd}
                          className={`text-[9px] font-mono px-1 py-0.2 rounded border ${
                            isLight
                              ? 'bg-stone-100 text-stone-600 border-stone-200'
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                          }`}
                        >
                          {cmd}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons: Apply to Studio & Copy Prompt */}
                  <div className="grid grid-cols-2 gap-1.5 mt-3 pt-2.5 border-t border-stone-200/70 dark:border-neutral-800/80">
                    <button
                      type="button"
                      id={`apply-preset-${preset.id}`}
                      onClick={() => handleApplyPreset(preset)}
                      className={`text-[10px] py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1 transition-all ${
                        isLight
                          ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950 shadow-xs'
                          : 'bg-amber-500 hover:bg-amber-400 text-neutral-950'
                      }`}
                      title="ផ្ទុកទិន្នន័យគំរូនេះចូលទៅក្នុង Studio Form ខាងក្រោម"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>ផ្ទុកចូល Studio</span>
                    </button>

                    <button
                      type="button"
                      id={`copy-preset-${preset.id}`}
                      onClick={(e) => handleCopyPresetPrompt(preset, e)}
                      className={`text-[10px] py-1.5 px-2 rounded-lg font-semibold flex items-center justify-center gap-1 border transition-all ${
                        isCopied
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : isLight
                          ? 'bg-white hover:bg-stone-100 text-stone-700 border-stone-300'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border-neutral-700'
                      }`}
                      title="ចម្លង Prompt គំរូនេះទៅ Clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3 h-3 text-white" />
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
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Director Brief Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Core Idea & Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* IDEA Field */}
          <div
            className={`border rounded-2xl p-5 relative transition-all ${
              isLight
                ? 'bg-white border-stone-200 shadow-sm focus-within:border-amber-600'
                : 'bg-neutral-900/60 border-neutral-800 focus-within:border-amber-500/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="input-idea"
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isLight ? 'text-stone-900' : 'text-neutral-300'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`}></span>
                គំនិតច្នៃប្រឌិត (Creative Concept / Objective)
              </label>
              <span className={`text-[11px] font-medium ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                ចាំបាច់ (Required)
              </span>
            </div>
            <textarea
              id="input-idea"
              rows={4}
              value={input.idea}
              onChange={e => setInput(prev => ({ ...prev, idea: e.target.value }))}
              placeholder="e.g. A Cambodian university student learning artificial intelligence in a futuristic smart classroom with floating holographic learning systems..."
              className={`w-full border rounded-xl p-3.5 text-sm transition-all resize-y leading-relaxed font-sans focus:outline-none ${
                isLight
                  ? 'bg-stone-50/80 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600/20'
                  : 'bg-neutral-950/90 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-amber-400/80'
              }`}
            />
            <p className={`text-[11px] mt-2 flex items-center gap-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              <Info className={`w-3.5 h-3.5 flex-shrink-0 ${isLight ? 'text-stone-500' : 'text-neutral-500'}`} />
              សរសេរគំនិតដើមរបស់អ្នក។ ប្រព័ន្ធ Senior Creative Director នឹងវិភាគពន្លឺ មុំកាមេរ៉ា កែវ និងប្លង់ស្វ័យប្រវត្តិ។
            </p>
          </div>

          {/* AUDIENCE & REFERENCES Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Audience */}
            <div
              className={`border rounded-2xl p-4 transition-all ${
                isLight
                  ? 'bg-white border-stone-200 shadow-sm focus-within:border-amber-600'
                  : 'bg-neutral-900/60 border-neutral-800 focus-within:border-amber-500/50'
              }`}
            >
              <label
                htmlFor="input-audience"
                className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isLight ? 'text-stone-900' : 'text-neutral-300'
                }`}
              >
                ទស្សនិកជនគោលដៅ (Target Audience)
              </label>
              <input
                id="input-audience"
                type="text"
                value={input.audience}
                onChange={e => setInput(prev => ({ ...prev, audience: e.target.value }))}
                placeholder="e.g. Higher Ed students, tech pioneers (18–35)"
                className={`w-full border rounded-xl p-2.5 text-xs sm:text-sm transition-all focus:outline-none ${
                  isLight
                    ? 'bg-stone-50/80 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-600'
                    : 'bg-neutral-950/90 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-amber-400/80'
                }`}
              />
            </div>

            {/* References & Roles */}
            <div
              className={`border rounded-2xl p-4 transition-all ${
                isLight
                  ? 'bg-white border-stone-200 shadow-sm focus-within:border-amber-600'
                  : 'bg-neutral-900/60 border-neutral-800 focus-within:border-amber-500/50'
              }`}
            >
              <label
                htmlFor="input-references"
                className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${
                  isLight ? 'text-stone-900' : 'text-neutral-300'
                }`}
              >
                ប្រភពយោង និងការគ្រប់គ្រង (References & Roles)
              </label>
              <input
                id="input-references"
                type="text"
                value={input.references}
                onChange={e => setInput(prev => ({ ...prev, references: e.target.value }))}
                placeholder="e.g. Ref 1: room architecture; Ref 2: student attire"
                className={`w-full border rounded-xl p-2.5 text-xs sm:text-sm transition-all focus:outline-none ${
                  isLight
                    ? 'bg-stone-50/80 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-600'
                    : 'bg-neutral-950/90 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-amber-400/80'
                }`}
              />
            </div>
          </div>

          {/* MUST KEEP & MUST AVOID Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Must Keep */}
            <div
              className={`border rounded-2xl p-4 transition-all ${
                isLight
                  ? 'bg-white border-stone-200 shadow-sm focus-within:border-emerald-600'
                  : 'bg-neutral-900/60 border-neutral-800 focus-within:border-emerald-500/40'
              }`}
            >
              <label
                htmlFor="input-must-keep"
                className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                  isLight ? 'text-emerald-700' : 'text-emerald-400'
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                ធាតុសំខាន់ត្រូវរក្សា (Must-Keep Visuals)
              </label>
              <textarea
                id="input-must-keep"
                rows={2}
                value={input.mustKeep}
                onChange={e => setInput(prev => ({ ...prev, mustKeep: e.target.value }))}
                placeholder="e.g. Natural Southeast Asian student facial traits, glowing cyan HUD nodes, soft daylight"
                className={`w-full border rounded-xl p-2.5 text-xs transition-all resize-none focus:outline-none ${
                  isLight
                    ? 'bg-stone-50/80 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-emerald-600'
                    : 'bg-neutral-950/90 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-emerald-500/80'
                }`}
              />
            </div>

            {/* Must Avoid */}
            <div
              className={`border rounded-2xl p-4 transition-all ${
                isLight
                  ? 'bg-white border-stone-200 shadow-sm focus-within:border-rose-600'
                  : 'bg-neutral-900/60 border-neutral-800 focus-within:border-rose-500/40'
              }`}
            >
              <label
                htmlFor="input-must-avoid"
                className={`block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 ${
                  isLight ? 'text-rose-700' : 'text-rose-400'
                }`}
              >
                <X className="w-3.5 h-3.5" />
                ចំណុចត្រូវជៀសវាង (Must-Avoid Artifacts)
              </label>
              <textarea
                id="input-must-avoid"
                rows={2}
                value={input.mustAvoid}
                onChange={e => setInput(prev => ({ ...prev, mustAvoid: e.target.value }))}
                placeholder="e.g. Distorted hands, cluttered blackboard, garbled gibberish text, oversaturated neon"
                className={`w-full border rounded-xl p-2.5 text-xs transition-all resize-none focus:outline-none ${
                  isLight
                    ? 'bg-stone-50/80 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-rose-600'
                    : 'bg-neutral-950/90 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-rose-500/80'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Cinematography Controls & Visual Commands (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Format / Aspect Ratio */}
          <div
            className={`border rounded-2xl p-4 transition-colors ${
              isLight
                ? 'bg-white border-stone-200 shadow-sm'
                : 'bg-neutral-900/60 border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <label
                className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  isLight ? 'text-stone-900' : 'text-neutral-300'
                }`}
              >
                <Ratio className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                សមាមាត្ររូបភាព (Aspect Ratio & Format)
              </label>
              <span
                className={`text-xs font-mono font-bold ${
                  isLight ? 'text-amber-700' : 'text-amber-400'
                }`}
              >
                {input.aspectRatio}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {aspectRatios.map(ar => {
                const isSelected = input.aspectRatio === ar.value;
                return (
                  <button
                    key={ar.value}
                    id={`ar-btn-${ar.value.replace(':', '-')}`}
                    type="button"
                    onClick={() => setInput(prev => ({ ...prev, aspectRatio: ar.value }))}
                    className={`p-2 rounded-xl text-left border transition-all ${
                      isSelected
                        ? isLight
                          ? 'bg-amber-100/90 border-amber-600 text-amber-950 font-bold shadow-xs'
                          : 'bg-amber-500/15 border-amber-500 text-amber-200'
                        : isLight
                        ? 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-300 hover:bg-stone-100'
                        : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{ar.value}</div>
                    <div
                      className={`text-[10px] truncate ${
                        isLight ? 'text-stone-500' : 'text-neutral-500'
                      }`}
                    >
                      {ar.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Required Text Directive */}
          <div
            className={`border rounded-2xl p-4 transition-colors ${
              isLight
                ? 'bg-white border-stone-200 shadow-sm'
                : 'bg-neutral-900/60 border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="input-required-text"
                className={`text-xs font-bold uppercase tracking-wider ${
                  isLight ? 'text-stone-900' : 'text-neutral-300'
                }`}
              >
                អត្ថបទលើរូបភាព (Required Text or Copy Space)
              </label>
              <button
                type="button"
                id="toggle-no-text-btn"
                onClick={() =>
                  setInput(prev => ({
                    ...prev,
                    requiredText: prev.requiredText === 'NO TEXT' ? '' : 'NO TEXT'
                  }))
                }
                className={`text-[11px] font-semibold transition-colors ${
                  isLight
                    ? 'text-amber-700 hover:text-amber-800'
                    : 'text-amber-400 hover:text-amber-300'
                }`}
              >
                {input.requiredText === 'NO TEXT' ? 'កំណត់អត្ថបទផ្ទាល់ខ្លួន' : 'កំណត់ "NO TEXT"'}
              </button>
            </div>
            <input
              id="input-required-text"
              type="text"
              value={input.requiredText}
              onChange={e => setInput(prev => ({ ...prev, requiredText: e.target.value }))}
              placeholder="e.g. NO TEXT (or exact headline, e.g. 'FUTURE OF LEARNING')"
              className={`w-full border rounded-xl p-2.5 text-xs sm:text-sm transition-all font-mono focus:outline-none ${
                isLight
                  ? 'bg-stone-50/80 border-stone-300 text-stone-900 placeholder-stone-400 focus:bg-white focus:border-amber-600'
                  : 'bg-neutral-950/90 border-neutral-800 text-neutral-100 placeholder-neutral-600 focus:border-amber-400/80'
              }`}
            />
            <p className={`text-[10px] mt-1.5 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              Rule: For long text or logos, the director engine reserves an uncluttered negative space area for graphic typesetting.
            </p>
          </div>

          {/* Selected Commands Tray & Picker Toggle */}
          <div
            className={`border rounded-2xl p-4 transition-colors ${
              isLight
                ? 'bg-white border-stone-200 shadow-sm'
                : 'bg-neutral-900/60 border-neutral-800'
            }`}
          >
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <Sliders className={`w-3.5 h-3.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    isLight ? 'text-stone-900' : 'text-neutral-300'
                  }`}
                >
                  កូដបញ្ជាប្លង់ និងសិល្បៈ Slash Commands ({input.selectedCommands.length})
                </span>
              </div>
              <button
                type="button"
                id="open-cmd-picker-btn"
                onClick={() => setShowCommandsPicker(!showCommandsPicker)}
                className={`text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all ${
                  isLight
                    ? 'text-amber-800 bg-amber-50 border-amber-300 hover:bg-amber-100'
                    : 'text-amber-400 hover:text-amber-300 bg-amber-500/10 border-amber-500/20'
                }`}
              >
                {showCommandsPicker ? 'បិទតារាង' : '+ បន្ថែម Commands'}
              </button>
            </div>

            {/* Active Commands Chips */}
            <div
              className={`min-h-[44px] p-2 border rounded-xl flex flex-wrap gap-1.5 max-h-36 overflow-y-auto ${
                isLight
                  ? 'bg-stone-50 border-stone-200'
                  : 'bg-neutral-950/80 border-neutral-800'
              }`}
            >
              {input.selectedCommands.length === 0 ? (
                <span className={`text-xs italic self-center px-1 ${isLight ? 'text-stone-500' : 'text-neutral-600'}`}>
                  No slash commands selected. The director will auto-select the best matching optical codes based on your idea.
                </span>
              ) : (
                input.selectedCommands.map(code => (
                  <span
                    key={code}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono font-bold border group ${
                      isLight
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {code}
                    <button
                      type="button"
                      onClick={() => handleToggleCommand(code)}
                      className={`transition-colors ${
                        isLight
                          ? 'text-amber-700 hover:text-amber-950'
                          : 'text-amber-400/60 hover:text-amber-200'
                      }`}
                      title="Remove command"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* In-Studio Command Quick Selector Drawer */}
            {showCommandsPicker && (
              <div
                className={`mt-3 p-3 border rounded-xl space-y-3 ${
                  isLight
                    ? 'bg-stone-50 border-stone-300 shadow-sm'
                    : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    value={commandSearch}
                    onChange={e => setCommandSearch(e.target.value)}
                    placeholder="Search 100+ commands (/drone, /macro, /gold...)"
                    className={`w-full border rounded-lg px-2.5 py-1.5 text-xs focus:outline-none ${
                      isLight
                        ? 'bg-white border-stone-300 text-stone-900 placeholder-stone-400 focus:border-amber-600'
                        : 'bg-neutral-900 border-neutral-700/80 text-neutral-200 placeholder-neutral-500 focus:border-amber-400'
                    }`}
                  />
                  {commandSearch && (
                    <button
                      onClick={() => setCommandSearch('')}
                      className={`p-1 ${isLight ? 'text-stone-500 hover:text-stone-800' : 'text-neutral-500 hover:text-neutral-300'}`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex gap-1 overflow-x-auto pb-1 text-[11px] scrollbar-thin">
                  <button
                    onClick={() => setActiveCategoryFilter('All')}
                    className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                      activeCategoryFilter === 'All'
                        ? isLight
                          ? 'bg-amber-500 text-stone-950 font-bold'
                          : 'bg-amber-500 text-neutral-950 font-semibold'
                        : isLight
                        ? 'bg-stone-200/80 text-stone-700 hover:text-stone-900'
                        : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    ទាំងអស់ ({ALL_PROMPT_ITEMS.length})
                  </button>
                  {PROMPT_CATEGORIES.slice(0, 11).map(cat => (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategoryFilter(cat.key)}
                      className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                        activeCategoryFilter === cat.key
                          ? isLight
                            ? 'bg-amber-500 text-stone-950 font-bold'
                            : 'bg-amber-500 text-neutral-950 font-semibold'
                          : isLight
                          ? 'bg-stone-200/80 text-stone-700 hover:text-stone-900'
                          : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      {cat.nameKm}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                  {filteredCommands.slice(0, 40).map(cmd => {
                    const isSelected = input.selectedCommands.includes(cmd.command);
                    return (
                      <button
                        key={cmd.id}
                        type="button"
                        onClick={() => handleToggleCommand(cmd.command)}
                        className={`text-left p-1.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                          isSelected
                            ? isLight
                              ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                              : 'bg-amber-500/20 border-amber-500 text-amber-200 font-medium'
                            : isLight
                            ? 'bg-white border-stone-200 text-stone-800 hover:border-stone-300'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="truncate pr-1">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-stone-400 font-mono">#{cmd.id}</span>
                            <span className={`font-mono font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                              {cmd.command}
                            </span>
                          </div>
                          <span className={`text-[11px] block truncate font-medium ${isLight ? 'text-stone-800' : 'text-neutral-200'}`}>
                            {cmd.functionKm}
                          </span>
                          <span className={`text-[10px] block truncate opacity-70 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                            {cmd.functionEn}
                          </span>
                        </div>
                        {isSelected ? (
                          <Check className={`w-3.5 h-3.5 flex-shrink-0 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                        ) : (
                          <Plus className={`w-3.5 h-3.5 flex-shrink-0 ${isLight ? 'text-stone-400' : 'text-neutral-500'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Footer Bar */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t ${
          isLight ? 'border-stone-200' : 'border-neutral-800'
        }`}
      >
        <button
          type="button"
          id="clear-all-brief-btn"
          onClick={handleClearAll}
          className={`text-xs flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors ${
            isLight
              ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/80 font-medium'
              : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
          }`}
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>សម្អាតទម្រង់ (Reset Form)</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            id="direct-and-generate-btn"
            onClick={onGenerate}
            disabled={isLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-neutral-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin"></div>
                <span>កំពុងវិភាគ និងបង្កើត Master Prompt...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 text-neutral-950 stroke-[2.2]" />
                <span>បង្កើត Master Prompt ផ្លូវការ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lightbox Modal for Quick Presets */}
      {previewPreset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setPreviewPreset(null)}
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
              onClick={() => setPreviewPreset(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-black/90 text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* High-Resolution Real Image Preview */}
            <div className="w-full h-72 sm:h-96 bg-black relative overflow-hidden flex items-center justify-center flex-shrink-0">
              <img
                src={previewPreset.imageUrl || '/samples/executive_portrait_1789616896838.jpg'}
                alt={previewPreset.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded font-bold text-xs bg-amber-500 text-neutral-950">
                  {previewPreset.badge}
                </span>
                <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-black/75 text-white backdrop-blur-xs">
                  {previewPreset.aspectRatio}
                </span>
              </div>
            </div>

            {/* Details & Actions */}
            <div className="p-5 overflow-y-auto space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold">
                  {previewPreset.titleKm || previewPreset.title}
                </h3>
                <p className={`text-xs sm:text-sm ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                  {previewPreset.title}
                </p>
                <p className={`text-xs mt-1.5 leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {previewPreset.idea}
                </p>
              </div>

              {/* Ready-to-copy Prompt */}
              <div
                className={`p-3.5 rounded-xl border ${
                  isLight ? 'bg-stone-50 border-stone-200' : 'bg-neutral-950 border-neutral-800'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                    គំរូ Production Prompt ពេញលេញ
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleCopyPresetPrompt(previewPreset, e)}
                    className="text-xs font-bold flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-colors"
                  >
                    {copiedPresetId === previewPreset.id ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-mono text-xs leading-relaxed select-all break-words">
                  {previewPreset.copyPrompt || previewPreset.idea}
                </p>
              </div>

              {/* Recommended Commands */}
              <div>
                <span className={`text-[11px] font-bold uppercase tracking-wider block mb-1.5 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                  កូដបញ្ជាប្លង់ដែលបានប្រើប្រាស់ (Recommended Commands):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {previewPreset.recommendedCommands.map(cmd => (
                    <span
                      key={cmd}
                      className={`font-mono text-xs px-2 py-0.5 rounded border ${
                        isLight
                          ? 'bg-amber-50 text-amber-900 border-amber-200 font-medium'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      }`}
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Dialog Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setPreviewPreset(null)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border ${
                    isLight
                      ? 'border-stone-300 text-stone-700 hover:bg-stone-100'
                      : 'border-neutral-700 text-neutral-300 hover:bg-neutral-800'
                  }`}
                >
                  បិទ (Close)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleApplyPreset(previewPreset);
                    setPreviewPreset(null);
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-neutral-950 flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ផ្ទុកទិន្នន័យចូល Studio ឥឡូវនេះ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
