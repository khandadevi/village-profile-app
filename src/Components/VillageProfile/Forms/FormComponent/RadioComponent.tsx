import React from "react";

export default function RadioComponent(props: any) {
  let {
    options,
    defaultValue,
    handleChange,
    label,
    wrapperClass,
    name,
    id,
    errors,
  } = props;

  const checkIfError = () => {
    let v = errors.find((s: any) => s.name == id);
    if (v) {
      return "error";
    }
    return "";
  };
  return (
    <div className={`question ${checkIfError()}`} key={id} id={id}>
      <label className="label">{label}</label>
      <div className={wrapperClass}>
        {options.map((o: any, key: any) => (
          <div className="radio" key={key}>
            <label>
              <input
                type="radio"
                value={o.id}
                name={name}
                checked={defaultValue === o.id.toString()}
                onChange={handleChange}
              />
              {o.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
