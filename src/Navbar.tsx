import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Button } from "@sprinklrjs/spaceweb/button";

import { useNavigate } from "react-router-dom";

import React from "react";

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="navigation-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h2">API Differences</Typography>
      <div className="navs">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("Done......................");
            navigate("/preferences");
          }}
        >
          <Button variant="secondary">Set Preferences</Button>
        </div>
      </div>
    </div>
  );
};
