export type CommandRegistry = Record<string, CommandHandler>;

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;

export function registerCommand(
  registry: CommandRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;
  // console.log(cmdName);
}

export async function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
): Promise<void> {
  const handler = registry[cmdName];

  if (!handler) {
    throw new Error("Command not found");
  }

  // try {
  await handler(cmdName, ...args);
  // } catch (err) {
  //   throw new Error("error");
  // }
}
