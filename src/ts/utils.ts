function validateAddString(input: string, m: number): [number, number, number] | null {
  let regex = /(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)\s*\*\s*(\d+(\.\d+)?)/;
  let match = input.match(regex);

  if (match) {
    const a = parseFloat(match[1]!);
    const b = parseFloat(match[4]!);
    const c = parseFloat(match[6]!);
    const sign = match[3] === '-' ? -1 : 1;

    if (isNaN(a) || isNaN(b) || isNaN(c) || a < 1 || a > m || c < 1 || c > m) {
      return null;
    }

    return [a - 1, c - 1, b * sign];
  } else {
    regex = /(\d+(\.\d+)?)\s*([\+\-])\s*(\d+(\.\d+)?)/;
    match = input.match(regex);

    if (match) {
      const a = parseFloat(match[1]!);
      const b = parseFloat(match[4]!);
      const sign = match[3] === '-' ? -1 : 1;

      if (isNaN(a) || isNaN(b) || a < 1 || a > m || b < 1 || b > m) {
        return null;
      }

      return [a - 1, b - 1, sign];
    }
  }

  return null;
}


function validateMultString(input: string): [number, number] | null {
  const regex = /(\d+(\.\d+)?)\s*\*\s*(\(\-\d+(\.\d+)?\)|\d+(\.\d+)?)/;
  const match = input.match(regex);

  if (!match) {
    return null;
  }

  const a = parseFloat(match[1]!);
  let b = parseFloat(match[3]!.replace(/[()]/g, ''));

  if (isNaN(a) || isNaN(b)) {
    return null;
  }

  return [a - 1, b];
}

function roundAndTrim(num: number): number {
  const rounded = parseFloat(num.toFixed(5));

  const diff = Math.abs(rounded - Math.round(rounded));

  if (diff < 0.00001) {
    return Math.round(rounded);
  }

  return rounded;
}

function validateTwoNumbers(input: string, m: number): null | [number, number] {
  const regex = /^(\d+)\s+(\d+)$/;
  const match = input.match(regex);

  if (match) {
    const num1 = parseInt(match[1]!, 10);
    const num2 = parseInt(match[2]!, 10);

    if (num1 > 0 && num1 <= m && num2 > 0 && num2 <= m) {
      return [num1 - 1, num2 - 1];
    }
  }

  return null;
}

function validateMatrixRows(matrix: string[][]): boolean {
  return matrix.every(row => {
    const numbers = row.map(Number);
    return numbers.every(number => !isNaN(number));
  });
}

export {
  validateAddString,
  validateMultString,
  roundAndTrim,
  validateTwoNumbers,
  validateMatrixRows,
}