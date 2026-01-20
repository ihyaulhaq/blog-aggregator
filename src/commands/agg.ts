import { fetchFeed } from "src/lib/api/rss";

export async function hanldeArr(_: string) {
  const URL = "https://www.wagslane.dev/index.xml";
  const feedData = await fetchFeed(URL);
  const feedDataStr = JSON.stringify(feedData, null, 2);
  console.log(feedDataStr);
}
