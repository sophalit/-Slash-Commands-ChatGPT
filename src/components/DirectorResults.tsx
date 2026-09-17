import React, { useState } from 'react';
import { PromptResult } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Copy,
  Check,
  Clapperboard,
  Sparkles,
  Camera,
  Eye,
  Sun,
  Palette,
  Layers,
  FileText,
  Compass,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  SplitSquareVertical,
  Wand2,
  Share2,
  Download,
  Maximize2,
  X
} from 'lucide-react';
import {
  get14PointVisuals,
  getMasterVisualImage,
  getAlternativeDirectionImage
} from '../utils/directorImageResolver';

interface DirectorResultsProps {
  result: PromptResult;
  sourceEngine?: string;
}

export const DirectorResults: React.FC<DirectorResultsProps> = ({ result, sourceEngine }) => {
  const { isLight } = useTheme();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
    badge?: string;
    description?: string;
    prompt?: string;
  } | null>(null);

  const visuals14 = get14PointVisuals(result.analysis);
  const masterVisual = getMasterVisualImage(result.partA_CompletePrompt, result.analysis);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(label);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleExportMarkdown = () => {
    const mdContent = `# Creative Director & AI Prompt Brief

## 14-Point Creative Director Analysis
1. **Creative Objective**: ${result.analysis.creativeObjective}
2. **Target Audience**: ${result.analysis.targetAudience}
3. **Subject**: ${result.analysis.subject}
4. **Character**: ${result.analysis.character}
5. **Environment**: ${result.analysis.environment}
6. **Story**: ${result.analysis.story}
7. **Camera Angle**: ${result.analysis.cameraAngle}
8. **Lens Look**: ${result.analysis.lensLook}
9. **Composition**: ${result.analysis.composition}
10. **Lighting**: ${result.analysis.lighting}
11. **Color Style**: ${result.analysis.colorStyle}
12. **Materials**: ${result.analysis.materials}
13. **Relevant Commands**: ${result.analysis.relevantVisualCommands.join(', ')}
14. **Output Format**: ${result.analysis.outputFormat}

---

## Part A: Complete Copy-Ready Image Prompt
\`\`\`
${result.partA_CompletePrompt}
\`\`\`

---

## Part B: Explanation of Selected Visual Commands
${result.partB_CommandExplanation}

---

## Part C: Three Alternative Creative Directions
${result.partC_AlternativeDirections.map(dir => `### ${dir.title}\n${dir.description}\n\n**Prompt:**\n\`\`\`\n${dir.prompt}\n\`\`\`\n`).join('\n')}

---

## Part D: Improvement Suggestions & Refinement
${result.partD_ImprovementAndRefinement.suggestions.map(s => `- ${s}`).join('\n')}

### Refinement Prompt (Pass 2):
\`\`\`
${result.partD_ImprovementAndRefinement.refinementPrompt}
\`\`\`

---
*${result.disclaimer}*
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creative-director-prompt-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Result Banner */}
      <div
        className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border transition-colors ${
          isLight
            ? 'bg-gradient-to-r from-amber-100/70 via-amber-50/40 to-white border-amber-300 shadow-sm'
            : 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-neutral-900 border-amber-500/30'
        }`}
      >
        <div>
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${isLight ? 'bg-amber-600' : 'bg-amber-400'}`}></span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-amber-800' : 'text-amber-400'
              }`}
            >
              ការវិភាគដោយ Senior Creative Director បានបញ្ចប់
            </span>
            {sourceEngine && (
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                  isLight
                    ? 'bg-white text-stone-700 border-stone-300'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800'
                }`}
              >
                {sourceEngine === 'gemini_api' ? 'Gemini 3.8 Flash' : 'Master Director Engine'}
              </span>
            )}
          </div>
          <h2
            className={`text-lg sm:text-xl font-bold mt-1 ${
              isLight ? 'text-stone-900' : 'text-white'
            }`}
          >
            យុទ្ធសាស្ត្ររូបភាព និង Master Prompt ផ្លូវការ (Production-Ready Prompt)
          </h2>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            id="export-markdown-btn"
            onClick={handleExportMarkdown}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium border transition-colors ${
              isLight
                ? 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300 shadow-xs'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border-neutral-700'
            }`}
          >
            <Download className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
            <span>Export Markdown</span>
          </button>

          <button
            type="button"
            id="copy-master-prompt-top-btn"
            onClick={() => copyToClipboard(result.partA_CompletePrompt, 'master-top')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
          >
            {copiedSection === 'master-top' ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copied Prompt!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Copy Master Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* SECTION A: THE MASTER PROMPT (PRIMARY HERO CARD) WITH REAL VISUAL PREVIEW */}
      <div
        className={`border-2 rounded-2xl p-5 sm:p-6 relative transition-colors ${
          isLight
            ? 'bg-white border-amber-500/60 shadow-lg shadow-amber-900/5'
            : 'bg-neutral-900 border-amber-500/40 shadow-2xl shadow-amber-500/5'
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b ${
            isLight ? 'border-stone-200' : 'border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg ${
                isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/10 text-amber-400'
              }`}
            >
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isLight ? 'text-amber-800' : 'text-amber-400'
                  }`}
                >
                  ផ្នែក ក (Part A): Master Prompt រូបភាពពេញលេញ (Copy-Ready)
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {masterVisual.badge}
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                សំយោគកម្មវត្ថុ ពន្លឺ មុំកាមេរ៉ា កូដបញ្ជាប្លង់ Slash Commands និងការពន្យល់យ៉ាងច្បាស់លាស់។
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="copy-hero-prompt-btn"
              onClick={() => copyToClipboard(result.partA_CompletePrompt, 'hero-prompt')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                isLight
                  ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950 border-amber-600 shadow-xs'
                  : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 border-amber-400'
              }`}
            >
              {copiedSection === 'hero-prompt' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-neutral-950" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-neutral-950" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Master Visual + Prompt Side-by-Side Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left / Top: Master Visual Card (5 cols on lg) */}
          <div className="lg:col-span-5 flex flex-col">
            <div
              className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-black cursor-pointer group/img border border-amber-500/30 shadow-md"
              onClick={() => setPreviewImage({
                url: masterVisual.url,
                title: 'Master Prompt Representative Visual (រូបភាពពិតតំណាង Master Prompt)',
                badge: masterVisual.badge,
                description: 'រូបភាពគំរូជាក់ស្តែងតំណាងឲ្យ Master Prompt ដែលផលិតចេញពីប្លង់ និងកូដបញ្ជាផ្លូវការ',
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិតតំណាង Master Prompt ពេញអេក្រង់"
            >
              <img
                src={masterVisual.url}
                alt="Master Visual Representation"
                className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-3">
                <span className="text-xs text-white font-semibold flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>ចុចពង្រីកមើលរូបភាពពិត</span>
                </span>
                <Maximize2 className="w-4 h-4 text-white/90" />
              </div>

              {/* Badges on image */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-amber-300 backdrop-blur-xs border border-amber-500/40">
                  {masterVisual.badge}
                </span>
              </div>
              <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/80 text-white backdrop-blur-xs">
                {result.analysis.outputFormat || '16:9'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-2 px-1">
              <span className={`font-medium ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                📷 រូបភាពពិតតំណាង Master Visual
              </span>
              <button
                type="button"
                onClick={() => setPreviewImage({
                  url: masterVisual.url,
                  title: 'Master Prompt Representative Visual',
                  badge: masterVisual.badge,
                  description: 'រូបភាពគំរូជាក់ស្តែងតំណាងឲ្យ Master Prompt',
                  prompt: result.partA_CompletePrompt
                })}
                className={`flex items-center gap-1 hover:underline font-semibold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}
              >
                <Maximize2 className="w-3 h-3" />
                <span>ពង្រីកមើល Lightbox</span>
              </button>
            </div>
          </div>

          {/* Right: The Prompt Text Block (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              className={`p-4 sm:p-5 rounded-xl border font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap select-all flex-1 ${
                isLight
                  ? 'bg-stone-950 border-stone-800 text-amber-200 shadow-inner'
                  : 'bg-neutral-950 border-neutral-800/80 text-amber-100/90'
              }`}
            >
              {result.partA_CompletePrompt}
            </div>

            {/* Stats & Target Platforms */}
            <div
              className={`flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t text-xs ${
                isLight ? 'border-stone-200 text-stone-600' : 'border-neutral-800/60 text-neutral-400'
              }`}
            >
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className={isLight ? 'text-stone-500' : 'text-neutral-500'}>Platform:</span>
                {['Midjourney v6', 'ChatGPT (DALL-E 3)', 'Google ImageFX', 'Firefly'].map(plat => (
                  <span
                    key={plat}
                    className={`px-2 py-0.5 rounded font-sans text-[10px] border ${
                      isLight
                        ? 'bg-stone-100 text-stone-700 border-stone-200 font-medium'
                        : 'bg-neutral-800/80 text-neutral-300 border-neutral-700/50'
                    }`}
                  >
                    {plat}
                  </span>
                ))}
              </div>

              <div
                className={`flex items-center gap-2.5 font-mono text-[11px] ${
                  isLight ? 'text-stone-500' : 'text-neutral-500'
                }`}
              >
                <span>{result.partA_CompletePrompt.length} chars</span>
                <span>~{Math.round(result.partA_CompletePrompt.length / 4)} tokens</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 14-POINT CREATIVE DIRECTOR STRATEGY BREAKDOWN WITH REAL REPRESENTATIVE IMAGES */}
      <div
        className={`border rounded-2xl p-5 sm:p-6 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b ${
            isLight ? 'border-stone-200' : 'border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Clapperboard className={`w-5 h-5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            <div>
              <div className="flex items-center gap-2">
                <h3
                  className={`text-sm font-bold uppercase tracking-wider ${
                    isLight ? 'text-stone-900' : 'text-neutral-200'
                  }`}
                >
                  ការវិភាគ ១៤ ចំណុចដោយ Creative Director (14-Point Strategic Breakdown)
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  មានរូបភាពពិតទាំង ១៤
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
                វិភាគលម្អិតលើគោលបំណង ទស្សនិកជន ពន្លឺ កែវកាមេរ៉ា ប្លង់ និងសម្ភារៈ ភ្ជាប់ជាមួយរូបភាពពិតជាក់ស្តែង។
              </p>
            </div>
          </div>
          <span className={`text-xs hidden sm:inline ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
            ចុចលើរូបភាពណាមួយដើម្បីពង្រីកមើល Lightbox
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Creative Objective */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.objective.imageUrl,
                title: '1. Creative Objective (គោលបំណងច្នៃប្រឌិត)',
                badge: visuals14.objective.badge,
                description: result.analysis.creativeObjective,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.objective.imageUrl}
                alt="Creative Objective"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.objective.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>1. Creative Objective (គោលបំណងច្នៃប្រឌិត)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.creativeObjective}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Target Audience */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.audience.imageUrl,
                title: '2. Target Audience (ទស្សនិកជនគោលដៅ)',
                badge: visuals14.audience.badge,
                description: result.analysis.targetAudience,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.audience.imageUrl}
                alt="Target Audience"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.audience.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>2. Target Audience (ទស្សនិកជនគោលដៅ)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.targetAudience}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Subject */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.subject.imageUrl,
                title: '3. Focal Subject (កម្មវត្ថុចម្បង)',
                badge: visuals14.subject.badge,
                description: result.analysis.subject,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.subject.imageUrl}
                alt="Subject"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.subject.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3. Subject (កម្មវត្ថុចម្បង)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.subject}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Character */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.character.imageUrl,
                title: '4. Character Demeanor (កាយវិការ និងអារម្មណ៍)',
                badge: visuals14.character.badge,
                description: result.analysis.character,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.character.imageUrl}
                alt="Character Demeanor"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.character.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>4. Character Demeanor (កាយវិការ និងអារម្មណ៍)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.character}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Environment */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.environment.imageUrl,
                title: '5. Environment & Space (លំហ និងទីតាំង)',
                badge: visuals14.environment.badge,
                description: result.analysis.environment,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.environment.imageUrl}
                alt="Environment"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.environment.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>5. Environment & Space (លំហ និងទីតាំង)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.environment}
                </p>
              </div>
            </div>
          </div>

          {/* 6. Story */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.story.imageUrl,
                title: '6. Narrative Story Arc (សាច់រឿងក្នុងប្លង់)',
                badge: visuals14.story.badge,
                description: result.analysis.story,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.story.imageUrl}
                alt="Story Arc"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.story.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Clapperboard className="w-3.5 h-3.5" />
                  <span>6. Narrative Story Arc (សាច់រឿងក្នុងប្លង់)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.story}
                </p>
              </div>
            </div>
          </div>

          {/* 7. Camera Angle */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.cameraAngle.imageUrl,
                title: '7. Camera Angle (មុំកាមេរ៉ា)',
                badge: visuals14.cameraAngle.badge,
                description: result.analysis.cameraAngle,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.cameraAngle.imageUrl}
                alt="Camera Angle"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.cameraAngle.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>7. Camera Angle (មុំកាមេរ៉ា)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.cameraAngle}
                </p>
              </div>
            </div>
          </div>

          {/* 8. Lens Look */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.lensLook.imageUrl,
                title: '8. Lens Look & Optics (កែវ និង Bokeh)',
                badge: visuals14.lensLook.badge,
                description: result.analysis.lensLook,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.lensLook.imageUrl}
                alt="Lens Look"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.lensLook.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>8. Lens Look & Optics (កែវ និងអុបទិក)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.lensLook}
                </p>
              </div>
            </div>
          </div>

          {/* 9. Composition */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.composition.imageUrl,
                title: '9. Composition Geometry (រចនាសម្ព័ន្ធប្លង់)',
                badge: visuals14.composition.badge,
                description: result.analysis.composition,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.composition.imageUrl}
                alt="Composition"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.composition.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>9. Composition Geometry (រចនាសម្ព័ន្ធប្លង់)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.composition}
                </p>
              </div>
            </div>
          </div>

          {/* 10. Lighting */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.lighting.imageUrl,
                title: '10. Lighting Architecture (ស្ថាបត្យកម្មពន្លឺ)',
                badge: visuals14.lighting.badge,
                description: result.analysis.lighting,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.lighting.imageUrl}
                alt="Lighting"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.lighting.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>10. Lighting Architecture (ស្ថាបត្យកម្មពន្លឺ)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.lighting}
                </p>
              </div>
            </div>
          </div>

          {/* 11. Color Style */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.colorStyle.imageUrl,
                title: '11. Color Palette & Grade (តុងពណ៌ និងអារម្មណ៍)',
                badge: visuals14.colorStyle.badge,
                description: result.analysis.colorStyle,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.colorStyle.imageUrl}
                alt="Color Style"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.colorStyle.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" />
                  <span>11. Color Palette & Grade (តុងពណ៌)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.colorStyle}
                </p>
              </div>
            </div>
          </div>

          {/* 12. Materials */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.materials.imageUrl,
                title: '12. Materials & Surface (វាយនភាពសម្ភារៈ)',
                badge: visuals14.materials.badge,
                description: result.analysis.materials,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.materials.imageUrl}
                alt="Materials & Surface"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.materials.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>12. Materials & Surface (វាយនភាពសម្ភារៈ)</span>
                </div>
                <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
                  {result.analysis.materials}
                </p>
              </div>
            </div>
          </div>

          {/* 13. Relevant Visual Commands */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group md:col-span-2 ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.commands.imageUrl,
                title: '13. Selected Visual Commands (កូដបញ្ជាប្លង់)',
                badge: visuals14.commands.badge,
                description: `កូដបញ្ជាផ្លូវការដែលបានជ្រើសរើស: ${result.analysis.relevantVisualCommands.join(', ')}`,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.commands.imageUrl}
                alt="Selected Visual Commands"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.commands.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1.5 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>13. Selected Visual Commands (កូដបញ្ជាប្លង់ដែលបានប្រើ)</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {result.analysis.relevantVisualCommands.map(cmd => (
                    <span
                      key={cmd}
                      className={`px-2 py-0.5 rounded border font-mono text-xs font-semibold ${
                        isLight
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-amber-500/15 text-amber-300 border-amber-500/25'
                      }`}
                    >
                      {cmd}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 14. Output Format */}
          <div
            className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
              isLight
                ? 'bg-stone-50/80 border-stone-200 hover:border-amber-400 hover:shadow-sm'
                : 'bg-neutral-950/80 border-neutral-800/80 hover:border-amber-500/40'
            }`}
          >
            <div
              className="relative w-full h-28 sm:h-32 bg-black/40 overflow-hidden cursor-pointer group/img"
              onClick={() => setPreviewImage({
                url: visuals14.outputFormat.imageUrl,
                title: '14. Output Format & Margins (ទម្រង់ប្លង់ និងស៊ុមរូបភាព)',
                badge: visuals14.outputFormat.badge,
                description: `អនុបាតរូបភាពផ្លូវការ: ${result.analysis.outputFormat}`,
                prompt: result.partA_CompletePrompt
              })}
              title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
            >
              <img
                src={visuals14.outputFormat.imageUrl}
                alt="Output Format"
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
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-black/75 text-amber-300 backdrop-blur-xs border border-amber-500/30">
                  {visuals14.outputFormat.badge}
                </span>
              </div>
            </div>

            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <div
                  className={`text-[11px] uppercase font-bold mb-1 flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400/90'
                  }`}
                >
                  <SplitSquareVertical className="w-3.5 h-3.5" />
                  <span>14. Output Format & Margins (ទម្រង់ប្លង់)</span>
                </div>
                <p className={`text-xs font-mono font-semibold ${isLight ? 'text-stone-800' : 'text-neutral-300'}`}>
                  {result.analysis.outputFormat}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Assumptions & References Control Note */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t ${
            isLight ? 'border-stone-200' : 'border-neutral-800/80'
          }`}
        >
          <div className={`text-xs ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
            <span className={`font-bold ${isLight ? 'text-stone-900' : 'text-neutral-300'}`}>
              Stated Assumptions:
            </span>{' '}
            {result.analysis.assumptions}
          </div>
          <div className={`text-xs ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
            <span className={`font-bold ${isLight ? 'text-stone-900' : 'text-neutral-300'}`}>
              Reference Role:
            </span>{' '}
            {result.analysis.referenceControlAnalysis}
          </div>
        </div>
      </div>

      {/* SECTION B: SHORT EXPLANATION OF SELECTED VISUAL COMMANDS */}
      <div
        className={`border rounded-2xl p-6 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div
          className={`flex items-center justify-between mb-3 pb-3 border-b ${
            isLight ? 'border-stone-200' : 'border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            <h3
              className={`text-sm font-bold uppercase tracking-wider ${
                isLight ? 'text-stone-900' : 'text-neutral-200'
              }`}
            >
              ផ្នែក ខ (Part B): ការពន្យល់ពីកូដបញ្ជាប្លង់ (Visual Commands Rationale)
            </h3>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(result.partB_CommandExplanation, 'section-b')}
            className={`text-xs transition-colors flex items-center gap-1 ${
              isLight
                ? 'text-stone-600 hover:text-amber-800 font-medium'
                : 'text-neutral-400 hover:text-amber-300'
            }`}
          >
            {copiedSection === 'section-b' ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>Copy Explanation</span>
          </button>
        </div>

        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm whitespace-pre-line leading-relaxed font-sans ${
            isLight
              ? 'bg-stone-50 border-stone-200 text-stone-800'
              : 'bg-neutral-950/90 border-neutral-800 text-neutral-300'
          }`}
        >
          {result.partB_CommandExplanation}
        </div>
      </div>

      {/* SECTION C: THREE ALTERNATIVE CREATIVE DIRECTIONS */}
      <div
        className={`border rounded-2xl p-6 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div
          className={`mb-4 pb-3 border-b ${
            isLight ? 'border-stone-200' : 'border-neutral-800'
          }`}
        >
          <h3
            className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${
              isLight ? 'text-stone-900' : 'text-neutral-200'
            }`}
          >
            <SplitSquareVertical className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            ផ្នែក គ (Part C): ជម្រើសទិសដៅច្នៃប្រឌិតទាំង ៣ (3 Creative Directions)
          </h3>
          <p className={`text-xs ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
            ជម្រើសសិល្បៈ មុំកាមេរ៉ា និងទម្រង់ប្លង់ ៣ បែបខុសៗគ្នា។
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.partC_AlternativeDirections.map((dir, idx) => {
            const altImgUrl = dir.imageUrl || getAlternativeDirectionImage(idx, dir.title, dir.keyCommands);
            return (
              <div
                key={idx}
                className={`flex flex-col justify-between rounded-xl border transition-all overflow-hidden group ${
                  isLight
                    ? 'bg-stone-50 border-stone-200 hover:border-amber-500/70 hover:shadow-xs'
                    : 'bg-neutral-950/90 border-neutral-800 hover:border-amber-500/40'
                }`}
              >
                {/* Visual Image Banner for Alternative Direction */}
                <div
                  className="relative w-full h-32 sm:h-36 bg-black/40 overflow-hidden cursor-pointer group/img"
                  onClick={() => setPreviewImage({
                    url: altImgUrl,
                    title: `Option 0${idx + 1}: ${dir.title}`,
                    badge: `Direction 0${idx + 1}`,
                    description: dir.description,
                    prompt: dir.prompt
                  })}
                  title="ចុចដើម្បីពង្រីកមើលរូបភាពពិត"
                >
                  <img
                    src={altImgUrl}
                    alt={dir.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                    <span className="text-[10px] text-white font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3 text-amber-400" />
                      <span>ចុចពង្រីកមើល</span>
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 text-white/90" />
                  </div>
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded border bg-black/80 backdrop-blur-xs ${
                        isLight
                          ? 'text-amber-300 border-amber-400/40'
                          : 'text-amber-400 border-amber-500/40'
                      }`}
                    >
                      Option 0{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex flex-wrap gap-1">
                        {dir.keyCommands.slice(0, 3).map(cmd => (
                          <span
                            key={cmd}
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                              isLight
                                ? 'bg-white border-stone-200 text-stone-600 font-medium'
                                : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                            }`}
                          >
                            {cmd}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h4
                      className={`text-xs sm:text-sm font-bold transition-colors mb-1.5 ${
                        isLight
                          ? 'text-stone-900 group-hover:text-amber-800'
                          : 'text-neutral-200 group-hover:text-amber-200'
                      }`}
                    >
                      {dir.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed mb-3 ${
                        isLight ? 'text-stone-600' : 'text-neutral-400'
                      }`}
                    >
                      {dir.description}
                    </p>

                    <div
                      className={`p-2.5 rounded-lg border font-mono text-[11px] leading-snug line-clamp-4 select-all ${
                        isLight
                          ? 'bg-white border-stone-300 text-stone-800'
                          : 'bg-neutral-900 border-neutral-800/80 text-amber-100/80'
                      }`}
                    >
                      {dir.prompt}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(dir.prompt, `alt-${idx}`)}
                    className={`mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-colors ${
                      isLight
                        ? 'bg-stone-200/80 hover:bg-stone-300 text-stone-800 border-stone-300'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border-neutral-800'
                    }`}
                  >
                    {copiedSection === `alt-${idx}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className={`w-3.5 h-3.5 ${isLight ? 'text-amber-700' : 'text-amber-400'}`} />
                        <span>Copy This Alternative</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION D: SPECIFIC IMPROVEMENT SUGGESTIONS & REFINEMENT PROMPT */}
      <div
        className={`border rounded-2xl p-6 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div
          className={`flex items-center justify-between mb-4 pb-3 border-b ${
            isLight ? 'border-stone-200' : 'border-neutral-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Lightbulb className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
            <h3
              className={`text-sm font-bold uppercase tracking-wider ${
                isLight ? 'text-stone-900' : 'text-neutral-200'
              }`}
            >
              ផ្នែក ឃ (Part D): គន្លឹះកែលម្អ និង Refinement Prompt
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Suggestions List */}
          <div className="lg:col-span-5 space-y-2.5">
            <h4
              className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                isLight ? 'text-stone-900' : 'text-neutral-300'
              }`}
            >
              Strategic Polish Checklist
            </h4>
            <ul className="space-y-2 text-xs">
              {result.partD_ImprovementAndRefinement.suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-2 p-2.5 rounded-lg border ${
                    isLight
                      ? 'bg-stone-50 border-stone-200 text-stone-800'
                      : 'bg-neutral-950/60 border-neutral-800/80 text-neutral-300'
                  }`}
                >
                  <ArrowRight
                    className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                      isLight ? 'text-amber-700' : 'text-amber-400'
                    }`}
                  />
                  <span className="leading-relaxed">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Refinement Prompt Card */}
          <div
            className={`lg:col-span-7 p-4 sm:p-5 rounded-xl border flex flex-col justify-between ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : 'bg-neutral-950 border-neutral-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    isLight ? 'text-amber-800' : 'text-amber-400'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Refinement Prompt (Pass 2 Iteration)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(result.partD_ImprovementAndRefinement.refinementPrompt, 'refinement-prompt')}
                  className={`text-xs transition-colors flex items-center gap-1 ${
                    isLight
                      ? 'text-stone-600 hover:text-amber-800 font-medium'
                      : 'text-neutral-400 hover:text-amber-300'
                  }`}
                >
                  {copiedSection === 'refinement-prompt' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy Refinement</span>
                </button>
              </div>
              <p className={`text-[11px] mb-2 ${isLight ? 'text-stone-600' : 'text-neutral-500'}`}>
                Calibrated with stricter optical anchors and isolated negative space for maximum production clarity.
              </p>
              <div
                className={`font-mono text-xs leading-relaxed whitespace-pre-wrap select-all p-3 rounded-lg border ${
                  isLight
                    ? 'bg-stone-950 text-amber-100 border-stone-800'
                    : 'bg-neutral-900/60 text-neutral-200 border-neutral-800'
                }`}
              >
                {result.partD_ImprovementAndRefinement.refinementPrompt}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OFFICIAL DISCLAIMER NOTICE */}
      <div
        className={`p-4 rounded-xl border text-xs flex items-start gap-3 transition-colors ${
          isLight
            ? 'bg-amber-50/80 border-amber-200 text-stone-700'
            : 'bg-amber-500/5 border-amber-500/20 text-neutral-400'
        }`}
      >
        <AlertTriangle
          className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
            isLight ? 'text-amber-700' : 'text-amber-400'
          }`}
        />
        <div className="leading-relaxed">
          <strong className={`font-semibold ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
            Senior Creative Director Notice:{' '}
          </strong>
          {result.disclaimer}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL FOR PREVIEWS */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className={`relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border flex flex-col max-h-[92vh] ${
              isLight ? 'bg-white border-stone-200' : 'bg-neutral-900 border-neutral-700'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`p-3.5 sm:p-4 border-b flex items-center justify-between gap-3 ${
                isLight ? 'border-stone-200 bg-stone-50' : 'border-neutral-800 bg-neutral-950/80'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 shrink-0">
                  {previewImage.badge}
                </span>
                <h3
                  className={`text-sm sm:text-base font-bold truncate ${
                    isLight ? 'text-stone-900' : 'text-white'
                  }`}
                >
                  {previewImage.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                  isLight
                    ? 'hover:bg-stone-200 text-stone-600 border-stone-300'
                    : 'hover:bg-neutral-800 text-neutral-400 border-neutral-700'
                }`}
                title="បិទ (Close)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content: Image & Details */}
            <div className="overflow-y-auto p-4 sm:p-5 space-y-4">
              <div className="relative w-full max-h-[55vh] sm:max-h-[60vh] rounded-xl overflow-hidden bg-black flex items-center justify-center border border-neutral-800">
                <img
                  src={previewImage.url}
                  alt={previewImage.title}
                  className="w-full h-full object-contain max-h-[55vh] sm:max-h-[60vh]"
                />
              </div>

              {previewImage.description && (
                <div
                  className={`p-3 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'bg-amber-50/70 border-amber-200 text-stone-800' : 'bg-neutral-950 border-neutral-800 text-neutral-300'
                  }`}
                >
                  <strong className={`font-semibold ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
                    ការវិភាគ / ពន្យល់:
                  </strong>{' '}
                  {previewImage.description}
                </div>
              )}

              {previewImage.prompt && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isLight ? 'text-stone-700' : 'text-neutral-400'
                      }`}
                    >
                      Associated Prompt (កូដបញ្ជាដែលត្រូវចម្លង)
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(previewImage.prompt!, 'modal-prompt')}
                      className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                        isLight
                          ? 'bg-amber-500 hover:bg-amber-600 text-neutral-950 border-amber-600'
                          : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 border-amber-400'
                      }`}
                    >
                      {copiedSection === 'modal-prompt' ? (
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
                  <div
                    className={`p-3 rounded-lg border font-mono text-xs leading-relaxed whitespace-pre-wrap select-all max-h-36 overflow-y-auto ${
                      isLight
                        ? 'bg-stone-950 text-amber-200 border-stone-800'
                        : 'bg-black text-amber-100/90 border-neutral-800'
                    }`}
                  >
                    {previewImage.prompt}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
