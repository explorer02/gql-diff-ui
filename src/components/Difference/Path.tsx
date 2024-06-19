import { useState } from "react";
import { Typography } from "@sprinklrjs/spaceweb/typography";
import { IconButton } from "@sprinklrjs/spaceweb/button";
import { CopyButton } from "../Utils/CopyButton";

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
          return <DisplayPath path={path} />;
        }
        return <></>;
      })}
      <div style={{ display: "flex", gap: "10px" }}>
        {displayLength < paths.length && (
          <div>
            <button
              onClick={handleShowMoreButton}
              style={{
                fontSize: "15px",
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
                fontSize: "15px",
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
    } catch (err: any) {
      console.error("Unable to copy to clipboard.", err);
      alert("Copy to clipboard failed.");
    }
  };

  return (
    <div className="border rounded-8 p-3 flex justify-between flex-row-reverse items-center gap-4 my-4">
      <div style={{ display: "flex", justifyContent: "right" }}>
        <IconButton size={"xs"} tooltipContent={""} onClick={handleCopyButton}>
          <CopyButton />
        </IconButton>
      </div>
      <Typography className="body-14">
        {path.split(" -> ").join(" → ")}
      </Typography>
    </div>
  );
};
