import { List } from "lucide-react"
import { defineType } from "sanity"

export default defineType({
  name: "navigation",
  type: "document",
  title: "Navigation",
  icon: List,
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "The text to display in the navigation menu",
      validation: (Rule) => Rule.required().min(1).max(50),
    },
    {
      name: "has_external_link",
      type: "boolean",
      title: "External link",
      description: "The navigation takes you to an external page?",
      initialValue: false,
    },
    {
      name: "external_link",
      type: "string",
      title: "Link",
      hidden: ({ document }) => !document?.has_external_link,
    },
    {
      title: "Page",
      name: "main_page",
      type: "reference",
      to: [{ type: "page" }],
      options: {
        disableNew: true,
      },
      hidden: ({ document }) => !!document?.has_external_link,
    },
    {
      name: "has_secondary_pages",
      type: "boolean",
      title: "Sottopagine",
      description: "Has secondary pages?",
      initialValue: false,
      hidden: ({ document }) => !!document?.has_external_link,
    },
    {
      title: "Secondary pages",
      name: "secondary_pages",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "page",
            },
          ],
          options: {
            disableNew: true,
          },
        },
      ],
      hidden: ({ document }) =>
        !!document?.has_external_link || !document?.has_secondary_pages,
    },
  ],
})
