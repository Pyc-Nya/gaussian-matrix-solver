export interface IstoreClass {
  operationId: number;
  matrix: string[][];
  eMatrix: string[][];
  mod: "m" | "m**(-1)";
  m: number;
  n: number;
  memo: string[][] | null;
  eMemo: string[][] | null;
  userInputAddRow: string;
  userInputMultRow: string;
  userInputSwapRows: string;
  history: Thistory;
  handleUserInputAddRow(expression: string): void;
  handleUserInputMultRow(expression: string): void;
  handleUserInputSwapRows(expression: string): void;
  handleMatrixInput(i: number, j: number, value: string): void;
  handleM(m: number): void;
  handleN(n: number): void;
  fillMatrix(): void;
  mMod(): void;
  mRMod(): void;
  addRow(expression: string): void;
  multRow(expression: string): void;
  swap(expression: string): void;
  clear(): void;
  clearHistory(): void;
  clearMemo(): void;
  toDefault(): void;
  saveMemo(): void;
  saveHistory(type: string, expression: string): void;
  saveError(error: string): void;
  jumpTo(id: number): void;
}

export type ThistoryObject = {
	id: number;
	type: string;
	description: string;
	matrix: string[][];
  eMatrix: string[][];
  m: number;
  n: number;
}

export type Thistory = {
  [key: number]: ThistoryObject
}