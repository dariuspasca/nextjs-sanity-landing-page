import { Cog } from "lucide-react"
import { defineArrayMember, defineField, defineType } from "sanity"

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: Cog,
  fields: [
    defineField({
      name: "menuItems",
      title: "Menu Item list",
      description: "Links displayed on the header of your site.",
      type: "array",
      of: [
        {
          title: "Reference",
          type: "reference",
          to: [
            {
              type: "navigation",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      description:
        "This is a block of text that will be displayed at the bottom of the page.",
      title: "Footer Info",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          marks: {
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "Url",
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
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
  preview: {
    prepare() {
      return {
        title: "Menu Items",
      }
    },
  },
})
