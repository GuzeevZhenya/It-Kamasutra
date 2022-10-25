import React, { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";


export type FilterValuType = "All" | "Active" | "Completed";

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
  ]);
  let [filteredValue, setFilteredValue] = useState("All");

  const removeTask = (id: number) => {
    const newArray = tasks.filter((el) => el.id !== id);
    setTasks(newArray);
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

  return (
    <div>
      <TodoList
        filteredTask={filteredTask}
        title="Wtat to Learn"
        tasks={afterFilterTasks}
        removeTask={removeTask}
      />
    </div>
  );
}

export default App;
