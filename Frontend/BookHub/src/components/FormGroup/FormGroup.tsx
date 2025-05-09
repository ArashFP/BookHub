import React from "react";
import styles from "./FormGroup.module.css";

const FormGroup: React.FC<FormGroupProps> = ({ label, id, children }) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label} :
      </label>
      {children}
    </div>
  );
};

export default FormGroup;

interface FormGroupProps {
  label: string;
  id: string;
  children: React.ReactNode;
}
