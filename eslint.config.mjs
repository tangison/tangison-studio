import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-explicit-any": "off",
    // Re-enabled as warn first (pass 1) — known ~41 violations across the codebase.
    // Promote to default (error) in pass 2 once violations are cleaned up.
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",
    
    // React rules
    // Re-enabled as warn first (pass 1) — known violations in navigation.tsx and case-study pages.
    "react-hooks/exhaustive-deps": "warn",
    // Downgraded to warn for pass 1 — 2 pre-existing violations in navigation.tsx (lines 344, 676)
    // that require event-handler refactoring to fix. Promote to error in pass 2.
    "react-hooks/set-state-in-effect": "warn",
    "react-hooks/purity": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-compiler/react-compiler": "off",
    
    // Next.js rules
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    
    // General JavaScript rules
    // Re-enabled (pass 1) — these are core correctness rules; no known violations expected.
    "prefer-const": "error",
    "no-debugger": "error",
    "no-unreachable": "error",
    "no-undef": "error",
    // Still off (low-value noise rules; revisit later):
    "no-unused-vars": "off", // covered by @typescript-eslint/no-unused-vars above
    "no-console": "off",
    "no-empty": "off",
    "no-irregular-whitespace": "off",
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-redeclare": "off",
    "no-useless-escape": "off",
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills"]
}];

export default eslintConfig;
