import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ShowSpaceSelect } from "./Select";

// Preferences component to manage and display user preferences
export const Preferences: React.FC = () => {
  // State to store preference choices fetched from the server
  const [preferenceChoices, setPreferenceChoices] = useState<Choice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // useEffect hook to fetch preference choices when the component mounts
  useEffect(() => {
    // Check if preferenceChoices is empty before making the API call
    if (preferenceChoices.length === 0) {
      // Make a GET request to fetch preference choices from the server
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
  }, [preferenceChoices]); // Dependency array ensures this effect runs only when preferenceChoices changes

  return (
    <div className="preference-head">
      {/* Render the ShowSpaceSelect component with the fetched preference choices */}
      {loading === false && <ShowSpaceSelect choices={preferenceChoices} />}
    </div>
  );
};
