## Star Wars Character Search

A small web app built with **Vite**, **TypeScript**, and **Lit** to search and view Star Wars characters.

### Prerequisites

- **Node.js**: v18 or newer is recommended.
- **Package manager**: the project uses a `pnpm-lock.yaml`, so **pnpm** is recommended, but you can also use **npm** or **yarn**.

You can check your versions with:

```bash
node -v
pnpm -v
```

If you do not have pnpm installed:

```bash
npm install -g pnpm
```

### Install dependencies

From the project root (`star-wars-character-search`), run one of:

```bash
pnpm install
```

or, if you prefer npm:

```bash
npm install
```

or with yarn:

```bash
yarn install
```

> **Note**: For the most reproducible setup, use `pnpm` because this repo includes a `pnpm-lock.yaml`.

### Run the app in development

Start the Vite dev server:

```bash
pnpm dev
```

or:

```bash
npm run dev
# or
yarn dev
```

Then open the URL printed in the terminal (by default `http://localhost:5173`) in your browser.

### Build for production

To create an optimized production build:

```bash
pnpm build
```

or:

```bash
npm run build
# or
yarn build
```

The output will be in the `dist` folder.

### Preview the production build

After building, you can locally preview what the production build will look like:

```bash
pnpm preview
```

or:

```bash
npm run preview
# or
yarn preview
```

Then open the URL shown in the terminal.

