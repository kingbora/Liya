import React from "react";
import { StoreContext } from "../../base";

export default function useSelector() {
  const store = React.useContext(StoreContext);
}