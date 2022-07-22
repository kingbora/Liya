import React from "react";
import { DetailActions, DetailState } from "./model";
import withView, { DetailController } from "./controller";
import useCtrl from "../../utils/hooks/useCtrl";
import useActions from "../../utils/hooks/useAction";
import useModelState from "../../utils/hooks/useModelState";
import style from "./style.module.less";

function DetailView() {
  const ctrl = useCtrl<DetailController>();
  const { count } = useModelState<DetailState>();
  const actions = useActions<DetailActions>();

  React.useEffect(() => {
    console.log(style.md);
  }, []);

  return (
    <div>
      <button onClick={ctrl.handleDoSomething}>do something</button>
      <button onClick={() => actions.decrement()}>todo</button>
      <div className={style.red}>{count}</div>
    </div>
  );
}

export default withView(DetailView);