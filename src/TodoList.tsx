import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType, TaskType } from "./App";
import { EditTableSpan } from "./EditTableSpan";
//rsc
// typescript =>
// 1. Variable
// 2. Param of func
// 3. Return of func

type TodoListPropsType = {
  todoListId: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  removeTask: (taskId: string, todoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todoListId: string
  ) => void;
  changeTodoListFilter: (
    nextFilterValue: FilterValuesType,
    todoListId: string
  ) => void;
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
  changeTodoListTitle: (title: string, todoListId: string) => void;
};

const TodoList = (props: TodoListPropsType) => {
  const tasksListItems = props.tasks.length ? (
    <ul>
      {props.tasks.map((task) => {
        const removeTask = () => props.removeTask(task.id, props.todoListId);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) =>
          props.changeTaskStatus(
            task.id,
            e.currentTarget.checked,
            props.todoListId
          );

        const changeTaskTitle = (title: string) => {
          props.changeTaskTitle(task.id, title, props.todoListId);
        };

        return (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.isDone}
              onChange={changeTaskStatus}
            />
            <div
              style={{ display: "inline-block" }}
              className={task.isDone ? "task-done" : ""}
            >
              <EditTableSpan title={task.title} changeTitle={changeTaskTitle} />
            </div>
            <button onClick={removeTask}>x</button>
          </li>
        );
      })}
    </ul>
  ) : (
    <span>List is empty</span>
  );

  const onClickHandlerCreator = (filter: FilterValuesType) => () =>
    props.changeTodoListFilter(filter, props.todoListId);

  const removeTodoList = () => {
    props.removeTodoList(props.todoListId);
  };

  const addNewTask = (title: string) => {
    props.addTask(title, props.todoListId);
  };
  const changeTodoLisetTitle = (title: string) => {
    props.changeTodoListTitle(title, props.todoListId);
  };

  return (
    <div>
      <div>
        <EditTableSpan title={props.title} changeTitle={changeTodoLisetTitle} />
        <button onClick={() => removeTodoList()}>x</button>
      </div>
      <AddItemForm addItem={addNewTask} />

      {tasksListItems}
      <div>
        <button
          className={props.filter === "all" ? "btn-active" : ""}
          onClick={onClickHandlerCreator("all")}
        >
          All
        </button>
        <button
          className={props.filter === "active" ? "btn-active" : ""}
          onClick={onClickHandlerCreator("active")}
        >
          Active
        </button>
        <button
          className={props.filter === "completed" ? "btn-active" : ""}
          onClick={onClickHandlerCreator("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default TodoList;
