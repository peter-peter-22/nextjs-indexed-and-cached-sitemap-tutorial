import { baseUrl } from "@/app/constants"

export default function sitemap() {
  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2024-12-25"),
      priority: 1 //the static pages should have the highest priority
    },
  ]
}

//this will be included in the sitemap index
export const generalSitemapIndex = {
  url: `${baseUrl}/sitemaps/general/sitemap`,
  lastModified: new Date("2024-12-25")
}