export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/student', '/faculty', '/parent', '/login'],
    },
    sitemap: 'https://levoraacademy.vercel.app/sitemap.xml',
  }
}
