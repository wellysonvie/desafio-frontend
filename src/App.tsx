import React from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Home />
      <Toaster />
    </div>
  );
}

export default App;
