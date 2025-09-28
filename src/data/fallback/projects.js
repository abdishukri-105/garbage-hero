// Simple local fallback data for projects/portfolio
// Use local images under /public/projects or /public/images

export const FALLBACK_PROJECTS = [
  {
    _id: 'demo-umma',
    companyName: 'Umma University',
    category: 'Education',
    timePeriod: '2023 – Present',
    shortDescription: 'Campus modernization and sustainable facilities management initiative.',
    images: [
      { asset: { _id: 'loc-umma-1', url: '/projects/mandera-1.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
      { asset: { _id: 'loc-umma-2', url: '/projects/mandera-2.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
      { asset: { _id: 'loc-umma-3', url: '/projects/mandera-3.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
    ],
  },
  {
    _id: 'demo-parliament',
    companyName: 'Parliament of Kenya',
    category: 'Government',
    timePeriod: '2024',
    shortDescription: 'Comprehensive janitorial services and high-traffic hygiene program.',
    images: [
      { asset: { _id: 'loc-parl-1', url: '/images/parliament.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
      { asset: { _id: 'loc-parl-2', url: '/projects/mandera-4.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
      { asset: { _id: 'loc-parl-3', url: '/projects/mandera-2.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
    ],
  },
  {
    _id: 'demo-cleaning',
    companyName: 'Eldoret Office Complex',
    category: 'Cleaning & Janitorial',
    timePeriod: '2024',
    shortDescription: 'Deep-clean and monthly maintenance for multi-storey offices.',
    images: [
      { asset: { _id: 'loc-clean-1', url: '/projects/cleaning-1.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
      { asset: { _id: 'loc-clean-2', url: '/images/slide2.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
      { asset: { _id: 'loc-clean-3', url: '/images/slide4.jpg', metadata: { dimensions: { width: 1600, height: 1067 } } } },
    ],
  },
];

export default FALLBACK_PROJECTS;
