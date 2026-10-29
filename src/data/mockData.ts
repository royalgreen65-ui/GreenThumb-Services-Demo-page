import { ServiceItem, ReviewItem, NeighborhoodItem } from '../types';

export const BUSINESS_INFO = {
  name: 'GreenThumb Services',
  phone: '(555) 382-5296',
  phoneClean: '+15553825296',
  email: 'quotes@greenthumbservices.com',
  address: '1420 Meadowview Lane, Springfield, IL 62704',
  hours: 'Mon – Sat: 7:00 AM – 6:00 PM (Emergency storm response available)',
  license: 'IL-LAND-84920',
  insurance: '$2,000,000 Commercial General Liability',
  foundedYear: '2012',
  servedCount: '1,450+',
  satisfactionRate: '99.4%',
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'mowing',
    title: 'Precision Lawn Mowing & Edging',
    tagline: 'Reliable weekly or bi-weekly maintenance for lush, carpet-grade turf with razor-sharp borders.',
    image: '/src/assets/images/service_lawn_mowing_1793115064077.jpg',
    startingPrice: '$45',
    billingType: 'per visit',
    bestFor: 'Homeowners & HOAs seeking consistent curb appeal',
    features: [
      'Commercial grade precision blade mowing at optimal seasonal turf height',
      'Crisp mechanical string-trimming along fences, foundations, and trees',
      'Razor-sharp hard-surface vertical edging on sidewalks, curbs, and drives',
      'High-velocity air blow-off of all hardscapes and patios before departure',
      'Rotated striping patterns to prevent wheel ruts and compaction',
    ],
  },
  {
    id: 'landscaping',
    title: 'Landscape Design & Installation',
    tagline: 'Transform outdoor spaces with natural stone, native perennial beds, and modern hardscaping.',
    image: '/src/assets/images/service_landscape_design_1793115064205.jpg',
    startingPrice: '$850',
    billingType: 'custom project',
    bestFor: 'Major curb appeal upgrades and backyard living spaces',
    features: [
      'Custom 2D/3D landscape bed planning tailored to soil type and sunlight',
      'Flagstone & paver patios, walkways, and freestanding stone retaining walls',
      'Triple-shredded hardwood mulch, decorative river rock, and weed barriers',
      'Hand-selected climate-hardy shrubs, ornamental grasses, and blooming perennials',
      'Integrated low-voltage LED pathway and architectural uplighting',
    ],
  },
  {
    id: 'seasonal',
    title: 'Seasonal Cleanups, Aeration & Overseeding',
    tagline: 'Essential Spring rejuvenation and Fall leaf removal with soil aeration for resilient root growth.',
    image: '/src/assets/images/service_seasonal_cleanup_1793115064274.jpg',
    startingPrice: '$180',
    billingType: 'per cleanup',
    bestFor: 'Spring recovery and Fall preparation before winter frost',
    features: [
      'High-capacity vacuum leaf collection, haul-away, and organic composting',
      'Heavy-duty core aeration to relieve soil compaction and stimulate roots',
      'Premium drought-resistant Kentucky Bluegrass & Fescue overseeding',
      'Perennial cutbacks, ornamental grass pruning, and stick/debris clearing',
      'Pre-emergent weed barrier application and seasonal slow-release fertilizer',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial Grounds Maintenance',
    tagline: 'Scheduled early-morning exterior maintenance for corporate offices, retail centers, and HOAs.',
    image: '/src/assets/images/hero_lawn_landscaping_1793115062728.jpg',
    startingPrice: '$320',
    billingType: 'monthly contract',
    bestFor: 'Property managers, retail centers, medical clinics, and HOAs',
    features: [
      'Dedicated route timing scheduled before customer business hours',
      'Full trash/litter sweep of parking lots, curbs, and exterior shrub beds',
      'Comprehensive turf nutrition, broadleaf weed management, and pesticide care',
      'Monthly property manager photographic reports and single itemized billing',
      'Direct contact line to dedicated route foreman with priority turnaround',
    ],
  },
];

