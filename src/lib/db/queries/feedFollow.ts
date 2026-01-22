import { eq } from "drizzle-orm";
import { db } from "..";
import { feed_follows, FeedFollow, feeds, users } from "../schema";
import { firstOrUndefined } from "./utils";
import { warn } from "console";

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db
    .insert(feed_follows)
    .values({
      user_id: userId,
      feed_id: feedId,
    })
    .returning();

  const [result] = await db
    .select({
      id: feed_follows.id,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feed_follows)
    .innerJoin(users, eq(users.id, feed_follows.user_id))
    .innerJoin(feeds, eq(feeds.id, feed_follows.feed_id))
    .where(eq(feed_follows.id, newFeedFollow.id));

  return result;
}

export async function getAllfeeds() {
  const result = await db
    .select()
    .from(feed_follows)
    .innerJoin(users, eq(users.id, feed_follows.user_id))
    .innerJoin(feeds, eq(feeds.id, feed_follows.feed_id));

  return result;
}

export async function getFeedsFollowByUser(userId: string) {
  const result = await db
    .select()
    .from(feed_follows)
    .innerJoin(users, eq(users.id, feed_follows.user_id))
    .innerJoin(feeds, eq(feeds.id, feed_follows.feed_id))
    .where(eq(feed_follows.user_id, userId));
  return result;
}
