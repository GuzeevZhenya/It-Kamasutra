import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import React from "react";
import { EditableSpan } from "./EditableSpan";
import { TaskType } from "./Todolist";

export type TaskPropsType = {
  task: TaskType;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Task = ({
  task,
  removeTask,
  changeTaskStatus,
  changeTodolistTitle,
}: TaskPropsType) => {
  return (
    <div key={t.id} className={t.isDone ? "is-done" : ""}>
      <Checkbox checked={t.isDone} color="primary" onChange={onChangeHandler} />

      <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
};
