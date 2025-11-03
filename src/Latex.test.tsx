import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Latex from './Latex';

describe('Latex', () => {
  it('renders text that has multiple LaTeX formulas with $ delimiter', () => {
    const latex = 'three processes $e^+e^-$, gluon-gluon and $\\gamma\\gamma \\to W t\\bar b$.';
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container.querySelector('.katex')).toBeInTheDocument();
  });

  it('renders text that has multiple LaTeX formulas with $$ delimiter', () => {
    const latex = 'three processes $$e^+e^-$$, gluon-gluon and $$\\gamma\\gamma \\to W t\\bar b$$.';
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container.querySelector('.katex-display')).toBeInTheDocument();
  });

  it('renders text that has a LaTeX formula with custom delimiter', () => {
    const latex = 'three processes <math e^+e^- math>';
    const delimiters = [
      { left: '<math ', right: ' math>', display: true },
    ]
    const { container } = render(<Latex delimiters={delimiters}>{latex}</Latex>);
    expect(container.querySelector('.katex-display')).toBeInTheDocument();
  });

  it('returns raw text when rendering fails and strict mode is disabled', () => {
    const latex = 'Broken formula: $\\notacommand$';
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container.textContent).toContain('Broken formula:');
    expect(container.textContent).toContain('$\\notacommand$');
  });

  it('throws when rendering fails and strict mode is enabled', () => {
    const latex = 'Broken formulate: $\to W t\bar b$.';
    const renderWithStrict = () => render(<Latex strict>{latex}</Latex>);
    expect(renderWithStrict).toThrow();
  });

  it("renders correctly sequences of $..$", () => {
    const latex = "$hello$$world$$boo$";
    const { container } = render(<Latex>{latex}</Latex>);
    expect(container.querySelector('.katex')).toBeInTheDocument();
  });

  it('renders an expression with macros', () => {
    const latex = '$\\R$';
    const { container } = render(<Latex macros={{ '\\R': '\\mathbb{R}' }}>{latex}</Latex>);
    const doubleStruck = container.querySelector('.mord.mathbb');
    expect(doubleStruck).not.toBeNull();
    expect(doubleStruck?.textContent).toBe('R');
  });

  it("handles multiple children inside the node", () => {
    const latex = "$1 \\times 2$";
    const { container } = render(<Latex>Label: {latex}</Latex>);
    expect(container.querySelector('.katex')).toBeInTheDocument();
  });
})
