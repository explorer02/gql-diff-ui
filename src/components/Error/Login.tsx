import React from "react";
import { Typography } from "@sprinklrjs/spaceweb/typography";

export const LoginError: React.FC = () => {
  return (
    <Typography
      variant="h1"
      className="spr-support-error-text"
      style={{
        height: "100vh",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      Please Select Environment!
    </Typography>
  );
};
