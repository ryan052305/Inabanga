import fs from "fs";
import path from "path";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com";

const getStaticPages = (): string[] => {
  const pagesDirectory = path.join(process.cwd(), "src/app"); // make sure path is correct
  const files = fs.readdirSync(pagesDirectory);
  const routes: string[] = [];

  const filterList = ["api", "components", "layouts", "(auth)", "(admin)"]; // folders to ignore

  files.forEach((file) => {
    if (filterList.includes(file)) return; // skip filtered folders
    if (file.startsWith("_") || file.includes(".")) return; // skip non-routes

    // route path: index page becomes '/', others become '/route'
    const route = file === "page.tsx" || file === "page.jsx" ? "/" : `/${file}`;
    routes.push(route);
  });

  return routes;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getStaticPages();

  return pages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "/" ? 1.0 : 0.7,
  }));
}
