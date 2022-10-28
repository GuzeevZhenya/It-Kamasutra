import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuType } from "./App";
import { Button } from "./Button";

type TodoListPropsType = {
  title: string;
  tasks: Array<ObjectType>;
  removeTask: (id: string) => void;
  filteredTask: (filterValue: FilterValuType) => void;
  addTask: (title: string) => void;
};

type ObjectType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const onKeyInputPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      props.addTask(newTaskTitle);
    }
  };

  const removeTaskHandler = (tId: string) => {
    props.removeTask(tId);
  };

  const addTask = () => {
    props.addTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const changeFilterActiveHandler = (filterValue: FilterValuType) => {
    props.filteredTask(filterValue);
  };

  const taskList = props.tasks.map((item) => {
    return (
      <li>
        {/* <button onClick={() => props.removeTask(item.id)}>X</button> */}
        <Button name={"x"} callBack={() => removeTaskHandler(item.id)} />
        <input type="checkbox" checked={item.isDone} />
        <span>{item.title}</span>
      </li>
    );
  });
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={(event) => onChangeInput(event)}
          onKeyPress={(event) => onKeyInputPress(event)}
        />
        {/* <button onClick={addTask}>+</button> */}
        <Button callBack={addTask} name={"add"} />
      </div>
      <ul>{taskList}</ul>
      <div>
        <button onClick={() => changeFilterActiveHandler("All")}>All</button>
        <button onClick={() => changeFilterActiveHandler("Active")}>
          Active
        </button>
        <button onClick={() => changeFilterActiveHandler("Completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
