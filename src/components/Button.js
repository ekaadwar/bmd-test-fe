import React from "react";

export const ButtonPrimary = ({ text = "button", onClick = () => {} }) => {
  return (
    <button
      className="flex flex-row items-center justiry-center h-10 px-2 bg-blue-500 active:bg-blue-700 text-white text-sm rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const ButtonAction = ({
  content = <div />,
  value = "",
  onClick = () => {},
}) => {
  return (
    <button
      className="button-action flex flex-row items-center justify-center bg-blue-500 active:bg-blue-700 text-white h-8 px-2 w-full sm:w-auto rounded-md"
      value={value}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export const ButtonActionWarning = ({
  content = <div />,
  value = "",
  onClick = () => {},
}) => {
  return (
    <button
      className="button-action flex flex-row items-center justify-center bg-amber-700 active:bg-amber-900 text-white h-8 px-2 w-full sm:w-auto rounded-md"
      value={value}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export const ButtonActionImportant = ({
  content = <div />,
  value = "",
  onClick = () => {},
}) => {
  return (
    <button
      className="button-action flex flex-row items-center justify-center bg-blue-700 active:bg-blue-900 text-white h-8 px-2 w-full sm:w-auto rounded-md"
      value={value}
      onClick={onClick}
    >
      {content}
    </button>
  );
};
