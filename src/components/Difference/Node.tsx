import { DisplayDiff } from "./Diff";
import { DisplayPaths } from "./Path";

import { Typography } from "@sprinklrjs/spaceweb/typography";
import { Box } from "@sprinklrjs/spaceweb/box";

import { Collapsible } from "../Utils/Collapsible";

import React from "react";

// key -> node affected and values are list
export const DisplayNode: React.FC<DisplayNodeProps> = ({
  name,
  pathsTo,
  nodeChanges,
}) => {
  return (
    <div
      className="node-head"
      style={{
        padding: "12px",
        border: "1px solid #DBDBDB",
        borderRadius: "12px",
      }}
    >
      <Collapsible title={<NodeTitle title={name} />}>
        <div style={{ padding: "12px" }}>
          {pathsTo &&
            Object.keys(pathsTo).map((endNode, index) => {
              return (
                <div
                  key={index}
                  style={{
                    border: "1px solid  #DBDBDB",
                    borderRadius: "12px",
                    padding: "12px",
                    margin: "12px 0px",
                  }}
                >
                  <Box>
                    <div style={{ fontSize: "14px", fontWeight: "default" }}>
                      Affected Fragment : {endNode}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "default" }}>
                        Possible Paths :
                      </div>
                      <div>
                        <DisplayPaths paths={pathsTo[endNode]} />
                      </div>
                    </div>
                    <div
                      className="diff-display"
                      style={{ paddingTop: "12px" }}
                    >
                      <DisplayDiff
                        oldText={nodeChanges[endNode].oldValue}
                        newText={nodeChanges[endNode].newValue}
                      />
                    </div>
                  </Box>
                </div>
              );
            })}
        </div>
      </Collapsible>
    </div>
  );
};

const NodeTitle: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <Typography>
      <div style={{ fontWeight: "500", fontSize: "14px" }}>
        API :{" "}
        <span
          style={{
            backgroundColor: "#DBDBDB",
            borderRadius: "4px",
            padding: "4px",
          }}
        >
          {title}
        </span>
      </div>
    </Typography>
  );
};
