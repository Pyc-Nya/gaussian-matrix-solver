import { observer } from "mobx-react";
import store from "../store";
import Mod from "./Mod";

function MatrixActions() {
  return (
    <div className="toolbar__item matrix-actions">
      <div className="matrix-actions__item">
        <button className="matrix-actions__button" onClick={store.clear}>Clear</button>
        <p className="matrix-actions__description">// Clear matrix</p>
      </div>
      <div className="matrix-actions__item">
        <button className="matrix-actions__button" onClick={store.saveMemo}>Memo {store.memo ? '[1]' : '[0]'}</button>
        <p className="matrix-actions__description">// Memorize matrix</p>
      </div>
      <div className="matrix-actions__item">
        <button disabled={!store.memo} className="matrix-actions__button" onClick={store.toDefault}>To Memorized</button>
        <p className="matrix-actions__description">// Return to memorized matrix</p>
      </div>
      <div className="matrix-actions__item">
        <button className="matrix-actions__button" onClick={store.clearHistory}>Clear history list</button>
        <p className="matrix-actions__description">// Clear history list  (also clear memory)</p>
      </div>
      <Mod />
    </div>
  )
}

export default observer(MatrixActions);
