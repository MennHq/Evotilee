// ============================================================================
//                       WEBSITE TEMPLATE CONFIGURATION SOURCE
// ============================================================================
// This file is the single source of truth for the entire website.
// To rebrand, customize content, or change any of the text, metrics, services,
// team details, or FAQs, simply edit the values below!
// ============================================================================

// Standard asset paths used throughout the site
const assets = {
  logo: 'https://i.postimg.cc/FHdvnKGf/white-transparent-logo.webp',
  founderAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  
  // Hero section scrolling card preview images
  shot1: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-1.webp',
  shot2: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-2.webp',
  shot3: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-3.webp',
  shot4: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-4.webp',
  shot5: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-5.webp',
  shot6: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-6.webp',
  shot7: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-7.webp',
  shot8: 'https://webuild-dev.s3.eu-north-1.amazonaws.com/default/templates/web-agency-2/shot-8.webp',

  // Portfolio page detail mockup images
  project1: 'https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew1.webp',
  project2: 'https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew2.webp',
  project3: 'https://storage.googleapis.com/webild/default/templates/web-agency-2/projectnew3.webp',

  // Testimonial avatars
  avatar1: 'https://randomuser.me/api/portraits/men/32.jpg',
  avatar2: 'https://randomuser.me/api/portraits/women/44.jpg',
  avatar3: 'https://randomuser.me/api/portraits/men/67.jpg',
};

