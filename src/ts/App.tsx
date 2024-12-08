import { observer } from "mobx-react";
import store from "./store";
import History from "./TSX/History";
import Matrix from "./TSX/Matrix";
import Toolbar from "./TSX/Toolbar";

function App() {

  return (
    <div className="container">
      <div className="container__item"><Toolbar /></div>
      <div className="container__item"><p className="matrix-title">Matrix</p><Matrix matrix={store.matrix} eMatrix={store.eMatrix} n={store.n} m={store.m} disabled={false} mod={store.mod} /></div>
      <div className="container__item"><History /></div>
    </div>
  );
}

export default observer(App);
