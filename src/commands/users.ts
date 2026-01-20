import { readConfig, setUser } from "src/config";
import { createUser, getUsers, getUser } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const userName = args[0];
  const user = await getUser(userName);

  if (!user) {
    throw new Error("user not register");
  }

  setUser(user.name);

  console.log("user has been set");
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const name = args[0];
  const createdUser = await createUser(name);
  if (!createdUser) {
    throw new Error(`User ${name} not found`);
  }
  setUser(name);
  console.log(createdUser);
  console.log("user registred");
}

export async function handleGetUser(_: string) {
  const users = await getUsers();
  const userLogIn = readConfig().currentUserName;
  users.forEach((user) => {
    if (userLogIn === user.name) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  });
}
