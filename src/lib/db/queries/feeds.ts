import { eq } from "drizzle-orm";
import { db } from "..";
import { Feed, feeds } from "../schema";

export async function createFeed(
  feedName: string,
  url: string,
  userId: string,
) {
  const [result] = await db
    .insert(feeds)
    .values({
      name: feedName,
      url: url,
      user_id: userId,
    })
    .returning();

  return result;
}

export async function getAllFeeds() {
  const result = await db.select().from(feeds);
  return result;
}

export async function getFeedByURL(url: string): Promise<Feed | undefined> {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}

export async function getFeedByName(name: string): Promise<Feed | undefined> {
  const [result] = await db.select().from(feeds).where(eq(feeds.name, name));
  return result;
}

export async function deleteAllFeeds() {
  await db.delete(feeds);
}
