import { CreativeDirectorAnalysis, PresetIdea } from '../types';

/**
 * Resolver for real photographic representations across Director Presets,
 * the 14-Point Strategic Breakdown, and Alternative Directions.
 */

export interface PointVisual {
  imageUrl: string;
  badge: string;
  descriptionKm: string;
}

// Visual mapping for camera angles
const CAMERA_ANGLE_IMAGES: Record<string, string> = {
  overtheshoulder: '/samples/bbu_podcast_studio_1789616875501.jpg',
  eyelevel: '/samples/executive_portrait_1789616896838.jpg',
  lowangle: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  highangle: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
  droneview: '/samples/outdoor_heritage_1789616917530.jpg',
  birdseyeview: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  wormseyeview: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
  closeup: '/samples/executive_portrait_1789616896838.jpg',
  extremecloseup: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
  macro: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
  frontview: '/samples/id_blue_backdrop_1789616934651.jpg',
  sideview: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  productshot: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  fpv: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=600&q=80',
  isometric: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
};

// Visual mapping for lenses
const LENS_LOOK_IMAGES: Record<string, string> = {
  '85mm': '/samples/executive_portrait_1789616896838.jpg',
  '35mm': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
  '50mm': '/samples/outdoor_heritage_1789616917530.jpg',
  '24mm': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
  '16mm': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  anamorphic: '/samples/cinematic_creative_1789616964410.jpg',
  macro: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80',
  telephoto: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=80',
  tiltshift: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80'
};

// Visual mapping for compositions
const COMPOSITION_IMAGES: Record<string, string> = {
  ruleofthirds: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
  goldenratio: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  leadinglines: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
  symmetry: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  centercomposition: '/samples/id_blue_backdrop_1789616934651.jpg',
  negativespace: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  depthlayers: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80',
  framing: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80'
};

// Visual mapping for lighting
const LIGHTING_IMAGES: Record<string, string> = {
  goldenhour: '/samples/outdoor_heritage_1789616917530.jpg',
  rimlight: '/samples/cinematic_creative_1789616964410.jpg',
  softbox: '/samples/bbu_podcast_studio_1789616875501.jpg',
  threepoint: '/samples/executive_portrait_1789616896838.jpg',
  lowkey: '/samples/cinematic_creative_1789616964410.jpg',
  highkey: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
  volumetriclight: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  godrays: '/samples/outdoor_heritage_1789616917530.jpg',
  neonglow: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  naturalighting: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
};

// Visual mapping for materials
const MATERIAL_IMAGES: Record<string, string> = {
  metal: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  titanium: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  gold: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
  glass: 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80',
  crystal: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80',
  marble: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  wood: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  fabric: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
  skin: '/samples/executive_portrait_1789616896838.jpg'
};

// Visual mapping for environments
const ENVIRONMENT_IMAGES: Record<string, string> = {
  classroom: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
  studio: '/samples/bbu_podcast_studio_1789616875501.jpg',
  office: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  temple: '/samples/outdoor_heritage_1789616917530.jpg',
  angkor: '/samples/outdoor_heritage_1789616917530.jpg',
  nature: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
  city: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
  cyberpunk: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  luxury: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'
};

/**
 * Match a text string against a dictionary of keyword-image pairs.
 */
