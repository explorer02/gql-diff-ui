import React from "react";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { NoCompetitorIcon } from "../Utils/Icons";
import { Icon } from "@sprinklrjs/spaceweb/icon";
import { Box } from "@sprinklrjs/spaceweb/box";

// TODO: Button to navigate to Preferences

export const LoginError: React.FC = () => {
  return (
    <Box className="flex flex-col justify-center h-screen spr-ui-05">
      <Box className="self-center mb-4">
        <Icon size={40}>
          <NoCompetitorIcon />
        </Icon>
      </Box>
      <Typography variant="h5" className="text-center">
        No Environment Selected!
      </Typography>
    </Box>
  );
};
