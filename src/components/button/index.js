import React from "react";
import "./index.css";

export const Button = ({ value, onClick, id, className, text }) => {
  return (
    <button
      className={"button " + className}
      value={value}
      onClick={onClick}
      id={id}
    >
      {text}
    </button>
  );
};
