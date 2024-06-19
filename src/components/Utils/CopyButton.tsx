import React, { useState } from "react";
import { CopyIcon, TickIcon } from "./Icons";

export const CopyButton: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <span className="copy-button" onClick={handleCopy}>
      {isCopied ? <TickIcon /> : <CopyIcon />}
    </span>
  );
};
