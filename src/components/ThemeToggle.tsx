import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { setTheme, isLight } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Theme mode switcher"
      className={`inline-flex items-center p-1 rounded-xl border transition-all ${
        isLight
          ? 'bg-stone-200/80 border-stone-300'
          : 'bg-neutral-900 border-neutral-800'
      }`}
    >
      {/* Dark Mode Icon Button */}
      <button
        type="button"
        id="theme-btn-darkroom"
        role="radio"
        aria-checked={!isLight}
        onClick={() => setTheme('darkroom')}
        className={`p-1.5 rounded-lg transition-all ${
          !isLight
            ? 'bg-neutral-950 text-amber-400 shadow-sm border border-neutral-800/80'
            : 'text-stone-500 hover:text-stone-900'
        }`}
        title="Dark mode"
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      {/* Light Mode Icon Button */}
      <button
        type="button"
        id="theme-btn-studiolight"
        role="radio"
        aria-checked={isLight}
        onClick={() => setTheme('studiolight')}
        className={`p-1.5 rounded-lg transition-all ${
          isLight
            ? 'bg-white text-amber-700 shadow-sm border border-stone-200'
            : 'text-neutral-500 hover:text-neutral-200'
        }`}
        title="Light mode"
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
    </div>
  );
};
