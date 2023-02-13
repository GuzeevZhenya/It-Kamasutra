//Преобразовать стэйт
//Вернуть новый стэйт

import React from "react";
import { FilterValuesType, TodoListType } from "../App";
import { v1 } from "uuid";

export const REMOVE_TODOLIST = "REMOVE-TODOLIST" as const;
export const ADD_TODOLIST = "ADD-TODOLIST" as const;
export const CHANGE_FILTER = "CHANGE_FILTER" as const;
export const CHANGE_TITLE = "CHANGE_TITLE" as const;

type RemoveTodoListAT = {
  type: typeof REMOVE_TODOLIST;
  id: string;
};

type ChangeListFilterAT = {
  type: typeof CHANGE_FILTER;
  id: string;
  filter: FilterValuesType;
};

type AddTodoListAT = {
  type: typeof ADD_TODOLIST;
  title: string;
};

type ChangeTodolistsTitleAT = {
  type: typeof CHANGE_TITLE;
  id: string;
  title: string;
};

type ActiveType =
  | RemoveTodoListAT
  | ChangeListFilterAT
  | AddTodoListAT
  | ChangeTodolistsTitleAT;

export const todolistReducer = (
  todolists: Array<TodoListType>,
  action: ActiveType
) => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return todolists.filter((tl) => tl.id !== action.id);
    }

    case ADD_TODOLIST: {
      const newTodoList: TodoListType = {
        id: v1(),
        title: action.title,
        filter: "all",
      };
      return [...todolists, newTodoList];
    }

    case CHANGE_TITLE:
      return todolists.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );

    case CHANGE_FILTER:
      return todolists.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );

    default:
      return todolists;
  }
};

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => ({
  type: REMOVE_TODOLIST,
  id,
});

export const AddTodoListAC = (title: string): AddTodoListAT => ({
  type: ADD_TODOLIST,
  title,
});

export const ChangeTodoListAC = (
  id: string,
  title: string
): ChangeTodolistsTitleAT => ({
  type: CHANGE_TITLE,
  title,
  id,
});

export const ChangeListFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeListFilterAT => ({
  type: CHANGE_FILTER,
  filter,
  id,
});
