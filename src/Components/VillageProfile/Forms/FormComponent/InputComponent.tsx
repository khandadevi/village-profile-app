import React from "react";

export default function InputComponent(props: any) {
  let {
    componentClass,
    palceholder,
    defaultValue,
    handleChange,
    label,
    wrapperClass,
    name,
    disabled,
    type,
    id,
    errors,
    ...rest
  } = props;
  const checkIfError = () => {
    console.log(name)
    let v = errors.find((s: any) => s.name == name);
    if (v) {
      return "error";
    }
    return "";
  };
  return (
    <div className={`question ${checkIfError()} ${componentClass}`} key={id} id={id}>
      {label ? <label className="label">{label}</label> : ""}

      <div className={wrapperClass}>
        <input
          {...rest}
          onChange={handleChange}
          type={type ?? "text"}
          className="form-control"
          value={defaultValue ?? ""}
          name={name}
          disabled = {disabled}
          placeholder={palceholder}
        />
      </div>
    </div>
  );
}
