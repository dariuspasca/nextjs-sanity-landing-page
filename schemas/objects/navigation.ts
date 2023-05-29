import { defineType } from "sanity";

export default defineType({
  name: "navigation",
  type: "document",
  title: "Navigation",
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
      validation: (Rule) =>
        Rule.custom((field, context) =>
          !context.document?.has_external_link && field === undefined
            ? "This field must not be empty."
            : true
        ),
      hidden: ({ document }) => !!document?.has_external_link,
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
});
