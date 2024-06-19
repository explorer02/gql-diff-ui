import React from "react";
import { parseDiff, Diff, Hunk, FileData } from "react-diff-view";
// @ts-ignore
import { diffLines, formatLines } from "unidiff";

import "react-diff-view/style/index.css";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { IconButton } from "@sprinklrjs/spaceweb/button";

import { CopyButton } from "../Utils/CopyButton";

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
        <div className="flex" id="old-heading">
          <div className="flex justify-between items-center border-t border-b border-l border-r w-1/2 px-3 py-2">
            <div id="old-title">
              <Typography variant="body-14"> Old Code </Typography>
            </div>
            <IconButton
              size={"xxs"}
              onClick={() => handleCopyButton(oldText)}
              tooltipContent=""
            >
              <CopyButton />
            </IconButton>
          </div>
          <div className="flex justify-between items-center border-t border-b border-r w-1/2 px-3 py-2">
            <div id="new-title">
              <Typography variant="body-14"> New Code </Typography>
            </div>
            <IconButton
              size={"xxs"}
              onClick={() => () => handleCopyButton(newText)}
              tooltipContent=""
            >
              <CopyButton />
            </IconButton>
          </div>
        </div>
        <div className="pt-3 border-l border-r border-b">
          <div style={{ maxHeight: "300px", overflowY: "scroll" }}>
            <Diff viewType="split" diffType="" hunks={diff.hunks || []}>
              {(hunks) =>
                hunks.map((hunk) => <Hunk key={hunk.content} hunk={hunk} />)
              }
            </Diff>
          </div>
        </div>
      </main>
    </div>
  );
};
