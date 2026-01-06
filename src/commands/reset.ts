import { deleteAllUser } from "src/lib/db/queries/users";

export async function handleDelete(_: string) {
  try {
    await deleteAllUser();
    console.log("User deleted successfully!");
  } catch (error) {
    throw new Error("cant delete users row something wrong ");
  }
}
