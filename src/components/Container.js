import React from "react";

export const Container = ({ content = <p>this is contents</p> }) => {
  return <div className="container mx-auto w-full px-10">{content}</div>;
};

export const ContainerHighFull = ({ content = <p>this is contents</p> }) => {
  return (
    <div className="container h-full w-full mx-auto px-10 bg-red-100">
      {content}
    </div>
  );
};
