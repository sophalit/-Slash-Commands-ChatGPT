import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DirectorStudio } from './components/DirectorStudio';
import { DirectorResults } from './components/DirectorResults';
import { CommandsLibrary } from './components/CommandsLibrary';
import { FormulaGuide } from './components/FormulaGuide';
import { RealPromptSamplesShowcase } from './components/RealPromptSamplesShowcase';
import { useTheme } from './context/ThemeContext';
import { PromptInput, PromptResult } from './types';
import { PRESET_IDEAS } from './data/commands';
import { runCreativeDirectorAnalysis } from './utils/promptDirectorEngine';

export default function App() {
  const { isLight } = useTheme();
  const [activeTab, setActiveTab] = useState<'studio' | 'samples' | 'library' | 'formula' | 'exercises'>('studio');
  const [hasApiActive, setHasApiActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sourceEngine, setSourceEngine] = useState<string>('local_engine');

  // Default initial input state populated with the iconic case from the handbook
  const [input, setInput] = useState<PromptInput>({
    idea: PRESET_IDEAS[0].idea,
    audience: PRESET_IDEAS[0].audience,
    references: PRESET_IDEAS[0].references,
    requiredText: PRESET_IDEAS[0].requiredText,
    aspectRatio: PRESET_IDEAS[0].aspectRatio,
    mustKeep: PRESET_IDEAS[0].mustKeep,
    mustAvoid: PRESET_IDEAS[0].mustAvoid,
    selectedCommands: [...PRESET_IDEAS[0].recommendedCommands]
  });

  // Pre-generate default analysis so the user immediately sees a working result
  const [result, setResult] = useState<PromptResult | null>(() => {
    return runCreativeDirectorAnalysis({
      idea: PRESET_IDEAS[0].idea,
      audience: PRESET_IDEAS[0].audience,
      references: PRESET_IDEAS[0].references,
      requiredText: PRESET_IDEAS[0].requiredText,
      aspectRatio: PRESET_IDEAS[0].aspectRatio,
      mustKeep: PRESET_IDEAS[0].mustKeep,
      mustAvoid: PRESET_IDEAS[0].mustAvoid,
      selectedCommands: [...PRESET_IDEAS[0].recommendedCommands]
    });
  });

  // Check health and available backend capabilities
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data && data.hasGeminiKey) {
          setHasApiActive(true);
        }
      })
      .catch(() => {
        // Dev server or static mode fallback
        setHasApiActive(false);
      });
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/director/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });

      if (response.ok) {
        const json = await response.json();
        if (json.success && json.data) {
          setResult(json.data);
          setSourceEngine(json.source || 'local_engine');
          setIsLoading(false);
          // Scroll smoothly to results
          setTimeout(() => {
            const resultsEl = document.getElementById('director-results-container');
            if (resultsEl) {
              resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 100);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend API unavailable, using internal Creative Director engine.');
    }

    // High-fidelity fallback
    const localResult = runCreativeDirectorAnalysis(input);
    setResult(localResult);
    setSourceEngine('local_engine');
    setIsLoading(false);

    setTimeout(() => {
      const resultsEl = document.getElementById('director-results-container');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleInsertCommandFromLibrary = (code: string) => {
    setInput(prev => {
      const exists = prev.selectedCommands.includes(code);
      return {
        ...prev,
        selectedCommands: exists
          ? prev.selectedCommands.filter(c => c !== code)
          : [...prev.selectedCommands, code]
      };
    });
  };

  const handleLoadSampleIntoStudio = (sampleBrief: PromptInput) => {
    setInput(sampleBrief);
    const newResult = runCreativeDirectorAnalysis(sampleBrief);
    setResult(newResult);
    setActiveTab('studio');
    setTimeout(() => {
      const resultsEl = document.getElementById('director-results-container');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
        isLight ? 'bg-stone-100 text-stone-900' : 'bg-neutral-950 text-neutral-100'
      }`}
    >
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasApiActive={hasApiActive}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'studio' && (
          <div className="space-y-12">
            {/* Input Brief Section */}
            <section aria-label="Creative Director Brief Input">
              <DirectorStudio
                input={input}
                setInput={setInput}
                onGenerate={handleGenerate}
                isLoading={isLoading}
                onViewRealSamples={() => setActiveTab('samples')}
              />
            </section>

            {/* Results Section */}
            {result && (
              <section id="director-results-container" aria-label="Creative Director Analysis & Prompt Results">
                <DirectorResults result={result} sourceEngine={sourceEngine} />
              </section>
            )}
          </div>
        )}

        {activeTab === 'samples' && (
          <section aria-label="Real Visual Prompt Samples">
            <RealPromptSamplesShowcase onLoadIntoStudio={handleLoadSampleIntoStudio} />
          </section>
        )}

        {activeTab === 'library' && (
          <section aria-label="Visual Commands Library">
            <CommandsLibrary
              onInsertCommand={handleInsertCommandFromLibrary}
              selectedCommands={input.selectedCommands}
              onViewRealSamples={() => setActiveTab('samples')}
            />
          </section>
        )}

        {activeTab === 'formula' && (
          <section aria-label="Master Prompt Formula & Guide">
            <FormulaGuide />
          </section>
        )}
      </main>

      <footer
        className={`border-t py-6 text-center text-xs transition-colors duration-200 ${
          isLight
            ? 'border-stone-200 bg-white text-stone-600 shadow-xs'
            : 'border-neutral-900 bg-neutral-950 text-neutral-500'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className={isLight ? 'text-stone-700 font-medium' : 'text-neutral-400'}>
            Master AI Image Prompt Generator • DMD Visual Commands System
          </span>
          <span className={`font-mono text-[11px] ${isLight ? 'text-stone-500' : 'text-neutral-600'}`}>
            100+ Production Secret Codes • Creative Director Engine
          </span>
        </div>
      </footer>
    </div>
  );
}