export const templateConfig = {
  // Global Branding configuration
  brand: {
    name: 'Evotilee.',
    logo: assets.logo,
    // Splitted branding text for the premium gradient & typography logo rendering
    textPart1: 'Evo',
    textPart2: 'tilee.',
    textPart3: '',
    tagline: 'Performance Marketing. Data-Driven Strategy. Measurable Growth.',
    industry: 'Performance Marketing Consultancy',
    supportEmail: 'hello@evotilee.com',
    averageResponseTime: '< 1 Hour',
  },

  // Navigation Links used in Header & Footer
  navigation: {
    links: [
      { label: 'Services', id: 'services' },
      { label: 'Case Studies', id: 'work' },
      { label: 'Our Edge', id: 'why-us' },
      { label: 'Philosophy', id: 'metrics' },
      { label: 'Book a Call', id: 'book' },
      { label: 'FAQ', id: 'faq' },
    ],
    getStartedText: 'Scale Your Brand',
    startProjectKicker: 'Start A Growth Project',
  },

  // Hero Section Copy & Assets
  hero: {
    kicker: 'Performance Marketing',
    titleLine1: 'Measurable Growth.',
    titleLine2: 'Data-Driven Strategy.',
    titleLine3: 'Sustainable ROI.',
    description: 'We build high-performance marketing systems, conversion-focused customer acquisition funnels, and precision campaigns designed to help brands acquire customers, improve efficiency, and scale sustainably.',
    primaryCtaText: 'Scale Your Brand',
    secondaryCtaText: 'View Case Studies',
    
    // Core positioning checklist shown at the bottom of hero copy
    benefits: [
      { label: 'DATA-DRIVEN STRATEGY', statusColor: 'bg-emerald-400' },
      { label: 'FULL-FUNNEL OPTIMIZATION', statusColor: 'bg-white' },
      { label: 'PERFORMANCE-FOCUSED EXECUTION', statusColor: 'bg-zinc-400' },
    ],

    // Dual-scrolling vertical preview lists
    column1Shots: [
      { id: 'shot-1', img: assets.shot1, title: 'Paid Acquisition Campaign', views: 'Meta & Google Ads', platform: 'Paid Media' },
      { id: 'shot-3', img: assets.shot3, title: 'SaaS Acquisition Funnel', views: 'Search & CRO', platform: 'Inbound Strategy' },
      { id: 'shot-5', img: assets.shot5, title: 'Organic Content Distribution', views: 'Short-Form Video', platform: 'Omnichannel' },
      { id: 'shot-7', img: assets.shot7, title: 'Conversion Funnel Optimization', views: 'Landing Page CRO', platform: 'Analytics' },
    ],
    column2Shots: [
      { id: 'shot-2', img: assets.shot2, title: 'B2B Lead Generation', views: 'Inbound & Outbound', platform: 'Qualified Pipeline' },
      { id: 'shot-4', img: assets.shot4, title: 'Content & Search Architecture', views: 'Organic Visibility', platform: 'SEO Engine' },
      { id: 'shot-6', img: assets.shot6, title: 'Landing Page Architecture', views: 'Mobile-First CRO', platform: 'Performance Web' },
      { id: 'shot-8', img: assets.shot8, title: 'Customer Lifecycle Automation', views: 'Email & Retention', platform: 'Retention Flows' },
    ],
  },

  // Services & Bento Features Layout Section
  services: {
    kicker: 'Our Capabilities',
    title: 'High-Performance Marketing',
    description: 'A completely integrated growth stack combined with data-driven analytics and conversion-focused execution.',
    
    // Bento Feature 1: Production Process Widget
    bentoProcess: {
      title: 'Our Process',
      badge: 'Systematic Execution',
      descriptionKicker: 'Structured Revenue Optimization',
      descriptionBody: 'From comprehensive market audits and consumer research to funnel architecture, rigorous testing, and structured optimization.',
      steps: [
        { title: 'Brand & Market Audit', time: 'Phase 1' },
        { title: 'Funnel & Creative Architecture', time: 'Phase 2' },
        { title: 'Tracking & Attribution Setup', time: 'Phase 3' },
        { title: 'Structured Launch & A/B Testing', time: 'Phase 4' },
        { title: 'Continuous Optimization & Scale', time: 'Phase 5' },
      ],
    },

    // Bento Feature 2: Waveform / Equalizer Section
    bentoAudio: {
      title: 'Analytics & Attribution Precision',
      descriptionBody: 'Server-side tracking, first-party data architecture, and clear attribution setups that reveal exactly where your marketing revenue is generated.',
    },

    // Bento Feature 3: Hook Design
    bentoTrend: {
      title: 'Conversion-Focused Ad Creatives',
      descriptionBody: 'Direct-response copywriting, high-engagement video assets, and performance hooks designed to perform naturally within modern social feeds and drive stronger click-through performance.',
      pills: ['Direct Response Copy', 'High-Impact Video'],
    },

    // Bottom grid-cards listing specific production offerings
    gridServices: [
      {
        id: 'seo',
        iconName: 'search',
        title: 'SEO & Organic Growth',
        description: 'Build stronger search visibility and capture high-intent organic traffic. We construct comprehensive keyword webs, perform on-page optimization, and design authoritative visibility structures built to grow your pipeline.',
        badge: 'Search Visibility',
        benefit: 'Targeted for high-intent search queries and organic discovery',
      },
      {
        id: 'website-development',
        iconName: 'code',
        title: 'Website Development & CRO',
        description: 'Fast, responsive digital experiences custom-built for conversion. From dedicated high-converting landing pages to fully integrated digital architectures, we build user interfaces optimized for speed and engagement.',
        badge: 'Performance Web',
        benefit: 'Built with Core Web Vitals and technical performance in mind',
      },
      {
        id: 'ad-creative-production',
        iconName: 'video',
        title: 'Ad Creative Production',
        description: 'Direct-response visual assets designed to capture interest and inspire action. We script, design, and produce video creatives and static banners designed to improve customer acquisition efficiency.',
        badge: 'Direct Response',
        benefit: 'Tailored for Meta, TikTok, YouTube, and Google Ads',
      },
      {
        id: 'content-distribution',
        iconName: 'share2',
        title: 'Content Distribution',
        description: 'Syndicate high-performing brand messaging across multiple channels with structured consistency. We orchestrate distribution loops that improve organic reach while preserving your brand voice.',
        badge: 'Distribution',
        benefit: 'Omnichannel publishing and content syndication',
      },
      {
        id: 'ugc-content-creation',
        iconName: 'sparkles',
        title: 'Creator & UGC Content',
        description: 'Access to a growing network of content creators. We help brands develop authentic, native-feeling creator content designed for modern social platforms.',
        badge: 'Creator Content',
        benefit: 'Authentic creator collaborations tailored to your audience',
      },
      {
        id: 'b2b-lead-generation',
        iconName: 'target',
        title: 'B2B Lead Generation',
        description: 'Build targeted acquisition systems that attract qualified prospects through paid media, search, landing pages, content, and conversion-focused funnels.',
        badge: 'Pipeline Growth',
        benefit: 'Targeted acquisition systems for sales-qualified leads',
      },
      {
        id: 'local-seo',
        iconName: 'mapPin',
        title: 'Local SEO',
        description: 'Build stronger local search visibility and compete more effectively in your target market. We optimize localized business profiles, construct geo-targeted citations, and build high-relevance proximity authority.',
        badge: 'Local Presence',
        benefit: 'Designed to improve Google Maps visibility and local search performance',
      },
      {
        id: 'ecommerce-seo',
        iconName: 'ecommerce-seo',
        iconNameAlt: 'shoppingCart',
        title: 'E-commerce SEO',
        description: 'Transform your product catalog into a sustainable organic revenue channel. We optimize collection structures, configure rich schema markup, and design programmatic landing pages to capture active shoppers.',
        badge: 'E-commerce',
        benefit: 'Tailored for Shopify, WooCommerce, and modern storefronts',
      },
      {
        id: 'link-building',
        iconName: 'link',
        title: 'Link Building & Digital PR',
        description: 'Build reliable domain authority with high-quality, editorial backlink profiles. We run targeted manual outreach campaigns to secure natural, contextual links from relevant digital publications.',
        badge: 'Authority',
        benefit: 'White-hat editorial publisher outreach and link acquisition',
      },
      {
        id: 'technical-seo',
        iconName: 'cpu',
        title: 'Technical SEO',
        description: 'Construct a resilient technical foundation for search engine crawlers. We resolve indexation issues, optimize site performance, structure XML sitemaps, and engineer semantic markup for crawl efficiency.',
        badge: 'Infrastructure',
        benefit: 'Built with Core Web Vitals and technical performance in mind',
      },
      {
        id: 'seo-content-marketing',
        iconName: 'fileText',
        title: 'Content Marketing & Strategy',
        description: 'Scale educational and commercial content hubs that guide organic readers toward conversion. We run semantic keyword gap analysis and deliver structured content that maps to buyer search intent.',
        badge: 'Editorial Strategy',
        benefit: 'Maps editorial content directly to user search intent',
      },
      {
        id: 'conversion-rate-optimization',
        iconName: 'zap',
        title: 'Conversion Rate Optimization',
        description: 'Turn qualified traffic into revenue through structured A/B split-testing, user journey audits, and high-converting landing page frameworks designed to improve conversion efficiency.',
        badge: 'CRO & Funnels',
        benefit: 'Optimizes conversion pathways and user journey efficiency',
      },
    ],
  },

  // Why Choose Us Section
  whyChooseUs: {
    kicker: 'Our Competitive Edge',
    title: 'Why Growing Brands Partner With Evotilee',
    description: 'We don\'t optimize for vanity metrics. We focus on CAC, conversion rate, revenue, and profitability.',
    features: [
      {
        icon: 'zap',
        title: 'Performance Creative Studio',
        description: 'We script and produce high-performance, engaging native creative assets designed specifically to perform naturally within modern social feeds and drive action.',
        badge: 'Creative'
      },
      {
        icon: 'refreshCw',
        title: 'Structured Testing Methodology',
        description: 'Our A/B testing framework helps identify stronger creative, messaging, audience, and funnel variations while reducing unnecessary testing waste.',
        badge: 'Methodology'
      },
      {
        icon: 'smartphone',
        title: 'Mobile-First Funnel Design',
        description: 'With the majority of traffic originating from mobile devices, every landing page, checkout layout, and email sequence is built for mobile speed and seamless user experience.',
        badge: 'Optimization'
      },
      {
        icon: 'sparkles',
        title: 'Attribution & Analytics Rigor',
        description: 'We eliminate guesswork through first-party tracking architecture and server-side tracking, connecting marketing expenditure with verifiable business metrics.',
        badge: 'Analytics'
      },
      {
        icon: 'userCheck',
        title: 'Direct Strategic Collaboration',
        description: 'Work directly with experienced growth specialists focused on acquisition, creative performance, conversion optimization, and sustainable growth.',
        badge: 'Collaboration'
      },
      {
        icon: 'trendingUp',
        title: 'Lifecycle & Retention Strategy',
        description: 'We look beyond the initial ad click, optimizing post-purchase onboarding, email workflows, and customer retention pathways for sustainable lifetime value.',
        badge: 'Lifecycle'
      }
    ],
  },

  // Portfolio & Carousel Case Studies
  portfolio: {
    kicker: 'Case Studies',
    title: 'Client Growth Campaigns',
    description: 'Explore real campaigns engineered by our marketing team that drove customer acquisition, conversion improvement, and measurable growth.',
    projects: [
      {
        id: 'ecommerce-scaling',
        title: 'Direct-to-Consumer Growth Campaign',
        category: 'Paid Acquisition & Creative Strategy',
        description: 'Structured a multi-channel paid acquisition strategy for a direct-to-consumer lifestyle brand. Deployed direct-response video creative variations, redesigned mobile landing page flows, and established segmented retargeting workflows.',
        image: assets.project1,
        accentColor: 'from-[#00d4ff]/30 to-[#0a0e27]',
        link: '#',
        tags: ['Paid Social', 'DTC E-commerce', 'Landing Page CRO', 'Attribution'],
        stats: 'Acquisition Scaling',
        views: 'Conversion Optimization',
        deliverables: 'Direct-Response Ad Creatives, Custom Mobile Landers, Lifecycle Email Flows',
        clientName: 'Consumer Lifestyle Brand',
        highlights: [
          'Challenge: High customer acquisition costs and low mobile conversion rates',
          'Strategy: Native creator-style creative testing paired with dedicated single-product landers',
          'Execution: Deployed 20+ creative variations, server-side Conversion API, and post-click funnels',
          'Verified Results: Substantial decrease in blended CAC and measurable lift in checkout conversion'
        ]
      },
      {
        id: 'saas-acquisition',
        title: 'B2B SaaS Acquisition System',
        category: 'Precision Funnels & SEO Architecture',
        description: 'Engineered an inbound customer acquisition pipeline for a cloud software platform. Created high-intent search campaigns, optimized interactive demo booking flows, and structured topical content clusters.',
        image: assets.project2,
        accentColor: 'from-purple-600/30 to-[#0a0e27]',
        link: '#',
        tags: ['Search PPC', 'B2B Lead Gen', 'CRO Landers', 'Technical SEO'],
        stats: 'Inbound Pipeline',
        views: 'Demo Bookings',
        deliverables: 'Search Ad Architecture, Demo Landing Pages, Inbound Email Nurture Sequence',
        clientName: 'B2B Software Platform',
        highlights: [
          'Challenge: Low intent search traffic and high drop-off on demo booking forms',
          'Strategy: High-intent keyword restructuring and frictionless interactive demo scheduler',
          'Execution: Optimized search campaigns, streamlined lead forms, and automated lead routing',
          'Verified Results: Increased demo completion rate and higher proportion of sales-qualified leads'
        ]
      },
      {
        id: 'lifecycle-revamp',
        title: 'Lifecycle & Retention Optimization',
        category: 'Lifecycle Marketing & Retention',
        description: 'Overhauled the automated retention and customer lifecycle backend for an e-commerce brand. Engineered segmented onboarding sequences, behavioral cart abandonment triggers, and win-back workflows.',
        image: assets.project3,
        accentColor: 'from-[#00d4ff]/30 to-purple-900/40',
        link: '#',
        tags: ['Email Automation', 'Customer Retention', 'SMS Flows', 'Cohort Analysis'],
        stats: 'Retention Flows',
        views: 'Customer LTV',
        deliverables: 'Automated Welcome Series, VIP Segment Flows, Abandoned Cart Recovery Sequences',
        clientName: 'E-commerce Brand',
        highlights: [
          'Challenge: Underperforming email revenue and reliance solely on top-of-funnel paid traffic',
          'Strategy: Behavioral customer segmentation and personalized lifecycle trigger sequences',
          'Execution: Implemented 8 multi-stage automation flows and dynamic post-purchase upsell paths',
          'Verified Results: Measurable increase in repeat purchase rates and recovered cart conversions'
        ]
      }
    ],
  },

  // Testimonials / Growth Philosophy Copy
  testimonials: {
    kicker: 'Credibility & Trust',
    title: 'Built Around Measurable Growth',
    description: 'We focus on building acquisition systems that can be measured, tested, improved, and scaled — without relying on vanity metrics or exaggerated promises.',
    principles: [
      {
        title: 'Transparent Attribution',
        description: 'Every marketing initiative is connected directly to verifiable analytics, conversion events, and first-party revenue data.'
      },
      {
        title: 'Systematic Testing',
        description: 'Continuous experimentation across creative angles, copy hooks, and landing page variations to identify sustainable growth levers.'
      },
      {
        title: 'Outcome-Driven Alignment',
        description: 'We structure our partnerships around net business outcomes, efficient customer acquisition costs, and long-term customer value.'
      }
    ]
  },

  // Core Metrics / Philosophy Section Data
  metrics: {
    kicker: 'Our Philosophy',
    title: 'Performance That Matters',
    description: 'Data-driven acquisition focused on revenue, CAC, conversion rate, and profitable growth.',
    items: [
      {
        number: 'Pillar 01',
        label: 'Data-Driven Strategy',
        items: [
          'First-party unit economics & CAC modeling',
          'Audience cohort & LTV analysis',
          'Conversion path mapping & friction reduction',
          'Continuous testing and optimization'
        ]
      },
      {
        number: 'Pillar 02',
        label: 'Full-Funnel Optimization',
        items: [
          'High-converting landing page frameworks',
          'Server-side tracking & attribution',
          'Post-click journey optimization',
          'Conversion rate optimization'
        ]
      },
      {
        number: 'Pillar 03',
        label: 'Paid Acquisition & SEO',
        items: [
          'Paid social & search acquisition',
          'Technical & intent-focused SEO',
          'Link acquisition & digital PR',
          'Organic distribution & content marketing'
        ]
      }
    ]
  },

  // Founder & Leadership Profile Section
  team: {
    kicker: 'Leadership & Vision',
    title: 'Meet Our Leadership',
    description: 'Experienced practitioners focused on building high-performance customer acquisition systems and data-driven growth pipelines.',
    members: [
      {
        name: 'Menn Maesro',
        title: 'FOUNDER & CEO',
        avatar: 'https://i.postimg.cc/kGRHn2ZJ/menn.webp',
        bio: 'Focused on paid acquisition strategy, performance creative direction, conversion funnel architecture, and analytics attribution for growing brands.',
        stats: [
          { label: 'Growth Strategy', type: 'global' },
          { label: 'Paid Acquisition & CRO', type: 'global' },
        ],
      },
      {
        name: 'M.Basil',
        title: 'CO-FOUNDER & COO',
        avatar: 'https://i.postimg.cc/G2hhFT2f/image.png',
        bio: 'Specializing in technical infrastructure, search engine optimization, content distribution systems, and scalable operations.',
        stats: [
          { label: 'Technical SEO & Dev', type: 'global' },
          { label: 'Operations & Inbound', type: 'global' },
        ],
      },
    ],
  },

  // FAQ Accordion Stack Content
  faq: {
    kicker: 'Got Questions?',
    title: 'Frequently Asked Questions',
    description: 'Everything you need to know about our onboarding, campaign management, pricing alignment, and execution workflow.',
    items: [
      {
        question: 'How do you structure agency pricing and engagements?',
        answer: 'We believe in clear alignment, utilizing transparent flat-fee retainers structured around scope of deliverables, combined with performance milestones tied to measurable outcomes.'
      },
      {
        question: 'What is your typical onboarding timeline?',
        answer: 'Our standard onboarding and launch phase takes 10 to 14 business days. This includes a full analytics audit, tracking setup, landing page development, creative scripting, and campaign architecture.'
      },
      {
        question: 'Do you handle the production of ad creatives?',
        answer: 'Yes. Evotilee handles end-to-end creative production. We script, produce, and edit direct-response video assets and static formats designed for modern social feeds.'
      },
      {
        question: 'How do you approach tracking and attribution accuracy?',
        answer: 'We construct customized tracking foundations leveraging server-side Google Tag Manager and direct Conversion API integrations, offering reliable, event-accurate customer attribution.'
      },
      {
        question: 'What types of businesses do you typically partner with?',
        answer: 'We collaborate with growing direct-to-consumer brands, B2B companies, and technology businesses that have validated product-market fit and are looking to scale customer acquisition efficiently.'
      },
      {
        question: 'How is campaign performance reported and reviewed?',
        answer: 'You receive access to real-time reporting dashboards aggregating your analytics and advertising data, alongside regular strategy check-ins with your dedicated growth team.'
      }
    ],
  },

  // Lead Conversion & Call To Action Section
  cta: {
    kicker: 'Start Scaling Today',
    title: 'Ready to Build a High-Performance Acquisition System?',
    description: 'Connect with our strategy team for a free, comprehensive growth audit of your current funnels, ad accounts, and acquisition strategy.',
    inputPlaceholder: 'Enter your business email',
    buttonText: 'Request Growth Audit',
    successMessage: 'Thank you! Our growth strategy team will review your details and reach out within 1 business day.',
    benefits: [
      { label: 'Comprehensive 30-Min Audit', type: 'speed' },
      { label: 'Transparent Alignment Model', type: 'revisions' },
      { label: 'Prompt Strategic Response', type: 'response' },
    ],
  },

  // Footer Setup
  footer: {
    description: 'Performance Marketing. Data-Driven Strategy. Sustainable ROI. Performance marketing consultancy for growing consumer brands, B2B companies, and modern digital platforms.',
    kicker: 'Performance Marketing Consultancy',
    copyrightText: '© 2026 Evotilee. All rights reserved.',
    navHeader: 'Navigation',
    offeringsHeader: 'Capabilities',
    offerings: [
      { label: 'SEO & Organic Growth', url: '#services' },
      { label: 'Website Development & CRO', url: '#services' },
      { label: 'Ad Creative Production', url: '#services' },
      { label: 'Creator & UGC Content', url: '#services' },
      { label: 'B2B Lead Generation', url: '#services' },
    ],
    socialsHeader: 'Connect',
    socials: [
      { label: 'LinkedIn', url: 'https://linkedin.com' },
      { label: 'X / Twitter', url: 'https://x.com' },
      { label: 'YouTube', url: 'https://youtube.com' },
      { label: 'Instagram', url: 'https://instagram.com' },
      { label: 'TikTok', url: 'https://tiktok.com' },
    ],
    policyLinks: [
      { label: 'Privacy Policy', url: '/privacy' },
      { label: 'Terms of Service', url: '#terms' },
    ],
  },

  // Inquiries Popup Form Fields Configuration
  inquiryModal: {
    kicker: 'Start Your Growth Campaign',
    title: 'Request a Free Growth Audit',
    description: 'Tell us about your brand, current metrics, and monthly growth targets.',
    calComPrompt: 'Want to book an instant strategy call right now?',
    calComButtonText: 'Open Calendar →',
    fields: {
      nameLabel: 'Company / Brand Name',
      namePlaceholder: 'e.g. Aura Lifestyle / TechSphere AI',
      emailLabel: 'Business Email Address',
      emailPlaceholder: 'growth@yourbrand.com',
      channelLabel: 'Website / Store URL',
      channelPlaceholder: 'yourbrand.com',
      budgetLabel: 'Current Monthly Marketing Budget',
      budgetOptions: [
        'Under $5,000 / mo',
        '$5,000 - $15,000 / mo',
        '$15,000 - $50,000 / mo',
        'Over $50,000 / mo',
      ],
      serviceLabel: 'Primary Focus Area',
      serviceOptions: [
        'Paid Customer Acquisition',
        'Conversion Rate Optimization',
        'Email & Lifecycle Marketing',
        'SEO & Content Marketing',
        'Full-Funnel Growth Strategy',
      ],
      goalsLabel: 'Current Growth Objectives',
      goalsPlaceholder: 'Tell us about your target CAC, growth goals, or current acquisition bottlenecks...',
    },
    submitButtonText: 'Request Free Growth Audit',
    successTitle: 'Audit Request Received!',
    successBodyTemplate: (name: string) => `Thank you for reaching out, ${name || 'Partner'}! Our strategy team is reviewing your information and will be in touch shortly to schedule your growth audit.`,
  }
};

