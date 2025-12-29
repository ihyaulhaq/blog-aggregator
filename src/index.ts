import { setUser } from "./config";
import { readConfig } from "./config";

function main() {
  setUser("ihya");
  const config = readConfig();
  console.log(config);
}

main();
