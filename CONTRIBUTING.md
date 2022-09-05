# Contributing

Solid Diffusion is built with:

* [SolidJS](https://solidjs.com)
* [TailwindCSS](https://tailwindcss.com)
* [daisyUI](https://daisyui.com)
* [Reatom](https://github.com/artalar/reatom) / [reatom-solid](https://github.com/skrylnikov/reatom-solid)
* [Vite](https://vitejs.dev)

## Local development setup

Before starting, you should have [Node.js](https://nodejs.org/) 16.x or higher and [pnpm](https://pnpm.io) installed.

Clone the repository and enter the project folder:

```bash
git clone https://github.com/nderscore/solid-diffusion.git
cd ./solid-diffusion
```

Install dependencies:

```bash
pnpm install
```

(Optional) VSCode users can use the `solid-diffusion.code-workspace`

## Available Scripts

In the project directory, you can run:

### `pnpm start`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload automatically if you make edits to any of the source files.

API calls will be proxied to your local stable diffusion server. 

If your server is not on the same computer, you can update it by making a copy of
`.env` called `.env.local` and then updating the URL there.

### `pnpm build`

Builds the app for distribution to the `dist` folder.

### `pnpm lint` / `pnpm lint:fix`

Runs eslint on the project files (`lint:fix` attempts to auto-fix any issues found when possible)

## Submitting Code

Before opening a pull request, please make sure that the linter is not showing any errors or warnings.

Any place where the linter is disabled should come with a comment explaining why it's needed.
