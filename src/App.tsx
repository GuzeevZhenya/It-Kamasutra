import React, {useState} from 'react';
import './App.css';
import {TodoList} from './TodoList';

function App() {
  const [tasks, setTasks] = useState([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
  ]);

  const removeTask = (id: number) => {
    const newArray = tasks.filter((el) => el.id !== id);

    setTasks(newArray);
  };

  let afterFilterTasks = tasks.filter((el) => !el.isDone);

  const filteredTask = (filterValue: string) => {
    console.log(filterValue);
  };

  return (
    <div>
      <TodoList
        filteredTask={filteredTask}
        title='Wtat to Learn'
        tasks={afterFilterTasks}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
