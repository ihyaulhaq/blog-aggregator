import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";
import { firstOrUndefined } from "./utils";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const data = await db.select().from(users).where(eq(users.name, name));
  return firstOrUndefined(data);
}

export async function deleteAllUser() {
  await db.delete(users);
}

export async function getUsers() {
  const data = await db.select().from(users);
  return data;
}
