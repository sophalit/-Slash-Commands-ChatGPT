import { PromptItem } from '../types';

// Curated high-resolution photographic representations for visual commands & prompts
const SPECIFIC_PROMPT_IMAGES: Record<string, string> = {
  // 1. Quality & Clarity (001–010)
  '001': '/samples/executive_portrait_1789616896838.jpg', // /photorealistic
  '002': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', // /fine-detail
  '003': '/samples/executive_portrait_1789616896838.jpg', // /natural-skin
  '004': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', // /clean-edges
  '005': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', // /balanced-exposure
  '006': 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=600&q=80', // /true-color
  '007': 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80', // /low-noise
  '008': '/samples/cinematic_creative_1789616964410.jpg', // /high-contrast
  '009': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', // /soft-contrast
  '010': 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80', // /crisp-focus

  // 2. Camera Angles (011–025)
  '011': '/samples/executive_portrait_1789616896838.jpg', // /eye-level
  '012': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', // /low-angle
  '013': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', // /high-angle
  '014': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // /birds-eye
  '015': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', // /worms-eye
  '016': '/samples/bbu_podcast_studio_1789616875501.jpg', // /over-shoulder
  '017': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /dutch-angle
  '018': '/samples/id_blue_backdrop_1789616934651.jpg', // /front-view
  '019': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', // /profile-view
  '020': '/samples/executive_portrait_1789616896838.jpg', // /three-quarter
  '021': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80', // /top-down
  '022': 'https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=600&q=80', // /ground-level
  '023': '/samples/outdoor_heritage_1789616917530.jpg', // /selfie-view
  '024': 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=600&q=80', // /fpv
  '025': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /isometric

  // 3. Shot Sizes & Framing (026–035)
  '026': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', // /extreme-closeup
  '027': '/samples/executive_portrait_1789616896838.jpg', // /close-up
  '028': '/samples/id_blue_backdrop_1789616934651.jpg', // /medium-close-up
  '029': '/samples/bbu_podcast_studio_1789616875501.jpg', // /medium-shot
  '030': '/samples/outdoor_heritage_1789616917530.jpg', // /medium-full-shot
  '031': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', // /full-body
  '032': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', // /wide-shot
  '033': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80', // /extreme-wide-shot
  '034': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', // /establishing-shot
  '035': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80', // /cowboy-shot

  // 4. Camera Lenses (036–045)
  '036': 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=600&q=80', // /macro-lens
  '037': '/samples/executive_portrait_1789616896838.jpg', // /85mm-portrait
  '038': '/samples/outdoor_heritage_1789616917530.jpg', // /50mm-lens
  '039': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80', // /35mm-lens
  '040': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80', // /24mm-wide
  '041': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', // /16mm-ultrawide
  '042': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /fisheye-lens
  '043': 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=600&q=80', // /telephoto-lens
  '044': '/samples/cinematic_creative_1789616964410.jpg', // /anamorphic-lens
  '045': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80', // /tilt-shift

  // 5. Composition (046–060)
  '046': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', // /rule-of-thirds
  '047': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /golden-ratio
  '048': 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80', // /leading-lines
  '049': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', // /symmetry
  '050': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80', // /framing
  '051': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', // /negative-space
  '052': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', // /diagonal-lines
  '053': '/samples/id_blue_backdrop_1789616934651.jpg', // /center-composition
  '054': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', // /pattern-repetition
  '055': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // /triangular-composition
  '056': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', // /depth-layers
  '057': '/samples/executive_portrait_1789616896838.jpg', // /figure-ground
  '058': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /silhouette
  '059': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80', // /frame-within-frame
  '060': '/samples/bbu_podcast_studio_1789616875501.jpg', // /visual-anchor

  // 6. Lighting (061–075)
  '061': '/samples/outdoor_heritage_1789616917530.jpg', // /golden-hour
  '062': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80', // /blue-hour
  '063': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', // /natural-sunlight
  '064': '/samples/bbu_podcast_studio_1789616875501.jpg', // /softbox-diffused
  '065': '/samples/cinematic_creative_1789616964410.jpg', // /dramatic-rim
  '066': '/samples/executive_portrait_1789616896838.jpg', // /three-point-light
  '067': '/samples/cinematic_creative_1789616964410.jpg', // /low-key
  '068': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80', // /high-key
  '069': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /neon-glow
  '070': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // /volumetric-rays
  '071': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', // /candlelight
  '072': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80', // /backlight
  '073': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', // /hard-shadow
  '074': '/samples/outdoor_heritage_1789616917530.jpg', // /dappled-light
  '075': '/samples/cinematic_creative_1789616964410.jpg', // /dual-tone

  // 7. Art Styles (076–090)
  '076': '/samples/cinematic_creative_1789616964410.jpg', // /cinematic-film
  '077': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', // /editorial-fashion
  '078': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80', // /vintage-polaroid
  '079': '/samples/outdoor_heritage_1789616917530.jpg', // /documentary-raw
  '080': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', // /watercolor-art
  '081': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80', // /oil-painting
  '082': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /vector-flat
  '083': 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&q=80', // /line-art
  '084': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /3d-pixar-style
  '085': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /cyberpunk-neo
  '086': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', // /minimalism
  '087': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', // /fantasy-concept
  '088': 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80', // /anime-cel
  '089': 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&q=80', // /retro-comic
  '090': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80', // /abstract-expression

  // 8. 3D & CGI (091–100)
  '091': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /octane-render
  '092': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /unreal-engine-5
  '093': 'https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?auto=format&fit=crop&w=600&q=80', // /clay-render
  '094': 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=600&q=80', // /holographic-hud
  '095': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /isometric-diorama
  '096': 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80', // /photoreal-cgi
  '097': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80', // /subsurface-scattering
  '098': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', // /raytraced-reflection
  '099': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', // /low-poly
  '100': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', // /procedural-terrain

  // 9. Material & Surface (101–110)
  '101': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', // /brushed-metal
  '102': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', // /polished-gold
  '103': 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80', // /clear-glass
  '104': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', // /glossy-ceramic
  '105': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', // /natural-wood
  '106': 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80', // /carbon-fiber
  '107': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', // /velvet-fabric
  '108': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80', // /rough-concrete
  '109': 'https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?auto=format&fit=crop&w=600&q=80', // /water-droplets
  '110': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', // /marble-stone

  // 10. Environment & Atmosphere (111–125)
  '111': 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80', // /misty-fog
  '112': 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=600&q=80', // /tropical-rain
  '113': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /stormy-sky
  '114': '/samples/outdoor_heritage_1789616917530.jpg', // /dense-jungle
  '115': '/samples/outdoor_heritage_1789616917530.jpg', // /ancient-temple
  '116': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80', // /futuristic-city
  '117': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80', // /cozy-coffee-shop
  '118': '/samples/bbu_podcast_studio_1789616875501.jpg', // /modern-office & studio
  '119': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /night-street
  '120': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80', // /snowy-mountain
  '121': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', // /serene-beach
  '122': 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80', // /desert-dunes
  '123': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', // /neon-alley
  '124': 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80', // /library-interior
  '125': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', // /rooftop-sunset

  // 11. Product & Commercial (126–150)
  '126': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', // /floating-product
  '127': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', // /hero-pedestal
  '128': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80', // /luxury-packaging
  '129': 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80', // /cosmetic-dropper
  '130': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', // /tech-gadget
  '131': 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80', // /apparel-flatlay
  '132': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', // /food-photography
  '133': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', // /beverage-splash
  '134': 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80', // /jewelry-sparkle
  '135': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', // /automotive-studio
  '136': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80', // /billboard-mockup
  '137': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', // /magazine-cover
  '138': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80', // /store-shelf
  '139': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80', // /unboxing-moment
  '140': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'  // /social-media-ad
};

