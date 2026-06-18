import { defineConfig, globalIgnores } from "eslint/config";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  // 1. This handles both the classic Hooks rules AND the modern React Compiler rules automatically
  reactHooks.configs.flat.recommended,

  {
    // 2. These map perfectly to the compiler rules baked right into the plugin
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  // 3. Keep your directory patterns clean and ignored
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
