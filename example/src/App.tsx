import type { JSX } from 'react';
import { useMemo, useState } from 'react';

import Latex, { type LatexProps } from 'react-latex-modern';
import 'katex/dist/katex.min.css';
import './App.css';

const DEFAULT_LATEX =
  "We give illustrations for the {1 + 2} processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.";

const DISPLAY_BLOCK = `Assuming $a, b \\in \\mathbb{R}$, the quadratic formula is
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}.$$`;

const CUSTOM_MACROS: LatexProps['macros'] = {
  '\\R': '\\mathbb{R}',
  '\\vect': '\\boldsymbol{#1}',
};

export default function App(): JSX.Element {
  const [source, setSource] = useState(DEFAULT_LATEX);
  const [strict, setStrict] = useState(false);

  const sanitizedSource = useMemo(() => source.trim(), [source]);

  return (
    <div className="app">
      <header>
        <h1>react-latex-modern</h1>
        <p>React 19 compatible rendering powered by KaTeX.</p>
      </header>

      <section className="panel">
        <h2>Interactive demo</h2>
        <p>Update the text below to see inline LaTeX refresh instantly.</p>
        <textarea
          aria-label="LaTeX source"
          value={source}
          onChange={(event) => setSource(event.target.value)}
        />
        <label className="toggle">
          <input
            type="checkbox"
            checked={strict}
            onChange={(event) => setStrict(event.target.checked)}
          />
          Enable strict mode (throws on invalid expressions)
        </label>

        <div className="preview">
          <Latex strict={strict}>{sanitizedSource}</Latex>
        </div>
      </section>

      <section className="panel">
        <h2>Display math</h2>
        <Latex>{DISPLAY_BLOCK}</Latex>
      </section>

      <section className="panel">
        <h2>Macros</h2>
        <Latex macros={CUSTOM_MACROS}>{`\\vect{F}(x) = x \\cdot \\R^n`}</Latex>
      </section>
    </div>
  );
}
