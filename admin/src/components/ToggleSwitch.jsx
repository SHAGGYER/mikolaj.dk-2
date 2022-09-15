import React from "react";
import "./Switch.css";

const Switch = ({ checked, onChange }) => {
  return (
    <>
      <input
        checked={checked}
        onChange={onChange}
        className="react-switch-checkbox"
        type="checkbox"
      />
      <label
        style={{ background: checked && "#06D6A0" }}
        className="react-switch-label"
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;
