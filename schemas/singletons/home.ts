import { Home } from "lucide-react"
import { defineField, defineType } from "sanity"

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  icon: Home,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
  ],
})
