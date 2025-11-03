# react-latex-modern

> Modern LaTeX rendering for React 19 and beyond.

`react-latex-modern` is a refreshed fork of [react-latex-next](https://github.com/harunurhan/react-latex-next) that adds full React 19 support, TypeScript definitions, and modern example apps built with Vite and Next.js. It renders inline or block LaTeX expressions using [KaTeX](https://katex.org) and a lightweight React wrapper.

## Why this fork?

- React 19 & Concurrent Features ready
- TypeScript-friendly with published declaration files
- Modern tooling: Rollup, Vitest, Vite, and Next.js examples
- Maintained under the `react-latex-modern` npm package name

Huge thanks to the original author, [Harun Urhan](https://github.com/harunurhan), whose work made this project possible. This fork keeps the original MIT license.

## Installation

```bash
npm install react-latex-modern katex
# or
pnpm add react-latex-modern katex
# or
yarn add react-latex-modern katex
```

> KaTeX is listed as a peer dependency so you control the version shipped in your bundle.

## Usage

```tsx
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-modern';

export function Example(): JSX.Element {
  return (
    <Latex>
      {`Einstein's famous mass-energy equivalence $E = mc^2$ links energy $E$, mass $m$, and the speed of light $c$.`}
    </Latex>
  );
}
```

### Props

| Prop        | Type                           | Default                                    | Description |
|-------------|--------------------------------|--------------------------------------------|-------------|
| `children`  | `string | readonly string[]`   | –                                          | Source content containing math expressions. |
| `delimiters`| `readonly Delimiter[]`         | `['$$','\$','$','\\[','\\]','\\(','\\)']` | Configure the math delimiters to search for. |
| `strict`    | `boolean`                      | `false`                                    | Throw when KaTeX fails to render. |
| `macros`    | `Macros`                       | `undefined`                                | Provide persistent KaTeX macros. |

Additional helpers (`renderLatex`, `splitAtDelimiters`, type exports) are available for advanced integrations:

```ts
import Latex, {
  type LatexProps,
  type Macros,
  type Delimiter,
  renderLatex,
  splitAtDelimiters,
} from 'react-latex-modern';
```

## Example apps

This repo includes two runnable demos showing common integration patterns:

1. **Vite + React + TypeScript** (`example/`) – interactive playground with strict mode toggle, macros, and live preview.
2. **Next.js 16 App Router** (`example-nextjs/`) – demonstrates usage with server components and the latest Next.js defaults.

Run them locally via the commands listed in each example README.

## Development

```bash
# Install dependencies
npm install

# Run unit tests
npm test

# Build the package
npm run build

# Lint TypeScript types
npm run lint
```

## Publishing checklist

1. Update the version in `package.json`.
2. Build the package (`npm run build`).
3. Confirm tests pass (`npm test`).
4. Publish with `npm publish --access public`.

> First publish? Make sure your npm account is authenticated (`npm login`) and you have rights on the package name.

## Changelog highlights (4.0.0)

- Renamed package to **react-latex-modern**.
- Added React 19 compatible peer dependencies and TypeScript tooling.
- Replaced CRA example with Vite; added Next.js example.
- Cleaned up Rollup build, Vitest tests, and exported helper utilities.

## License & attribution

This project continues under the MIT License. Original copyright © Harun Urhan. Fork maintained by Jarett Rude.

See [LICENSE](./LICENSE) for full details.
