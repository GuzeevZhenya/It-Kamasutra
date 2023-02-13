//Преобразовать стэйт
//Вернуть новый стэйт

import React from "react";
import { v1 } from "uuid";
import { FilterValuesType, TasksStateType, TodoListType } from "../App";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatuskActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitlekActionType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatuskActionType
  | ChangeTaskTitlekActionType;

export const taskReducer = (state: TasksStateType, action: ActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          (t) => t.id !== action.taskId
        ),
      };
    }

    case "ADD-TASK": {
      return {
        ...state,
        [action.todoListId]: [
          { id: v1(), title: action.title, isDone: false },
          ...state[action.todoListId],
        ],
      };
    }

    case "CHANGE-TASK-STATUS": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId
            ? {
                ...t,
                isDone: action.isDone,
              }
            : t
        ),
      };
    }

    case "CHANGE-TASK-TITLE": {
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((t) =>
          t.id === action.taskId ? { ...t, title: action.title } : t
        ),
      };
    }

    default:
      return state;
  }
};

export const removeTaskAC = (taskId: string, todoListId: string) =>
  ({
    type: "REMOVE-TASK",
    taskId,
    todoListId,
  } as const);

export const addTaskAC = (title: string, todoListId: string) =>
  ({
    type: "ADD-TASK",
    todoListId,
    title,
  } as const);

export const changeTaskStatusAC = (
  taskId: string,
  isDone: boolean,
  todoListId: string
) =>
  ({
    type: "CHANGE-TASK-STATUS",
    todoListId,
    isDone,
    taskId,
  } as const);

export const changeTaskTitleAC = (
  taskId: string,
  title: string,
  todoListId: string
) =>
  ({
    type: "CHANGE-TASK-TITLE",
    todoListId,
    title,
    taskId,
  } as const);
