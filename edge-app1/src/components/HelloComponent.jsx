import React from "react";
import NestedComponent from "./nested-componet/NestedComponent";
import Badge from "./nested-componet/Badge";
import HookUseState from "./HookUseState";

function HelloComponent() {
  return (
    <div>
      {/* <h1>Hello, CUET from HelloComponent!</h1>
      <NestedComponent name="John" age={25} badge={Badge} /> */}
      <HookUseState />
    </div>
  );
}

export default HelloComponent;
