import React from "react";
import styles from "./spinner.module.css"; // Assuming you have a CSS file for styling

export const LoadingSpinner: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div
      className={styles["loading-spinner"]}
      style={{ borderTopColor: color }}
    >
      <div className={styles["spinner"]}></div>
    </div>
  );
};
