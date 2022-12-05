import React, { useRef, useState } from "react";
import "./index.css";

export const Button = ({ value, onClick, bg, className }) => {
  return (
    <input
      className={"button " + className}
      type={"button"}
      value={value}
      onClick={onClick}
    />
  );
};
