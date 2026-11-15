import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Read .env if present for VITE_API_URL
function getApiUrl(): string {
  if (process.env.VITE_API_URL) {
    return process.env.VITE_API_URL.replace(/\/+$/, "");
  }

  const envFiles = [".env.local", ".env.production", ".env"];
  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        const match = content.match(/^VITE_API_URL\s*=\s*["']?([^"'\r\n]+)["']?/m);
        if (match && match[1]) {
          return match[1].trim().replace(/\/+$/, "");
        }
      } catch {
        // Ignore read errors
      }
    }
  }

  return "https://admin.nadrical.my.id/api";
}

async function downloadFile(url: string, destPath: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`[sync-assets] Failed to fetch ${url} (HTTP ${res.status})`);
      return false;
    }
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(destPath, buffer);
    console.log(`[sync-assets] Saved -> ${path.relative(rootDir, destPath)} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[sync-assets] Error downloading ${url}:`, message);
    return false;
  }
}

async function syncAssets() {
  const apiBase = getApiUrl();
  const settingsEndpoint = `${apiBase}/settings`;
  console.log(`[sync-assets] Fetching branding settings from ${settingsEndpoint}...`);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(settingsEndpoint, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[sync-assets] Settings endpoint returned HTTP ${res.status}. Keeping existing assets.`);
      return;
    }

    const json = (await res.json()) as { success?: boolean; data?: Record<string, string> };
    if (!json.success || !json.data) {
      console.warn("[sync-assets] Invalid response format from settings API. Keeping existing assets.");
      return;
    }

    const data = json.data;

    // 1. Favicon Sync
    const faviconUrl = data.wedding_favicon || data.app_favicon || data.secondary_logo;
    if (faviconUrl && faviconUrl.startsWith("http")) {
      console.log(`[sync-assets] Syncing favicon from ${faviconUrl}`);
      const icoSaved = await downloadFile(faviconUrl, path.join(publicDir, "favicon.ico"));
      if (icoSaved && faviconUrl.endsWith(".png")) {
        fs.copyFileSync(path.join(publicDir, "favicon.ico"), path.join(publicDir, "favicon-32x32.png"));
        fs.copyFileSync(path.join(publicDir, "favicon.ico"), path.join(publicDir, "apple-touch-icon.png"));
      }
    } else {
      console.log("[sync-assets] No remote wedding_favicon found in settings.");
    }

    // 2. Logo Sync
    const logoUrl = data.wedding_logo || data.app_logo;
    if (logoUrl && logoUrl.startsWith("http")) {
      console.log(`[sync-assets] Syncing logo from ${logoUrl}`);
      const logoSaved = await downloadFile(logoUrl, path.join(publicDir, "logo.png"));
      if (logoSaved) {
        const imagesDir = path.join(publicDir, "images");
        if (!fs.existsSync(imagesDir)) {
          fs.mkdirSync(imagesDir, { recursive: true });
        }
        fs.copyFileSync(path.join(publicDir, "logo.png"), path.join(imagesDir, "logo.png"));
        fs.copyFileSync(path.join(publicDir, "logo.png"), path.join(imagesDir, "wedding-logo.png"));
        console.log("[sync-assets] Synced logo to public/images/logo.png & public/images/wedding-logo.png");
      }
    } else {
      console.log("[sync-assets] No remote wedding_logo found in settings.");
    }

    console.log("[sync-assets] Asset synchronization completed successfully.");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`[sync-assets] Notice: Could not sync assets from API (${message}). Existing assets preserved.`);
  }
}

syncAssets().catch((err) => {
  console.warn("[sync-assets] Unexpected error:", err);
  process.exit(0);
});

