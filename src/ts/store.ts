import { makeAutoObservable, runInAction, toJS } from "mobx";
import { IstoreClass, Thistory } from "./types";
import { roundAndTrim, validateAddString, validateMatrixRows, validateMultString, validateTwoNumbers } from "./utils";

const MAX_LENGTH = 30;

export class Store implements IstoreClass {
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

  constructor() {
    this.operationId = 0;
    this.matrix = [[]];
    this.eMatrix = [[]];
    this.mod = "m";
    this.m = 0;
    this.n = 0;
    this.memo = null;
    this.eMemo = null;
    this.userInputAddRow = "";
    this.userInputMultRow = "";
    this.userInputSwapRows = "";
    this.history = [];

    makeAutoObservable(this);
  }

  handleUserInputAddRow = (expression: string): void => {
    this.userInputAddRow = expression;
  }

  handleUserInputMultRow = (expression: string): void => {
    this.userInputMultRow = expression;
  }

  handleUserInputSwapRows = (expression: string): void => {
    this.userInputSwapRows = expression;
  }

  handleMatrixInput = (i: number, j: number, value: string): void => {
    runInAction(() => {
      this.matrix[i]![j] = value;
    })
  }

  handleM = (m: number): void => {
    runInAction(() => {
      this.m = (m < 0) ? 0 : m;

      if (Math.abs(m) > MAX_LENGTH) {
        this.m = MAX_LENGTH;
      }

      if (this.mod === "m**(-1)") {
        this.n = m;
      }
  
      this.fillMatrix();
    })
  }

  handleN = (n: number): void => {
    runInAction(() => {
      this.n = (n < 0) ? 0 : n;

      if (Math.abs(n) > MAX_LENGTH) {
        this.n = MAX_LENGTH;
      }

      this.fillMatrix();
    })
  }

  fillMatrix = (): void => {
    runInAction(() => {
      const newN = this.mod === 'm**(-1)' ? this.m : this.n;
    
      const newMatrix = Array.from({ length: this.m }, () => 
        Array.from({ length: newN }).fill('0')) as string[][];
      const newEMatrix = Array.from({ length: this.m }, (_, i) =>
        Array.from({ length: newN }, (_, j) => (i === j ? '1' : '0'))
      ) as string[][];
    
      if (this.mod === 'm**(-1)') {
        for (let i = 0; i < this.m; i++) {
          for (let j = 0; j < this.m; j++) {
            if (this.matrix[i] !== undefined && this.matrix[i]![j] !== undefined) {
              newMatrix[i]![j] = this.matrix[i]![j]!;
              newEMatrix[i]![j] = this.eMatrix[i]![j]!;
            }
          }
        }
      } else {
        for (let i = 0; i < newMatrix.length; i++) {
          for (let j = 0; j < newMatrix[i]!.length; j++) {
            if (this.matrix[i] !== undefined && this.matrix[i]![j] !== undefined) {
              newMatrix[i]![j] = this.matrix[i]![j]!;
              newEMatrix[i]![j] = this.eMatrix[i]![j]!;
            }
          }
        }
      }
    
      this.matrix = newMatrix;
      this.eMatrix = newEMatrix;
    });
  }

  clear = (): void => {
    if (!this.m) {
      return;
    }

    console.log('cleared matrix');
    runInAction(() => {
      this.saveHistory("Clear", "");
      const newN = this.mod === 'm**(-1)' ? this.m : this.n;

      const newMatrix = Array.from({ length: this.m }, () => 
        Array.from({ length: newN }).fill('0')) as string[][];
      const newEMatrix = Array.from({ length: this.m }, (_, i) =>
        Array.from({ length: newN }, (_, j) => (i === j ? '1' : '0'))
      ) as string[][];

      this.matrix = newMatrix.slice();
      this.eMatrix = newEMatrix.slice();
    })
  }

  mMod = (): void => {
    this.mod = "m";
  }

  mRMod = (): void => {
    runInAction(() => {
      this.mod = "m**(-1)";
      this.handleN(this.m);
    })
  }

  addRow = (expression: string): void => {
    console.log('try to add row:', expression)
    runInAction(() => {
      if (!validateMatrixRows(this.matrix)) {
        console.log('failed to add row because of invalid matrix');
        this.saveError('invalid matrix');
        return;
      }

      if (!validateAddString(expression, this.m)) {
        console.log('failed to add row because of invalid string:', expression);
        this.saveError('invalid expression in add row: ' + expression);
        return;
      }

      this.saveHistory("Add row", expression);
  
      let [n1, n2, mult] = validateAddString(expression, this.m)!;
  
      const newMatrix = this.matrix.map(innerArray => innerArray.slice());;
  
      for (let i = 0; i < this.n; i++) {
        newMatrix[n1]![i] = roundAndTrim(Number(newMatrix[n1]![i]) + mult * Number(newMatrix[n2]![i]!)).toString();
      }
  
      const newEMatrix = this.eMatrix.map(innerArray => innerArray.slice());;
      for (let i = 0; i < this.n; i++) {
        newEMatrix[n1]![i] = roundAndTrim(Number(newEMatrix[n1]![i]) + mult * Number(newEMatrix[n2]![i]!)).toString();
      }

      this.eMatrix = newEMatrix.map(innerArray => innerArray.slice());;
  
      this.matrix = newMatrix.map(innerArray => innerArray.slice());
      this.userInputAddRow = '';
      console.log('successfully added row');
    })
  }

