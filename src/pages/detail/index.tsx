import React from 'react';
import { DetailActions, DetailState } from './model';
import withView, { DetailController } from './controller';
import useCtrl from '../../utils/hooks/useCtrl';
import useActions from '../../utils/hooks/useAction';
import useModelState from '../../utils/hooks/useModelState';
import style from './style.module.less';
import OrderList from './widgets/OrderList';
import UserInfo from './widgets/UserInfo';

function DetailView() {
  const ctrl = useCtrl<DetailController>();
  const { count } = useModelState<DetailState>();
  const actions = useActions<DetailActions>();

  React.useEffect(() => {
    console.log(style.test);
  }, []);

  console.log("yeah!, i'am rendered!");

  return (
    <div>
      <button onClick={ctrl.handleDoSomething}>do something</button>
      <button onClick={() => actions.decrement()}>todo</button>
      <button onClick={ctrl.handleDoSamething}>do samething</button>
      <div className={style.red}>{count}</div>
      <OrderList />
      <UserInfo />
    </div>
  );
}

export default withView(DetailView);
