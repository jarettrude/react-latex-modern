/** Adapted from /contrib/auto-render/auto-render.js at github.com/Khan/KaTeX */

import { renderToString } from 'katex';
import { type Delimiter, type Macros } from './types';
import splitAtDelimiters from './splitAtDelimiters';

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default function renderLatexInTextAsHTMLString(
  text: string,
  delimiters: readonly Delimiter[],
  strict: boolean,
  macros?: Macros,
): string {
  const data = splitAtDelimiters(text, delimiters);
  const fragments: string[] = [];

  for (const item of data) {
    if (item.type === 'text') {
      fragments.push(item.data);
      continue;
    }

    try {
      const rendered = renderToString(item.data, { displayMode: item.display, macros });
      fragments.push(rendered);
    } catch (error) {
      if (strict) {
        throw error;
      }
      fragments.push(escapeHtml(item.rawData ?? item.data));
    }
  }

  return fragments.join('');
}
