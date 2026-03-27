// High-quality image URLs for ClothLab
// Using Unsplash for professional fashion and textile imagery

export const images = {
  // Hero & Main
  hero: {
    model: '/hero_model.png',
    modelFallback: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=90&fit=crop',
  },

  // Auth page
  auth: {
    background: 'https://images.unsplash.com/photo-1558769132-cb1aea661d05?w=1200&q=90&fit=crop',
    fashionShow: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&q=90&fit=crop',
    designer: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90&fit=crop',
  },

  // Features
  features: {
    studio: '/feature_studio.png',
    studioFallback: '/feature_studio.png',
    assets: '/catalog_hero.png',
    assetsFallback: '/quality_fabric.png',
    workflow: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=90&fit=crop',
    workflowFallback: '/hero_model.png',
  },

  // Quality section
  quality: {
    fabric: '/quality_fabric.png',
    fabricFallback: 'https://images.unsplash.com/photo-1523274620588-4c03146581a1?w=800&q=90&fit=crop',
  },

  // Testimonials - Textile strip
  textiles: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=90&fit=crop',
    'https://images.unsplash.com/photo-1614179818511-5e65ef3fae5f?w=600&q=90&fit=crop',
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=90&fit=crop',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=90&fit=crop',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=90&fit=crop',
  ],

  // Catalog
  catalog: {
    hero: '/catalog_hero.png',
    heroFallback: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&q=90&fit=crop',
    designs: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=90&fit=crop',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=90&fit=crop',
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&q=90&fit=crop',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=90&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=90&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&q=90&fit=crop',
    ],
  },

  // Fashion styles for various components
  fashion: {
    streetwear: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=90&fit=crop',
    luxury: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=90&fit=crop',
    casual: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=90&fit=crop',
    formal: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=90&fit=crop',
  },

  // Manufacturer section
  manufacturer: {
    factory: 'https://images.unsplash.com/photo-1528318269466-69d920af5dad?w=800&q=90&fit=crop',
    sewing: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=90&fit=crop',
    production: 'https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=800&q=90&fit=crop',
  },

  // Placeholders
  placeholder: {
    avatar: (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=128`,
    product: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80&fit=crop',
  },
};

// Helper to get optimized image URL
export const getOptimizedImage = (url: string, width = 800, quality = 90) => {
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&q=${quality}&auto=format`;
  }
  return url;
};

// Preload critical images
export const preloadImages = (urls: string[]) => {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};
