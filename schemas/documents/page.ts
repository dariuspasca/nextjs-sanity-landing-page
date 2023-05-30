import { MenuSquare } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "page",
  type: "document",
  title: "Pages",
  icon: MenuSquare,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "Page title",
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "The unique page name to display into the search bar(es: https://acme.com/my_page_slug)",
      options: {
        source: "title",
        maxLength: 200, // will be ignored if slugify is set
        slugify: (input: string) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      type: "array",
      of: [{ type: "block" }],
      description: "The page content",
      title: "Content",
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "SEO Title",
          description: "A descriptive page title",
          validation: (Rule) => Rule.required().min(1).max(80),
        },
        {
          name: "metaDescription",
          type: "string",
          title: "SEO Description",
          description: "A description of the page content",
          validation: (Rule) => Rule.required().min(1).max(120),
        },
        {
          name: "keywords",
          type: "string",
          title: "SEO Keywords",
          description: 'A list of keywords separated by ";"',
          validation: (Rule) => Rule.required().min(1).max(50),
        },
        {
          name: "preventIndexing",
          type: "boolean",
          title: "Prevent Indexing",
          description: "Tell to search engines to not index this page",
          initialValue: false,
        },
        defineField({
          name: "ogImage",
          title: "Open Graph Image",
          type: "image",
          description: "Displayed on social cards and search engine results.",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt",
              description: "A description of the image content",
            },
          ],
        }),
      ],
    }),
  ],
})
