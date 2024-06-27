import React, { useState, useRef, useEffect } from "react";
import "./Collapsible.css";
import { ChevronDownIcon } from "./Icons";
import { Box } from "@sprinklrjs/spaceweb/box";

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `100%` : "0px";
    }
  }, [isOpen, children]);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="collapsible"
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        {title}
        <ChevronDownIcon isOpen={isOpen} />
      </Box>
      <div
        className="collapsible-content"
        ref={contentRef}
        style={{
          maxHeight: isOpen ? `100%` : "0",
          opacity: isOpen ? 1 : 0,
        }}
      >
        {children}
      </div>
    </div>
  );
};
