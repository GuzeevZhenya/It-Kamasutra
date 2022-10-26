import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuType = "All" | "Active" | "Completed";

function App() {
  const [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
  ]);
  let [filteredValue, setFilteredValue] = useState("All");

  const removeTask = (id: string) => {
    const newArray = tasks.filter((el) => el.id !== id);
    setTasks(newArray);
  };

  const addTask = (title: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    setTasks([...tasks, newTask]);
  };

  let afterFilterTasks = tasks;
  if (filteredValue === "Active") {
    afterFilterTasks = tasks.filter((el) => !el.isDone);
  }

  if (filteredValue === "Completed") {
    afterFilterTasks = tasks.filter((el) => el.isDone);
  }

  const filteredTask = (filterValue: FilterValuType) => {
    setFilteredValue(filterValue);
  };

  console.log(tasks);
  return (
    <div>
      <TodoList
        filteredTask={filteredTask}
        title="Wtat to Learn"
        tasks={afterFilterTasks}
        removeTask={removeTask}
        addTask={addTask}
      />
    </div>
  );
}

export default App;
