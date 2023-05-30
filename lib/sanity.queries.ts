import { groq } from "next-sanity"
import { z } from "zod"

export const homePageQuery = groq`
  *[_type == "home"][0]{
    title,
    description
  }
`

export const HomePageQueryResponse = z.object({
  title: z.string(),
  description: z.string(),
})

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    menuItems[]->{
      _id,
      title,
      has_external_link,
      external_link,
      has_secondary_pages,
      main_page->{_id,title,"slug": slug.current},
      secondary_pages[]->{_id,title,"slug": slug.current}
    },
  }
`

const Slug = z.string().min(1)

const SettingsNavPage = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  slug: Slug,
})

export const SettingsMenuItem = z.object({
  _id: z.string().min(1),
  title: z.string().min(1),
  has_external_link: z.boolean(),
  external_link: z.string().nullish(),
  main_page: SettingsNavPage.nullish(),
  has_secondary_pages: z.boolean(),
  secondary_pages: SettingsNavPage.array().nullish(),
})

export const SettingsQueryResponse = z.object({
  menuItems: SettingsMenuItem.array(),
})

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    content,
  }
`

const baseTypedObjectZ = z
  .object({
    _type: z.string(),
    _key: z.string(),
  })
  .passthrough()

export const portableContentBlockZ = z.array(baseTypedObjectZ)

export const PagesBySlugQueryResponse = z
  .object({
    _id: z.string().min(1),
    title: z.string().min(1),
    slug: Slug,
    content: portableContentBlockZ.nullish(),
  })
  .nullish()

export const pagesSeoBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...seo
  }
`

export const PagesSeoBySlugQueryResponse = z
  .object({
    preventIndexing: z.boolean(),
    metaTitle: z.string().min(1),
    metaDescription: z.string().min(1),
    keywords: z.string(),
  })
  .nullish()

export const footerQuery = groq`
  *[_type == "settings"][0]{
    'content': footer
  }
`

export const FooterQueryResponse = z
  .object({
    content: portableContentBlockZ.nullish(),
  })
  .nullish()

export const mainPagesSlugsQuery = groq`
   *[_type == "navigation" && has_secondary_pages == false && has_external_link == false]{
      main_page->{'slug':slug.current,  _updatedAt}
  }
`

const pageSlugZ = z.object({
  slug: Slug,
  _updatedAt: z.string(),
})

export const MainPagesSlugsQueryResponse = z
  .object({
    main_page: pageSlugZ,
  })
  .array()

export const secondaryPagesSlugsQuery = groq`
  *[_type == "navigation" && has_secondary_pages == true && has_external_link == false]{
      main_page->{'slug':slug.current,  _updatedAt},
      secondary_pages[]->{'slug':slug.current,  _updatedAt}
  }
`

export const SecondaryPagesSlugsQueryResponse = z
  .object({
    main_page: pageSlugZ,
    secondary_pages: pageSlugZ.array(),
  })
  .array()
