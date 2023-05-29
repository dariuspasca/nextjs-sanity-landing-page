import { defineField, defineType } from "sanity";
import { List } from "lucide-react";

export default defineType({
  name: "nav",
  type: "document",
  title: "Navigation",
  icon: List,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titolo",
      description: "Titolo da mostrare nel menu",
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      name: "has_external_link",
      type: "boolean",
      title: "Link esterno",
      description: "La voce porta ad un link esterno?",
      initialValue: false,
    }),
    defineField({
      name: "link",
      type: "string",
      title: "Link",
      hidden: ({ document }) => !document?.has_external_link,
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "Il nome univoco che verrà visualizzato nella barra di ricerca(es: https://bitrock.com/il_mio_slug",
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
    }),
    defineField({
      title: "Pagina",
      name: "main_page",
      type: "reference",
      to: [{ type: "page" }],
      options: {
        disableNew: true,
      },
      hidden: ({ document }) => !!document?.has_external_link,
    }),
    defineField({
      name: "has_secondary_pages",
      type: "boolean",
      title: "Sottopagine",
      description: "Ha delle sottopagine?",
      initialValue: false,
      hidden: ({ document }) => !!document?.has_external_link,
    }),
    defineField({
      title: "Sotto pagine",
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
    }),
  ],
});
