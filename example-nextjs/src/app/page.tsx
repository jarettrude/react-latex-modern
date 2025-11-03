"use client";

import type { ChangeEvent, JSX } from "react";
import { useMemo, useState } from "react";

import Latex, { type LatexProps } from "react-latex-modern";
import "katex/dist/katex.min.css";
import styles from "./page.module.css";

const DEFAULT_INLINE =
  "Einstein's famous mass-energy equivalence $E = mc^2$ links energy $E$, mass $m$, and the speed of light $c$.";

const DEFAULT_BLOCK = `If $f(x) = x^2$, then the derivative is
$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = 2x.$$`;

const MACROS: LatexProps["macros"] = {
  "\\R": "\\mathbb{R}",
  "\\set": "\\left\\{#1\\right\\}",
};

export default function Home(): JSX.Element {
  const [inlineExample, setInlineExample] = useState(DEFAULT_INLINE);
  const sanitizedInline = useMemo(() => inlineExample.trim(), [inlineExample]);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInlineExample(event.target.value);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>react-latex-modern × Next.js</h1>
          <p>
            A React 19-friendly component for rendering KaTeX-powered math in both inline and display
            contexts.
          </p>
        </header>

        <section className={styles.panel}>
          <h2>Inline preview</h2>
          <p>Type directly into the text area and see LaTeX render instantly.</p>
          <textarea value={inlineExample} onChange={handleChange} aria-label="Inline LaTeX" />
          <div className={styles.preview}>
            <Latex>{sanitizedInline}</Latex>
          </div>
        </section>

        <section className={styles.panel}>
          <h2>Block math</h2>
          <Latex>{DEFAULT_BLOCK}</Latex>
        </section>

        <section className={styles.panel}>
          <h2>Macros</h2>
          <Latex macros={MACROS}>{`Let $S = \set{x \in \R : x^2 = 1}$.`}</Latex>
        </section>
      </main>
    </div>
  );
}
