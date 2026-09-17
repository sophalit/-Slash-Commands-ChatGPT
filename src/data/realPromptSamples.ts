export interface CommandTag {
  code: string;
  nameKm: string;
  effect: string;
}

export interface RealPromptSample {
  id: string;
  titleKm: string;
  titleEn: string;
  badge: string;
  imageUrl: string;
  aspectRatio: string;
  commands: CommandTag[];
  fullPromptEn: string;
  khmerBreakdown: {
    subject: string;
    attire: string;
    setting: string;
    lighting: string;
    cameraLens: string;
    quality: string;
  };
  sampleBrief: {
    idea: string;
    audience: string;
    references: string;
    requiredText: string;
    aspectRatio: string;
    mustKeep: string;
    mustAvoid: string;
    selectedCommands: string[];
  };
  bestUsedFor: string[];
  recommendedPlatforms: string[];
}

export const REAL_PROMPT_SAMPLES: RealPromptSample[] = [
  {
    id: 'sample-bbu-podcast',
    titleKm: 'ស្ទូឌីយោ Podcast & ផ្សាយផ្ទាល់អាជីព (BBU Studio)',
    titleEn: 'Executive Broadcasting & Podcast Studio Portrait',
    badge: 'ពេញនិយមបំផុត Best Studio',
    imageUrl: '/samples/bbu_podcast_studio_1789616875501.jpg',
    aspectRatio: '4:5',
    commands: [
      { code: '/podcast-pro', nameKm: 'ស្ទូឌីយោផតខាស់', effect: 'តុផ្សាយទំនើប មេក្រូ Shure អាជីព' },
      { code: '/studio-light', nameKm: 'ភ្លើងស្ទូឌីយោ', effect: 'Softbox ទន់ភ្លឺច្បាស់ គ្មានស្រមោលក្រាស់' },
      { code: '/portrait-85mm', nameKm: 'ឡេន 85mm', effect: 'ទំហំរូបថត និងរូបរាងមុខស្មើធម្មជាតិ' },
      { code: '/shallow-dof', nameKm: 'ព្រាលផ្ទៃក្រោយ', effect: 'កាមេរ៉ា និងធ្នើរៀនព្រាលទន់ភ្លន់' },
      { code: '/executive-suit', nameKm: 'ឈុតអាវធំថ្នាក់ដឹកនាំ', effect: 'Navy blue suit & dark blue silk tie' },
      { code: '/8k-photorealistic', nameKm: 'ច្បាស់កម្រិត 8K', effect: 'បង្ហាញស្បែកពិត ភ្នែកភ្លឺថ្លា' }
    ],
    fullPromptEn:
      'Professional 8k cinematic portrait photograph of a Cambodian Asian professional man in his 40s wearing stylish burgundy-rimmed glasses, dark navy blue wool tailored suit, crisp white dress shirt, and a clean solid dark blue silk necktie. Sitting comfortably at a modern executive broadcasting wooden desk with a professional podcast microphone in the foreground. In the background: blurred professional studio broadcast camera on tripod, warm wooden vertical slat wall, integrated warm LED shelf lighting, blurred sign reading "BBU Studio - IDEAS PEOPLE IMPACT", blurred studio plants. Studio key softbox lighting, gentle fill light, natural skin texture with visible pores, razor-sharp focus on subject, shallow depth of field, 85mm portrait lens, f/1.8, photorealistic.',
    khmerBreakdown: {
      subject: 'បុរសជនជាតិខ្មែរអាជីពអាយុ ៤០ ឆ្នាំ ពាក់វ៉ែនតាស៊ុមក្រហម Burgundy ទឹកមុខស្ងប់ស្ងៀមជឿជាក់',
      attire: 'ឈុតអាវធំពណ៌ខៀវចាស់ Navy Blue, អាវសឺមីស, ក្រវាត់កសូត្រពណ៌ខៀវដិត',
      setting: 'ស្ទូឌីយោផតខាស់ទំនើប មានតុឈើ មេក្រូផតខាស់អាជីព ជញ្ជាំងឈើបញ្ឈរ ភ្លើង LED និងស្លាក BBU Studio',
      lighting: 'ភ្លើង Softbox សងខាងទន់ភ្លន់ បង្កើត catchlight ក្នុងកែវភ្នែក និង rim light លើស្មា',
      cameraLens: 'ឡេន Portrait 85mm, f/1.8, Depth of Field ព្រាលផ្ទៃខាងក្រោយយ៉ាងស្អាត',
      quality: 'រូបថតកម្រិត 8K Photorealistic រក្សាគុណភាពស្បែក និងសសៃសក់ពិត'
    },
    sampleBrief: {
      idea: 'បង្កើតរូបថតស្ទូឌីយោ Podcast អាជីព បុរសខ្មែរពាក់វ៉ែនតា និងអាវធំខៀវចាស់ អង្គុយមុខមេក្រូផតខាស់ក្នុងស្ទូឌីយោ BBU Studio',
      audience: 'អ្នកទស្សនាវីដេអូផតខាស់ ថ្នាក់ដឹកនាំ អ្នកអប់រំ និងសាធារណជន',
      references: 'BBU Studio, National Geographic Podcast, BBC Executive Studio',
      requiredText: 'BBU Studio',
      aspectRatio: '4:5',
      mustKeep: 'វ៉ែនតាស៊ុមក្រហម, អាវធំខៀវចាស់, ក្រវាត់កខៀវ, មេក្រូផតខាស់នៅតុមុខ',
      mustAvoid: 'គំនូរជីវចល, ស្បែករលោងដូចផ្លាស្ទិក, មុខក្មេងពេក, ស្រមោលខ្មៅក្រាស់លើមុខ',
      selectedCommands: ['/podcast-pro', '/studio-light', '/portrait-85mm', '/shallow-dof', '/executive-suit', '/8k-photorealistic']
    },
    bestUsedFor: ['Facebook Cover & Post', 'YouTube Podcast Thumbnail', 'LinkedIn Profile', 'ស្ទូឌីយោផ្សាយផ្ទាល់'],
    recommendedPlatforms: ['Midjourney v6', 'ChatGPT / DALL-E 3', 'Flux.1 Schnell/Dev', 'Leonardo AI', 'Google Imagen 3']
  },
  {
    id: 'sample-executive-portrait',
    titleKm: 'រូបថតផ្លូវការថ្នាក់ដឹកនាំ (Corporate Executive Portrait)',
    titleEn: 'Corporate Executive Leadership Headshot',
    badge: 'អាជីពក្រុមហ៊ុន Corporate',
    imageUrl: '/samples/executive_portrait_1789616896838.jpg',
    aspectRatio: '4:5',
    commands: [
      { code: '/corporate-headshot', nameKm: 'រូបថតផ្លូវការ', effect: 'ទម្រង់ក្បាល និងស្មាស្តង់ដារក្រុមហ៊ុន' },
      { code: '/clean-white-studio', nameKm: 'ផ្ទៃសស្អាត', effect: 'ផ្ទៃក្រោយពន្លឺសទន់ គ្មានភាពរញ៉េរញ៉ៃ' },
      { code: '/three-point-lighting', nameKm: 'ភ្លើង ៣ ចំណុច', effect: 'Key light + Fill light + Hair rim light' },
      { code: '/portrait-85mm', nameKm: 'ឡេន 85mm', effect: 'សមាមាត្រផ្ទៃមុខ និងច្រមុះមិនរីកធំ' },
      { code: '/executive-suit', nameKm: 'ឈុតអាវធំរៀបរយ', effect: 'Dark navy suit & blue necktie' },
      { code: '/photorealistic', nameKm: 'រូបថតពិតៗ', effect: 'កម្រិតម៉ដ្ឋនៃស្បែក និងក្រណាត់អាវធំ' }
    ],
    fullPromptEn:
      'Executive 8k corporate portrait photograph of an Asian Cambodian gentleman in his 40s with a confident and approachable expression, wearing stylish burgundy eyeglasses, perfectly tailored dark navy blue wool suit, crisp white button-down dress shirt, and a solid cobalt blue necktie. Clean minimalist neutral bright studio background with professional three-point softbox studio lighting, subtle rim light separating subject from background, catchlights in the eyes, realistic authentic Asian skin texture with natural pores, razor sharp focus, 85mm f/2.8 portrait prime lens, photorealistic studio photography.',
    khmerBreakdown: {
      subject: 'បុរសខ្មែរថ្នាក់ដឹកនាំ ទឹកមុខញញឹមស្រាលប្រកបដោយទំនុកចិត្ត ពាក់វ៉ែនតាស៊ុមក្រហម Burgundy',
      attire: 'ឈុតអាវធំពណ៌ខៀវចាស់កាត់យ៉ាងសមសួន, អាវសឺមីសកលាត, ក្រវាត់កខៀវ Cobalt',
      setting: 'ផ្ទៃស្ទូឌីយោពន្លឺសភ្លឺរលោងស្អាត សមស្របសម្រាប់ Profile និងគេហទំព័រផ្លូវការ',
      lighting: 'ភ្លើង 3-Point Lighting ស្ទូឌីយោ មាន Rim light បំបែកតួអង្គចេញពីផ្ទៃក្រោយ',
      cameraLens: 'ឡេន 85mm f/2.8 ផ្តល់នូវភាពច្បាស់ត្រង់ភ្នែក និងទម្រង់មុខស្មើល្អ',
      quality: 'Photorealistic គុណភាពស្បែកធម្មជាតិ គ្មាន AI Artifacts'
    },
    sampleBrief: {
      idea: 'រូបថតផ្លូវការ Headshot ថ្នាក់ដឹកនាំ បុរសខ្មែរពាក់វ៉ែនតា និងអាវធំខៀវ លើផ្ទៃស្ទូឌីយោសស្អាត',
      audience: 'គណៈគ្រប់គ្រង ដៃគូសហការ វិនិយោគិន និងគេហទំព័រស្ថាប័ន',
      references: 'Forbes Executive Portrait, LinkedIn Top Voices, Corporate Annual Report',
      requiredText: '',
      aspectRatio: '4:5',
      mustKeep: 'វ៉ែនតា, អាវធំខៀវចាស់, ក្រវាត់ក, ផ្ទៃស្ទូឌីយោសស្អាត',
      mustAvoid: 'ផ្ទៃខាងក្រោយរញ៉េរញ៉ៃ, ពន្លឺងងឹត, សម្លៀកបំពាក់មិនសមរម្យ',
      selectedCommands: ['/corporate-headshot', '/clean-white-studio', '/three-point-lighting', '/portrait-85mm', '/executive-suit', '/photorealistic']
    },
    bestUsedFor: ['LinkedIn Profile', 'Annual Report', 'Website Leadership Page', 'សៀវភៅ ឬអត្ថបទកាសែត'],
    recommendedPlatforms: ['Midjourney v6', 'ChatGPT / DALL-E 3', 'Flux.1', 'Leonardo AI']
  },
  {
    id: 'sample-id-badge',
    titleKm: 'រូបថតកាតការងារ & ប័ណ្ណផ្លូវការ (Official ID Badge)',
    titleEn: 'Official ID Card & Institution Badge Portrait',
    badge: 'កាតស្ថាប័ន ID Badge',
    imageUrl: '/samples/id_blue_backdrop_1789616934651.jpg',
    aspectRatio: '4:5',
    commands: [
      { code: '/id-badge', nameKm: 'កាតបុគ្គលិក', effect: 'មានផ្លាកឈ្មោះមាស និងក្រវាត់កឆ្នូត' },
      { code: '/cyan-backdrop', nameKm: 'ផ្ទៃខៀវផ្ទៃមេឃ', effect: 'ពណ៌ផ្ទៃខៀវ cyan ស្មើស្អាតតាមស្តង់ដារប័ណ្ណ' },
      { code: '/even-lighting', nameKm: 'ភ្លើងស្មើល្អ', effect: 'ភ្លឺស្មើមុខទាំងសងខាង គ្មានស្រមោលក្រាស់' },
      { code: '/uniform-shirt', nameKm: 'អាវសឺមីសដៃខ្លី', effect: 'អាវឯកសណ្ឋានសស្អាត មានហោប៉ៅ' },
      { code: '/70mm-portrait', nameKm: 'ឡេន 70mm', effect: 'កម្រិតរូបថតស្តង់ដារលិខិតឆ្លងដែន' },
      { code: '/crisp-sharpness', nameKm: 'ភាពច្បាស់មុត', effect: 'ច្បាស់ពីចុងច្រមុះដល់ស្លឹកត្រចៀក' }
    ],
    fullPromptEn:
      'Professional clean corporate ID badge and passport portrait photograph of a polite Asian Cambodian man wearing dark rectangular eyeglasses, a crisp short-sleeved white button-down uniform dress shirt, and a dark striped corporate necktie, wearing a small rectangular gold brass employee name tag pinned neatly on his left chest pocket. Even and symmetrical passport studio lighting, vivid bright turquoise cyan blue studio backdrop, razor-sharp focus from nose to ears, authentic skin tones, professional institutional identification photography, 70mm portrait lens, f/4, photorealistic.',
    khmerBreakdown: {
      subject: 'បុរសខ្មែរទឹកមុខរៀបរយ ស្លូតបូត ពាក់វ៉ែនតាស៊ុមខ្មៅរាងចតុកោណកែង',
      attire: 'អាវសឺមីសដៃខ្លីពណ៌សស្អាត, ក្រវាត់កឆ្នូតផ្លូវការ, មានផ្លាកឈ្មោះមាស (Name Tag) លើហោប៉ៅ',
      setting: 'ផ្ទៃស្ទូឌីយោពណ៌ខៀវ Cyan / Turquoise ភ្លឺរលោងស្មើស្អាតតាមស្តង់ដារកាតស្ថាប័ន',
      lighting: 'ភ្លើងស្តង់ដារ Passport/ID ភ្លឺស្មើមុខទាំងពីរ គ្មានស្រមោលខ្មៅ',
      cameraLens: 'ឡេន 70mm, f/4 ផ្តល់ភាពច្បាស់គ្រប់ជ្រុងជ្រោយ',
      quality: 'ពណ៌ស្បែកពិត គ្មានការបំផ្លើស ឬការកែច្នៃហួសហេតុ'
    },
    sampleBrief: {
      idea: 'រូបថតកាតបុគ្គលិកផ្លូវការ បុរសខ្មែរពាក់អាវសឺមីសដៃខ្លី ក្រវាត់កឆ្នូត ផ្លាកឈ្មោះមាស លើផ្ទៃខៀវ Cyan',
      audience: 'នាយកដ្ឋានបុគ្គលិក កាតសម្គាល់ខ្លួន និងប្រព័ន្ធសុវត្ថិភាពស្ថាប័ន',
      references: 'Official University Staff ID, Bank Corporate Badge, Government Credential',
      requiredText: '',
      aspectRatio: '4:5',
      mustKeep: 'អាវសឺមីសដៃខ្លី, ក្រវាត់កឆ្នូត, ផ្លាកឈ្មោះមាស, ផ្ទៃខៀវ Cyan',
      mustAvoid: 'ស្នាមជ្រីវជ្រួញលើខោអាវ, ផ្ទៃខាងក្រោយមិនស្មើ, សម្លៀកបំពាក់ពណ៌ចម្រុះ',
      selectedCommands: ['/id-badge', '/cyan-backdrop', '/even-lighting', '/uniform-shirt', '/70mm-portrait', '/crisp-sharpness']
    },
    bestUsedFor: ['កាតបុគ្គលិក ID Card', 'Passport Photo', 'ប័ណ្ណសម្គាល់ខ្លួនសមាជិក', 'ប្រវត្តិរូបសង្ខេប CV'],
    recommendedPlatforms: ['Midjourney v6', 'ChatGPT / DALL-E 3', 'Flux.1', 'Leonardo AI']
  },
  {
    id: 'sample-outdoor-heritage',
    titleKm: 'ទេសចរណ៍ & បេតិកភណ្ឌប្រាសាទអង្គរ (Heritage Travel)',
    titleEn: 'Angkor Heritage & Cultural Travel Documentary',
    badge: 'ទេសចរណ៍ & វប្បធម៌ Heritage',
    imageUrl: '/samples/outdoor_heritage_1789616917530.jpg',
    aspectRatio: '4:5',
    commands: [
      { code: '/travel-documentary', nameKm: 'ឯកសារទេសចរណ៍', effect: 'អារម្មណ៍បែបដើរលេងពិតៗ ធម្មជាតិ' },
      { code: '/golden-hour', nameKm: 'ពន្លឺព្រះអាទិត្យកក់ក្តៅ', effect: 'ពន្លឺព្រឹកព្រលឹមជះកាត់ស្លឹកឈើ' },
      { code: '/heritage-ruins', nameKm: 'ប្រាសាទបុរាណអង្គរ', effect: 'តួប្រាសាទថ្មបុរាណព្រាលនៅផ្ទៃក្រោយ' },
      { code: '/bucket-hat', nameKm: 'មួកការពារកម្តៅថ្ងៃ', effect: 'មួកសំពត់ Bucket hat ពណ៌កាគី' },
      { code: '/50mm-natural', nameKm: 'ឡេន 50mm', effect: 'ទស្សនីយភាពដូចភ្នែកមនុស្សមើលឃើញ' },
      { code: '/candid-portrait', nameKm: 'រូបថត Candid ធម្មជាតិ', effect: 'ទឹកមុខស្រស់ស្រាយ មិនបង្ខំ' }
    ],
    fullPromptEn:
      'Candid travel documentary photograph of an Asian Cambodian gentleman wearing dark-framed glasses, a khaki brown bucket sun hat, and an earth-tone casual polo shirt. Standing outdoors along a stone pathway surrounded by lush tropical green trees with the ancient stone carved towers of Angkor Wat temple softly blurred in the background. Natural warm morning sunlight filtering through foliage, authentic natural skin texture, relaxed cultural travel documentary style, shallow depth of field, 50mm f/2.2 prime lens, National Geographic documentary photography style.',
    khmerBreakdown: {
      subject: 'បុរសខ្មែរដំណើរទេសចរណ៍ ទឹកមុខរីករាយស្រស់ថ្លា ពាក់វ៉ែនតា និងមួក Bucket Hat',
      attire: 'អាវយឺតប៉ូឡូសាមញ្ញពណ៌ Earth-tone ស្រួលខ្លួន, មួកការពារកម្តៅថ្ងៃពណ៌ត្នោតកាគី',
      setting: 'ផ្លូវដើរថ្មក្រាលបុរាណ ព័ទ្ធជុំវិញដោយដើមឈើត្រូពិចបៃតងខ្ចី និងកំពូលប្រាសាទអង្គរព្រាលៗ',
      lighting: 'ពន្លឺថ្ងៃធម្មជាតិពេលព្រឹកជះកាត់មែកឈើ (Dappled Morning Sunlight)',
      cameraLens: 'ឡេន 50mm f/2.2 Prime Lens ផ្តល់ជម្រៅរូបភាពធម្មជាតិដូចភ្នែកមនុស្ស',
      quality: 'បែប National Geographic Travel Documentary ពណ៌ធម្មជាតិពិត'
    },
    sampleBrief: {
      idea: 'រូបថតទេសចរណ៍បែប Candid បុរសខ្មែរពាក់មួក Bucket hat និងអាវប៉ូឡូ ដើរលេងនៅរមណីយដ្ឋានអង្គរ',
      audience: 'អ្នកនិយមទេសចរណ៍ អ្នកតាមដានបណ្តាញសង្គម មិត្តភក្តិ និងក្រុមគ្រួសារ',
      references: 'National Geographic Traveler, Lonely Planet Cambodia, Travel Lifestyle Blog',
      requiredText: '',
      aspectRatio: '4:5',
      mustKeep: 'មួក Bucket hat, វ៉ែនតា, ដើមឈើបៃតង, ប្រាសាទថ្មអង្គរព្រាលៗ',
      mustAvoid: 'ឡាន ឬម៉ូតូទំនើប, សំរាម, មនុស្សកកកុញ, ពន្លឺរឹងពេក',
      selectedCommands: ['/travel-documentary', '/golden-hour', '/heritage-ruins', '/bucket-hat', '/50mm-natural', '/candid-portrait']
    },
    bestUsedFor: ['Facebook Personal Story', 'Instagram Travel Post', 'Tourism Promotion', 'Lifestyle Vlog'],
    recommendedPlatforms: ['Midjourney v6', 'Flux.1', 'ChatGPT / DALL-E 3', 'Leonardo AI']
  },
  {
    id: 'sample-cinematic-creative',
    titleKm: 'រូបថតភាពយន្តបែបស្រមើស្រមៃ (Cinematic Drama & Rim Light)',
    titleEn: 'Moody Low-Key Cinematic Portrait with Amber Rim Light',
    badge: 'ភាពយន្ត Cinematic',
    imageUrl: '/samples/cinematic_creative_1789616964410.jpg',
    aspectRatio: '4:5',
    commands: [
      { code: '/cinematic-film', nameKm: 'រចនាប័ទ្មកុន', effect: 'ពណ៌ និងអារម្មណ៍បែបភាពយន្តហូលីវូដ' },
      { code: '/low-key-lighting', nameKm: 'ពន្លឺ Low-Key', effect: 'ស្រមោលងងឹតទាក់ទាញ អារម្មណ៍ស្ងប់ស្ងាត់' },
      { code: '/amber-rim-light', nameKm: 'ភ្លើងមាសគែមមុខ', effect: 'ពន្លឺពណ៌ទឹកក្រូចមាសជះគែមថ្ពាល់ និងស្មា' },
      { code: '/anamorphic-lens', nameKm: 'ឡេន Anamorphic', effect: 'Bokeh និងពន្លឺផ្តេកបែបកុន' },
      { code: '/film-grain', nameKm: 'គ្រាប់ហ្វីលធម្មជាតិ', effect: '35mm organic film grain មិនសិប្បនិម្មិត' },
      { code: '/teal-orange', nameKm: 'ពណ៌ Teal & Amber', effect: 'ស្រមោលខៀវចាស់ ជាមួយពន្លឺមាសកក់ក្តៅ' }
    ],
    fullPromptEn:
      'Dramatic cinematic film still portrait of a thoughtful Asian Cambodian man with stylish dark glasses, wearing a dark open-collar structured blazer jacket. Low-key atmospheric lighting with a warm golden amber rim light tracing the cheek and silhouette, subtle cinematic haze in the studio air, deep moody shadows with teal and charcoal undertones, Arri Alexa 85mm anamorphic lens, beautiful cinematic bokeh, fine organic 35mm film grain, Hollywood cinematic color grade, 8k resolution photorealistic.',
    khmerBreakdown: {
      subject: 'បុរសខ្មែរទឹកមុខគិតគូរជ្រាលជ្រៅ មានមន្តស្នេហ៍អាថ៌កំបាំង ពាក់វ៉ែនតាទាន់សម័យ',
      attire: 'អាវធំពណ៌ខ្មៅបើកឡេវក (Open-collar Blazer Jacket) បែបសិល្បៈទាន់សម័យ',
      setting: 'បន្ទប់ស្ទូឌីយោមើលទៅអាថ៌កំបាំង មានផ្សែងហុយស្ដើងៗបង្កើតបរិយាកាសស៊ីជម្រៅ',
      lighting: 'ពន្លឺ Low-Key ស្រមោលជ្រៅ ដោយមានភ្លើង Amber Rim Light ជះលើគែមមុខ',
      cameraLens: 'ឡេន Arri Alexa Anamorphic 85mm បង្កើត Bokeh ភាពយន្តអស្ចារ្យ',
      quality: 'Cinematic Film Still មានគ្រាប់ 35mm Film Grain និងកម្រិត 8K'
    },
    sampleBrief: {
      idea: 'រូបថតបែបភាពយន្ត Low-Key បុរសខ្មែរពាក់វ៉ែនតា អាវធំងងឹត ជាមួយភ្លើងពណ៌ទឹកក្រូចមាសគែមមុខ',
      audience: 'អ្នកស្រឡាញ់សិល្បៈភាពយន្ត ផលិតករ អ្នកដឹកនាំរឿង និងទស្សនាវដ្តីសិល្បៈ',
      references: 'Blade Runner 2049, Arri Alexa Cinema Portraits, GQ Magazine Dark Issue',
      requiredText: '',
      aspectRatio: '4:5',
      mustKeep: 'វ៉ែនតា, ពន្លឺ Amber Rim Light, ស្រមោលងងឹត, បរិយាកាសកុន',
      mustAvoid: 'ភ្លឺខ្លាំងពេក, ពណ៌ស្រស់ឆើតឆាយ, ស្បែករលោងខ្វះស្រមោល',
      selectedCommands: ['/cinematic-film', '/low-key-lighting', '/amber-rim-light', '/anamorphic-lens', '/film-grain', '/teal-orange']
    },
    bestUsedFor: ['Poster ភាពយន្ត', 'គម្របសៀវភៅ ឬអាល់ប៊ុម', 'Art Exhibition', 'Creative Bio'],
    recommendedPlatforms: ['Midjourney v6', 'Flux.1', 'ChatGPT / DALL-E 3', 'Leonardo AI']
  }
];
