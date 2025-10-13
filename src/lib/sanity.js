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
// Updated to use services with coalesce fallback and better image handling
export const PORTFOLIO_QUERY = `*[_type == "portfolio"] | order(order asc, _createdAt desc){
  _id,
  companyName,
  images[]{
    asset->{
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  "services": coalesce(services, select(defined(category) => [category], [])),
  category,
  shortDescription,
  description,
  fullDescription,
  content,
  details,
  order,
  location,
  completionDate
}`;
export const TEAM_QUERY = `*[_type == "teamMember"]|order(name asc){ _id, name, title, image }`;
// Updated teasers to include services; removed timePeriod from nested ref
export const PORTFOLIO_TEASERS_QUERY = `*[_type == "portfolioTeaser"] | order(order asc){
  _id,
  companyName,
  "services": coalesce(services, select(defined(category)=>[category], [])),
  shortDescription,
  order,
  image,
  customTeaser,
  portfolioRef->{_id, companyName, images[]{asset->{url}}, services, shortDescription}
}`;

// Export the raw client for advanced usage
export { client };

// Fetch helpers (published content only)
export function fetchTestimonials() { return client.fetch(TESTIMONIALS_QUERY); }
export function fetchClientLogos() { return client.fetch(CLIENT_LOGOS_QUERY); }
export function fetchPortfolio() { return client.fetch(PORTFOLIO_QUERY); }
export function fetchTeam() { return client.fetch(TEAM_QUERY); }
export function fetchPortfolioTeasers() { return client.fetch(PORTFOLIO_TEASERS_QUERY); }

// New helpers per schema changes
export async function getPortfolio() {
  const query = `*[_type == "portfolio"] | order(order asc){
    _id,
    companyName,
    images[]{asset->{url}},
    "services": coalesce(services, select(defined(category)=>[category], [])),
    shortDescription,
    order
  }`;
  return client.fetch(query);
}

export async function getPortfolioByService(service) {
  const query = `*[_type == "portfolio" && $service in coalesce(services, select(defined(category)=>[category], []))] | order(order asc){
    _id,
    companyName,
    images[]{asset->{url}},
    services,
    shortDescription,
    order
  }`;
  return client.fetch(query, { service });
}

export async function getPortfolioTeasers() {
  const query = `*[_type == "portfolioTeaser"] | order(order asc){
    _id,
    companyName,
    "services": coalesce(services, select(defined(category)=>[category], [])),
    shortDescription,
    order,
    "image": image.asset->url,
    customTeaser,
    portfolioRef->{_id, companyName, images[]{asset->{url}}, services, shortDescription}
  }`;
  return client.fetch(query);
}
