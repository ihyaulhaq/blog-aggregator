import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  setUser(args[0]);

  console.log("user has been set");
}
