import React from "react";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { NoCompetitorIcon } from "../Utils/Icons";
import { Icon } from "@sprinklrjs/spaceweb/icon";
import { Box } from "@sprinklrjs/spaceweb/box";

export const Error404: React.FC = () => {
  return (
    <Box className="flex flex-col justify-center h-screen spr-ui-05">
      <Box className="self-center">
        <Icon size={40}>
          <NoCompetitorIcon />
        </Icon>
      </Box>
      <Typography variant="h5" className="text-center">
        Something Went Wrong...
      </Typography>
    </Box>
  );
};
