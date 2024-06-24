import React, { useEffect } from "react";
import "./App.css";
import * as msTeams from "@microsoft/teams-js";

function App() {
  console.log("App Entered");
  useEffect(() => {
    msTeams.app.initialize().then(() => {
      console.log("App Initialized");
    });
  });
  return (
    <div className="App">
      <h1>Hello React</h1>
    </div>
  );
}

export default App;
