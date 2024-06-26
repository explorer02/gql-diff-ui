// Essentials
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import { Collapsible } from "../Utils/Collapsible";

// Redux Tools
import { RootState } from "../../store";

// Components
import { DisplayNode } from "./Node";
import { useAppSelector } from "../../Hooks/store";

import { NavigateFunction, useNavigate } from "react-router-dom";

//@ts-expect-error --no-type-module-found
import format from "date-format";

export const DisplayEnvironment: React.FC<{ environment: string }> = ({
  environment,
}) => {
  const navigate: NavigateFunction = useNavigate();
  const userId: string = useAppSelector(
    (state: RootState) => state.user.value.userId
  ); // Get the userId from Redux store

  const [changes, setChanges] = useState<Changes>({}); // State to store the changes;

  useEffect(() => {
    // Fetch changes data from the API when the component mounts
    axios
      .post("https://teams-bot-app-service.onrender.com/api/changes", {
        userId,
        environment,
      })
      .then((response: AxiosResponse) => {
        if (response.data.success === true) {
          // If the response is successful, update the state
          console.log(response.data.changes);
          setChanges({
            ...response.data.changes,
            timeStamp: response.data.timeStamp,
          });
        } else {
          // For any other errors, navigate to the 404 error page
          navigate("/error/404");
        }
      });
  }, []); // Dependency array to re-run effect if changes state updates

  return (
    <div className="Home">
      <Collapsible
        title={`Environment: ${environment} ${
          changes.timeStamp
            ? `  (${format(
                "dd-MM-yyyy hh:mm:ss",
                new Date(changes.timeStamp)
              )})`
            : ""
        }`}
      >
        <div
          style={
            changes?.paths?.length && Object.keys(changes.paths).length > 0
              ? { marginTop: "12px" }
              : {}
          }
        >
          <div className="main-diff">
            {changes?.paths &&
              Object.keys(changes.paths).map((node) => {
                return (
                  changes.paths &&
                  changes.paths[node] &&
                  changes.changedValues && (
                    <div
                      className="p-5"
                      style={{
                        border: "1px solid black",
                        borderRadius: "12px",
                        margin: "0px 14px 12px 14px",
                      }}
                    >
                      <DisplayNode
                        name={node}
                        pathsTo={changes?.paths[node]}
                        nodeChanges={changes?.changedValues}
                      />
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};
