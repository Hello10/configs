# hello10 configs

Shared tooling configs for hello10 projects, published as two npm packages:

| Package | What it configures |
| --- | --- |
| [`@hello10/config-biome`](packages/config-biome) | [Biome](https://biomejs.dev) linting + formatting |
| [`@hello10/config-typescript`](packages/config-typescript) | TypeScript compiler options |

Both stay close to tool defaults on purpose: Biome's recommended rules with tabs, 80-char lines, and double quotes; TypeScript strict mode targeting ES2022 with bundler module resolution.

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
