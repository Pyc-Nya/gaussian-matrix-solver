import MN from "./MN";
import MatrixActions from "./MatrixActions";
import RowActions from "./RowActions";

function Toolbar() {
  return (
    <div className="toolbar">
      <MN />
      <RowActions />
      <MatrixActions />
    </div>
  )
}

export default Toolbar;
