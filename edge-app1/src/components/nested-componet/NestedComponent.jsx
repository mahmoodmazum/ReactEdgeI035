import React from "react";

// props.badge is a COMPONENT passed from the parent — we render it here
function NestedComponent(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>

      {props.badge && (
        <p>
          Role: <props.badge label="Student21" />
        </p>
      )}
    </div>
  );
}

export default NestedComponent;
