import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "./sanity.api"
import {
  footerQuery,
  FooterQueryResponse,
  homePageQuery,
  HomePageQueryResponse,
  mainPagesSlugsQuery,
  MainPagesSlugsQueryResponse,
  pagesBySlugQuery,
  PagesBySlugQueryResponse,
  pagesSeoBySlugQuery,
  PagesSeoBySlugQueryResponse,
  secondaryPagesSlugsQuery,
  SecondaryPagesSlugsQueryResponse,
  settingsQuery,
  SettingsQueryResponse,
} from "./sanity.queries"

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
export const sanityClient = (token?: string) => {
  return projectId
    ? createClient({ projectId, dataset, apiVersion, useCdn, token: token })
    : null
}

export async function getHomePage(token?: string) {
  return await sanityClient(token)
    ?.fetch(homePageQuery)
    .then((result) => HomePageQueryResponse.parse(result))
}

export async function getFooter(token?: string) {
  return await sanityClient(token)
    ?.fetch(footerQuery)
    .then((result) => FooterQueryResponse.parse(result))
}

export async function getSettingsPage(token?: string) {
  return await sanityClient(token)
    ?.fetch(settingsQuery)
    .then((result) => SettingsQueryResponse.parse(result))
}

export async function getPageBySlug(slug: string, token?: string) {
  return await sanityClient(token)
    ?.fetch(pagesBySlugQuery, { slug })
    .then((result) => PagesBySlugQueryResponse.parse(result))
}

export async function getPageSeoBySlug(slug: string, token?: string) {
  return await sanityClient(token)
    ?.fetch(pagesSeoBySlugQuery, { slug })
    .then((result) => PagesSeoBySlugQueryResponse.parse(result))
}

export async function getMainPagesSlugs(token?: string) {
  return await sanityClient(token)
    ?.fetch(mainPagesSlugsQuery)
    .then((result) => MainPagesSlugsQueryResponse.parse(result))
}

export async function getSecondaryPagesSlugs(token?: string) {
  return await sanityClient(token)
    ?.fetch(secondaryPagesSlugsQuery)
    .then((result) => SecondaryPagesSlugsQueryResponse.parse(result))
}
