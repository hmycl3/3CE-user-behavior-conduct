import { timingSafeEqual } from "node:crypto";
import { del, get, list } from "@vercel/blob";

function sameSecret(received, expected) {
  const left = Buffer.from(String(received || ""));
  const right = Buffer.from(String(expected || ""));
  return left.length === right.length && timingSafeEqual(left, right);
}

export default async function handler(request, response) {
  response.setHeader("cache-control", "no-store");
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed" });
  if (!process.env.ADMIN_PASSWORD || !sameSecret(request.headers["x-admin-password"], process.env.ADMIN_PASSWORD)) {
    return response.status(401).json({ error: "管理员密码不正确" });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return response.status(503).json({ error: "数据存储尚未连接" });

  // V6 uses a new prefix. On the first admin visit after deployment, remove only
  // legacy responses; all V6 and future responses remain untouched.
  const legacyBlobs = [];
  let cursor;
  do {
    const page = await list({ prefix: "responses/", limit: 1000, cursor });
    legacyBlobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);
  if (legacyBlobs.length) await del(legacyBlobs.map((blob) => blob.url));

  const blobs = [];
  cursor = undefined;
  do {
    const page = await list({ prefix: "responses-v6/", limit: 1000, cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const records = await Promise.all(blobs.map(async (blob) => {
    try {
      const result = await get(blob.url, { access: "private" });
      if (!result || result.statusCode !== 200 || !result.stream) return null;
      return JSON.parse(await new Response(result.stream).text());
    } catch { return null; }
  }));
  const responses = records.filter(Boolean).sort((a, b) => b.submittedAt - a.submittedAt);
  return response.status(200).json({ responses });
}
