import { observer } from "mobx-react";
import store from "../store";

function Matrix({matrix, eMatrix, m, n, disabled, mod}: {matrix: string[][], eMatrix: string[][], m: number, n: number, disabled: boolean, mod: "m" | "m**(-1)"}) {
  const handleChange = (i: number, j: number, value: string) => {
    store.handleMatrixInput(i, j, value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number, j: number) => {
    let nextI = i, nextJ = j;
    const { selectionStart, selectionEnd, value } = e.currentTarget;

    switch (e.key) {
      case 'ArrowUp':
        if (i > 0) {
          nextI = i - 1;
        } else {
          nextI = m - 1;
        }
        break;
      case 'ArrowDown':
        if (i < m - 1) {
          nextI = i + 1;
        } else {
          nextI = 0;
        }
        break;
      case 'ArrowLeft':
        if (selectionStart === 0 && selectionEnd === 0) {
          if (j > 0) {
            nextJ = j - 1;
          } else {
            nextJ = n - 1;
            nextI = i > 0 ? i - 1 : i;
          }
        } else {
          return;
        }
        break;
      case 'ArrowRight':
        if (selectionStart === value.length && selectionEnd === value.length) {
          if (j < n - 1) {
            nextJ = j + 1;
          } else {
            nextJ = 0;
            nextI = i < m - 1 ? i + 1 : i;
          }
        } else {
          return;
        }
        break;
      default:
        return; 
    }
    const nextInput = document.querySelector(`input[data-row="${nextI}"][data-col="${nextJ}"]`) as HTMLInputElement;
    nextInput?.focus();
  };

  return (
    <div className="matrix-container">
      <div className="matrix">
        {Array.from({ length: m }).map((_, i) => (
          <div key={i} className="matrix__row">
            {Array.from({ length: n }).map((_, j) => (
              <input
                style={disabled ? {cursor: "pointer", pointerEvents: "none"} : {}}
                onClick={(e: any) => {if (disabled) e.preventDefault()}}
                className="matrix__cell"
                key={`${i}-${j}`}
                data-row={i}
                data-col={j}
                type="text"
                value={matrix[i]![j]}
                onChange={(e) => handleChange(i, j, e.target.value)}
                onBlur={(e) => {if (e.target.value === '') handleChange(i, j, '0')}}
                onKeyDown={(e) => handleKeyDown(e, i, j)}
              />
            ))}
          </div>
        ))}
      </div>
      {mod === "m**(-1)" && (
        <>
          <div className="matrix-container__sep"></div>
          <div className="matrix">
            {Array.from({ length: m }).map((_, i) => (
              <div key={i} className="matrix__row">
                {Array.from({ length: n }).map((_, j) => (
                  <span className="matrix__cell matrix__cell-e" key={`${i}-${j}`}>{eMatrix[i]![j]}</span>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Matrix);
