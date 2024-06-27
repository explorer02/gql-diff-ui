import React from "react";

export const CopyIcon: React.FC = () => {
  return (
    <svg
      data-spaceweb="icon"
      viewBox="0 0 14 14"
      data-icon-name="SolidCopy"
      className="w-[12rem-sw] h-[12rem-sw] forced-colors:text-inherit fill-current inline-block"
      style={{ height: "15px", width: "auto" }}
    >
      <rect width="10.58" height="10.59" x=".02" y="3.41" rx=".99" />
      <path d="M13.04 0H4.43a.992.992 0 00-.99.99v1.507h7.048a.99.99 0 01.98.99v7.103h1.571a.984.984 0 00.98-.99V.99a.99.99 0 00-.98-.99z" />
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
      <path d="M7.9 1.6L7.2.8c-.1-.1-.3-.1-.4 0L2.5 5.2 1.2 3.8c-.1-.1-.3-.1-.4 0l-.7.8c-.1.1-.1.2 0 .3l1.5 1.5.7.7c.1.1.3.1.4 0l5.2-5.2c.1-.1.1-.2 0-.3z" />
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
      viewBox="0 0 40 40"
      data-icon-name="PlaceholderNoCompetitiors"
      className="sw--az sw--b0 sw--p7 sw--p8"
    >
      <path d="M40.035 10.52a.96.96 0 00-.013-.207.935.935 0 00-.008-.137c-.004-.015-.015-.025-.02-.039a2.413 2.413 0 00-.184-.34 2.448 2.448 0 00-.3-.242c-.015-.008-.024-.021-.039-.028l-10.82-5.063.01-.021a1.176 1.176 0 00-.568-1.564l-.885-.415a1.177 1.177 0 00-1.57.566l-5.56 11.885-5.555-11.872a1.185 1.185 0 00-1.575-.579l-.94.44a1.186 1.186 0 00-.516 1.537l.012.025L.686 9.525a1 1 0 00.167 1.873L6.141 12.8l-2.308 4.97a1 1 0 001.33 1.327l10.82-5.056 2.252 4.812-8.243 17.619a1.18 1.18 0 00.565 1.563l.003.001.894.42a1.181 1.181 0 001.56-.571l7.063-15.096 7.06 15.09a1.175 1.175 0 001.078.695 1.234 1.234 0 00.502-.109l.89-.42.022-.01a1.2 1.2 0 00.537-1.558L21.919 18.85l2.253-4.814 10.823 5.059c.015.007.033.004.049.01a.994.994 0 00.372.083h.004a.994.994 0 00.374-.083c.015-.006.031-.003.046-.01.014-.006.022-.019.036-.026a.986.986 0 00.278-.205l.007-.006a.997.997 0 00.163-.245c.006-.014.004-.03.01-.043a1.19 1.19 0 000-.76c-.005-.015-.003-.03-.01-.043l-2.31-4.962 5.29-1.406.009-.005a.995.995 0 00.312-.154.951.951 0 00.075-.063 1.325 1.325 0 00.224-.277c.009-.016.022-.028.03-.044a.94.94 0 00.031-.133.963.963 0 00.05-.203zM27.803 6.278l8.328 3.896-3.785 1.006c-.03.008-.052.03-.081.04-.028.01-.057.008-.084.02a.938.938 0 00-.089.066.96.96 0 00-.462.988.933.933 0 00.007.11.95.95 0 00.042.092c.009.024.006.05.017.073l1.654 3.551-8.33-3.894z" />
    </svg>
  );
};
