import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Button } from "@sprinklrjs/spaceweb/button";

import { useNavigate } from "react-router-dom";

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      className="navigation-bar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
      }}
    >
      <Typography variant="h2">Detect GQL Change</Typography>
      <div className="navs">
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            console.log("Done......................");
            navigate("/preferences");
          }}
        >
          <Button variant="tertiary">Set Preferences</Button>
        </div>
      </div>
    </div>
  );
};
