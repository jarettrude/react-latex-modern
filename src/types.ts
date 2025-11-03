export interface KatexData {
  readonly data: string;
  readonly type: 'text' | 'math';
  readonly rawData?: string;
  readonly display?: boolean;
}

export interface Delimiter {
  readonly left: string;
  readonly right: string;
  readonly display: boolean;
}

export interface MacroToken {
  readonly text: string;
}

export interface MacroArg {
  readonly tokens: readonly MacroToken[];
  readonly start: MacroToken;
  readonly end: MacroToken;
}

export interface MacroExpansion {
  readonly tokens: readonly MacroToken[];
  readonly numArgs: number;
  readonly delimiters?: readonly (readonly string[])[];
  readonly unexpandable?: boolean;
}

export interface MacroContext {
  readonly mode: 'math' | 'text';
  future(): MacroToken;
  popToken(): MacroToken;
  consumeSpaces(): void;
  expandOnce(expandableOnly?: boolean): number | boolean;
  expandAfterFuture(): MacroToken;
  expandNextToken(): MacroToken;
  expandMacro(name: string): readonly MacroToken[] | undefined;
  expandMacroAsText(name: string): string | undefined;
  expandTokens(tokens: readonly MacroToken[]): MacroToken[];
  consumeArg(delims?: readonly string[]): MacroArg;
  consumeArgs(numArgs: number): MacroToken[][];
  isDefined(name: string): boolean;
  isExpandable(name: string): boolean;
}

export type MacroDefinition =
  | string
  | MacroExpansion
  | ((context: MacroContext) => string | MacroExpansion);

export type Macros = Readonly<Record<string, MacroDefinition>>;