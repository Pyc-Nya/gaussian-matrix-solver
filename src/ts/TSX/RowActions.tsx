import { observer } from "mobx-react";
import store from "../store";

function RowActions() {

  const onKeyPressAddRow = (e: any) => {
    if (e.key === 'Enter') {
      store.addRow(store.userInputAddRow)
    }
  }

  const onKeyPressMultRow = (e: any) => {
    if (e.key === 'Enter') {
      store.multRow(store.userInputMultRow)
    }
  }

  const onKeyPressSwapRows = (e: any) => {
    if (e.key === 'Enter') {
      store.swap(store.userInputSwapRows)
    }
  }

  return (
    <div className="toolbar__item row-actions">
      <div className="row-actions__item">
        <p className="row-actions__title">Add row</p>
        <div className="row-actions__description">
          <p className="row-actions__description-item">Syntax: rowNumber +- mult * rowNumber</p>
          <p className="row-actions__description-item">Example: 1 - 2 * 3 // row1 - 2 * row3</p>
          <p className="row-actions__description-item">Syntax: rowNumber + rowNumber</p>
          <p className="row-actions__description-item">Example: 1 + 3 // row1 + row3</p>
        </div>
        <input 
          placeholder="rowN +- mult * rowN"
          disabled={store.m === 0 || store.n === 0}
          value={store.userInputAddRow} 
          onKeyUp={onKeyPressAddRow} 
          onChange={(e) => store.handleUserInputAddRow(e.target.value)} 
          type="text" 
          className="row-actions__input" />
        <button disabled={store.m === 0 || store.n === 0} className="row-actions__confirm-button" onClick={() => store.addRow(store.userInputAddRow)}>OK</button>
      </div>
      <div className="row-actions__item">
        <p className="row-actions__title">Mult row</p>
        <div className="row-actions__description">
          <p className="row-actions__description-item">Syntax: rowNumber * mult</p>
          <p className="row-actions__description-item">Example: 1 * (-2) // row1 * (-2)</p>
        </div>
        <input 
          placeholder="rowN * mult"
          disabled={store.m === 0 || store.n === 0}
          value={store.userInputMultRow} 
          onKeyUp={onKeyPressMultRow} 
          onChange={(e: any) => store.handleUserInputMultRow(e.target.value)} 
          type="text" 
          className="row-actions__input" />
        <button disabled={store.m === 0 || store.n === 0} className="row-actions__confirm-button" onClick={() => store.multRow(store.userInputMultRow)}>OK</button>
      </div>
      <div className="row-actions__item">
        <p className="row-actions__title">Swap rows</p>
        <div className="row-actions__description">
          <p className="row-actions__description-item">Syntax: rowNumber rowNumber</p>
          <p className="row-actions__description-item">Example: 1 2 // swap rows 1 and 2</p>
        </div>
        <input 
          placeholder="rowN rowN"
          disabled={store.m === 0 || store.n === 0}
          value={store.userInputSwapRows} 
          onKeyUp={onKeyPressSwapRows}
          onChange={(e: any) => store.handleUserInputSwapRows(e.target.value)} 
          type="text" 
          className="row-actions__input" />
        <button disabled={store.m === 0 || store.n === 0} className="row-actions__confirm-button" onClick={() => store.swap(store.userInputSwapRows)}>OK</button>
      </div>
    </div>
  )
}

export default observer(RowActions);
