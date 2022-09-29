import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <Outlet />
    </div>
  );
}

export default App;
