import React from "react";

const InputArea = ({ label, name, value, onChange }) => {
  return (
    <div className="mb-3">
      <div className="form-label">{label}</div>
      <textarea
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};

export default InputArea;
