import { MetadataRoute } from 'next';
 
export default function robots(): MetadataRoute.Robots {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  const baseUrl = (envUrl && !envUrl.includes("digitalghuru.in") && !envUrl.includes("www.digitalghuru.com"))
    ? envUrl
    : 'https://digitalghuru.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/student/'], // Prevent crawling of admin, student dashboard, and private API routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
