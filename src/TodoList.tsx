import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValuType } from "./App";

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
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const onChangeInputPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13) {
      props.addTask(newTaskTitle);
    }
  };

  const taskList = props.tasks.map((item) => {
    return (
      <li>
        <button onClick={() => props.removeTask(item.id)}>X</button>
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
          onKeyPress={(event) => onChangeInputPress(event)}
        />
        <button
          onClick={() => {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
          }}
        >
          +
        </button>
      </div>
      <ul>{taskList}</ul>
      <div>
        <button onClick={() => props.filteredTask("All")}>All</button>
        <button onClick={() => props.filteredTask("Active")}>Active</button>
        <button onClick={() => props.filteredTask("Completed")}>
          Completed
        </button>
      </div>
    </div>
  );
};
