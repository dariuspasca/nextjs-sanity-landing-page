import { projectId, dataset, apiVersion, useCdn } from "./sanity.api";
import { createClient } from "next-sanity";
import {
  homePageQuery,
  settingsQuery,
  pagesBySlugQuery,
  pagesSeoBySlugQuery,
  HomePageQueryResponse,
  SettingsQueryResponse,
  PagesBySlugQueryResponse,
  PagesSeoBySlugQueryResponse,
} from "./sanity.queries";

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token: token })
    : null;
};

export async function getHomePage(token?: string) {
  return await sanityClient(token)
    ?.fetch(homePageQuery)
    .then((result) => HomePageQueryResponse.parse(result));
}

export async function getSettingsPage(token?: string) {
  return await sanityClient(token)
    ?.fetch(settingsQuery)
    .then((result) => SettingsQueryResponse.parse(result));
}

export async function getPageBySlug(slug: string, token?: string) {
  return await sanityClient(token)
    ?.fetch(pagesBySlugQuery, { slug })
    .then((result) => PagesBySlugQueryResponse.parse(result));
}

export async function getPageSeoBySlug(slug: string, token?: string) {
  return await sanityClient(token)
    ?.fetch(pagesSeoBySlugQuery, { slug })
    .then((result) => PagesSeoBySlugQueryResponse.parse(result));
}
