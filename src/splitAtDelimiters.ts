/* Adapted from /contrib/auto-render/splitAtDelimiters.js at github.com/Khan/KaTeX */

import { type KatexData, type Delimiter } from './types';

function findEndOfMath(delimiterValue: string, text: string, startIndex: number): number {
  let index = startIndex;
  let braceLevel = 0;

  const delimLength = delimiterValue.length;

  while (index < text.length) {
    const character = text[index];

    if (braceLevel <= 0 && text.slice(index, index + delimLength) === delimiterValue) {
      return index;
    }

    if (character === '\\') {
      index++;
    } else if (character === '{') {
      braceLevel++;
    } else if (character === '}') {
      braceLevel--;
    }

    index++;
  }

  return -1;
}

function escapeRegex(text: string): string {
  return text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const amsRegex = /^\\begin{/;

export default function splitAtDelimiters(text: string, delimiters: readonly Delimiter[]): KatexData[] {
  let mutableText = text;
  const data: KatexData[] = [];

  if (delimiters.length === 0) {
    return [{ type: 'text', data: mutableText }];
  }

  const regexLeft = new RegExp(`(${delimiters.map((x) => escapeRegex(x.left)).join('|')})`);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const leftIndex = mutableText.search(regexLeft);
    if (leftIndex === -1) {
      break;
    }

    if (leftIndex > 0) {
      data.push({ type: 'text', data: mutableText.slice(0, leftIndex) });
      mutableText = mutableText.slice(leftIndex);
    }

    const delimiterIndex = delimiters.findIndex((delim) => mutableText.startsWith(delim.left));
    if (delimiterIndex === -1) {
      data.push({ type: 'text', data: mutableText });
      mutableText = '';
      break;
    }

    const current = delimiters[delimiterIndex]!;
    const mathEnd = findEndOfMath(current.right, mutableText, current.left.length);
    if (mathEnd === -1) {
      data.push({ type: 'text', data: mutableText });
      mutableText = '';
      break;
    }

    const rawData = mutableText.slice(0, mathEnd + current.right.length);
    const math = amsRegex.test(rawData) ? rawData : mutableText.slice(current.left.length, mathEnd);

    data.push({
      type: 'math',
      data: math,
      rawData,
      display: current.display,
    });

    mutableText = mutableText.slice(mathEnd + current.right.length);
  }

  if (mutableText !== '') {
    data.push({ type: 'text', data: mutableText });
  }

  return data;
}
