import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  vite: {
    plugins: [
      // @ts-expect-error
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
