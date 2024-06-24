import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import { app } from "@microsoft/teams-js";

/**
 * Implementation of the debug content page
 */
export default function App() {
  const [{ inTeams, theme, context }] = useTeams();
  const [userId, setUserId] = useState<string | undefined>();

  app.initialize().then(() => {
    console.log("Initialized");
  });

  useEffect(() => {
    if (inTeams === true) {
      app.notifySuccess();
    } else {
      console.log(inTeams);
      console.log(context);
      setUserId("Not in Microsoft Teams");
    }
  }, [inTeams]);

  useEffect(() => {
    if (context) {
      setUserId(context?.user?.id);
    }
  }, [context]);

  /**
   * The render() method to create the UI of the tab
   */
  return <h1>user id - {userId}</h1>;
}
