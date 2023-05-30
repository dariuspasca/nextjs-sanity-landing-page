import { type MetadataRoute } from "next"

import { getMainPagesSlugs, getSecondaryPagesSlugs } from "~/lib/sanity.client"

const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "http://localhost:3000"

export default async function sitemap(): Promise<
  Promise<Promise<MetadataRoute.Sitemap>>
> {
  const routesMap = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const mainPagesPromise = getMainPagesSlugs().then((pages) =>
    (pages || []).map((page) => ({
      url: `${baseUrl}/${page.main_page.slug}`,
      lastModified: page.main_page._updatedAt,
    }))
  )

  const secondaryPagesPromise = getSecondaryPagesSlugs().then((pages) =>
    (pages || []).reduce<{ url: string; lastModified: string }[]>(
      (result, page) => {
        const secondaryPageSlugs = page.secondary_pages || []
        const secondaryPages = secondaryPageSlugs.map((sec_page) => ({
          url: `${baseUrl}/${page.main_page.slug}/${sec_page.slug}`,
          lastModified: sec_page._updatedAt,
        }))
        return result.concat(secondaryPages)
      },
      []
    )
  )

  const fetchedRoutes = (
    await Promise.all([mainPagesPromise, secondaryPagesPromise])
  ).flat()

  return [...routesMap, ...fetchedRoutes]
}
