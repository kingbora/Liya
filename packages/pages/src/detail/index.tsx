import React from 'react';
import { DetailActions, DetailState } from './model';
import withView, { DetailController } from './controller';
import { useCtrl, useActions, useSelector} from "@liya/core";
import style from "./style.module.less";
import OrderList from './widgets/OrderList';
import UserInfo from './widgets/UserInfo';

function DetailView() {
  const ctrl = useCtrl<DetailController>();
  const { count, name } = useSelector<DetailState, {
    count: number;
    name: string;
  }>((state) => ({
    count: state.count,
    name: state.name,
  }));
  const actions = useActions<DetailActions>();

  React.useEffect(() => {
    console.log(style.test);
  }, []);

  console.log("yeah!, i'am rendered!");

  return (
    <div>
      <button onClick={ctrl.handleDoSomething}>do something</button>
      <button onClick={actions.decrement}>todo</button>
      <button onClick={ctrl.handleDoSamething}>do samething</button>
      <button onClick={ctrl.pop}>back</button>
      <input value={name} onChange={e => {
        actions.changeName(e.target.value);
      }} />
      <div className={style.red}>{count}</div>
      <OrderList />
      <UserInfo />
    </div>
  );
}

export default withView(DetailView);
