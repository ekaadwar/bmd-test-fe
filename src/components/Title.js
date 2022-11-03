import React from "react";

export const TitlePage = ({ text = "title page" }) => {
  return <h1 className="text-3xl font-light text-gray-700">{text}</h1>;
};

export const TitleModal = ({ text = "title page" }) => {
  return <h1 className="text-2xl font-light text-gray-700">{text}</h1>;
};
