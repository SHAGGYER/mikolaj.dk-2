import React from "react";

function Select({ value, onChange, items, label, margin }) {
  if (!margin) margin = "normal";

  const wrapperConfig = {
    margin: {
      normal: "mb-4",
      none: "",
    },
  };

  return (
    <div className={wrapperConfig.margin[margin]}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        value={value}
        onChange={onChange}
        className={"select select-bordered w-full"}
      >
        {items.map((item, index) => (
          <option key={index} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
