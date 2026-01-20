import { deleteAllFeeds } from "src/lib/db/queries/feeds";
import { deleteAllUser } from "src/lib/db/queries/users";

export async function handleDelete(_: string) {
  try {
    await deleteAllUser();
    await deleteAllFeeds();
    console.log("User deleted successfully!");
  } catch (error) {
    throw new Error("cant delete users row something wrong ");
  }
}
