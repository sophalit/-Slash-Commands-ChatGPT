import React from 'react';
import { Sparkles, Clapperboard, BookOpen, Compass, Image as ImageIcon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  activeTab: 'studio' | 'samples' | 'library' | 'formula' | 'exercises';
  setActiveTab: (tab: 'studio' | 'samples' | 'library' | 'formula' | 'exercises') => void;
  hasApiActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, hasApiActive }) => {
  const { isLight } = useTheme();

  return (
    <header
      className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors duration-200 ${
        isLight
          ? 'border-stone-200/90 bg-white/90 shadow-xs'
          : 'border-neutral-800/80 bg-neutral-950/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-500/20 text-neutral-950 font-bold flex-shrink-0">
              <Clapperboard className="w-5 h-5 text-neutral-950 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-base font-bold tracking-tight font-display transition-colors ${
                    isLight ? 'text-stone-900' : 'text-white'
                  }`}
                >
                  ស្ទូឌីយោបង្កើត Prompt អាជីព
                </span>
                <span
                  className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                    isLight
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}
                >
                  ២០០ កម្រង Prompts
                </span>
              </div>
              <p className={`text-xs hidden sm:block ${isLight ? 'text-stone-500' : 'text-neutral-400'}`}>
                Senior Creative Director, Cinematographer & Visual Strategist
              </p>
            </div>
          </div>

          {/* Navigation Tabs & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-1.5">
              <button
                id="nav-tab-studio"
                onClick={() => setActiveTab('studio')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'studio'
                    ? isLight
                      ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20 font-bold'
                      : 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-semibold'
                    : isLight
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>ស្ទូឌីយោ Studio</span>
              </button>

              <button
                id="nav-tab-samples"
                onClick={() => setActiveTab('samples')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'samples'
                    ? isLight
                      ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20 font-bold'
                      : 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-semibold'
                    : isLight
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>គំរូរូបភាពពិត</span>
                <span className="hidden xl:inline-block px-1.5 py-0.2 text-[9px] font-bold rounded bg-amber-500/20 text-amber-500">
                  New
                </span>
              </button>

              <button
                id="nav-tab-library"
                onClick={() => setActiveTab('library')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'library'
                    ? isLight
                      ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20 font-bold'
                      : 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-semibold'
                    : isLight
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>កម្រង Prompts ២០០</span>
              </button>

              <button
                id="nav-tab-formula"
                onClick={() => setActiveTab('formula')}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'formula'
                    ? isLight
                      ? 'bg-amber-500 text-stone-950 shadow-sm shadow-amber-500/20 font-bold'
                      : 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-semibold'
                    : isLight
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                }`}
              >
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden md:inline">រូបមន្ត Master Formula</span>
                <span className="md:hidden">Formula</span>
              </button>
            </nav>

            {/* Studio Light / Dark Room Theme Switcher */}
            <div className={`pl-2 border-l ${isLight ? 'border-stone-200' : 'border-neutral-800'}`}>
              <ThemeToggle />
            </div>

            {/* Engine Indicator */}
            <div
              className={`hidden xl:flex items-center gap-1.5 pl-2.5 border-l text-xs ${
                isLight ? 'border-stone-200 text-stone-500' : 'border-neutral-800 text-neutral-400'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{hasApiActive ? 'Gemini 3.8 Flash' : 'Creative Engine'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
