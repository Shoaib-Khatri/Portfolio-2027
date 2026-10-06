export interface CaseStudyImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  badge?: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  projectUrl?: string;
  timeline: string;
  company: string;
  quickTags: string[];
  nextProject?: {
    slug: string;
    title: string;
    description: string;
  };
  heroImage: {
    src: string;
    alt: string;
    caption?: string;
  };
  overview: {
    kicker: string;
    heading: string;
    paragraphs: string[];
    stats?: { label: string; value: string }[];
  };
  images: CaseStudyImage[];
}

export const PROJECTS_DATA: Record<string, ProjectCaseStudy> = {
  'sync-space': {
    slug: 'sync-space',
    title: 'SYNC SPACE',
    projectUrl: 'https://vigaet.com',
    timeline: "Jan - Mar '25",
    company: 'VigaET',
    quickTags: ['Desktop App', 'Film Production', 'File Management'],
    nextProject: {
      slug: 'nothing-challenge',
      title: 'NOTHING CHALLENGE',
      description: 'Community design challenge submission for Nothing Phone 3a',
    },
    heroImage: {
      src: '/assets/sync-space/hero.jpg',
      alt: 'Sync Space Desktop App on MacBook Pro',
      caption: 'Sync Space desktop application running on macOS with dark mode studio UI.',
    },
    overview: {
      kicker: 'OVERVIEW',
      heading: 'Streamlined file management and version control for film production',
      paragraphs: [
        'Modern film production involves hundreds of terabytes of high-bitrate RAW camera footage, complex multi-layer VFX render passes, Houdini simulation caches, and audio master stems scattered across on-set DIT rigs, editorial suites, and remote visual effects facilities.',
        'Traditional cloud storage tools fail under the sheer weight of multi-gigabyte EXR sequences, while Git-based version control tools alienate non-technical artists. Sync Space bridges this gap by creating an intuitive, high-performance file management system designed specifically for the nuanced cadence of post-production film pipelines.',
        'With automated file locking, visual render diffing, intelligent local proxy generation, and frame-accurate review tools, Sync Space ensures editors, directors, and VFX supervisors always work on verified assets without overwriting critical render passes.',
      ],
      stats: [
        { label: 'Ingest Speed', value: '4.2 GB/s' },
        { label: 'Pipeline Sync', value: 'Zero Overwrite' },
        { label: 'File Integrity', value: '100% MD5 Verified' },
      ],
    },
    images: [
      {
        id: 'img-1',
        src: '/assets/sync-space/feature-1.jpg',
        alt: 'Shot and Asset Tree Hierarchy Navigation',
        title: '01. Multi-Track Project Hierarchy & Shot Tree',
        description: 'Deep nested tree view that mirrors film episodic production structures: Pre-production, Scene takes, Maya animations, Houdini pyro caches, and LUT color matrices with instant search filtering.',
        badge: 'Asset Pipeline',
      },
      {
        id: 'img-2',
        src: '/assets/sync-space/feature-2.jpg',
        alt: 'Contextual Actions and Metadata Inspector',
        title: '02. Contextual Quick Actions & Deep File Inspector',
        description: 'One-click right-click menus for file locking, master promotion, revision comparison, and proxy generation, paired with real-time ACEScg color space and Arri camera metadata telemetry.',
        badge: 'File Workflows',
      },
      {
        id: 'img-3',
        src: '/assets/sync-space/feature-3.jpg',
        alt: 'Visual Split-Screen Version Comparison',
        title: '03. Visual Render Diffing & Version Comparator',
        description: 'Interactive split-screen slider enabling directors and VFX leads to compare consecutive render passes (v04 vs v05) frame-by-frame, verifying lighting adjustments and compositing fixes.',
        badge: 'Visual Diff',
      },
      {
        id: 'img-4',
        src: '/assets/sync-space/feature-4.jpg',
        alt: 'Real-time Concurrency and Collaborative File Locking',
        title: '04. Real-time Concurrency & Collaborative Locking',
        description: 'Eliminating duplicate work through live user presence tracking. Color-coded locks signal active editing sessions, while an activity feed broadcasts asset check-ins across the team.',
        badge: 'Team Sync',
      },
      {
        id: 'img-5',
        src: '/assets/sync-space/feature-5.jpg',
        alt: 'High-Throughput Batch Ingestion with Checksum Verification',
        title: '05. High-Throughput Batch Ingestion & Sync Telemetry',
        description: 'Engineered for extreme data throughput. Offload 12+ TB of multi-camera RAW media at 4.2 GB/s with background MD5 checksum verification and SSD thermal health monitoring.',
        badge: 'Ingest Engine',
      },
      {
        id: 'img-6',
        src: '/assets/sync-space/feature-6.jpg',
        alt: 'Video Player with Frame-Accurate Scrubbing and Annotations',
        title: '06. Frame-Accurate Player & Visual Annotation Suite',
        description: 'Embedded ProRes / OpenEXR player featuring frame scrubbing, audio waveform inspection, multi-pass channel switching (Beauty, Normal, Z-Depth), and direct canvas markup pins.',
        badge: 'Review & Dailies',
      },
      {
        id: 'img-7',
        src: '/assets/sync-space/feature-7.jpg',
        alt: 'Mobile Companion App for Quick Shot Approvals',
        title: '07. Mobile Companion App for On-Set Approvals',
        description: 'Designed as part of the Nothing Challenge submission. Lets directors and producers review dailies, scrub audio takes, and issue instant shot approvals directly from their mobile device.',
        badge: 'Companion Mobile',
      },
    ],
  },
  'ibricks': {
    slug: 'ibricks',
    title: 'IBRICKS OS',
    projectUrl: 'https://ibricks.io',
    timeline: '2024 - Present',
    company: 'iBricks Technologies',
    quickTags: ['B2B SaaS', 'Design System', 'FinTech'],
    nextProject: {
      slug: 'sync-space',
      title: 'SYNC SPACE',
      description: 'Streamlined file management and version control for film production',
    },
    heroImage: {
      src: '/hero-image.webp',
      alt: 'iBricks Contractor Operating System',
      caption: 'iBricks contractor operating system spanning procurement and billing.',
    },
    overview: {
      kicker: 'OVERVIEW',
      heading: 'Re-architecting an end-to-end contractor operating system',
      paragraphs: [
        'iBricks unified fragmented contractor workflows across field bidding, material procurement, approvals, and subcontractor billing into one scalable web and mobile operating system.',
      ],
    },
    images: [
      {
        id: 'ibricks-1',
        src: '/hero-image.webp',
        alt: 'iBricks Platform Dashboard',
        title: '01. Unified Executive Dashboard',
        description: 'Real-time project financials, inventory alerts, and subcontractor milestones.',
      },
      {
        id: 'ibricks-2',
        src: '/hero-image-02.webp',
        alt: 'Tender Intelligence System',
        title: '02. AI-Driven Tender Intelligence',
        description: 'Automated BOQ parsing and historical cost forecasting for government bids.',
      },
      {
        id: 'ibricks-3',
        src: '/hero-image-03.webp',
        alt: 'Field Attendance Geofence',
        title: '03. Geofenced Site Check-in',
        description: 'Mobile workforce verification with offline biometric validation.',
      },
      {
        id: 'ibricks-4',
        src: '/hero-image-04.webp',
        alt: 'Procurement Workflow',
        title: '04. Automated Purchase Orders',
        description: 'Multi-stage approval hierarchies with automatic vendor price comparison.',
      },
      {
        id: 'ibricks-5',
        src: '/hero-image-06.webp',
        alt: 'Contractor Mobile Experience',
        title: '05. Mobile Contractor App',
        description: 'Streamlined pocket operations for site engineers and project managers.',
      },
      {
        id: 'ibricks-6',
        src: '/hero-image-07.webp',
        alt: 'Design System Architecture',
        title: '06. Enterprise Design System',
        description: 'Over 120 accessible components built for high-density enterprise data.',
      },
      {
        id: 'ibricks-7',
        src: '/assets/sync-space/hero.jpg',
        alt: 'Cross-Platform Ecosystem',
        title: '07. Integrated Desktop Tools',
        description: 'Local sync bridge for CAD files and engineering blueprints.',
      },
    ],
  },
  'nothing-challenge': {
    slug: 'nothing-challenge',
    title: 'NOTHING CHALLENGE',
    projectUrl: 'https://nothing.tech',
    timeline: 'Feb 2025',
    company: 'Nothing Community',
    quickTags: ['Mobile Design', 'Hardware Synergy', 'Glyph UX'],
    nextProject: {
      slug: 'sync-space',
      title: 'SYNC SPACE',
      description: 'Streamlined file management and version control for film production',
    },
    heroImage: {
      src: '/assets/sync-space/feature-7.jpg',
      alt: 'Nothing Phone 3a Companion Concept',
      caption: 'Community design challenge submission for Nothing Phone 3a.',
    },
    overview: {
      kicker: 'OVERVIEW',
      heading: 'Hardware-software synergy for transparent mobile productivity',
      paragraphs: [
        'An experimental mobile concept exploring how the transparent Nothing Phone glyph interface can provide ambient telemetry for film production, rendering queues, and critical approvals.',
      ],
    },
    images: [
      {
        id: 'nothing-1',
        src: '/assets/sync-space/feature-7.jpg',
        alt: 'Nothing Phone 3a Concept',
        title: '01. Ambient Glyph Notifications',
        description: 'Glow patterns that indicate rendering completion without turning on the screen.',
      },
      {
        id: 'nothing-2',
        src: '/assets/sync-space/feature-6.jpg',
        alt: 'Dailies Review UI',
        title: '02. Mobile Dailies Review',
        description: 'Quick scrubbing and timecode markers for directors on the move.',
      },
      {
        id: 'nothing-3',
        src: '/assets/sync-space/feature-4.jpg',
        alt: 'Collaborator Presence',
        title: '03. Team Status Feed',
        description: 'Live alerts when shots are checked in or locked by department leads.',
      },
      {
        id: 'nothing-4',
        src: '/assets/sync-space/feature-3.jpg',
        alt: 'Version Approvals',
        title: '04. Instant Shot Sign-Off',
        description: 'Fast two-tap sign-off mechanism with voice note recording.',
      },
      {
        id: 'nothing-5',
        src: '/assets/sync-space/feature-5.jpg',
        alt: 'Ingest Monitoring',
        title: '05. Remote Ingest Telemetry',
        description: 'Track studio transfer speeds and card offloads while off-set.',
      },
      {
        id: 'nothing-6',
        src: '/assets/sync-space/feature-2.jpg',
        alt: 'Asset Details',
        title: '06. Color Space & Camera Specs',
        description: 'Pocket inspector for sensor logs, LUTs, and lens configurations.',
      },
      {
        id: 'nothing-7',
        src: '/assets/sync-space/feature-1.jpg',
        alt: 'Project Tree',
        title: '07. Cloud Asset Catalog',
        description: 'Browse the entire studio catalog with low-latency proxy streaming.',
      },
    ],
  },
};
