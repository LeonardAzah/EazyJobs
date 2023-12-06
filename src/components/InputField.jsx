import React from "react";

const InputField = ({ label, name, type, value, onChange }) => {
  return (
    <div className="mb-3">
      <div className="form-label">{label}</div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

export default InputField;
