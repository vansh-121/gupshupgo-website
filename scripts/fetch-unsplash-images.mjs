import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "N7CpcZQN3lI-aNyASrYRhIfqySNudL73FqJ7WsiyDgY";
const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const blogImagesDir = join(projectRoot, "public", "blog");

await mkdir(blogImagesDir, { recursive: true });

const QUERIES = [
  {
    name: "offline-mesh-cover",
    query: "hiker mountain smartphone",
    orientation: "landscape",
  },
  {
    name: "concert-crowd-phones",
    query: "concert crowd smartphones night",
    orientation: "landscape",
  },
  {
    name: "signal-privacy-cover",
    query: "cyber security code terminal",
    orientation: "landscape",
  },
  {
    name: "locked-smartphone-security",
    query: "holding smartphone locked screen",
    orientation: "landscape",
  },
  {
    name: "chat-streaks-cover",
    query: "friends laughing smartphone outdoors",
    orientation: "landscape",
  },
  {
    name: "friends-messaging-cafe",
    query: "young people texting phone cafe",
    orientation: "landscape",
  },
  {
    name: "anonymous-chat-cover",
    query: "urban night neon street city",
    orientation: "landscape",
  },
  {
    name: "quiet-cafe-texting",
    query: "person texting smartphone coffee shop",
    orientation: "landscape",
  },
  {
    name: "video-calling-cover",
    query: "person video call smartphone outdoors",
    orientation: "landscape",
  },
  {
    name: "mobile-call-desk",
    query: "smartphone video call desk",
    orientation: "landscape",
  },
];

console.log("Searching and downloading curated Unsplash images...");

const results = {};

for (const item of QUERIES) {
  try {
    const searchUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      item.query
    )}&orientation=${item.orientation}&per_page=1&client_id=${ACCESS_KEY}`;

    const res = await fetch(searchUrl);
    if (!res.ok) {
      console.error(`Failed search for ${item.name}: ${res.status} ${res.statusText}`);
      continue;
    }

    const data = await res.json();
    if (!data.results || data.results.length === 0) {
      console.warn(`No results found for ${item.name}`);
      continue;
    }

    const photo = data.results[0];
    const imageUrl = `${photo.urls.raw}&w=1200&auto=format&fit=crop&q=80`;

    // Download image
    const imgRes = await fetch(imageUrl);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const filePath = join(blogImagesDir, `${item.name}.jpg`);
    await writeFile(filePath, buffer);

    // Unsplash API guideline: Trigger download tracking endpoint
    if (photo.links?.download_location) {
      try {
        await fetch(`${photo.links.download_location}&client_id=${ACCESS_KEY}`);
      } catch {
        // Non-blocking
      }
    }

    results[item.name] = {
      localPath: `/blog/${item.name}.jpg`,
      alt: photo.alt_description || photo.description || item.query,
      photographer: photo.user.name,
      photographerUrl: photo.user.links.html,
    };

    console.log(`✓ Downloaded ${item.name}.jpg (${photo.user.name})`);
  } catch (err) {
    console.error(`Error processing ${item.name}:`, err.message);
  }
}

await writeFile(
  join(blogImagesDir, "unsplash-manifest.json"),
  JSON.stringify(results, null, 2),
  "utf8"
);

console.log("\nFinished downloading Unsplash images! Manifest saved.");
