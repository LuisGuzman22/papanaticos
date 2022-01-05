import React from "react";
import { HeaderComponent } from "./components/common/Header";
import { HomePage } from "./components/pages/homePage";
import "./style.css";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <HomePage />
    </div>
  );
}

export default App;
