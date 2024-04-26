import React, { memo, useCallback, useContext } from "react";
import { SchemaObjectPropertyComponentProps } from "./types";
import { FormContext } from "./FormContext";

// NOTE 36: Дефолтный компонент формы, в основном для фолбека
const FormDefaultControl: React.FC<SchemaObjectPropertyComponentProps<any>> =
  memo(function FormDefaultControl({
    value,
    onChange,
    schemaObject,
    schemaObjectProperty,
    schemaObjectPropertyName,
  }) {
    const context = useContext(FormContext);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> =
      useCallback(
        (event) => {
          event.preventDefault();

          onChange(event.target.value, [
            ...(context?.dataPath || []),
            schemaObjectPropertyName,
          ]);
        },
        [onChange],
      );

    return (
      <div>
        <label>
          {schemaObjectProperty.title}
          {schemaObject.required?.includes(schemaObjectPropertyName) ? "*" : ""}
        </label>
        <input value={value || ""} onChange={handleChange} />
        <div>{schemaObjectProperty.description}</div>
      </div>
    );
  });

export { FormDefaultControl };
