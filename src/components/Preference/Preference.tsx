import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { ShowSpaceSelect } from "./Select";
import { Box } from "@sprinklrjs/spaceweb/box";
import { useAppSelector } from "../../Hooks/store";
import { AppDispatch, RootState } from "../../store";
import { Root } from "react-dom/client";
import { Option, Options, Value } from "@sprinklrjs/spaceweb/select";

// Preferences component to manage and display user preferences

function getPreferenceValue(preferences: Preferences): Value {
  let preferencesOptions: Value = [];

  Object.keys(preferences).map((environment: string) => {
    preferences[environment].map((choice: string) => {
      const currentChoiceOption: Option = {
        label: choice,
        id: choice + "#" + environment,
        environment: environment,
      };
      preferencesOptions = [...preferencesOptions, currentChoiceOption];
    });
  });

  return preferencesOptions;
}

export const Preferences: React.FC = () => {
  console.log("In Preferences");
  // // State to store preference choices fetched from the server
  const [preferenceChoices, setPreferenceChoices] = useState<Choice[]>([]);
  const [oldPreferences, setOldPreferences] = useState<Value>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userId: string = useAppSelector(
    (state: RootState) => state.user.value.userId
  );

  useEffect(() => {
    console.log("In Preferences -> UseEffect");
    if (preferenceChoices.length === 0) {
      axios
        .post(`${process.env.REACT_APP_API_DOMAIN}/api/preferences/choices`, {
          userId: userId,
        })
        .then((response: AxiosResponse) => {
          console.log("In Preference.tsx -> Axios-Response");
          // If the response is successful, update the state with fetched choices
          if (response.data?.success) {
            console.log(
              "response: ",
              JSON.stringify(response.data.choices, null, 2)
            );

            const { preferences } = response.data;

            setPreferenceChoices(response.data.choices);
            setOldPreferences(getPreferenceValue(preferences));
          } else {
            // Log the response in case of an unsuccessful request
            console.log(JSON.stringify(response, null, 2));
          }
          setLoading(false);
        });
    }
  }, []);

  return (
    <Box className="spr-ui-05 min-h-screen">
      <div className="preference-head spr-ui-05" style={{ paddingTop: "4rem" }}>
        {/* Render the ShowSpaceSelect component with the fetched preference choices */}
        {loading === false && (
          <ShowSpaceSelect
            choices={preferenceChoices}
            oldPreferences={oldPreferences}
          />
        )}
      </div>
    </Box>
  );
};
