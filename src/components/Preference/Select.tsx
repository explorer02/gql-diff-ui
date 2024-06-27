import React, { useState } from "react";
import {
  MultiSelect,
  Optgroups,
  Option,
  Value,
} from "@sprinklrjs/spaceweb/select";
import { Box } from "@sprinklrjs/spaceweb/box";
import { Button } from "@sprinklrjs/spaceweb/button";
import axios, { AxiosResponse } from "axios";
import { RootState } from "../../store";
import { useAppSelector } from "../../Hooks/store";
import { Typography } from "@sprinklrjs/spaceweb/typography";

import { useNavigate } from "react-router-dom";

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
        id: choice.name + "#" + choice.environment,
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
  for (const environment of Object.keys(QueriesGroup)) {
    const groupName: string = `Queries - ${environment}`;
    options[groupName] = QueriesGroup[environment];
  }
  for (const environment of Object.keys(MutationsGroup)) {
    const groupName: string = `Mutations - ${environment}`;
    options[groupName] = MutationsGroup[environment];
  }
  return options;
}

// Component to display and handle user selection of preferences
export const ShowSpaceSelect: React.FC<ShowSpaceSelectProps> = ({
  choices,
  oldPreferences,
}) => {
  console.log("In Select.tsx");
  console.log("oldPreferences: ", oldPreferences);
  // State to manage selected values and error state
  const [value, setValue] = useState<Value>(oldPreferences);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  const userId: string = useAppSelector(
    (state: RootState) => state.user.value.userId
  );

  const navigate = useNavigate();

  // Handler function for the save button click event
  const handleSaveButton: () => void = () => {
    // Check if any value is selected
    if (value.length) {
      // Make a POST request to save preferences
      axios
        .post(`${process.env.REACT_APP_API_DOMAIN}/api/preferences/save`, {
          environment: "lite.qa6",
          choices: value,
          userId: userId,
        })
        .then((response: AxiosResponse) => {
          // Handle successful response
          if (response.data?.success) {
            navigate("/changes"); // Navigate to home page on success
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
    <div
      className="spr-border-03"
      style={{
        border: "1px solid #DBDBDB",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "60rem",
        padding: "32px",
        margin: "auto",
        height: "auto",
        backgroundColor: "white",
      }}
    >
      {/* Header with instructions */}
      <Typography variant="h3">Select APIs to listen changes</Typography>
      {/* MultiSelect component for user to select preferences */}
      <Box className="mt-5">
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
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Button variant="primary" onClick={handleSaveButton}>
          Submit
        </Button>
      </div>
    </div>
  );
};
