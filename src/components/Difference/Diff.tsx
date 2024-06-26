import React from "react";
import { parseDiff, Diff, Hunk, FileData } from "react-diff-view";

import "react-diff-view/style/index.css";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";

import { CopyButton } from "../Utils/CopyButton";

const { diffLines, formatLines } = require("unidiff");

function extractSchemaValue(schema: string): string {
  if (schema === null || schema.indexOf(`"""true"""`) === -1) {
    return "";
  }

  let newSchema: string = "";
  for (
    let i: number = schema.indexOf(`"""true"""`) + 11;
    i < schema.length;
    ++i
  ) {
    newSchema += schema[i];
    if (schema[i] === "}") {
      break;
    }
  }
  return newSchema;
}

export const DisplayDiff: React.FC<DiffViewProps> = ({ oldText, newText }) => {
  const oldSchema: string = extractSchemaValue(oldText);
  const newSchema: string = extractSchemaValue(newText);

  return (
    <div className="diff-display">
      <div style={{ paddingTop: "10px" }}>
        <DiffView oldText={oldSchema} newText={newSchema} />
      </div>
    </div>
  );
};

const DiffView: React.FC<DiffViewProps> = ({ oldText, newText }) => {
  // const diffText: string = "";
  const diffText = formatLines(diffLines(oldText, newText), { context: 3 });
  console.log("diffText: ", diffText);
  const [diff]: FileData[] = parseDiff(diffText, { nearbySequences: "zip" });

  const handleCopyButton: (text: string) => Promise<void> = async (
    text: string
  ) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div>
      <main>
        <Box className="flex" id="old-heading">
          <Box
            className="flex justify-between items-center w-1/2 px-3 py-2"
            style={{ border: "1px solid black" }}
          >
            <Box id="old-title">
              <Typography variant="body-14"> Old Code </Typography>
            </Box>
            <IconButton
              size={"xxs"}
              onClick={() => handleCopyButton(oldText)}
              tooltipContent=""
            >
              <CopyButton />
            </IconButton>
          </Box>
          <Box
            className="flex justify-between items-center w-1/2 px-3 py-2"
            style={{
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              borderRight: "1px solid black",
            }}
          >
            <Box id="new-title">
              <Typography variant="body-14"> New Code </Typography>
            </Box>
            <IconButton
              size={"xxs"}
              onClick={() => () => handleCopyButton(newText)}
              tooltipContent=""
            >
              <CopyButton />
            </IconButton>
          </Box>
        </Box>
        <Box
          className="pt-3"
          style={{
            borderLeft: "1px solid black",
            borderBottom: "1px solid black",
            borderRight: "1px solid black",
          }}
        >
          <Box style={{ maxHeight: "300px", overflowY: "scroll" }}>
            <Diff viewType="split" diffType="add" hunks={diff.hunks || []}>
              {(hunks) =>
                hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
              }
            </Diff>
          </Box>
        </Box>
      </main>
    </div>
  );
};
