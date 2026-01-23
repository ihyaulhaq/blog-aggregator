import { createFeed, getAllFeeds } from "src/lib/db/queries/feeds";
import { getUserById } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";
import { handleGetUserFeedFollows } from "./feedFollow";
import { createFeedFollow } from "src/lib/db/queries/feedFollow";

export async function handleAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <name> <url>`);
  }
  const feedName = args[0];
  const url = args[1];
  const res = await createFeed(feedName, url, user.id);

  if (!res) {
    throw new Error("failed to create feed");
  }

  printFeed(res, user);
  await createFeedFollow(user.id, res.id);
  await handleGetUserFeedFollows(cmdName, user);
}

export async function handleGetAllFeeds(_: string) {
  const feeds = await getAllFeeds();

  if (feeds.length === 0) {
    console.log(`No feeds found.`);
    return;
  }

  console.log(`Found %d feeds:\n`, feeds.length);
  for (let feed of feeds) {
    const user = await getUserById(feed.user_id);
    if (!user) {
      throw new Error(`Failed to find user for feed ${feed.id}`);
    }

    printFeed(feed, user);
    console.log(`=====================================`);
  }
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}
