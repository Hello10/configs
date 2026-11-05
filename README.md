# hello10 configs

Shared tooling configs for hello10 projects, published as npm packages:

| Package | What it configures |
| --- | --- |
| [`@hello10/config-vite-plus`](packages/config-vite-plus) | [Vite+](https://viteplus.dev) lint, format, and staged settings |
| [`@hello10/config-typescript`](packages/config-typescript) | TypeScript compiler options |
| [`@hello10/config-biome`](packages/config-biome) | [Biome](https://biomejs.dev) linting + formatting (deprecated: repos are moving to Vite+) |

All stay close to tool defaults on purpose: recommended lint rules with tabs, 80-char lines, and double quotes; TypeScript strict mode targeting ES2022 with bundler module resolution.

## @hello10/config-vite-plus

```sh
pnpm add -D @hello10/config-vite-plus vite-plus
```

In your project's `vite.config.ts`, spread the shared blocks and keep `pack` and `test` per repo:

```ts
import { fmt, lint, staged } from "@hello10/config-vite-plus/base";
import { defineConfig } from "vite-plus";

export default defineConfig({
	staged,
	lint,
	fmt: { ...fmt, ignorePatterns: [...fmt.ignorePatterns, "src/__snapshots__/**"] },
	test: { globals: true, include: ["src/**/*.test.ts"] },
	pack: { entry: ["src/index.ts"], format: ["esm"], dts: { generator: "tsgo" } },
});
```

What it sets, and why it differs from the Vite+ template:

- `lint`: the `vite-plus` Oxlint plugin with `prefer-vite-plus-imports` on, type-aware linting and type checking on, and `no-unused-vars` with `args: "all"` so an unused parameter before a used one is still reported.
- `fmt`: tabs, width 80, import sorting on, `package.json` left unsorted, Markdown ignored. Add hand-formatted HTML and snapshot folders to `ignorePatterns` per repo.
- `staged`: `vp check --fix` on every staged file, for `.vite-hooks/pre-commit`.

Node and pnpm pins, `runtimeOnFail`, `pmOnFail`, and the `vite-plus` catalog entry live in each repo's `package.json` and `pnpm-workspace.yaml`; they cannot be shared from here.

## @hello10/config-biome

```sh
npm install --save-dev @hello10/config-biome @biomejs/biome
```

In your project's `biome.json`, extend the variant that fits:

```json
{
	"extends": ["@hello10/config-biome/node"],
	"files": {
		"includes": ["src/**/*"]
	}
}
```

Variants:

- `@hello10/config-biome` (or `/base`) — recommended rules, tab indentation, 80-char line width, double quotes, import organization, JSON with comments/trailing commas allowed
- `/node` — alias of base
- `/react` — base + `noDangerouslySetInnerHtml` off
- `/expo` — same as react
- `/nextjs` — extends react

File scoping (`files.includes`) and project-specific rule relaxations belong in each project's own `biome.json`, not here.

## @hello10/config-typescript

```sh
npm install --save-dev @hello10/config-typescript typescript
```

In your project's `tsconfig.json`:

```json
{
	"extends": "@hello10/config-typescript/node",
	"compilerOptions": {
		"outDir": "./dist",
		"rootDir": "./src"
	},
	"include": ["src/**/*"]
}
```

Variants:

- `/base` — ES2022 target, ESNext modules, bundler resolution, strict, `noUncheckedIndexedAccess`, declaration + declaration maps (emit declarations only)
- `/node` — base + source maps, emit enabled
- `/react` — base + `react-jsx`, DOM libs
- `/nextjs` — base + Next.js plugin, `jsx: preserve`, `allowJs`, `noEmit`

## Publishing

From the repo root:

```sh
npm run publish:all
```
