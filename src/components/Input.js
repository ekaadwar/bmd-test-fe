import React from "react";

export const InputAuth = ({
  type = "text",
  label = "Text",
  placeholder = "",
  value = "",
  onChange = () => {},
}) => {
  return (
    <div>
      <label className="text-gray-700">{label}</label>
      <input
        className="w-full border border-gray-300 h-10 flex items-center px-2 focus:outline-none rounded-md"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
