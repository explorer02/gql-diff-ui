import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ShowSpaceSelect } from "./Select";
import { Box } from "@sprinklrjs/spaceweb/box";

// Preferences component to manage and display user preferences
export const Preferences: React.FC = () => {
  // // State to store preference choices fetched from the server
  const [preferenceChoices, setPreferenceChoices] = useState<Choice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (preferenceChoices.length === 0) {
      axios
        .get(
          "https://teams-bot-app-service.onrender.com/api/preferences/choices"
        )
        .then((response: AxiosResponse) => {
          // If the response is successful, update the state with fetched choices
          if (response.data?.success) {
            console.log(JSON.stringify(response.data.choices, null, 2));
            setPreferenceChoices(response.data.choices);
          } else {
            // Log the response in case of an unsuccessful request
            console.log(JSON.stringify(response, null, 2));
          }
          setLoading(false);
        });
    }
  }, [preferenceChoices]);

  return (
    <Box className="spr-ui-05 min-h-screen">
      <div className="preference-head spr-ui-05" style={{ paddingTop: "4rem" }}>
        {/* Render the ShowSpaceSelect component with the fetched preference choices */}
        {loading === false && <ShowSpaceSelect choices={preferenceChoices} />}
      </div>
    </Box>
  );
};
