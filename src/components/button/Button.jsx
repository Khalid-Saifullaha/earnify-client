import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button className={`py-2 px-4 rounded ${className}`} {...props}>
      {children}
    </button>
  );
};
