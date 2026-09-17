import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { runCreativeDirectorAnalysis } from './src/utils/promptDirectorEngine.ts';
import { PromptInput } from './src/types.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY')
  });
});

// Creative Director Prompt Transformation API
app.post('/api/director/generate', async (req, res) => {
  const input: PromptInput = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  const isKeyConfigured = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.length > 5);

  if (!isKeyConfigured) {
    // Fallback to our high-fidelity local prompt intelligence engine
    const localResult = runCreativeDirectorAnalysis(input);
    return res.json({
      success: true,
      source: 'local_engine',
      data: localResult
    });
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const systemPrompt = `You are a world-class Senior Creative Director, AI Image Prompt Engineer, Cinematographer, Graphic Designer, and Visual Strategist.
Your task is to transform user ideas into production-ready image-generation prompts using the DMD Visual Commands System (100+ slash commands like /closeup, /35mm, /softlighting, /cinematic, /holographic, /8k, /ultrarealistic, etc.).

CRITICAL INSTRUCTIONS:
1. Treat slash commands as descriptive labels from the custom prompt library. Always explain their intended visual effect in plain language inside the final prompt.
2. Provide a rigorous 14-point creative breakdown:
   1. Creative objective
   2. Target audience
   3. Subject
   4. Character
   5. Environment
   6. Story
   7. Camera angle
   8. Lens look
   9. Composition
   10. Lighting
   11. Color style
   12. Materials
   13. Relevant visual commands
   14. Output format
3. Return:
   - Part A: One complete, copy-ready image prompt synthesizing the subject, optical setup, lighting, color, materials, slash commands, and plain-language translations. Include exact requested text only when supplied, or reserve clean negative space for typography.
   - Part B: Plain language explanation of all selected visual commands.
   - Part C: Three alternative creative directions with distinct titles, descriptions, prompts, and key commands.
   - Part D: Specific improvement suggestions and an iterative refinement prompt.
4. Do not claim that prompt wording guarantees exact identity, pixel resolution, editable vector output, or production accuracy.`;

    const userPromptContent = `Transform this brief into a masterwork AI image prompt:
IDEA: ${input.idea || 'Cambodian university student learning AI in a futuristic smart classroom'}
AUDIENCE: ${input.audience || 'Higher Education, DMD Students, Tech Leaders'}
REFERENCES: ${input.references || 'Ref 1 controls architectural geometry; Ref 2 controls authentic student styling and posture.'}
REQUIRED TEXT: ${input.requiredText || 'NO TEXT'}
FORMAT: ${input.aspectRatio || '16:9'}
MUST KEEP: ${input.mustKeep || 'Authentic human expressions, glowing holographic interfaces, realistic lighting'}
MUST AVOID: ${input.mustAvoid || 'Distorted limbs, messy unreadable text, generic tropes'}
SELECTED VISUAL COMMANDS: ${(input.selectedCommands || []).join(' ')}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPromptContent,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: {
              type: Type.OBJECT,
              properties: {
                creativeObjective: { type: Type.STRING },
                targetAudience: { type: Type.STRING },
                subject: { type: Type.STRING },
                character: { type: Type.STRING },
                environment: { type: Type.STRING },
                story: { type: Type.STRING },
                cameraAngle: { type: Type.STRING },
                lensLook: { type: Type.STRING },
                composition: { type: Type.STRING },
                lighting: { type: Type.STRING },
                colorStyle: { type: Type.STRING },
                materials: { type: Type.STRING },
                relevantVisualCommands: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                outputFormat: { type: Type.STRING },
                assumptions: { type: Type.STRING },
                referenceControlAnalysis: { type: Type.STRING }
              },
              required: [
                'creativeObjective',
                'targetAudience',
                'subject',
                'character',
                'environment',
                'story',
                'cameraAngle',
                'lensLook',
                'composition',
                'lighting',
                'colorStyle',
                'materials',
                'relevantVisualCommands',
                'outputFormat',
                'assumptions',
                'referenceControlAnalysis'
              ]
            },
            partA_CompletePrompt: { type: Type.STRING },
            partB_CommandExplanation: { type: Type.STRING },
            partC_AlternativeDirections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  prompt: { type: Type.STRING },
                  keyCommands: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  }
                },
                required: ['title', 'description', 'prompt', 'keyCommands']
              }
            },
            partD_ImprovementAndRefinement: {
              type: Type.OBJECT,
              properties: {
                suggestions: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                refinementPrompt: { type: Type.STRING }
              },
              required: ['suggestions', 'refinementPrompt']
            },
            disclaimer: { type: Type.STRING }
          },
          required: [
            'analysis',
            'partA_CompletePrompt',
            'partB_CommandExplanation',
            'partC_AlternativeDirections',
            'partD_ImprovementAndRefinement',
            'disclaimer'
          ]
        }
      }
    });

    const parsedJson = JSON.parse(response.text || '{}');
    return res.json({
      success: true,
      source: 'gemini_api',
      data: parsedJson
    });
  } catch (error: any) {
    console.error('Gemini API call failed, gracefully falling back to local engine:', error?.message);
    const fallbackResult = runCreativeDirectorAnalysis(input);
    return res.json({
      success: true,
      source: 'fallback_engine',
      data: fallbackResult,
      notice: 'Served via built-in Senior Director intelligence engine.'
    });
  }
});

// Vite middleware configuration
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();
