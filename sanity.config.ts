import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { pageStructure, singletonPlugin } from "~/plugins/settings";
import { deskTool } from "sanity/desk";
import { apiVersion, dataset, projectId } from "~/lib/sanity.api";
import home from "~/schemas/singletons/home";
import settings from "~/schemas/singletons/settings";
import page from "~/schemas/documents/page";
import navigation from "~/schemas/objects/navigation";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  "Next.js Personal Website with Sanity.io";

export default defineConfig({
  name: "default",

  basePath: "/studio",
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    types: [
      // Singletons
      home,
      settings,
      // Documents
      page,
      // Objects
      navigation,
    ],
  },
  plugins: [
    deskTool({
      structure: pageStructure([home, settings]),
    }),
    singletonPlugin([home.name]),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
