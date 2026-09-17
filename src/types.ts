export type ThemeMode = 'darkroom' | 'studiolight';
export type LanguageMode = 'bilingual' | 'km' | 'en';

export interface PromptItem {
  id: string; // "001" to "200"
  command: string; // e.g. "/photorealistic"
  functionKm: string; // មុខងារជាភាសាខ្មែរ e.g. "រូបភាពដូចការថតពិត"
  functionEn: string; // English function name e.g. "Photorealistic Camera Shot"
  categoryKey: string; // e.g. "quality", "camera", "lens", etc.
  categoryKm: string; // e.g. "គុណភាព និងភាពច្បាស់លាស់"
  categoryEn: string; // e.g. "Quality & Sharpness"
  groupType: 'image' | 'text'; // 1-11 Image (001-150), 12-16 Text/Work (151-200)
  groupNumber: number; // 1 to 16
  copyPrompt: string; // Prompt template ready for Copy/Paste with [SUBJECT], etc.
  formatRecommendation?: string; // e.g. "4:5", "16:9", "1:1", "3:2"
  explanationKm?: string; // Optional detailed explanation in Khmer
  imageUrl?: string; // Representative real photographic sample image
}

export interface VisualCommand {
  code: string;
  name: string;
  category: CommandCategory;
  meaning: string;
  creativeEffect: string;
  recommendedUse: string[];
  examplePrompt: string;
  bestPairedWith: string[];
  groupNumber?: number;
}

export type CommandCategory =
  | 'Quality'
  | 'Camera Angle'
  | 'Shot Size'
  | 'Camera Lens'
  | 'Camera Movement'
  | 'Composition'
  | 'Lighting'
  | 'Atmosphere'
  | 'Cinematic Film'
  | 'Art Style'
  | '3D & CGI'
  | 'Material & Surface'
  | 'Special Effects'
  | 'Environment'
  | 'Product & Studio'
  | 'Advertising & Conversion'
  | 'Outdoor & FOOH'
  | 'Print & Editorial'
  | 'Packaging & Brand'
  | 'Lifestyle & Workspace'
  | 'E-Commerce'
  | 'Retro & Historical'
  | 'Surreal & Conceptual'
  | 'Business & Information';

export interface PromptInput {
  idea: string;
  audience: string;
  references: string;
  requiredText: string;
  aspectRatio: string;
  mustKeep: string;
  mustAvoid: string;
  selectedCommands: string[];
}

export interface CreativeDirectorAnalysis {
  creativeObjective: string;
  targetAudience: string;
  subject: string;
  character: string;
  environment: string;
  story: string;
  cameraAngle: string;
  lensLook: string;
  composition: string;
  lighting: string;
  colorStyle: string;
  materials: string;
  relevantVisualCommands: string[];
  outputFormat: string;
  assumptions: string;
  referenceControlAnalysis: string;
}

export interface PromptResult {
  analysis: CreativeDirectorAnalysis;
  partA_CompletePrompt: string;
  partB_CommandExplanation: string;
  partC_AlternativeDirections: {
    title: string;
    description: string;
    prompt: string;
    keyCommands: string[];
    imageUrl?: string;
  }[];
  partD_ImprovementAndRefinement: {
    suggestions: string[];
    refinementPrompt: string;
  };
  disclaimer: string;
}

export interface PresetIdea {
  id: string;
  title: string;
  badge: string;
  idea: string;
  audience: string;
  references: string;
  requiredText: string;
  aspectRatio: string;
  mustKeep: string;
  mustAvoid: string;
  recommendedCommands: string[];
  imageUrl?: string;
  copyPrompt?: string;
  titleKm?: string;
}
