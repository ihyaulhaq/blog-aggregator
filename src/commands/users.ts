import { name } from "drizzle-orm";
import { readConfig, setUser } from "src/config";
import {
  createUser,
  deleteAllUser,
  getAllUser,
  getUser,
} from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    // console.log(`usage: ${cmdName} <name>`);
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const userName = args[0];
  const user = await getUser(userName);

  if (!user) {
    // console.log("user not register");
    throw new Error("user not register");
  }

  setUser(user.name);

  console.log("user has been set");
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`usage: ${cmdName} <name>`);
    //   console.log(`must include name`);
    //   throw new Error(`must include name`);
  }

  const name = args[0];
  // const user = await getUser(name);
  const createdUser = await createUser(name);
  if (!createdUser) {
    throw new Error(`User ${name} not found`);
  } // if (user.length > 0) {
  //   console.log("user Exist");
  //   throw new Error("user Exist");
  // }
  //
  setUser(name);
  console.log(createdUser);
  console.log("user registred");
}

export async function handleDelete(cmdName: string) {
  // if (args.length !== 1) {
  //   // console.log(`usage: ${cmdName} <name>`);
  //   throw new Error(`usage: ${cmdName} <name>`);
  // }
  try {
    await deleteAllUser();
    console.log("User deleted successfully!");
  } catch (error) {
    throw new Error("cant delete users row something wrong ");
  }
}

export async function handleGetUser(cmdName: string) {
  const users = await getAllUser();
  const userLogIn = readConfig().currentUserName;
  users.forEach((user) => {
    if (userLogIn === user.name) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  });
}
