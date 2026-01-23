import { CommandHandler } from "src/commands/commands";
import { User } from "../db/schema";
import { readConfig } from "src/config";
import { getUser } from "../db/queries/users";

type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void>;

type middlewareLoggedIn = (handler: UserCommandHandler) => CommandHandler;

export const middlewareLoggedIn = (handle: UserCommandHandler) => {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();
    const user = await getUser(config.currentUserName);

    if (!user) {
      throw new Error(`you must logged in dumbass !`);
    }

    await handle(cmdName, user, ...args);
  };
};
