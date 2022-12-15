import React, { useState, ChangeEvent, KeyboardEvent } from "react";

type EditTablePropsType = {
  title: string;
  changeTitle: (newTitle: string) => void;
};

export const EditTableSpan = (props: EditTablePropsType) => {
  const [isEditMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>(props.title);

  const onEditMode = () => {
    setEditMode(true);
  };
  
  const offEditMode = () => {
    setEditMode(false);
    props.changeTitle(title);
  };

  const setLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && offEditMode();
  };

  return isEditMode ? (
    <input
      value={title}
      onBlur={offEditMode}
      autoFocus
      onChange={setLocalTitle}
      onKeyDown={onKeyDownOffEditMode}
    />
  ) : (
    <span onDoubleClick={onEditMode}>{props.title}</span>
  );
};
