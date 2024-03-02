import { observer } from "mobx-react";
import store from "../store";

function Mod() {
  return (
    <div className="mod">
      <div className="matrix-actions__item">
        <button disabled={store.mod === 'm'} className="matrix-actions__button mod__m" onClick={store.mMod}>M</button>
        <p className="matrix-actions__description">// Mod: matrix</p>
      </div>
      <div className="matrix-actions__item">
        <button disabled={store.mod === 'm**(-1)'} className="matrix-actions__button mod__rm" onClick={store.mRMod}>M**(-1)</button>
        <p className="matrix-actions__description">// Mod: inverse matrix</p>
      </div>
    </div>
  )
}

export default observer(Mod);
