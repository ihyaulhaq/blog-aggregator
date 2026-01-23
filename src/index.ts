import { hanldeArr } from "./commands/agg";
import {
  CommandRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import {
  handleCreateFeedFollow,
  handleGetUserFeedFollows,
} from "./commands/feedFollow";
import { handleAddFeed, handleGetAllFeeds } from "./commands/feeds";
import { handleDelete } from "./commands/reset";
import { handleGetUser, handlerLogin, handlerRegister } from "./commands/users";
import { middlewareLoggedIn } from "./lib/middleware/loggedIn";

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("you need command");
    process.exit(1);
  }

  const cmdName = args[0];
  const cmdArgs = args.slice(1);
  const commandsRegistry: CommandRegistry = {};

  registerCommand(commandsRegistry, "login", handlerLogin);
  registerCommand(commandsRegistry, "register", handlerRegister);
  registerCommand(commandsRegistry, "reset", handleDelete);
  registerCommand(commandsRegistry, "users", handleGetUser);
  registerCommand(commandsRegistry, "agg", hanldeArr);
  registerCommand(commandsRegistry, "feeds", handleGetAllFeeds);
  registerCommand(
    commandsRegistry,
    "addfeed",
    middlewareLoggedIn(handleAddFeed),
  );
  registerCommand(
    commandsRegistry,
    "follow",
    middlewareLoggedIn(handleCreateFeedFollow),
  );
  registerCommand(
    commandsRegistry,
    "following",
    middlewareLoggedIn(handleGetUserFeedFollows),
  );
  try {
    await runCommand(commandsRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
  process.exit(0);
}

main();
