import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { FilterValueType } from "./App";
import { Button } from "./Button";

type TodoListPropsType = {
  title: string;
  tasks: Array<ObjectType>;
  removeTask: (id: string) => void;
  filteredTask: (filterValue: FilterValueType) => void;
  addTask: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValueType;
};

type ObjectType = {
  id: string;
  title: string;
  isDone: boolean;
};

export const TodoList = (props: TodoListPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  let [error, setError] = useState<string | null>(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.target.value);
  };

  const onKeyInputPress = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.charCode === 13) {
      props.addTask(newTaskTitle);
    }
  };

  const removeTaskHandler = (tId: string) => {
    props.removeTask(tId);
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const changeFilterActiveHandler = (filterValue: FilterValueType) => {
    props.filteredTask(filterValue);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    props.changeStatus(id, e.currentTarget.checked);
  };

  const taskList = props.tasks.map((item) => {
    return (
      <li className={item.isDone ? "is-done" : ""}>
        {/* <button onClick={() => props.removeTask(item.id)}>X</button> */}
        <Button name={"x"} callBack={() => removeTaskHandler(item.id)} />
        <input
          type="checkbox"
          onChange={(e) => onChangeHandler(e, item.id)}
          checked={item.isDone}
        />
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
          className={error ? "error" : ""}
          onChange={(event) => onChangeInput(event)}
          onKeyPress={(event) => onKeyInputPress(event)}
        />

        {error && <div className="error-message">{error}</div>}

        <Button callBack={addTask} name={"add"} />
      </div>
      <ul>{taskList}</ul>
      <div>
        <Button
          className={props.filter === "All" ? "active-filter" : ""}
          name={"All"}
          callBack={() => changeFilterActiveHandler("All")}
        />
        <Button
          className={props.filter === "Active" ? "active-filter" : ""}
          name={"Active"}
          callBack={() => changeFilterActiveHandler("Active")}
        />
        <Button
          className={props.filter === "Completed" ? "active-filter" : ""}
          name={"Completed"}
          callBack={() => changeFilterActiveHandler("Completed")}
        />
      </div>
    </div>
  );
};
