import { useMemo } from 'react';

import renderLatex from './renderLatex';
import { type Delimiter, type Macros } from './types';

export interface LatexProps {
  readonly children: string | readonly string[];
  readonly delimiters?: readonly Delimiter[];
  readonly strict?: boolean;
  readonly macros?: Macros;
}

const defaultDelimiters: readonly Delimiter[] = [
  { left: '$$', right: '$$', display: true },
  { left: '\\(', right: '\\)', display: false },
  { left: '$', right: '$', display: false },
  { left: '\\[', right: '\\]', display: true },
];

const toSource = (value: LatexProps['children']): string => (typeof value === 'string' ? value : value.join(''));

export default function Latex({ children, delimiters = defaultDelimiters, strict = false, macros }: LatexProps) {
  const source = useMemo<string>(() => toSource(children), [children]);
  const renderedLatex = useMemo(
    () => renderLatex(source, [...delimiters], Boolean(strict), macros),
    [source, delimiters, strict, macros],
  );

  return <span className="__Latex__" dangerouslySetInnerHTML={{ __html: renderedLatex }} />;
}