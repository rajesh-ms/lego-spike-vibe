import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lego-vibe.vercel.app'; // Replace with your actual domain
  
  const staticPages = [
    '',
    '/units',
    '/playground',
    '/progress',
    '/about',
    '/help',
  ];

  const unitPages = [
    '/units/overview',
    '/units/software-and-hub',
    '/units/python-basics',
    '/units/movement',
    '/units/sensors-and-outputs',
    '/units/advanced-programming',
  ];

  const lessonPages = [
    // Overview unit lessons
    '/units/overview/lessons/what-is-spike-prime',
    '/units/overview/lessons/programming-basics',
    '/units/overview/lessons/getting-started',
    
    // Software and Hub unit lessons
    '/units/software-and-hub/lessons/spike-app-introduction',
    '/units/software-and-hub/lessons/connecting-hub',
    '/units/software-and-hub/lessons/first-program',
    
    // Python Basics unit lessons
    '/units/python-basics/lessons/python-introduction',
    '/units/python-basics/lessons/variables-and-data',
    '/units/python-basics/lessons/functions-and-loops',
    
    // Movement unit lessons
    '/units/movement/lessons/motor-basics',
    '/units/movement/lessons/precise-movement',
    '/units/movement/lessons/complex-movements',
    
    // Sensors and Outputs unit lessons
    '/units/sensors-and-outputs/lessons/sensor-basics',
    '/units/sensors-and-outputs/lessons/lights-and-sounds',
    '/units/sensors-and-outputs/lessons/sensor-projects',
    
    // Advanced Programming unit lessons
    '/units/advanced-programming/lessons/algorithms',
    '/units/advanced-programming/lessons/final-projects',
    '/units/advanced-programming/lessons/next-steps',
  ];

  const allPages = [...staticPages, ...unitPages, ...lessonPages];

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page === '' ? 1 : page.includes('/lessons/') ? 0.7 : 0.8,
  }));
}
