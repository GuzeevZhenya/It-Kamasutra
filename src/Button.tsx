import React from "react";

type ButtonPropsType = {
  name: string;
  callBack: () => void;
  className?: string;
};

export const Button = (props: ButtonPropsType) => {
  const { name, callBack, className } = props;
  const onClickHandler = () => {
    callBack();
  };

  return (
    <button className={className} onClick={onClickHandler}>
      {name}
    </button>
  );
};
