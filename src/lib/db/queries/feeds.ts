import { eq } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

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
  const result = await db
    .select()
    .from(feeds)
    .leftJoin(users, eq(users.id, feeds.user_id));
  return result;
}

export async function deleteAllFeeds() {
  await db.delete(feeds);
}