// Generic category fallbacks
const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  quality: '/samples/executive_portrait_1789616896838.jpg',
  camera: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
  lens: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
  composition: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80',
  lighting: '/samples/cinematic_creative_1789616964410.jpg',
  style: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
  material: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80',
  environment: '/samples/outdoor_heritage_1789616917530.jpg',
  product_character: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  social: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
  business: '/samples/id_blue_backdrop_1789616934651.jpg',
  daily_life: '/samples/bbu_podcast_studio_1789616875501.jpg',
  learning_research: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  teaching_assessment: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80',
  writing_communication: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
  planning_improvement: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80'
};

/**
 * Returns a high-quality real photographic image URL for any prompt item in the 200 catalog.
 */
export function getPromptImageUrl(item: PromptItem): string {
  if (item.imageUrl) {
    return item.imageUrl;
  }

  // Exact ID match
  if (SPECIFIC_PROMPT_IMAGES[item.id]) {
    return SPECIFIC_PROMPT_IMAGES[item.id];
  }

  // Category fallback
  if (CATEGORY_FALLBACK_IMAGES[item.categoryKey]) {
    return CATEGORY_FALLBACK_IMAGES[item.categoryKey];
  }

  // Final fallback
  return '/samples/bbu_podcast_studio_1789616875501.jpg';
}
