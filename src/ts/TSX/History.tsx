import { observer } from "mobx-react";
import store from "../store"; 
import { toJS } from "mobx";
import Matrix from "./Matrix";

function History() {
  console.log('history is:', toJS(store.history));

  return (
    <div className="history">
      <h2 className="history__title">History</h2>
      <div className="history__body">
        {Object.values(store.history).reverse().map((entry) => {
          if (!entry) return null;
  
          if (entry.type === 'error') {
            return (
              <div key={entry.id} className="history__entry history__error">
                <p className="history__entry-title">#{entry.id + 1} {entry.type}: {entry.description} </p>
              </div>
            )
          }
          return (
            <div key={entry.id} className="history__entry" onClick={() => {store.jumpTo(entry.id)}}>
              <p className="history__entry-title">#{entry.id + 1} {entry.type}: {entry.description} </p>
              <Matrix matrix={entry.matrix} eMatrix={entry.eMatrix} m={entry.m} n={entry.n} disabled={true} />
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default observer(History);
