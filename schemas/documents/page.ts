import { defineType, defineField } from "sanity";
import { MenuSquare } from "lucide-react";

export default defineType({
  name: "page",
  type: "document",
  title: "Pages",
  icon: MenuSquare,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Titolo",
      description: "Titolo pagina",
      validation: (Rule) => Rule.required().min(1).max(50),
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "Il nome univoco della pagina verrà visualizzato nella barra di ricerca(es: https://bitrock.com/il_mio_slug",
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
      description: "Il contenuto della pagina",
      title: "Contenuto",
    }),
    defineField({
      name: "documents",
      type: "array",
      title: "Documenti Allegati",
      of: [{ type: "file" }],
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "object",

      fields: [
        {
          name: "metaTitle",
          type: "string",
          title: "Meta Title",
          description: "Il titolo della pagina in versione descrittiva",
          validation: (Rule) => Rule.required().min(1).max(80),
        },
        {
          name: "metaDescription",
          type: "string",
          title: "Meta Description",
          description: "Una descrizione della pagina",
          validation: (Rule) => Rule.required().min(1).max(120),
        },
        {
          name: "keywords",
          type: "string",
          title: "Keywords",
          description:
            'Una serie di parole chiave divise dal simbolo ";" (punto e virgola',
          validation: (Rule) => Rule.required().min(1).max(50),
        },
        {
          name: "preventIndexing",
          type: "boolean",
          title: "Prevent Indexing",
          description:
            "Indica ai motori di ricerca di non indicizzare questa pagina",
          initialValue: false,
        },
        {
          name: "sharedImage",
          type: "image",
          title: "Shared Image",
          description:
            "Un immagine personalizzata da utilizzare quando viene condivisa la pagina",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt",
              description: "Descrizione contenuto immagine",
            },
          ],
        },
      ],
    }),
  ],
});
