import React, { useId } from "react";

function TextArea({ label, value, onChange, error, margin }) {
  if (!margin) margin = "normal";

  const id = useId();

  const containerConfig = {
    margin: {
      normal: "mb-4",
      none: "",
    },
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={onChange}
        id={id}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        Floating outlined
      </label>
    </div>
  );
}

export default TextArea;