  multRow = (expression: string): void => {
    runInAction(() => {
      if (!validateMatrixRows(this.matrix)) {
        console.log('failed to add row because of invalid matrix');
        this.saveError('invalid matrix');
        return;
      }

      if (!validateMultString(expression)) {
        console.log('failed to multiplie row', expression);
        this.saveError('invalid expression in mult row: ' + expression);
        return;
      }

      this.saveHistory("Mult row", expression);
  
      let [n, mult] = validateMultString(expression)!;

      const newMatrix = this.matrix.map(innerArray => innerArray.slice());;
  
      for (let i = 0; i < this.n; i++) {
        newMatrix[n]![i] = roundAndTrim(Number(newMatrix[n]![i]) * mult).toString();
      }
  
      const newEMatrix = this.eMatrix.map(innerArray => innerArray.slice());;
      for (let i = 0; i < this.n; i++) {
        newEMatrix[n]![i] = roundAndTrim(Number(newEMatrix[n]![i]) * mult).toString();
      }

      this.eMatrix = newEMatrix.map(innerArray => innerArray.slice());;
  
      this.matrix = newMatrix.map(innerArray => innerArray.slice());
      console.log('successfully multiplied row', expression);
      this.userInputMultRow = '';
    })
  }

  swap = (expression: string): void => {
    runInAction(() => {
      if (!validateTwoNumbers(expression, this.m)) {
        console.log('failed to swap rows', expression);
        this.saveError('invalid expression in swap: ' + expression);
        return;
      }

      this.saveHistory("Swap", expression);

      let [n1, n2] = validateTwoNumbers(expression, this.m)!;

      const newMatrix = this.matrix.map(innerArray => innerArray.slice());;
      const newEMatrix = this.eMatrix.map(innerArray => innerArray.slice());;
      for (let i = 0; i < this.n; i++) {
        [newMatrix[n1]![i], newMatrix[n2]![i]] = [newMatrix[n2]![i]!, newMatrix[n1]![i]!];
        [newEMatrix[n1]![i], newEMatrix[n2]![i]] = [newEMatrix[n2]![i]!, newEMatrix[n1]![i]!];
      }
      this.matrix = newMatrix.map(innerArray => innerArray.slice());
      this.eMatrix = newEMatrix.map(innerArray => innerArray.slice());

      console.log('successfully swapped rows', expression);
      this.userInputSwapRows = '';
    })
  }

  clearHistory = (): void => {
    runInAction(() => {
      this.history = [];
      this.operationId = 0;
    })
  }

  clearMemo = (): void => {
    this.memo = null;
    this.eMemo = null;
  }

  saveMemo = (): void => {
    if (!this.m  || !this.n) {
      return;
    }
    console.log('memo saved', toJS(this.matrix));
    this.memo = this.matrix.map(innerArray => innerArray.slice());
    this.eMemo = this.eMatrix.map(innerArray => innerArray.slice());
  }

  toDefault = (): void => {
    if (this.memo === null) {
      return;
    }

    console.log('returning to default version of matrix', toJS(this.memo));
    runInAction(() => {
      this.saveHistory("To memorized", "");
      this.matrix = this.memo!.map(innerArray => innerArray.slice());
    })
  }

  saveError = (error: string): void => {
    console.log('saving error: ', error);
    runInAction(() => {
      this.history[this.operationId] = {
        id: this.operationId,
        type: 'error',
        description: error,
        matrix: [[]],
        eMatrix: [[]],
        m: this.m,
        n: this.n,
        mod: this.mod
      }
      this.operationId++;
    })
  }

  saveHistory = (type: string, expression: string): void => {
    console.log(`saving history object; id: ${this.operationId}; type: ${type}; expression: ${expression}`)
    runInAction(() => {
      this.history[this.operationId] = {
        id: this.operationId,
        type: type,
        description: expression,
        matrix: this.matrix.map(innerArray => innerArray.slice()),
        eMatrix: this.eMatrix.map(innerArray => innerArray.slice()),
        m: this.m,
        n: this.n,
        mod: this.mod
      }
      this.operationId++;
    })
  }

  jumpTo = (id: number): void => {
    console.log(`jumping to id: ${id}`);
    if (!this.history[id]) {
      return;
    }

    runInAction(() => {
      this.saveHistory("Jump to", '#' + (id + 1).toString());
      this.m = this.history[id]!.m;
      this.n = this.history[id]!.n;
      this.matrix = this.history[id]!.matrix.map(innerArray => innerArray.slice());
      this.eMatrix = this.history[id]!.eMatrix.map(innerArray => innerArray.slice());
      this.mod = this.history[id]!.mod as "m" | "m**(-1)";
      switch (this.history[id]!.type) {
        case 'Add row':
          this.userInputAddRow = this.history[id]!.description;
          break;
        case 'Mult row':
          this.userInputMultRow = this.history[id]!.description;
          break;
        case 'Swap':
          this.userInputSwapRows = this.history[id]!.description;
          break;
        default:
          break;
      }
    })
  }
}

const store = new Store();

export default store;
