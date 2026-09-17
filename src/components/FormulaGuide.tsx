import React from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Layers,
  Award,
  Terminal,
  Grid,
  FileCheck2
} from 'lucide-react';
import { PROMPT_CATEGORIES } from '../data/categories';

export const FormulaGuide: React.FC = () => {
  const { isLight } = useTheme();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Intro Banner */}
      <div
        className={`p-6 rounded-2xl border relative overflow-hidden transition-colors ${
          isLight
            ? 'bg-gradient-to-r from-amber-100/60 via-amber-50/40 to-white border-amber-300 shadow-sm'
            : 'bg-neutral-900/80 border-neutral-800'
        }`}
      >
        <div className="relative z-10">
          <div
            className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold border mb-3 ${
              isLight
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>ប្រព័ន្ធបង្កើត Prompt ផ្លូវការ (Master Prompt Engineering)</span>
          </div>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isLight ? 'text-stone-900' : 'text-white'
            }`}
          >
            រូបមន្ត Master Prompt Engineering និងការវិភាគ ១៤ ចំណុច
          </h2>
          <p
            className={`text-sm mt-2 max-w-3xl leading-relaxed ${
              isLight ? 'text-stone-700' : 'text-neutral-300'
            }`}
          >
            «អ្នករចនា AI អាជីព មិនគ្រាន់តែសុំឱ្យ AI បង្កើតរូបភាពនោះទេ។ អ្នករចនា AI អាជីព ដឹកនាំ AI តាមរយៈរចនាសម្ព័ន្ធភាសាសិល្បៈច្បាស់លាស់ ទាំងកាមេរ៉ា ពន្លឺ រចនាប័ទ្ម និងសម្ភារៈ។»
          </p>
        </div>
      </div>

      {/* The Master Formula Breakdown */}
      <div
        className={`p-6 rounded-2xl border space-y-4 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <h3
          className={`text-base font-bold flex items-center gap-2 ${
            isLight ? 'text-stone-900' : 'text-neutral-200'
          }`}
        >
          <Layers className={`w-4 h-4 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
          <span>រូបមន្ត Master Prompt ស្នូល (Core Formula)</span>
        </h3>

        <div
          className={`p-4 rounded-xl border font-mono text-xs sm:text-sm leading-loose flex flex-wrap gap-2 items-center ${
            isLight
              ? 'bg-stone-950 border-stone-800 text-amber-300 shadow-inner'
              : 'bg-neutral-950 border-neutral-800 text-amber-300'
          }`}
        >
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-neutral-200">[SUBJECT]</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-neutral-200">[ACTION]</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-neutral-200">[ENVIRONMENT]</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/CAMERA</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/LENS</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/COMPOSITION</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/LIGHTING</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/STYLE</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/MATERIAL</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">/QUALITY</span>
          <span className="text-stone-500">+</span>
          <span className="px-2 py-1 bg-stone-900 rounded border border-stone-800 text-neutral-200">Format: [FORMAT]</span>
        </div>

        {/* 3 Skill Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : 'bg-neutral-950/80 border-neutral-800'
            }`}
          >
            <div className={`text-xs font-bold uppercase mb-1 ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              Level 1: អ្នកចាប់ផ្តើម (Beginner)
            </div>
            <div className={`font-mono text-xs italic mb-2 ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
              "Create a modern classroom"
            </div>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-neutral-500'}`}>
              លទ្ធផលមិនច្បាស់លាស់ មិនអាចគ្រប់គ្រងពន្លឺ មុំកាមេរ៉ា ឬទំហំរូបភាពបានឡើយ។
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? 'bg-stone-50 border-stone-200'
                : 'bg-neutral-950/80 border-neutral-800'
            }`}
          >
            <div className={`text-xs font-bold uppercase mb-1 ${isLight ? 'text-amber-800' : 'text-amber-400/80'}`}>
              Level 2: អ្នករចនា (Designer)
            </div>
            <div className={`font-mono text-xs mb-2 ${isLight ? 'text-stone-800' : 'text-neutral-300'}`}>
              "A futuristic AI classroom where Cambodian students collaborate with holographic displays"
            </div>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
              មានគំនិតសាច់រឿងច្បាស់លាស់ ប៉ុន្តែខ្វះការកំណត់ប្រភេទកែវ គុណភាពអុបទិក និងចន្លោះទំនេរសម្រាប់អក្សរ។
            </p>
          </div>

          <div
            className={`p-4 rounded-xl border ${
              isLight
                ? 'bg-amber-100/50 border-amber-300 shadow-xs'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <div className={`text-xs font-bold uppercase mb-1 flex items-center gap-1 ${isLight ? 'text-amber-900' : 'text-amber-400'}`}>
              <Sparkles className="w-3.5 h-3.5" />
              Level 3: Senior Creative Director
            </div>
            <div className={`font-mono text-xs mb-2 ${isLight ? 'text-amber-950 font-medium' : 'text-amber-200'}`}>
              "A futuristic AI classroom, Cambodian students collaborating... /over-shoulder /35mm-documentary /rule-of-thirds /softbox /volumetric-light /cinematic /clear-glass /photorealistic /fine-detail Format: 16:9"
            </div>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-700' : 'text-neutral-300'}`}>
              គ្រប់គ្រងរូបភាពទាំងស្រុង៖ កំណត់ប្រភេទកែវ ចម្ងាយថត ពន្លឺស្រមោល រូបរាងសម្ភារៈ ពណ៌ និងទំហំសមាមាត្រ។
            </p>
          </div>
        </div>
      </div>

      {/* 14-Point Analysis Framework */}
      <div
        className={`p-6 rounded-2xl border space-y-4 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <FileCheck2 className={`w-5 h-5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
          <h3
            className={`text-base font-bold ${
              isLight ? 'text-stone-900' : 'text-neutral-100'
            }`}
          >
            រចនាសម្ព័ន្ធវិភាគ ១៤ ចំណុចរបស់ Creative Director (14-Point Framework)
          </h3>
        </div>
        <p className={`text-xs leading-relaxed ${isLight ? 'text-stone-600' : 'text-neutral-400'}`}>
          មុនពេលបង្កើត Prompt ចុងក្រោយ ប្រព័ន្ធនឹងវិភាគគំនិតរបស់អ្នកឆ្លងកាត់ ១៤ ចំណុចស្នូល ដើម្បីធានាថារាល់ធាតុផ្សំស៊ីសង្វាក់គ្នា និងគ្មានការណែនាំជាន់គ្នា។
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { num: 1, km: 'គោលបំណងច្នៃប្រឌិត', en: 'Creative objective' },
            { num: 2, km: 'ទស្សនិកជនគោលដៅ', en: 'Target audience' },
            { num: 3, km: 'ប្រធានបទស្នូល', en: 'Subject' },
            { num: 4, km: 'តួអង្គ និងចរិតលក្ខណៈ', en: 'Character' },
            { num: 5, km: 'បរិយាកាស និងទីកន្លែង', en: 'Environment' },
            { num: 6, km: 'សាច់រឿងនៃរូបភាព', en: 'Story' },
            { num: 7, km: 'មុំកាមេរ៉ា', en: 'Camera angle' },
            { num: 8, km: 'រូបរាងតាមប្រភេទកែវ', en: 'Lens look' },
            { num: 9, km: 'ការរៀបចំប្លង់', en: 'Composition' },
            { num: 10, km: 'ប្រភព និងគុណភាពពន្លឺ', en: 'Lighting' },
            { num: 11, km: 'រចនាប័ទ្មពណ៌', en: 'Color style' },
            { num: 12, km: 'សម្ភារៈ និងផ្ទៃវត្ថុ', en: 'Materials' },
            { num: 13, km: 'Visual Commands ត្រូវជ្រើស', en: 'Relevant visual commands' },
            { num: 14, km: 'ទំហំសមាមាត្ររូបភាព', en: 'Output format (1:1, 4:5, 16:9, etc.)' }
          ].map(point => (
            <div
              key={point.num}
              className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                isLight ? 'bg-stone-50 border-stone-200' : 'bg-neutral-950/60 border-neutral-800'
              }`}
            >
              <span className="w-5 h-5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                {point.num}
              </span>
              <div>
                <div className="font-semibold text-stone-900 dark:text-stone-200">
                  {point.km}
                </div>
                <div className="text-[10px] text-stone-500 dark:text-neutral-400">
                  {point.en}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 16 Categorical Classification Overview */}
      <div
        className={`p-6 rounded-2xl border space-y-4 transition-colors ${
          isLight
            ? 'bg-white border-stone-200 shadow-sm'
            : 'bg-neutral-900/60 border-neutral-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <Grid className={`w-5 h-5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
          <h3
            className={`text-base font-bold ${
              isLight ? 'text-stone-900' : 'text-neutral-100'
            }`}
          >
            ចំណាត់ថ្នាក់ ១៦ ជំពូក នៃកម្រង Prompts ទាំង ២០០
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {PROMPT_CATEGORIES.map(cat => (
            <div
              key={cat.number}
              className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                isLight ? 'bg-stone-50 border-stone-200' : 'bg-neutral-950/70 border-neutral-800'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="text-amber-600 dark:text-amber-400">
                    {cat.number < 10 ? `0${cat.number}` : cat.number}.
                  </span>
                  <span className="text-stone-900 dark:text-stone-100">
                    {cat.nameKm}
                  </span>
                  <span className="text-stone-500 font-normal text-[11px]">
                    ({cat.nameEn})
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-neutral-400 mt-1 leading-snug">
                  {cat.descriptionKm}
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 flex-shrink-0">
                {cat.range}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
