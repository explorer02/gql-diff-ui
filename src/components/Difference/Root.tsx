import React, { useState, useEffect } from "react";
import { Box } from "@sprinklrjs/spaceweb/box";
import { DisplayEnvironment } from "./Environment";
import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "../../Hooks/store";
import { RootState } from "../../store";
import { Navigation } from "../../Navbar";
import { useNavigate } from "react-router-dom";

export const DisplayDifference: React.FC = () => {
  console.log("In Root.js");
  const userId: string = useAppSelector(
    (state: RootState) => state.user.value.userId
  );
  const [environments, setEnvironments] = useState<string[]>([]);
  const navigate = useNavigate();

  const [display, setDisplay] = useState<boolean>(false); // State to control the display of the Navigation component

  useEffect(() => {
    console.log("In Root.js -> UseEffect");
    if (environments.length === 0) {
      axios
        .post("https://teams-bot-app-service.onrender.com/api/environments", {
          userId,
        })
        .then((response: AxiosResponse) => {
          console.log("response", response.data);
          if (response?.data?.success === true) {
            setDisplay(true);
            // response?.data?.environments &&
            setEnvironments([...response.data.environments]);
          } else if (response.data.message === "login first") {
            // If the user needs to log in, navigate to the login error page
            navigate("/error/login");
          } else if (response.data.message === "set user preference first") {
            // If the user needs to set preferences, navigate to the preferences page
            navigate("/preferences");
          } else {
            // For any other errors, navigate to the 404 error page
            navigate("/error/404");
          }
        });
    }
  }, [userId]);

  console.log(environments);

  return (
    <div>
      {display && <Navigation />}
      <Box>
        {environments.map((environment, id) => (
          <div
            key={id}
            style={{
              border: "1px solid black",
              borderRadius: "12px",
              margin: "12px",
            }}
          >
            <Box className="px-4 py-3">
              <DisplayEnvironment environment={environment} />
            </Box>
          </div>
        ))}
      </Box>
    </div>
  );
};
