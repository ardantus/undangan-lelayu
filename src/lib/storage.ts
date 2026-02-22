import type { UndanganData } from "./types";

const SEAWEEDFS_BASE =
  process.env.SEAWEEDFS_FILER_URL ?? "http://localhost:8888/undangan/";

export async function saveUndangan(data: UndanganData): Promise<void> {
  const json = JSON.stringify(data);
  if (process.env.NODE_ENV === "development") {
    const url = `${SEAWEEDFS_BASE}${data.id}.json`;
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: json,
    });
    if (!res.ok) {
      throw new Error(`SeaweedFS PUT failed: ${res.status} ${res.statusText}`);
    }
  } else {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      throw new Error("BLOB_READ_WRITE_TOKEN environment variable is not set");
    }
    const { put } = await import("@vercel/blob");
    await put(`undangan/${data.id}.json`, json, {
      access: "public",
      contentType: "application/json",
    });
  }
}

export async function getUndangan(id: string): Promise<UndanganData | null> {
  if (process.env.NODE_ENV === "development") {
    const url = `${SEAWEEDFS_BASE}${id}.json`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json() as Promise<UndanganData>;
  } else {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `undangan/${id}.json` });
    if (blobs.length === 0) return null;
    const res = await fetch(blobs[0].url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json() as Promise<UndanganData>;
  }
}
