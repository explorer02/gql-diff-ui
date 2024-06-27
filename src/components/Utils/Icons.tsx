import React from "react";

export const CopyIcon: React.FC = () => {
  return (
    <svg
      data-spaceweb="icon"
      viewBox="0 0 14 14"
      data-icon-name="SolidCopy"
      className="w-[12rem-sw] h-[12rem-sw] forced-colors:#B0B0B0 inline-block"
      style={{ height: "15px", width: "auto" }}
    >
      <rect
        width="10.58"
        height="10.59"
        x=".02"
        y="3.41"
        rx=".99"
        fill="#646470"
      />
      <path
        d="M13.04 0H4.43a.992.992 0 00-.99.99v1.507h7.048a.99.99 0 01.98.99v7.103h1.571a.984.984 0 00.98-.99V.99a.99.99 0 00-.98-.99z"
        fill="#646470"
      />
    </svg>
  );
};

export const TickIcon: React.FC = () => {
  return (
    <svg
      data-spaceweb="icon"
      viewBox="0 0 8 8"
      data-icon-name="SolidTick"
      className="w-[12rem-sw] h-[12rem-sw] forced-colors:text-inherit fill-current inline-block"
      style={{ height: "15px", width: "auto" }}
    >
      <path
        d="M7.9 1.6L7.2.8c-.1-.1-.3-.1-.4 0L2.5 5.2 1.2 3.8c-.1-.1-.3-.1-.4 0l-.7.8c-.1.1-.1.2 0 .3l1.5 1.5.7.7c.1.1.3.1.4 0l5.2-5.2c.1-.1.1-.2 0-.3z"
        fill="#646470"
      />
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

export const NoCompetitorIcon: React.FC = () => {
  return (
    <svg
      data-spaceweb="icon"
      viewBox="0 0 14 14"
      data-icon-name="SolidGlobe"
      className="w-[12rem-sw] h-[12rem-sw] forced-colors:text-inherit fill-current inline-block"
    >
      <path
        d="M7 0a7 7 0 107 7 7.002 7.002 0 00-7-7zm-.7 12.55A5.592 5.592 0 011.4 7a5.682 5.682 0 01.147-1.253L4.9 9.1v.7a1.404 1.404 0 001.4 1.4zm4.83-1.777A1.389 1.389 0 009.8 9.8h-.7V7.7a.702.702 0 00-.7-.7H4.2V5.6h1.4a.702.702 0 00.7-.7V3.5h1.4a1.404 1.404 0 001.4-1.4v-.287a5.587 5.587 0 012.03 8.96z"
        fill="#646470"
      />
    </svg>
  );
};