export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sarah & David Miller',
    neighborhood: 'Oakridge Estates',
    serviceReceived: 'Weekly Mowing & Mulch Refresh',
    rating: 5,
    date: '2 weeks ago',
    quote: 'GreenThumb has been mowing our 0.6-acre lot for two full seasons. Their crew arrives like clockwork every Tuesday morning, shuts the gate behind them so our dogs are safe, and the edges look like they were cut with a ruler. Never had a missed visit.',
    outcome: 'Reliable weekly service for 2+ consecutive seasons',
  },
  {
    id: 'rev-2',
    author: 'Marcus Vance',
    neighborhood: 'Greenfield Manor',
    serviceReceived: 'Paver Patio & Shrub Renovation',
    rating: 5,
    date: '1 month ago',
    quote: 'We wanted to replace a sunken builder-grade concrete pad with a real outdoor living space. GreenThumb gave us an itemized estimate within 24 hours, finished our flagstone fire pit patio in 4 days, and left our yard spotless.',
    outcome: 'Completed full hardscape and planting on time & on budget',
  },
  {
    id: 'rev-3',
    author: 'Elena Rostova',
    neighborhood: 'West End Commons',
    serviceReceived: 'Core Aeration, Overseeding & Cleanup',
    rating: 5,
    date: 'Last month',
    quote: 'Our lawn was thin and full of crabgrass after summer heat. Their core aeration and premium seed blend completely transformed it into thick, deep green turf in under 5 weeks. Honest pricing without high-pressure upsells.',
    outcome: 'Visible 90% lawn density recovery in 35 days',
  },
  {
    id: 'rev-4',
    author: 'Robert Sterling',
    neighborhood: 'Highland Park Commercial Center',
    serviceReceived: 'Commercial Grounds Contract',
    rating: 5,
    date: '3 months ago',
    quote: 'As a commercial property manager with 8 retail tenants, reliability is non-negotiable. GreenThumb handles mowing, shrub trimming, and leaf cleanup before 8:00 AM so our customer parking lot is never obstructed.',
    outcome: 'Zero tenant complaints across 18 months of maintenance',
  },
];

export const NEIGHBORHOODS: NeighborhoodItem[] = [
  { name: 'Oakridge Estates', zip: '62704', routeDays: 'Tuesday & Friday', status: 'active' },
  { name: 'Greenfield Manor', zip: '62702', routeDays: 'Monday & Thursday', status: 'active' },
  { name: 'West End Commons', zip: '62704', routeDays: 'Tuesday & Friday', status: 'active' },
  { name: 'Lakewood Reserve', zip: '62711', routeDays: 'Wednesday & Saturday', status: 'active' },
  { name: 'Highland Park', zip: '62701', routeDays: 'Monday & Thursday', status: 'active' },
  { name: 'Chatham Crossing', zip: '62629', routeDays: 'Wednesday', status: 'active' },
  { name: 'Rochester Hills', zip: '62563', routeDays: 'Friday', status: 'active' },
  { name: 'Sherman North', zip: '62684', routeDays: 'Tuesday', status: 'active' },
];

export const FAQS = [
  {
    q: 'Do I need to be home when your crew arrives for estimates or mowing?',
    a: 'No. As long as our crew has access to your front and back yard (unlocked gates and pets secured indoors), you do not need to take time off work. We send an automated text notification when we are en route and another when service is complete.',
  },
  {
    q: 'Are GreenThumb Services licensed and fully insured?',
    a: 'Yes, 100%. We carry a $2,000,000 Commercial General Liability policy and full Workers’ Compensation for every technician on our team. Certificates of insurance are available upon request for residential and commercial property files.',
  },
  {
    q: 'Am I required to sign a long-term seasonal contract for mowing?',
    a: 'Never for standard residential services. Our regular mowing services operate on a flexible, pay-per-visit or monthly billing model that you can pause, adjust, or cancel at any time with 48 hours notice. We earn your business on every cut.',
  },
  {
    q: 'What is included in your standard weekly lawn mowing service?',
    a: 'Every standard visit includes commercial turf mowing at the optimal seasonal cutting height, meticulous line-trimming around all posts, fence lines, and bed perimeters, razor-sharp sidewalk/driveway edging, and high-velocity blower cleanup of all hard surfaces.',
  },
  {
    q: 'What happens if it rains on my scheduled service day?',
    a: 'Mowing waterlogged turf causes rutting and soil compaction. If heavy rain hits on your scheduled service day, your route shifts directly to the next dry morning, and we notify you via SMS so you always know when to expect us.',
  },
];
