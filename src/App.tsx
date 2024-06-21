// Essentials
import "./App.css";
import { useState } from "react";
import * as msTeams from "@microsoft/teams-js";

// Components
import { DisplayDifference } from "./components/Difference/Root";
import { Preferences } from "./components/Preference/Preference";
import { LoginError } from "./components/Error/Login";
import { Error404 } from "./components/Error/Error";

// Redux Tools
import { AppDispatch, login, RootState } from "./store";
import { useAppDispatch, useAppSelector } from "./Hooks/store";

function App(): JSX.Element {
  const [intialized, setInitialized] = useState<boolean>(false); // State to track if the app is initialized

  const pageUrl: string = useAppSelector(
    (state: RootState) => state.route.value.url
  ); // Get the current page URL from Redux store
  const dispatch: AppDispatch = useAppDispatch(); // Get the dispatch function from Redux

  // Initialize Microsoft Teams app and get the user-id from context
  console.log("Entered App.tsx");
  // msTeams.app.initialize().then(() => {
  //   console.log("App Initialized");
  //   msTeams.app.getContext().then((context: msTeams.app.Context) => {
  //     console.log("Context Retrieved");
  //     dispatch(login({ userId: context?.user?.id })); // Dispatch the login action with user ID (Save the user id as global state)
  //     setInitialized(true); // Set the initialized state to true
  //   });
  // });

  setTimeout(() => msTeams.app.initialize(), 10000);

  msTeams.app.getContext().then((context: msTeams.app.Context) => {
    console.log("Context Retrieved");
    dispatch(login({ userId: context?.user?.id })); // Dispatch the login action with user ID (Save the user id as global state)
    setInitialized(true); // Set the initialized state to true
  });

  return (
    <div className="App">
      <div className="route-display">
        {/* Conditionally render components based on initialization status and current page URL */}
        {intialized && pageUrl === "/" && <DisplayDifference />}
        {intialized && pageUrl === "/preferences" && <Preferences />}
        {intialized && pageUrl === "/error/login" && <LoginError />}
        {intialized && pageUrl === "/error/404" && <Error404 />}
      </div>
    </div>
  );
}

export default App;
