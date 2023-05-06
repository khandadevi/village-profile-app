export default function SelectComponent(props: any) {
  let {
    options,
    defaultValue,
    handleChange,
    label,
    wrapperClass,
    name,
    disabled,
    id,
    placeholder,
    errors,
  } = props;
  const checkIfError = () => {
   
    let v = errors.find((s: any) => s.name == name);
   console.log(name)
    if (v) {
      return "error";
    }
    return "";
  };
  return (
    <div className={`question ${checkIfError()}`} key={id} id={id}>
      <label className="label">{label}</label>
      <div className={wrapperClass}>
        <select
          className="form-control"
          name={name}
          disabled={disabled}
          onChange={handleChange}
          value={defaultValue}
        >
          <option value={""} key={name + "-option-1"}>
            ---{placeholder}---
          </option>
          {options.map((d: any, key: any) => (
            <option value={d.id} key={name + "-option-" + key}>
              {d.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
