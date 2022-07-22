import React from "react";
import withView from "./controller";

function HomeView() {
  return (
    <div>
      <button>jump</button>
    </div>
  );
}

export default withView(HomeView);