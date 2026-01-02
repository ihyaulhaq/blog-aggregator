import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/database/schema.ts",
  out: "src/database/output",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:postgres@localhost:5432/gator",
  },
});
