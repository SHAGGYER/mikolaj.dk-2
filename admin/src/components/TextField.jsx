import React from "react";

function TextField({ label, value, onChange, type, error, margin }) {
  if (!margin) margin = "normal";

  const containerConfig = {
    margin: {
      normal: "mb-4",
      none: "",
    },
  };

  return (
    <div className={"form-control w-full " + containerConfig.margin[margin]}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type={type ? type : "text"}
        value={value}
        onChange={onChange}
        className="p-3 outline-none border border-gray-400 w-full"
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-red-400">{error}</span>
        </label>
      )}
    </div>
  );
}

export default TextField;
