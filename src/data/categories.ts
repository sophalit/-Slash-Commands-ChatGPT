export interface CategoryInfo {
  number: number;
  key: string;
  nameEn: string;
  nameKm: string;
  range: string;
  groupType: 'image' | 'text';
  descriptionKm: string;
  descriptionEn: string;
}

export const PROMPT_CATEGORIES: CategoryInfo[] = [
  // PART 1: 150 AI IMAGE PROMPTS (Categories 1 to 11)
  {
    number: 1,
    key: 'quality',
    nameEn: 'Quality & Clarity',
    nameKm: 'គុណភាព និងភាពច្បាស់លាស់',
    range: '001–010',
    groupType: 'image',
    descriptionKm: 'កំណត់គុណភាពរូបភាព ភាពជាក់ស្តែង ព័ត៌មានលម្អិតស្បែក និងពណ៌',
    descriptionEn: 'Fidelity, photorealism, surface micro-details, and color accuracy'
  },
  {
    number: 2,
    key: 'camera',
    nameEn: 'Camera Angles & Framing',
    nameKm: 'មុំកាមេរ៉ា និងទំហំប្លង់',
    range: '011–025',
    groupType: 'image',
    descriptionKm: 'ទិសដៅមុំថត កម្រិតភ្នែក មុំទាប មុំខ្ពស់ ប្លង់ជិត និងប្លង់ទូលាយ',
    descriptionEn: 'Perspectives, eye-level, low/high angles, close-ups, and wide vistas'
  },
  {
    number: 3,
    key: 'lens',
    nameEn: 'Camera Lens Types',
    nameKm: 'រូបរាងតាមប្រភេទកែវ',
    range: '026–035',
    groupType: 'image',
    descriptionKm: 'លក្ខណៈអុបទិកកែវ 14mm, 24mm, 35mm, 50mm, 85mm, macro, fisheye, tilt-shift',
    descriptionEn: 'Focal length characteristics, depth of field compression, and optical distortion'
  },
  {
    number: 4,
    key: 'composition',
    nameEn: 'Composition & Layout',
    nameKm: 'ការរៀបចំប្លង់',
    range: '036–050',
    groupType: 'image',
    descriptionKm: 'ច្បាប់មួយភាគបី តុល្យភាព ចន្លោះទំនេរ negative-space បន្ទាត់នាំភ្នែក និង flat-lay',
    descriptionEn: 'Rule of thirds, symmetry, negative space for typography, leading lines, and knolling'
  },
  {
    number: 5,
    key: 'lighting',
    nameEn: 'Lighting & Atmosphere',
    nameKm: 'ពន្លឺ',
    range: '051–065',
    groupType: 'image',
    descriptionKm: 'ពន្លឺស្ទូឌីយោ softbox, ម៉ោងមាស golden-hour, ពន្លឺ Rembrandt, neon, backlight',
    descriptionEn: 'Soft studio diffusion, golden hour, Rembrandt cheek triangles, and neon glow'
  },
  {
    number: 6,
    key: 'style',
    nameEn: 'Style & Art Direction',
    nameKm: 'រចនាប័ទ្ម និងពណ៌',
    range: '066–085',
    groupType: 'image',
    descriptionKm: 'ភាពយន្ត cinematic, ឯកសារជីវិតពិត, minimalist, គំនូរពណ៌ទឹក watercolor, vector, 3d-clay',
    descriptionEn: 'Cinematic color grading, Swiss editorial, watercolor, vector graphic, and 3D clay'
  },
  {
    number: 7,
    key: 'material',
    nameEn: 'Materials & Surfaces',
    nameKm: 'សម្ភារៈ និងផ្ទៃវត្ថុ',
    range: '086–100',
    groupType: 'image',
    descriptionKm: 'លោហៈខាត់ brushed-metal, ក្រូម chrome, មាស gold-foil, កញ្ចក់ថ្លា clear-glass, ថ្មម៉ាប marble',
    descriptionEn: 'Realistic rendering of brushed metal, chrome, gold foil, glass, and marble'
  },
  {
    number: 8,
    key: 'environment',
    nameEn: 'Environment & Location',
    nameKm: 'បរិយាកាស និងទីតាំង',
    range: '101–110',
    groupType: 'image',
    descriptionKm: 'ស្ទូឌីយោ, ការិយាល័យទំនើប, សាកលវិទ្យាល័យ, ផ្លូវកម្ពុជា, សួនត្រូពិច, បន្ទប់ពិសោធន៍',
    descriptionEn: 'Studio backdrops, modern offices, university campuses, Cambodian streets, and futuristic labs'
  },
  {
    number: 9,
    key: 'business',
    nameEn: 'Business & Brand Campaigns',
    nameKm: 'អាជីវកម្ម និងការផ្សព្វផ្សាយស្ថាប័ន',
    range: '111–125',
    groupType: 'image',
    descriptionKm: 'រូបថតប្រវត្តិរូប, គម្របបទបង្ហាញ, គម្របសៀវភៅ, ការផ្សព្វផ្សាយជ្រើសរើសបុគ្គលិក, ផ្ទាំងផ្សព្វផ្សាយ',
    descriptionEn: 'Corporate headshots, presentation decks, editorial covers, recruitment, and event posters'
  },
  {
    number: 10,
    key: 'social',
    nameEn: 'Social Media Content',
    nameKm: 'មាតិកាបណ្ដាញសង្គម',
    range: '126–135',
    groupType: 'image',
    descriptionKm: 'រូបការ៉េ 1:1, រូបបញ្ឈរ 4:5, Story 9:16, គម្របវីដេអូ 16:9, Carousel, គម្រប Podcast',
    descriptionEn: 'Square 1:1, portrait 4:5, story vertical 9:16, video thumbnails, and carousels'
  },
  {
    number: 11,
    key: 'product_character',
    nameEn: 'Product & Character Assets',
    nameKm: 'ផលិតផល និងតួអង្គ',
    range: '136–150',
    groupType: 'image',
    descriptionKm: 'រូបស្នូលផលិតផល, ផ្ទៃស, គំរូកញ្ចប់ packaging, character-sheet 16:9, pose-sheet, storyboard',
    descriptionEn: 'Product hero shots, packaging mockups, full character reference sheets, and storyboards'
  },

  // PART 2: 50 TEXT, LEARNING & PRODUCTIVITY PROMPTS (Categories 12 to 16)
  {
    number: 12,
    key: 'daily_life',
    nameEn: 'Daily Life & Personal Growth',
    nameKm: 'ជីវិតប្រចាំថ្ងៃ និងការអភិវឌ្ឍខ្លួន',
    range: '151–165',
    groupType: 'text',
    descriptionKm: 'ទម្លាប់ប្រចាំថ្ងៃ, តាមដានទម្លាប់, ឃ្លាលើកទឹកចិត្ត, ផែនការសិក្សា, សង្ខេបសៀវភៅ, គ្រប់គ្រងពេលវេលា',
    descriptionEn: 'Daily routine planning, habit tracking, motivational quotes, and time management'
  },
  {
    number: 13,
    key: 'learning_research',
    nameEn: 'Learning & Research',
    nameKm: 'ការសិក្សា និងការស្រាវជ្រាវ',
    range: '166–175',
    groupType: 'text',
    descriptionKm: 'ពន្យល់ឱ្យងាយយល់, ប្រៀបធៀបគោលគំនិត, បង្កើតសំណួរហ្វឹកហាត់, flashcards, វាយតម្លៃប្រភព',
    descriptionEn: 'Feynman technique explanations, concept comparison, practice quizzes, and literature matrices'
  },
  {
    number: 14,
    key: 'teaching_assessment',
    nameEn: 'Teaching & Assessment (BBU)',
    nameKm: 'ការបង្រៀន និងការវាយតម្លៃ',
    range: '176–185',
    groupType: 'text',
    descriptionKm: 'ផែនការបង្រៀន, សកម្មភាពក្នុងថ្នាក់, ឧទាហរណ៍កម្ពុជា, rubric វាយតម្លៃ, ប្លង់ប្រឡង, មតិកែលម្អ',
    descriptionEn: 'Curriculum lesson plans, Cambodian localized case studies, 100-point rubrics, and feedback'
  },
  {
    number: 15,
    key: 'writing_communication',
    nameEn: 'Writing & Communication',
    nameKm: 'ការសរសេរ និងទំនាក់ទំនង',
    range: '186–195',
    groupType: 'text',
    descriptionKm: 'កែសម្រួលវិជ្ជាជីវៈ, ពិនិត្យអក្ខរាវិរុទ្ធខ្មែរ, បកប្រែតាមបរិបទ, ព្រាងអ៊ីមែល, សង្ខេបកិច្ចប្រជុំ, ស្គ្រីប',
    descriptionEn: 'Executive editing, Khmer orthography/grammar proofreading, context translation, and meeting digests'
  },
  {
    number: 16,
    key: 'planning_improvement',
    nameEn: 'Planning & Prompt Improvement',
    nameKm: 'ផែនការ និងការកែលម្អ Prompt',
    range: '196–200',
    groupType: 'text',
    descriptionKm: 'បំផុសគំនិត brainstorm, តារាងសម្រេចចិត្ត, ផែនការអនុវត្ត, កែលម្អ prompt, ពិនិត្យគុណភាពលទ្ធផល',
    descriptionEn: 'Brainstorming frameworks, decision matrices, iterative prompt refinement, and quality audits'
  }
];
