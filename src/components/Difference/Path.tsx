import { useState } from "react";
import { Box } from "@sprinklrjs/spaceweb/box";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { CopyButton } from "../Utils/CopyButton";

import React from "react";

export const DisplayPaths: React.FC<DisplayPathsProps> = ({ paths }) => {
  const [displayLength, setDisplayLength] = useState<number>(
    Math.min(6, paths.length)
  );
  const handleShowMoreButton = () => {
    setDisplayLength((oldState) => Math.min(oldState + 10, paths.length));
  };
  const handleShowLessButton = () => {
    setDisplayLength(6);
  };
  return (
    <div className="paths-head">
      {paths.map((path, index) => {
        if (index < displayLength) {
          return (
            <div key={index}>
              <DisplayPath path={path} />
            </div>
          );
        }
        return <></>;
      })}
      <div style={{ display: "flex", gap: "10px" }}>
        {displayLength < paths.length && (
          <div>
            <button
              onClick={handleShowMoreButton}
              style={{
                fontSize: "12px",
                fontWeight: "200",
                color: "blue",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Show more...
            </button>
          </div>
        )}
        {displayLength > 6 && (
          <div>
            <button
              onClick={handleShowLessButton}
              style={{
                fontSize: "12px",
                fontWeight: "200",
                color: "blue",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Show less...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DisplayPath: React.FC<DisplayPathProps> = ({ path }) => {
  const handleCopyButton: () => Promise<void> = async () => {
    try {
      await navigator.clipboard.writeText(path.split(" -> ").join(" → "));
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #DBDBDB",
        borderRadius: "12px",
        marginTop: "14px",
        marginBottom: "14px",
        padding: "12px",
      }}
    >
      <Box className="flex justify-between flex-row-reverse items-center gap-4">
        <div style={{ display: "flex", justifyContent: "right" }}>
          <IconButton
            size={"sm"}
            tooltipContent={""}
            onClick={handleCopyButton}
          >
            <CopyButton />
          </IconButton>
        </div>
        <div style={{ fontSize: "12px", fontWeight: "500" }}>
          {path.split(" -> ").join(" → ")}
        </div>
      </Box>
    </div>
  );
};
