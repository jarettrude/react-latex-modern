# react-latex-next

> Render LaTeX beautifully in React apps!

[![NPM](https://img.shields.io/npm/v/react-latex-next.svg)](https://www.npmjs.com/package/react-latex-next) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

It renders all fragments of LaTeX (between delimiters) in a given text, similar to [KaTeX's auto-render](https://katex.org/docs/autorender.html).

See [the demo](https://react-latex.netlify.app).

## Install

```bash
npm install react-latex-next
```

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

## License

MIT © [harunurhan](https://github.com/harunurhan)