import React, { useState } from 'react';
import { REAL_PROMPT_SAMPLES, RealPromptSample } from '../data/realPromptSamples';
import { useTheme } from '../context/ThemeContext';
import { PromptInput } from '../types';
import {
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  ZoomIn,
  Sliders,
  CheckCircle2,
  Layers,
  Camera,
  Sun,
  Maximize2,
  X,
  HelpCircle,
  Cpu
} from 'lucide-react';

interface RealPromptSamplesShowcaseProps {
  onLoadIntoStudio: (sampleBrief: PromptInput) => void;
}

export const RealPromptSamplesShowcase: React.FC<RealPromptSamplesShowcaseProps> = ({
  onLoadIntoStudio
}) => {
  const { isLight } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<RealPromptSample | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const filteredSamples =
    selectedCategory === 'all'
      ? REAL_PROMPT_SAMPLES
      : REAL_PROMPT_SAMPLES.filter(s => s.id === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Hero Banner with instructions */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-colors relative overflow-hidden ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/90 border-neutral-800 shadow-xl'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </span>
              <h2
                className={`text-xl sm:text-2xl font-bold font-display ${
                  isLight ? 'text-stone-900' : 'text-white'
                }`}
              >
                គំរូរូបភាពពិត & Prompts តាម Command (/)
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  isLight
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}
              >
                រូបភាពពិតជាក់ស្តែង • AI Generated Samples
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                isLight ? 'text-stone-600' : 'text-neutral-300'
              }`}
            >
              នេះជាបណ្តុំរូបភាពគំរូជាក់ស្តែងដែលត្រូវបានបង្កើតឡើងដោយ AI យោងតាមរូបថតដើម និងប្រព័ន្ធ
              Command (/) Prompts។ លោកអ្នកអាចពិនិត្យមើលរូបភាពពិតមុននឹងធ្វើការ <strong>Copy & Paste</strong> យកទៅប្រើប្រាស់ក្នុង <strong>ChatGPT, Midjourney, Flux.1, ឬ Leonardo AI</strong> ឬចុច <strong>Load ចូល Studio</strong> ដើម្បីកែសម្រួលបន្ថែមភ្លាមៗ!
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border text-xs space-y-1.5 shrink-0 ${
              isLight
                ? 'bg-stone-50 border-stone-200 text-stone-700'
                : 'bg-neutral-950/80 border-neutral-800 text-neutral-300'
            }`}
          >
            <div className="font-semibold text-amber-500 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>របៀបប្រើប្រាស់ (How to Use):</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 text-[11px] leading-relaxed">
              <li>មើលរូបភាពគំរូពិត និងបញ្ជី Slash Commands (/)</li>
              <li>ចុច "ចម្លង Prompt" (Copy) ដើម្បីយកទៅបិទភ្ជាប់ក្នុង AI</li>
              <li>ឬចុច "Load ចូល Studio" ដើម្បីបង្កើត Prompt ថ្មីបន្ថែម</li>
            </ol>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1 border-t border-dashed border-stone-200 dark:border-neutral-800 mt-6">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-neutral-950 shadow-sm'
                : isLight
                ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            ទាំងអស់ ({REAL_PROMPT_SAMPLES.length} រចនាប័ទ្ម)
          </button>
          {REAL_PROMPT_SAMPLES.map(sample => (
            <button
              key={sample.id}
              type="button"
              onClick={() => setSelectedCategory(sample.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedCategory === sample.id
                  ? 'bg-amber-500 text-neutral-950 shadow-sm'
                  : isLight
                  ? 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              <span>{sample.titleKm.split('(')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Real Visual Sample Cards */}
      <div className="grid grid-cols-1 gap-8">
        {filteredSamples.map(sample => {
          const isCopied = copiedId === sample.id;
          return (
            <div
              key={sample.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col xl:flex-row ${
                isLight
                  ? 'bg-white border-stone-200 shadow-md hover:border-amber-400/60'
                  : 'bg-neutral-900 border-neutral-800 shadow-xl hover:border-amber-500/50'
              }`}
            >
              {/* Left/Top: High-Quality Image Display */}
              <div className="xl:w-5/12 bg-black relative flex items-center justify-center min-h-[380px] xl:min-h-full overflow-hidden group">
                <img
                  src={sample.imageUrl}
                  alt={sample.titleEn}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-500 text-neutral-950 shadow-md">
                    {sample.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/75 text-white backdrop-blur-md">
                    Aspect Ratio: {sample.aspectRatio}
                  </span>
                </div>

                {/* Click to Enlarge Button */}
                <button
                  type="button"
                  onClick={() => setPreviewImage(sample)}
                  className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/75 hover:bg-amber-500 hover:text-black text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1.5 opacity-90 group-hover:opacity-100 shadow-lg"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>ពង្រីកមើលរូបភាពពិត</span>
                </button>
              </div>

              {/* Right/Bottom: Real Commands & Prompts Breakdown */}
              <div className="xl:w-7/12 p-5 sm:p-7 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Header Title & Subtitle */}
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-display ${
                        isLight ? 'text-stone-900' : 'text-white'
                      }`}
                    >
                      {sample.titleKm}
                    </h3>
                    <p className={`text-xs mt-0.5 font-medium ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                      {sample.titleEn}
                    </p>
                  </div>

                  {/* Visual Commands Used Tags */}
                  <div>
                    <div className="text-xs font-semibold mb-2 flex items-center gap-1.5 text-amber-500">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Command (/) Prompts ដែលបានប្រើក្នុងរូបនេះ៖</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sample.commands.map(cmd => (
                        <div
                          key={cmd.code}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-mono transition-colors ${
                            isLight
                              ? 'bg-amber-50 border-amber-200 text-amber-900'
                              : 'bg-amber-500/10 border-amber-500/20 text-amber-300'
                          }`}
                          title={cmd.effect}
                        >
                          <span className="font-bold">{cmd.code}</span>
                          <span className={`text-[10px] ml-1.5 font-sans ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                            ({cmd.nameKm})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ready-to-Copy English Prompt Box */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className={`font-semibold flex items-center gap-1.5 ${isLight ? 'text-stone-800' : 'text-neutral-200'}`}>
                        <Cpu className="w-3.5 h-3.5 text-amber-500" />
                        <span>Prompt ពេញលេញសម្រាប់ Copy ទៅ Generate ក្នុង AI:</span>
                      </span>
                      <span className={`text-[11px] ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                        Standard English Prompt (DALL-E 3 / Midjourney)
                      </span>
                    </div>
                    <div
                      className={`p-3.5 rounded-xl border text-xs leading-relaxed font-mono relative group ${
                        isLight
                          ? 'bg-stone-50 border-stone-300 text-stone-800'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      <p className="line-clamp-4">{sample.fullPromptEn}</p>
                    </div>
                  </div>

                  {/* Khmer Formula Breakdown */}
                  <div
                    className={`p-3.5 rounded-xl border text-xs space-y-2 ${
                      isLight
                        ? 'bg-amber-50/40 border-amber-200/70 text-stone-800'
                        : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-300'
                    }`}
                  >
                    <div className="font-semibold text-amber-600 dark:text-amber-400 text-[11px] uppercase tracking-wider">
                      វិភាគធាតុផ្សំរូបមន្ត (Formula Breakdown):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">តួអង្គ (Subject): </strong>
                        <span>{sample.khmerBreakdown.subject}</span>
                      </div>
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">សម្លៀកបំពាក់ (Attire): </strong>
                        <span>{sample.khmerBreakdown.attire}</span>
                      </div>
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">ទីតាំង (Setting): </strong>
                        <span>{sample.khmerBreakdown.setting}</span>
                      </div>
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">ពន្លឺ (Lighting): </strong>
                        <span>{sample.khmerBreakdown.lighting}</span>
                      </div>
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">កាមេរ៉ា & ឡេន: </strong>
                        <span>{sample.khmerBreakdown.cameraLens}</span>
                      </div>
                      <div>
                        <strong className="text-amber-700 dark:text-amber-300">គុណភាពរូប: </strong>
                        <span>{sample.khmerBreakdown.quality}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended Engines */}
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className={`text-[11px] font-medium ${isLight ? 'text-stone-500' : 'text-neutral-500'}`}>
                      ដំណើរការល្អបំផុតជាមួយ៖
                    </span>
                    {sample.recommendedPlatforms.map(plat => (
                      <span
                        key={plat}
                        className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                          isLight
                            ? 'bg-stone-100 border-stone-200 text-stone-700'
                            : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                        }`}
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons: Copy Prompt & Load into Studio */}
                <div className="pt-4 border-t border-stone-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCopy(sample.fullPromptEn, sample.id)}
                    className={`w-full sm:flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-md shadow-amber-500/20 active:scale-95'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>បានចម្លងរួចរាល់ (Copied to Clipboard!)</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>ចម្លង Prompt (Copy English Prompt)</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onLoadIntoStudio({
                        idea: sample.sampleBrief.idea,
                        audience: sample.sampleBrief.audience,
                        references: sample.sampleBrief.references,
                        requiredText: sample.sampleBrief.requiredText,
                        aspectRatio: sample.sampleBrief.aspectRatio,
                        mustKeep: sample.sampleBrief.mustKeep,
                        mustAvoid: sample.sampleBrief.mustAvoid,
                        selectedCommands: sample.sampleBrief.selectedCommands
                      });
                    }}
                    className={`w-full sm:w-auto py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold border transition-all flex items-center justify-center gap-2 ${
                      isLight
                        ? 'bg-stone-100 hover:bg-stone-200 border-stone-300 text-stone-800'
                        : 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-neutral-200'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Load ចូល Studio ដើម្បីកែសម្រួល</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox / Zoom Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-12 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Enlarged Image */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl bg-black">
              <img
                src={previewImage.imageUrl}
                alt={previewImage.titleEn}
                className="max-h-[75vh] w-auto object-contain rounded-2xl"
              />
            </div>

            {/* Bottom Caption & Copy */}
            <div className="mt-4 w-full flex items-center justify-between gap-4 text-white text-xs sm:text-sm">
              <div>
                <span className="font-bold text-amber-400">{previewImage.titleKm}</span>
                <span className="text-neutral-400 ml-2">({previewImage.badge})</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(previewImage.fullPromptEn, `modal-${previewImage.id}`)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold flex items-center gap-1.5 transition-all text-xs"
              >
                {copiedId === `modal-${previewImage.id}` ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>បានចម្លងរួចរាល់!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Prompt</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
