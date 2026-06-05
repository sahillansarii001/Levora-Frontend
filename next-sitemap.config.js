/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://levoraacademy.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/login', '/dashboard', '/admin'] },
    ],
  },
  exclude: ['/login', '/dashboard', '/admin'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
}
