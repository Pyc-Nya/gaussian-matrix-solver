import { observer } from "mobx-react"
import store from "../store"

function MN() {
  return (
    <div className="toolbar__item mn">
      M: {' '}
      <input 
        type="number" 
        min={0}
        value={store.m} 
        onChange={(e: any) => store.handleM(e.target.value)} 
        onBlur={(e: any) => {if (e.target.value === '') store.handleM(0)}}
        className="mn__input mn__input-m" />
      {store.mod !== 'm**(-1)' && 
      <>
      N: {' '}
      <input 
        type="number" 
        min={0}
        value={store.n} 
        onChange={(e: any) => store.handleN(e.target.value)} 
        onBlur={(e: any) => {if (e.target.value === '') store.handleN(0)}}
        className="mn__input mn__input-n" />
      </>}
    </div>
  )
}

export default observer(MN);
