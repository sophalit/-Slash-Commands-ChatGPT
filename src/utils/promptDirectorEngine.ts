import { PromptInput, PromptResult, CreativeDirectorAnalysis } from '../types';
import { VISUAL_COMMANDS } from '../data/commands';
import { ALL_VISUAL_COMMANDS } from '../data/promptsMaster';

export function runCreativeDirectorAnalysis(input: PromptInput): PromptResult {
  const idea = input.idea.trim() || 'A modern Cambodian university student learning artificial intelligence inside a futuristic smart classroom with floating holographic interfaces';
  const audience = input.audience.trim() || 'Students, educators, design professionals, and institutional stakeholders (18–35)';
  const references = input.references.trim() || 'Reference 1 controls architectural geometry and atmospheric daylighting; Reference 2 controls character styling, natural posture, and student attire.';
  const requiredText = input.requiredText.trim() || 'NO TEXT (reserve clean negative space for typography)';
  const format = input.aspectRatio.trim() || '16:9';
  const mustKeep = input.mustKeep.trim() || 'Authentic human expression, interactive holographic AI nodes, high-fidelity depth of field, balanced warm daylight and cyan technology glow.';
  const mustAvoid = input.mustAvoid.trim() || 'Distorted limbs, messy unreadable blackboard text, exaggerated cartoon proportions, harsh plastic specular blowouts, cluttered framing.';

  // Map selected commands from both library collections
  const combinedCommands = [...ALL_VISUAL_COMMANDS, ...VISUAL_COMMANDS];
  const commandMap = new Map(combinedCommands.map(c => [c.code.toLowerCase(), c]));
  let activeCommandCodes = input.selectedCommands.filter(c => commandMap.has(c.toLowerCase()));

  if (activeCommandCodes.length === 0) {
    // Determine smart defaults based on idea keywords
    const lowerIdea = idea.toLowerCase();
    if (lowerIdea.includes('perfume') || lowerIdea.includes('bottle') || lowerIdea.includes('product') || lowerIdea.includes('watch')) {
      activeCommandCodes = ['/closeup', '/macroDetail', '/blackGloss', '/studio', '/dramaticlighting', '/rimlight', '/luxury', '/8k'];
    } else if (lowerIdea.includes('temple') || lowerIdea.includes('landscape') || lowerIdea.includes('mountain') || lowerIdea.includes('angkor')) {
      activeCommandCodes = ['/droneview', '/goldenhour', '/sunrise', '/godrays', '/wideangle', '/cinematic', '/8k', '/ultrarealistic'];
    } else if (lowerIdea.includes('pitch') || lowerIdea.includes('roadmap') || lowerIdea.includes('chart') || lowerIdea.includes('business')) {
      activeCommandCodes = ['/pitchSlide', '/onePager', '/minimalLayout', '/processFlow', '/editorial', '/4k'];
    } else {
      activeCommandCodes = ['/overtheshoulder', '/35mm', '/ruleofthirds', '/softlighting', '/volumetriclight', '/cinematic', '/editorial', '/holographic', '/glassart', '/8k', '/ultrarealistic'];
    }
  }

  // Resolve conflicting commands
  const hasMacro = activeCommandCodes.includes('/macro') || activeCommandCodes.includes('/macroDetail') || activeCommandCodes.includes('/extremecloseup');
  const hasDrone = activeCommandCodes.includes('/droneview') || activeCommandCodes.includes('/aerialview');
  if (hasMacro && hasDrone) {
    // Drone conflicts with macro; prioritize based on subject
    activeCommandCodes = activeCommandCodes.filter(c => c !== '/droneview' && c !== '/aerialview');
  }

  const selectedCommandObjects = activeCommandCodes
    .map(code => commandMap.get(code.toLowerCase()))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  // Creative Director 14-Point Analysis
  const analysis: CreativeDirectorAnalysis = {
    creativeObjective: `Position the subject with authoritative, high-trust visual craftsmanship that immediately communicates visionary purpose, modern technology, and aspirational human agency.`,
    targetAudience: audience,
    subject: `Primary hero subject derived from brief: "${idea.slice(0, 100)}${idea.length > 100 ? '...' : ''}", rendered with tangible physical weight, lifelike material response, and purposeful optical hierarchy.`,
    character: idea.toLowerCase().includes('student') || idea.toLowerCase().includes('person') || idea.toLowerCase().includes('researcher')
      ? 'A focused, optimistic individual with natural facial demeanor, relatable posture, and authentic cultural resonance, dressed in clean, modern attire.'
      : 'Non-character subject; hero focal point functions as the primary protagonist of the composition.',
    environment: `A thoughtfully staged spatial volume characterized by sophisticated architectural lines, ambient spatial depth, and contextual environmental props reinforcing the narrative.`,
    story: `A pivotal moment of discovery, mastery, or elevated aesthetic excellence, capturing the exact transition between focused concentration and breakthrough realization.`,
    cameraAngle: activeCommandCodes.includes('/lowangle') || activeCommandCodes.includes('/lowHero')
      ? 'Low-angle perspective looking upward to establish commanding authority, monumentality, and heroic stature.'
      : activeCommandCodes.includes('/overtheshoulder')
      ? 'Over-the-shoulder intimate framing connecting the viewer directly with the subject focal interaction.'
      : activeCommandCodes.includes('/droneview') || activeCommandCodes.includes('/aerialview')
      ? 'High-altitude panoramic vantage showcasing scale, geometry, and environmental grandeur.'
      : 'Eye-level 3/4 conversational perspective fostering immediate emotional intimacy and authentic engagement.',
    lensLook: activeCommandCodes.includes('/35mm')
      ? '35mm prime documentary lens delivering authentic human perception, natural edge geometry, and truthful spatial depth.'
      : activeCommandCodes.includes('/85mm')
      ? '85mm f/1.4 portrait prime lens with silky specular background separation and zero facial distortion.'
      : activeCommandCodes.includes('/24mm')
      ? '24mm wide cinematic lens capturing expansive environmental context while maintaining razor subject focus.'
      : '50mm standard optical perspective mirroring natural human eyesight without barrel or pincushion distortion.',
    composition: activeCommandCodes.includes('/centercomposition')
      ? 'Symmetrical center-weighted composition commanding immediate iconic stature, balanced by equal negative lateral breathing room.'
      : activeCommandCodes.includes('/ruleofthirds')
      ? 'Harmonic golden-ratio rule of thirds placement guiding the eye from the subject focal plane through leading background elements.'
      : 'Dynamic diagonal leading lines converging on the primary subject, reserving clean perimeter zones for headline typography.',
    lighting: activeCommandCodes.includes('/dramaticlighting')
      ? 'High-contrast chiaroscuro with a sculpted directional key light, deep velvet shadows, and a razor-thin rim light separating dark silhouettes.'
      : activeCommandCodes.includes('/softlighting')
      ? 'Gentle diffused multi-source illumination wrapping around organic surfaces, paired with subtle volumetric light shafts.'
      : 'Controlled dual-temperature lighting balancing warm key illumination (3200K) with cool ambient cyan accents (6500K).',
    colorStyle: `Refined color grading harmonizing cool deep indigo/slate foundation tones with warm amber and radiant luminescent accents; avoiding garish over-saturation.`,
    materials: `Tactile physical textures: brushed metal, clear optical glass with caustic refractions, matte ceramic, and soft woven organic fabrics.`,
    relevantVisualCommands: activeCommandCodes,
    outputFormat: `${format} aspect ratio; framed with intentional edge bleed margins to facilitate subsequent graphic typesetting or responsive device cropping.`,
    assumptions: `Low-risk assumptions: natural daylight direction aligns at 45 degrees from upper-left; environmental props remain tasteful and uncluttered; human subjects exhibit relaxed, competent micro-expressions.`,
    referenceControlAnalysis: references.length > 5
      ? references
      : `Reference A controls the overall architectural proportions, daylighting quality, and spatial volume; Reference B controls character styling, color harmony, and tactile material finishes.`
  };

  // Section A: Complete Copy-Ready Image Prompt
  const commandsHeader = activeCommandCodes.join(' ');
  const commandVisualDescriptions = selectedCommandObjects
    .map(c => `[${c.code}: ${c.meaning}]`)
    .join(' ');

  const textDirective = requiredText.toUpperCase().includes('NO TEXT')
    ? 'Clean uncluttered composition with generous negative space reserved for graphic typography; no garbled, distorted, or AI-generated simulated lettering.'
    : `Include crisp, legible exact text: "${requiredText}". Reserve a clean, high-contrast dedicated placard or negative space area for legible typographic integration without artifacting.`;

  const partA_CompletePrompt = `${idea.trim()}. 

Cinematic Art Direction & Optical Specifications:
Shot with an authentic photojournalistic eye, featuring ${analysis.cameraAngle.toLowerCase()} paired with ${analysis.lensLook.toLowerCase()}. The scene is framed with ${analysis.composition.toLowerCase()}. Illumination is driven by ${analysis.lighting.toLowerCase()}. Color palette showcases ${analysis.colorStyle.toLowerCase()}. Surface materials feature ${analysis.materials.toLowerCase()}.

Integrated Visual Commands & Plain-Language Optical Explanations:
${commandsHeader}
Plain-Language Command Translation: ${commandVisualDescriptions}

Compositional Constraints & Layout Rules:
${textDirective}
Essential details to preserve: ${mustKeep}.
Strict visual exclusions: avoid ${mustAvoid}.
Aspect ratio formatted for --ar ${format.replace(':', ':')}, professional advertising grade, photorealistic physical texture.`;

  // Section B: Short Explanation of Selected Visual Commands
  const partB_CommandExplanation = selectedCommandObjects.length > 0
    ? selectedCommandObjects.map(c => `• ${c.code} (${c.name}): ${c.meaning} Creative intent: ${c.creativeEffect}`).join('\n\n')
    : `• /cinematic: Employs 35mm Hollywood film color science, anamorphic dynamic range, and deliberate chiaroscuro.\n• /editorial: Enforces intentional magazine-grade art direction, clean negative space, and disciplined styling.\n• /8k & /ultrarealistic: Signals micro-detail fidelity, organic skin/surface textures, and natural optical light falloff.`;

  // Section C: Three Alternative Creative Directions
  const partC_AlternativeDirections = [
    {
      title: 'Direction 1: Minimalist Swiss Editorial & Quiet Prestige',
      description: 'Stripped of all visual noise. Centers on stark negative space, monochrome sophistication, and whisper-quiet luxury with high-contrast architectural lighting.',
      keyCommands: ['/minimalLayout', '/editorial', '/monochrome', '/50mm', '/studioWhite'],
      prompt: `Minimalist Swiss editorial presentation of ${idea}. High-key composition with expansive pure negative white space, subtle architectural shadow cast, muted monochromatic palette with subtle warm grey nuances, shot on 50mm f/2.8 lens, pristine magazine cover quality, /minimalLayout /editorial /50mm /studioWhite.`
    },
    {
      title: 'Direction 2: Dramatic Cinematic Noir & Chiaroscuro Gravitas',
      description: 'High-contrast nocturnal or moody atmosphere. Emphasizes intense sidelighting, volumetric fog ribbons, and glowing rim reflections for monumental psychological weight.',
      keyCommands: ['/dramaticlighting', '/rimlight', '/cinematic', '/darkmoody', '/anamorphic', '/8k'],
      prompt: `Cinematic dramatic chiaroscuro scene of ${idea}. Intense low-key lighting with sharp edge kicker lights, atmospheric volumetric haze beams cutting through shadows, deep obsidian blacks paired with saturated warm highlights, 85mm anamorphic compression, /dramaticlighting /rimlight /cinematic /darkmoody /8k.`
    },
    {
      title: 'Direction 3: Avant-Garde Holographic & 3D Axonometric Future',
      description: 'Futuristic technical blueprint or isometric 3D render. Displays layered transparent glass, floating holographic UI vectors, and clean wireframe schematics.',
      keyCommands: ['/isometric3D', '/3drender', '/holographic', '/glassart', '/neonGlow'],
      prompt: `Axonometric isometric 3D visualization of ${idea}. Clean floating translucent glass layers, glowing cyan holographic data architecture, high-precision CAD detailing, polished Octane render materials with soft ambient occlusion, /isometric3D /3drender /holographic /glassart /4k.`
    }
  ];

  // Section D: Specific Improvement Suggestions & Refinement Prompt
  const partD_ImprovementAndRefinement = {
    suggestions: [
      'Refine the focal hierarchy: Ensure the primary hero element occupies at least 35% of the visual weight so secondary ambient details do not compete for viewer attention.',
      'Control color temperature balance: Restrict the palette to two dominant complementary hues (e.g., warm 3400K tungsten highlights vs. cool 6800K ambient shadows) to prevent chromatic chaos.',
      'Explicitly separate headline copy space: When creating marketing assets, instruct the model to maintain an uncluttered upper or lateral quadrant so post-production graphic typography never collides with complex background textures.',
      'Anchor camera height to human physiology: For relatable scenes, specify "camera lens at 1.4 meters floor height" to lock natural horizon placement and avoid ungrounded floating camera artifacts.'
    ],
    refinementPrompt: `Refined Master Director Prompt (Iterative Pass 2):
${idea}, captured in a masterwork editorial photography campaign. Primary focal point locked in razor focus, 35mm optical perspective at eye-level. Golden-hour directional key lighting softened by large silks, balanced by subtle cyan ambient fill. Clean open upper-left quadrant with smooth gradient falloff reserved for typography. High tactile authenticity with natural fabric weave, crisp glass caustics, and subtle filmic grain. ${activeCommandCodes.slice(0, 6).join(' ')}, photorealistic physical rendering, no artificial glow or anatomical artifacts.`
  };

  const disclaimer = `Senior Director Advisory: Prompt wording directs stylistic, optical, and thematic generation parameters across modern diffusion models (Midjourney, DALL-E, Imagen, Firefly). However, prompt language does not provide technical guarantees of pixel-perfect identity consistency, exact vector outputs, or deterministic typographic spelling. For production typography and brand marks, always reserve clean negative space for manual vector typesetting in vector software.`;

  return {
    analysis,
    partA_CompletePrompt,
    partB_CommandExplanation,
    partC_AlternativeDirections,
    partD_ImprovementAndRefinement,
    disclaimer
  };
}
