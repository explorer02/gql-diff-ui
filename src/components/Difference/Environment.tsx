// Essentials
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Collapsible } from "../Utils/Collapsible";
// Redux Tools
import { RootState } from "../../store";
// Components
import { DisplayNode } from "./Node";
import { useAppSelector } from "../../Hooks/store";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { formatDate } from "../Utils/Date";

export const DisplayEnvironment: React.FC<{ environment: string }> = ({
  environment,
}) => {
  console.log("In Environment.tsx");
  const navigate: NavigateFunction = useNavigate();
  const userId: string = useAppSelector(
    (state: RootState) => state.user.value.userId
  ); // Get the userId from Redux store

  const [changes, setChanges] = useState<Changes>({}); // State to store the changes;

  useEffect(() => {
    console.log("In Environment.tsx -> useEffect");
    if (!changes?.changedValues) {
      axios
        .post(`${process.env.REACT_APP_API_DOMAIN}/api/changes`, {
          userId,
          environment,
        })
        .then((response: AxiosResponse) => {
          if (response.data.success === true) {
            // If the response is successful, update the state
            console.log("Environment: ", environment);
            console.log("respnse of /api/changes/ -> ", response.data.changes);
            setChanges({
              ...response.data.changes,
              timeStamp: response.data.timeStamp,
            });
          } else {
            // For any other errors, navigate to the 404 error page
            navigate("/error/404");
          }
        });
    }
  }, []);

  return (
    <>
      <div
        className="Environment"
        style={{
          padding: "12px 24px 12px 24px",
          border: "1px solid #DBDBDB",
          borderRadius: "12px",
          marginTop: "12px",
        }}
      >
        <Collapsible
          title={
            <EnvironmentTitle
              title={environment}
              timeStamp={changes.timeStamp}
            />
          }
        >
          {changes.paths && Object.keys(changes.paths).length > 0 && (
            <div
              className="main-diff"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "14px",
                padding: "12px 0px",
              }}
            >
              {changes?.paths &&
                Object.keys(changes.paths).map((node) => {
                  return (
                    changes.paths &&
                    changes.paths[node] &&
                    changes.changedValues && (
                      <DisplayNode
                        name={node}
                        pathsTo={changes?.paths[node]}
                        nodeChanges={changes?.changedValues}
                      />
                    )
                  );
                })}
            </div>
          )}
        </Collapsible>
      </div>
    </>
  );
};

const getLabel: (environment: string) => string = (environment: string) => {
  return environment === "lite.qa6" ? "Lite QA6" : "Lite";
};

const EnvironmentTitle: React.FC<{
  title: string;
  timeStamp: string | undefined;
}> = ({ title, timeStamp }) => {
  return (
    <Typography>
      <div>
        <span style={{ fontWeight: "600", fontSize: "16px" }}>
          Environment : {getLabel(title)}
        </span>
        <span style={{ fontSize: "14px", color: "#646470" }}>
          {" "}
          {timeStamp && formatDate(new Date(timeStamp))}
        </span>
      </div>
    </Typography>
  );
};
