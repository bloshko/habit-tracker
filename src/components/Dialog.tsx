import styles from "../App.module.css";

export const Dialog = ({ children }) => {
  return <dialog className={styles.dialogContainer}>{children}</dialog>;
};
