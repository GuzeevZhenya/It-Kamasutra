//Преобразовать стэйт
//Вернуть новый стэйт

import React from "react";
import { TodoListType } from "../App";

const REMOVE_TODOLIST = "REMOVE-TODOLIST";

type removeTodoListAT = {
  type: typeof REMOVE_TODOLIST;
  id: string;
};

export const todolistReducer = (
  todolists: Array<TodoListType>,
  action: any
): Array<TodoListType> => {
  switch (action.type) {
    case REMOVE_TODOLIST: {
      return todolists.filter((tl) => tl.id !== action.id);
    }

    default:
      return todolists;
  }
};
