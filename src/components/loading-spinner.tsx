import styles from "./loading-spinner.module.css";

type LoadingSpinnerProps = {
  className?: string;
};

const LoadingSpinner = ({ className = "" }: LoadingSpinnerProps) => (
  <div className={`${styles.spinner} ${className}`.trim()} title="Loading" />
);

export default LoadingSpinner;
