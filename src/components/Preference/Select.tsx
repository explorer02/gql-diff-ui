import { useState } from "react";
import {
  MultiSelect,
  Optgroups,
  Option,
  Value,
} from "@sprinklrjs/spaceweb/select";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Button } from "@sprinklrjs/spaceweb/button";
import axios, { AxiosResponse } from "axios";
import { AppDispatch, RootState, navigate } from "../../store";
import { useAppDispatch, useAppSelector } from "../../Hooks/store";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { group } from "console";

// Function to transform choices into options for the MultiSelect component
function getOptions(choices: Choice[]): Optgroups {
  // Initialize an object to store categorized options

  const QueriesGroup: { [key: string]: Option[] } = {};
  const MutationsGroup: { [key: string]: Option[] } = {};

  // Categorize each choice as either "Query" or "Mutation"
  choices.forEach((choice: Choice) => {
    if (choice.type === "Query") {
      if (!QueriesGroup[choice.environment])
        QueriesGroup[choice.environment] = [];
      QueriesGroup[choice.environment].push({
        label: choice.name,
        id: choice.name,
        environment: choice.environment,
      });
    } else {
      if (!MutationsGroup[choice.environment])
        MutationsGroup[choice.environment] = [];
      MutationsGroup[choice.environment].push({
        label: choice.name,
        id: choice.name,
        environment: choice.environment,
      });
    }
  });

  const options: Optgroups = {};
  for (let environment of Object.keys(QueriesGroup)) {
    const groupName: string = `Queries - ${environment}`;
    options[groupName] = QueriesGroup[environment];
  }
  for (let environment of Object.keys(MutationsGroup)) {
    const groupName: string = `Mutations - ${environment}`;
    options[groupName] = MutationsGroup[environment];
  }
  return options;
}

// Component to display and handle user selection of preferences
export const ShowSpaceSelect: React.FC<ShowSpaceSelectProps> = ({
  choices,
}) => {
  // State to manage selected values and error state
  const [value, setValue] = useState<Value>([]);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  // Use Redux hooks to dispatch actions and access the user ID from the store
  const dispatch: AppDispatch = useAppDispatch();
  const userId: string = useAppSelector(
    (state: RootState) => state.user.value.userId
  );

  // Handler function for the save button click event
  const handleSaveButton: () => void = () => {
    // Check if any value is selected
    if (value.length) {
      // Make a POST request to save preferences
      axios
        .post(
          "https://teams-bot-app-service.onrender.com/api/preferences/save",
          {
            environment: "lite.qa6",
            choices: value,
            userId: userId,
          }
        )
        .then((response: AxiosResponse) => {
          // Handle successful response
          if (response.data?.success) {
            dispatch(navigate({ url: "/" })); // Navigate to home page on success
          } else {
            // Log the response in case of an error
            console.log(JSON.stringify(response, null, 2));
            console.log("Error from", ": function handleSaveButton");
          }
        });
    } else {
      // Set error state if no value is selected
      setEmptyError(true);
    }
  };

  return (
    <div>
      {/* Header with instructions */}
      <h2
        style={{
          fontSize: "35px",
          fontWeight: "300",
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "30px",
        }}
      >
        Choose Queries and Mutations to get notifications for -
      </h2>
      {/* MultiSelect component for user to select preferences */}
      <Box className="mx-auto" style={{ width: "40rem" }}>
        <MultiSelect
          multi
          hideSelectAll={true}
          maxDropdownHeight={"55vh"}
          filterOutSelected={false}
          options={getOptions(choices)} // Set options from transformed choices
          noResultsMsg="No characters found"
          onChange={(params) => {
            setEmptyError(false); // Reset error state on change
            setValue(params.value); // Update selected values
          }}
          value={value}
          closeOnSelect={false}
        />
        {/* Display error message if no choice is selected */}
        {emptyError && (
          <Box className="m-2">
            <Typography className="spr-support-error-text">
              Please Subscribe to at least one choice
            </Typography>
          </Box>
        )}
      </Box>
      {/* Save button to submit the selected preferences */}
      <div
        className="save-btn"
        style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        <Button variant="primary" onClick={handleSaveButton}>
          Submit
        </Button>
      </div>
    </div>
  );
};
