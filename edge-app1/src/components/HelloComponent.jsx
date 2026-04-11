import React from "react";
import NestedComponent from "./nested-componet/NestedComponent";
import Badge from "./nested-componet/Badge";

function HelloComponent() {
  return (
    <div>
      <h1>Hello, CUET from HelloComponent!</h1>
      <NestedComponent name="John" age={25} badge={Badge} />
    </div>
  );
}

export default HelloComponent;
