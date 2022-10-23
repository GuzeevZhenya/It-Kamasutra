import React from 'react';

type TodoListPropsType = {
  title: string;
  tasks: Array<ObjectType>;
  removeTask: (id: number) => void;
  filteredTask: (filterValue: string) => void;
};

type ObjectType = {
  id: number;
  title: string;
  isDone: boolean;
};

export const TodoList = (props: TodoListPropsType) => {
  const taskList = props.tasks.map((item) => (
    <li>
      <button onClick={() => props.removeTask(item.id)}>X</button>
      <input type='checkbox' checked={item.isDone} /> <span>{item.title}</span>
    </li>
  ));
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>{taskList}</ul>
      <div>
        <button onClick={() => props.filteredTask('all')}>All</button>
        <button onClick={() => props.filteredTask('active')}>Active</button>
        <button onClick={() => props.filteredTask('completed')}>
          Completed
        </button>
      </div>
    </div>
  );
};
