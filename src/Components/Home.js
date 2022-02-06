import React from "react";
import DragAndDrop from "./DragAndDrop";
import TodoCreate from "./TodoCreate";
import TodoList from "./TodoList";

const Home = () => {
  return (
    <div>
      <TodoCreate />
      <DragAndDrop />
      <TodoList />
    </div>
  );
};

export default Home;
