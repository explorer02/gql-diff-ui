// Essentials
import "./App.css";
import * as msTeams from "@microsoft/teams-js";

// Components
import { DisplayDifference } from "./components/Difference/Root";
import { Preferences } from "./components/Preference/Preference";
import { LoginError } from "./components/Error/Login";
import { Error404 } from "./components/Error/Error";

// Redux Tools
import { AppDispatch, login } from "./store";
import { useAppDispatch } from "./Hooks/store";

// React Utilities
import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import React from "react";

function App(): JSX.Element {
  console.log("In App.tsx");

  const navigate = useNavigate(); // navigate hook of router for navigating through router
  const dispatch: AppDispatch = useAppDispatch(); // Get the dispatch function from Redux

  // Initialize Microsoft Teams app and get the user-id from context
  useEffect(() => {
    msTeams.app
      .initialize()
      .then(() => {
        console.log("Ms Teams App Initialized");
        msTeams.app.getContext().then((context: msTeams.app.Context) => {
          console.log("Context Retrieved");
          dispatch(login({ userId: context?.user?.id })); // Dispatch the login action with user ID (Save the user id as global state)
          navigate("/changes");
        });
      })
      .catch((error) => {
        console.log("MS Teams App Initialization Error");
        console.error(error);
        navigate("/changes");
      });
  }, []);

  return (
    <div
      className="App"
      style={{ paddingLeft: "24px", paddingRight: "24px", paddingTop: "12px" }}
    >
      <Routes>
        <Route path="/" element={<div></div>} />
        <Route path="/changes" element={<DisplayDifference />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/error/login" element={<LoginError />} />
        <Route path="/error/404" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
