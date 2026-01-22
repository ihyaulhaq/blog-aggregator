import { readConfig } from "src/config";
import {
  createFeedFollow,
  getFeedsFollowByUser,
} from "src/lib/db/queries/feedFollow";
import { getFeedByURL } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";

export async function handleCreateFeedFollow(
  cmdName: string,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <url>`);
  }
  const userLogin = readConfig().currentUserName;
  const user = await getUser(userLogin);
  const url = args[0];

  if (!user) {
    throw new Error(`user Not found`);
  }

  const feed = await getFeedByURL(url);

  if (!feed) {
    throw new Error(`feed not found`);
  }

  const newFeedFollow = await createFeedFollow(user.id, feed.id);

  console.log(
    `${newFeedFollow.userName} is now following ${newFeedFollow.feedName}`,
  );
}

export async function handleGetUserFeedFollows() {
  const config = readConfig();
  const user = await getUser(config.currentUserName);

  if (!user) {
    throw new Error(`user not found`);
  }

  const feedList = await getFeedsFollowByUser(user.id);

  if (feedList.length === 0) {
    console.log(`No feeds found.`);
    return;
  }

  console.log(`you following %d feeds:\n`, feedList.length);
  for (let feed of feedList) {
    console.log(`# name: ${feed.feeds.name}`);
    console.log(`# URL: ${feed.feeds.url}`);
    console.log(`# User: ${feed.users.name}`);
    console.log(`# Since: ${feed.feed_follows.createdAt}`);
    console.log(`=====================================`);
  }
}
