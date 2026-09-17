import { PromptItem, VisualCommand, CommandCategory } from '../types';
import { PROMPT_CATEGORIES, CategoryInfo } from './categories';
import { IMAGE_PROMPTS_PART1 } from './imagePromptsPart1';
import { IMAGE_PROMPTS_PART2 } from './imagePromptsPart2';
import { TEXT_PROMPTS } from './textPrompts';

export const ALL_PROMPT_ITEMS: PromptItem[] = [
  ...IMAGE_PROMPTS_PART1,
  ...IMAGE_PROMPTS_PART2,
  ...TEXT_PROMPTS
];

export { PROMPT_CATEGORIES };
export type { CategoryInfo };

// Category mapping helper matching CommandCategory union in types.ts
const CATEGORY_MAP: Record<string, CommandCategory> = {
  quality: 'Quality',
  camera: 'Camera Angle',
  lens: 'Camera Lens',
  composition: 'Composition',
  lighting: 'Lighting',
  style: 'Art Style',
  material: 'Material & Surface',
  environment: 'Environment',
  business: 'Business & Information',
  social: 'Advertising & Conversion',
  product_character: 'Product & Studio',
  daily_life: 'Lifestyle & Workspace',
  learning_research: 'Business & Information',
  teaching_assessment: 'Business & Information',
  writing_communication: 'Print & Editorial',
  planning_improvement: 'Business & Information'
};

// Transform into VisualCommand format for director engine
export function convertToVisualCommand(item: PromptItem): VisualCommand {
  return {
    code: item.command,
    name: item.functionEn,
    category: CATEGORY_MAP[item.categoryKey] || 'Quality',
    meaning: item.functionKm,
    creativeEffect: item.copyPrompt,
    recommendedUse: [item.categoryKm, item.categoryEn],
    examplePrompt: item.copyPrompt,
    bestPairedWith: ['/natural-skin', '/balanced-exposure'],
    groupNumber: item.groupNumber
  };
}

export const ALL_VISUAL_COMMANDS: VisualCommand[] = ALL_PROMPT_ITEMS.map(convertToVisualCommand);
