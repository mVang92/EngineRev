import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const DeleteBtn = props => (
  <button className="deleteBtn" {...props}>
    Delete
  </button>
);

export default DeleteBtn;
