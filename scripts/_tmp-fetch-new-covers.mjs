// TEMPORARY one-off: fetch ONLY the 4 new blog cover images and merge
// attribution into the existing manifest. Delete after running.
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("Missing UNSPLASH_ACCESS_KEY");
  process.exit(1);
}

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const blogImagesDir = join(projectRoot, "public", "blog");
const manifestPath = join(blogImagesDir, "unsplash-manifest.json");

const QUERIES = [
  { name: "whatsapp-alternatives-cover", query: "person choosing smartphone apps privacy" },
  { name: "messaging-comparison-cover", query: "three smartphones messaging apps" },
  { name: "free-video-calls-cover", query: "family video call smartphone smiling" },
  { name: "lock-hide-chats-cover", query: "privacy padlock smartphone security hand" },
];

let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, "utf8"));
} catch {
  manifest = {};
}

for (const item of QUERIES) {
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      item.query
    )}&orientation=landscape&per_page=1&client_id=${ACCESS_KEY}`;
    const res = await fetch(searchUrl);
    if (!res.ok) {
      console.error(`Search failed for ${item.name}: ${res.status} ${res.statusText}`);
      continue;
    }
    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      console.warn(`No results for ${item.name}`);
      continue;
    }
    const photo = data.results[0];
    const imageUrl = `${photo.urls.raw}&w=1200&auto=format&fit=crop&q=80`;
    const imgRes = await fetch(imageUrl);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    await writeFile(join(blogImagesDir, `${item.name}.jpg`), buffer);

    if (photo.links?.download_location) {
      try {
        await fetch(`${photo.links.download_location}&client_id=${ACCESS_KEY}`);
      } catch {
        /* non-blocking */
      }
    }

    manifest[item.name] = {
      localPath: `/blog/${item.name}.jpg`,
      alt: photo.alt_description || photo.description || item.query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    };
    console.log(`OK ${item.name}.jpg  (${buffer.length} bytes)  by ${photo.user.name}  alt="${manifest[item.name].alt}"`);
  } catch (err) {
    console.error(`Error ${item.name}:`, err.message);
  }
}

await writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
console.log("Manifest updated.");