function matchKeywordImage(text: string, dict: Record<string, string>, fallback: string): string {
  const lower = (text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  for (const [key, url] of Object.entries(dict)) {
    if (lower.includes(key)) {
      return url;
    }
  }
  return fallback;
}

/**
 * Get visual representations for the 14-Point Strategic Breakdown.
 */
export function get14PointVisuals(analysis: CreativeDirectorAnalysis): Record<string, PointVisual> {
  const cameraAngleImg = matchKeywordImage(
    analysis.cameraAngle + ' ' + analysis.relevantVisualCommands.join(' '),
    CAMERA_ANGLE_IMAGES,
    '/samples/executive_portrait_1789616896838.jpg'
  );

  const lensLookImg = matchKeywordImage(
    analysis.lensLook + ' ' + analysis.relevantVisualCommands.join(' '),
    LENS_LOOK_IMAGES,
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  );

  const compositionImg = matchKeywordImage(
    analysis.composition + ' ' + analysis.relevantVisualCommands.join(' '),
    COMPOSITION_IMAGES,
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80'
  );

  const lightingImg = matchKeywordImage(
    analysis.lighting + ' ' + analysis.relevantVisualCommands.join(' '),
    LIGHTING_IMAGES,
    '/samples/cinematic_creative_1789616964410.jpg'
  );

  const materialsImg = matchKeywordImage(
    analysis.materials + ' ' + analysis.relevantVisualCommands.join(' '),
    MATERIAL_IMAGES,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
  );

  const environmentImg = matchKeywordImage(
    analysis.environment + ' ' + analysis.creativeObjective,
    ENVIRONMENT_IMAGES,
    '/samples/bbu_podcast_studio_1789616875501.jpg'
  );

  const subjectImg = analysis.subject.toLowerCase().includes('temple') || analysis.subject.toLowerCase().includes('angkor')
    ? '/samples/outdoor_heritage_1789616917530.jpg'
    : analysis.subject.toLowerCase().includes('perfume') || analysis.subject.toLowerCase().includes('luxury')
    ? 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80'
    : analysis.subject.toLowerCase().includes('watch')
    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
    : analysis.subject.toLowerCase().includes('student') || analysis.subject.toLowerCase().includes('podcast')
    ? '/samples/bbu_podcast_studio_1789616875501.jpg'
    : '/samples/executive_portrait_1789616896838.jpg';

  const characterImg = analysis.character.toLowerCase().includes('cambodian') || analysis.character.toLowerCase().includes('student')
    ? '/samples/bbu_podcast_studio_1789616875501.jpg'
    : '/samples/executive_portrait_1789616896838.jpg';

  const colorStyleImg = analysis.colorStyle.toLowerCase().includes('cinematic')
    ? '/samples/cinematic_creative_1789616964410.jpg'
    : analysis.colorStyle.toLowerCase().includes('golden')
    ? '/samples/outdoor_heritage_1789616917530.jpg'
    : 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=600&q=80';

  return {
    objective: {
      imageUrl: environmentImg,
      badge: 'Vision',
      descriptionKm: 'គោលបំណងច្នៃប្រឌិតទូទៅ'
    },
    audience: {
      imageUrl: characterImg,
      badge: 'Demographics',
      descriptionKm: 'ទស្សនិកជនគោលដៅ'
    },
    subject: {
      imageUrl: subjectImg,
      badge: 'Focal Subject',
      descriptionKm: 'កម្មវត្ថុ ឬតួអង្គចម្បង'
    },
    character: {
      imageUrl: characterImg,
      badge: 'Demeanor',
      descriptionKm: 'កាយវិការ និងអារម្មណ៍តួអង្គ'
    },
    environment: {
      imageUrl: environmentImg,
      badge: 'Setting',
      descriptionKm: 'លំហ បរិយាកាស និងទីតាំង'
    },
    story: {
      imageUrl: lightingImg,
      badge: 'Narrative',
      descriptionKm: 'សាច់រឿង និងអារម្មណ៍ប្លង់'
    },
    cameraAngle: {
      imageUrl: cameraAngleImg,
      badge: 'Vantage Point',
      descriptionKm: 'មុំកាមេរ៉ា និងទស្សនវិស័យ'
    },
    lensLook: {
      imageUrl: lensLookImg,
      badge: 'Focal Length',
      descriptionKm: 'ប្រវែងកែវ និងជម្រៅព្រិល Bokeh'
    },
    composition: {
      imageUrl: compositionImg,
      badge: 'Geometric Balance',
      descriptionKm: 'រចនាសម្ព័ន្ធប្លង់ និងតុល្យភាព'
    },
    lighting: {
      imageUrl: lightingImg,
      badge: 'Illumination',
      descriptionKm: 'ស្ថាបត្យកម្មពន្លឺ និងស្រមោល'
    },
    colorStyle: {
      imageUrl: colorStyleImg,
      badge: 'Color Grading',
      descriptionKm: 'តុងពណ៌ និងអារម្មណ៍សោភ័ណភាព'
    },
    materials: {
      imageUrl: materialsImg,
      badge: 'Textures & Finish',
      descriptionKm: 'វាយនភាព និងសម្ភារៈពិត'
    },
    commands: {
      imageUrl: cameraAngleImg,
      badge: 'Slash Commands',
      descriptionKm: 'បណ្តុំកូដបញ្ជាប្លង់'
    },
    outputFormat: {
      imageUrl: subjectImg,
      badge: analysis.outputFormat.split(' ')[0] || '16:9',
      descriptionKm: 'ទំហំសមាមាត្រ និងស៊ុមរូប'
    }
  };
}

/**
 * Get the Master Visual Representation image URL based on complete prompt text.
 */
export function getMasterVisualImage(promptText: string, analysis?: CreativeDirectorAnalysis): {
  url: string;
  badge: string;
  aspectRatio: string;
} {
  const lower = (promptText + ' ' + (analysis?.creativeObjective || '')).toLowerCase();

  let url = '/samples/executive_portrait_1789616896838.jpg';
  let badge = 'Cinematic Master';
  let aspectRatio = '16:9';

  if (lower.includes('angkor') || lower.includes('temple') || lower.includes('sunrise') || lower.includes('cambodia')) {
    url = '/samples/outdoor_heritage_1789616917530.jpg';
    badge = 'Heritage & Golden Hour';
    aspectRatio = '16:9';
  } else if (lower.includes('perfume') || lower.includes('obsidian') || lower.includes('fragrance') || lower.includes('bottle')) {
    url = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80';
    badge = 'Luxury Commercial';
    aspectRatio = '4:5';
  } else if (lower.includes('watch') || lower.includes('titanium') || lower.includes('smartwatch') || lower.includes('biometric')) {
    url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
    badge = 'Hardware & 3D Render';
    aspectRatio = '1:1';
  } else if (lower.includes('classroom') || lower.includes('student') || lower.includes('podcast') || lower.includes('ai smart')) {
    url = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80';
    badge = 'AI Smart Education';
    aspectRatio = '16:9';
  } else if (lower.includes('pitch') || lower.includes('slide') || lower.includes('dashboard') || lower.includes('executive')) {
    url = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
    badge = 'Executive Tech Deck';
    aspectRatio = '16:9';
  } else if (lower.includes('rim light') || lower.includes('cyber') || lower.includes('cinematic')) {
    url = '/samples/cinematic_creative_1789616964410.jpg';
    badge = 'Low-Key Cinematic';
    aspectRatio = '16:9';
  }

  if (analysis?.outputFormat) {
    if (analysis.outputFormat.includes('4:5')) aspectRatio = '4:5';
    else if (analysis.outputFormat.includes('1:1')) aspectRatio = '1:1';
    else if (analysis.outputFormat.includes('9:16')) aspectRatio = '9:16';
    else if (analysis.outputFormat.includes('16:9')) aspectRatio = '16:9';
  }

  return { url, badge, aspectRatio };
}

/**
 * Get visual images for the 3 Alternative Creative Directions.
 */
export function getAlternativeDirectionImage(
  idx: number,
  title: string,
  keyCommands: string[]
): string {
  const combined = (title + ' ' + keyCommands.join(' ')).toLowerCase();

  if (combined.includes('dramatic') || combined.includes('rim') || combined.includes('dark') || combined.includes('low-key')) {
    return '/samples/cinematic_creative_1789616964410.jpg';
  }
  if (combined.includes('heritage') || combined.includes('sunrise') || combined.includes('golden') || combined.includes('outdoor')) {
    return '/samples/outdoor_heritage_1789616917530.jpg';
  }
  if (combined.includes('studio') || combined.includes('portrait') || combined.includes('85mm') || combined.includes('executive')) {
    return '/samples/executive_portrait_1789616896838.jpg';
  }
  if (combined.includes('product') || combined.includes('macro') || combined.includes('gadget') || combined.includes('tech')) {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80';
  }
  if (combined.includes('cyber') || combined.includes('neon') || combined.includes('future')) {
    return 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80';
  }
  if (combined.includes('education') || combined.includes('classroom') || combined.includes('smart')) {
    return 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80';
  }

  // Fallback defaults per index
  const defaults = [
    '/samples/cinematic_creative_1789616964410.jpg',
    '/samples/outdoor_heritage_1789616917530.jpg',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  ];

  return defaults[idx % defaults.length];
}
