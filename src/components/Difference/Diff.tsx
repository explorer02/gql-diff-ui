import React from "react";
import { parseDiff, Diff, Hunk, FileData } from "react-diff-view";

import "react-diff-view/style/index.css";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";

import { CopyButton } from "../Utils/CopyButton";

//@ts-expect-error --declarationModuleMissing
import { diffLines, formatLines } from "unidiff";

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
            className="flex justify-between items-center w-1/2"
            style={{
              border: "1px solid  #E6E6E9",
              borderRadius: "8px 0px 0px 0px",
            }}
          >
            <div style={{ padding: "16px" }}>
              <Typography variant="body-14"> Original API </Typography>
            </div>
            <IconButton
              size={"sm"}
              onClick={() => handleCopyButton(oldText)}
              tooltipContent=""
            >
              <CopyButton />
            </IconButton>
          </Box>
          <Box
            className="flex justify-between items-center w-1/2"
            style={{
              borderTop: "1px solid  #E6E6E9",
              borderBottom: "1px solid  #E6E6E9",
              borderRight: "1px solid  #E6E6E9",
              borderRadius: "0px 8px 0px 0px",
            }}
          >
            <div style={{ padding: "16px" }}>
              <Typography variant="body-14"> Changed API </Typography>
            </div>
            <IconButton
              size={"sm"}
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
            borderLeft: "1px solid  #E6E6E9",
            borderBottom: "1px solid  #E6E6E9",
            borderRight: "1px solid  #E6E6E9",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          <Box style={{ maxHeight: "300px", overflowY: "scroll" }}>
            <Typography variant="l2">
              {/*@ts-expect-error --toShowAllDiffs*/}
              <Diff viewType="split" diffType="" hunks={diff.hunks || []}>
                {(hunks) =>
                  hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
                }
              </Diff>
            </Typography>
          </Box>
        </Box>
      </main>
    </div>
  );
};
