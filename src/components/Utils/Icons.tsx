import React from "react";

export const CopyIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon copy-icon"
    >
      <rect x="7" y="7" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M15 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path>
    </svg>
  );
};

export const TickIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="gray"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon tick-icon"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

export const ChevronDownIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  return (
    <svg
      className={`chevron-icon ${isOpen ? "rotate" : ""}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 10L12 15L17 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
