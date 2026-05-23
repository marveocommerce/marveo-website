import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { NEXTJS_ARTICLES } from "@/app/docs/nextjs/articles";
import { WORDPRESS_ARTICLES } from "@/app/docs/wordpress/articles";
import { GETTING_STARTED_ARTICLES } from "@/app/docs/getting-started/articles";
import { TROUBLESHOOTING_ARTICLES } from "@/app/docs/troubleshooting/articles";
import { SECTORS } from "@/constants";

const STATIC_ROUTES = [
  "",
  "/about",
  "/blog",
  "/careers",
  "/changelog",
  "/contact",
  "/deployments",
  "/docs",
  "/docs/getting-started",
  "/docs/nextjs",
  "/docs/wordpress",
  "/docs/troubleshooting",
  "/login",
  "/pricing",
  "/privacy",
  "/product",
  "/status",
  "/templates",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const sectorEntries = SECTORS.map((sector) => ({
    url: `${siteConfig.url}/solutions/${sector.id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const docEntries = [
    ...NEXTJS_ARTICLES.map((article) => `/docs/nextjs/${article.slug}`),
    ...WORDPRESS_ARTICLES.map((article) => `/docs/wordpress/${article.slug}`),
    ...GETTING_STARTED_ARTICLES.map((article) => `/docs/getting-started/${article.slug}`),
    ...TROUBLESHOOTING_ARTICLES.map((article) => `/docs/troubleshooting/${article.slug}`),
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...sectorEntries, ...docEntries];
}
