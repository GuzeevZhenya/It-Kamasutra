import React, {ChangeEvent} from 'react';

type PropsType = {
  checked: boolean;
  callBack: (checkedValue: boolean) => void;
};

export const CheckBox = (props: PropsType) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.checked);
    props.callBack(e.currentTarget.checked);
  };
  return (
    <input type='checkbox' onChange={onChangeHandler} checked={props.checked} />
  );
};
