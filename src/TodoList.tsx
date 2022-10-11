import React from 'react';

type TodoListPropsType = {
  title1?: string;
  title2?: string;
  myNumber?: number;
  tasks: Array<ObjectType>;
};

type ObjectType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TodoList = (props: TodoListPropsType) => {
  const taskList = props.tasks.map((item) => (
    <li>
      <input type='checkbox' checked={item.isDone} /> <span>{item.title}</span>
    </li>
  ));
  return (
    <div>
      <div>
        <h3>{props.title1}</h3>
        <p>{props.myNumber}</p>
        <div>
          <input />
          <button>+</button>
        </div>
        <ul>{taskList}</ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};
