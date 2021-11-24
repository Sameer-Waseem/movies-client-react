import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        {...rest}
        // value={value}
        // onChange={onChange}
        // type={type}
        // name={name}
        name={name}
        id={name}
        className="form-control"
      ></input>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
