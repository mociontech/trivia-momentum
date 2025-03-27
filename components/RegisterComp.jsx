/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function RegistroDinamico({ fields, onSubmit }) {
  const [formData, setFormData] = useState(fields);
  const [isReady, setIsReady] = useState(false);

  function handleChange(e, parentKey = null) {
    const { name, value } = e.target;

    setFormData((prevFormData) => {
      if (parentKey) {
        return {
          ...prevFormData,
          [parentKey]: {
            ...prevFormData[parentKey],
            [name]: { ...prevFormData[parentKey][name], value },
          },
        };
      } else {
        return {
          ...prevFormData,
          [name]: { ...prevFormData[name], value },
        };
      }
    });
  }

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((field) => {
      if (typeof field === "object" && !field.type) {
        return Object.values(field).every(
          (subField) => subField.value?.trim() !== ""
        );
      }
      return field.value?.trim() !== "";
    });
    setIsReady(allFieldsFilled);
  }, [formData]);

  function submitForm() {
    onSubmit(formData);
    const resetFields = Object.keys(fields).reduce((acc, key) => {
      if (typeof fields[key] === "object" && !fields[key].type) {
        acc[key] = Object.keys(fields[key]).reduce((subAcc, subKey) => {
          subAcc[subKey] = { ...fields[key][subKey], value: "" };
          return subAcc;
        }, {});
      } else {
        acc[key] = { ...fields[key], value: "" };
      }
      return acc;
    }, {});
    setFormData(resetFields);
  }

  const renderInput = (key, item, parentKey = null) => {
    if (item.type === "select") {
      return (
        <div key={key} className="relative flex-1 min-w-0">
          {item.imageRef && (
            <label htmlFor={key}>
              <img
                src={item.imageRef}
                className="absolute z-50 w-7 h-7 sm:w-12 sm:h-12 text-white/50 top-1/2 -translate-y-1/2 left-4 sm:left-6"
                alt="icon"
              />
            </label>
          )}
          <select
            id={key}
            name={key}
            value={item.value}
            className={`no-spinner w-full text-[20px]  h-[70px] sm:h-[110px] text-white/50 bg-white/15 rounded-xl sm:rounded-3xl border-[1.5px] border-white placeholder:text-white/50 shadow-2xl ${
              item.imageRef ? "pl-[50px] sm:pl-[90px]" : "pl-4"
            }`}
            onChange={(e) => handleChange(e, parentKey)}
          >
            <option value="" disabled>
              {item.placeholder}
            </option>
            {item.options.map((option) => (
              <option key={option} value={option} className="text-black">
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={key} className="relative flex-1 min-w-0">
        {item.imageRef && (
          <label htmlFor={key}>
            <img
              src={item.imageRef}
              className="absolute z-50 w-7 h-7 sm:w-12 sm:h-12 text-black/30 top-1/2 -translate-y-1/2 left-4 sm:left-6"
              alt="icon"
            />
          </label>
        )}
        <input
          type={item.type}
          id={key}
          name={key}
          value={item.value}
          placeholder={item.placeholder}
          className={`no-spinner text-[38px] w-full h-[70px] ${
            item.imageRef ? "pl-[50px] sm:pl-[90px]" : "pl-4"
          } text-black/30 bg-white rounded-xl sm:rounded-xl border-[1.5px] shadow-2xl border-white placeholder:text-black/30`}
          autoComplete="off"
          onChange={(e) => handleChange(e, parentKey)}
        />
      </div>
    );
  };

  return (
    <div className="telegraf-regular flex flex-col justify-center gap-5 px-2 max-w-full sm:max-w-[855px] mx-auto mt-[0px]">
      {Object.entries(formData).map(([key, value]) => {
        if (typeof value === "object" && !value.type) {
          return (
            <div key={key} className="flex flex-wrap gap-4 w-full sm:w-[768px]">
              {Object.entries(value).map(([subKey, subItem]) => (
                <div key={subKey} className="flex-1 min-w-[150px]">
                  {renderInput(subKey, subItem, key)}
                </div>
              ))}
            </div>
          );
        }
        return renderInput(key, value);
      })}
      <button
        className="relative flex justify-center items-center text-[42px] top-[0px] bg-[#231F20] rounded-2xl h-[81px]"
        disabled={!isReady}
        onClick={submitForm}
      >
        SIGUIENTE
      </button>
    </div>
  );
}
