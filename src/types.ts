export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  accentColor: string;
  link: string;
  tags: string[];
  views?: string;
  stats?: string;
  deliverables?: string | string[];
  clientName?: string;
  highlights?: string[];
  isPublished?: boolean;
  orderIndex?: number;
}

export interface CmsReview {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
  highlightMetric?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CmsCampaign {
  id: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  image: string;
  client: string;
  primaryMetric?: string;
  secondaryMetric?: string;
  deliverables?: string[];
  tags?: string[];
  link?: string;
  accentColor?: string;
  isPublished: boolean;
  orderIndex: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface MetricItem {
  number: string;
  label: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  metrics: string[];
  iconName: string;
  gradient: string;
}

export interface TemplateConfig {
  brand: {
    name: string;
    textPart1: string;
    textPart2: string;
    textPart3: string;
    logo: string;
  };
  calComLink: string;
  navigation: {
    getStartedText: string;
    startProjectKicker: string;
    links: NavLink[];
  };
  hero: {
    badge: {
      status: string;
      text: string;
    };
    titleParts: {
      part1: string;
      part2: string;
      part3: string;
    };
    subtitle: string;
    cta: {
      primary: string;
      secondary: string;
      guarantee: string;
      guaranteeSubtext: string;
    };
    floatingCards: {
      left: {
        title: string;
        value: string;
        subtext: string;
      };
      right: {
        title: string;
        value: string;
        subtext: string;
      };
    };
    marqueeShots: {
      title: string;
      img: string;
    }[];
  };
  services: {
    kicker: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  workCarousel: {
    kicker: string;
    title: string;
    description: string;
    projects: ProjectItem[];
  };
  whyChooseUs: {
    kicker: string;
    title: string;
    description: string;
    pillars: {
      title: string;
      subtitle: string;
      iconName: string;
      stats: string;
      statsSubtext: string;
    }[];
  };
  testimonialsAndMetrics: {
    kicker: string;
    title: string;
    subtitle: string;
    metrics: MetricItem[];
    quote: {
      text: string;
      author: string;
      role: string;
      avatar: string;
      stats: string;
    };
    tickerPartners: string[];
  };
  team: {
    kicker: string;
    title: string;
    description: string;
    members: TeamMember[];
  };
  faq: {
    kicker: string;
    title: string;
    description: string;
    items: FaqItem[];
  };
  inquiryModal: {
    kicker: string;
    title: string;
    description: string;
    calComPrompt: string;
    calComButtonText: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      channelLabel: string;
      channelPlaceholder: string;
      budgetLabel: string;
      budgetOptions: string[];
      serviceLabel: string;
      serviceOptions: string[];
      goalsLabel: string;
      goalsPlaceholder: string;
    };
    submitButtonText: string;
    successTitle: string;
    successBodyTemplate: (name: string) => string;
  };
  cta: {
    kicker: string;
    title: string;
    description: string;
    inputPlaceholder: string;
    buttonText: string;
    successMessage: string;
    benefits: {
      type: string;
      label: string;
    }[];
  };
  footer: {
    kicker: string;
    description: string;
    copyrightText: string;
    socials: SocialLink[];
  };
}
