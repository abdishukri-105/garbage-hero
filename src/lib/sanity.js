// src/lib/sanity.js
// Central sanity data helpers without any ISR/webhook logic.

import imageUrlBuilder from '@sanity/image-url';
import { getSanityClient, assertSanityEnv } from '../../sanity.config';

assertSanityEnv();

const client = getSanityClient();
const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source).auto('format').fit('max');
}

// GROQ queries covering all existing schemas
export const TESTIMONIALS_QUERY = `*[_type == "testimonial"]|order(_createdAt desc){
  _id, clientName, clientTitle, company, statement, companyLogo
}`;
export const CLIENT_LOGOS_QUERY = `*[_type == "clientLogo"]|order(_createdAt desc){
  _id, companyName, url, logoImage
}`;
export const PORTFOLIO_QUERY = `*[_type == "portfolio"]|order(_createdAt desc){
  _id, companyName, images[]{asset->{_id,url,metadata}}, category, timePeriod, shortDescription
}`;
export const TEAM_QUERY = `*[_type == "teamMember"]|order(name asc){ _id, name, title, image }`;
export const PORTFOLIO_TEASERS_QUERY = `*[_type == "portfolioTeaser"]|order(_createdAt desc){
  _id, image, category, companyName, shortDescription
}`;

// Fetch helpers (published content only)
export function fetchTestimonials() { return client.fetch(TESTIMONIALS_QUERY); }
export function fetchClientLogos() { return client.fetch(CLIENT_LOGOS_QUERY); }
export function fetchPortfolio() { return client.fetch(PORTFOLIO_QUERY); }
export function fetchTeam() { return client.fetch(TEAM_QUERY); }
export function fetchPortfolioTeasers() { return client.fetch(PORTFOLIO_TEASERS_QUERY); }
