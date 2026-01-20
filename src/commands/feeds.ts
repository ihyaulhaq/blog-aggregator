import { readConfig } from "src/config";
import { createFeed, getAllFeeds } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
import { Feed, User } from "src/lib/db/schema";

export async function handleAddFeed(cmdName: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <name> <url>`);
  }

  const userLogin = readConfig().currentUserName;
  const user = await getUser(userLogin);
  const feedName = args[0];
  const url = args[1];

  if (!user) {
    throw new Error("user not found");
  }

  const res = await createFeed(feedName, url, user.id);

  if (!res) {
    throw new Error("failed to create feed");
  }

  printFeed(res, user);
}

export async function handleGetAllFeeds(_: string) {
  const feeds = await getAllFeeds();

  console.log(JSON.stringify({ feeds }, null, 2));
}

function printFeed(feed: Feed, user: User) {
  // console.log(`${feed} ${user}`);
  console.log({ feed, user });
}
