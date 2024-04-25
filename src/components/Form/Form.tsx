import React, { memo, useCallback, useMemo, useState } from "react";
import _ from "lodash";

import { JsonSchemaObject } from "../../types";

import { FormRenderer } from "./FormRenderer";
import { FormContext, FormContextProps } from "./FormContext";

import {
  SchemaFieldToComponentMapping,
  SchemaObjectPropertyToComponentMapping,
  SchemaOptions,
} from "./types";
import { defaultSchemaFieldToComponentMapping } from "./defaultSchemaFieldToComponentMapping";
import { defaultSchemaObjectPropertyToComponentMapping } from "./defaultSchemaObjectPropertyToComponentMapping";

type FormProps = {
  data: object;
  schema: JsonSchemaObject;
  schemaOptions?: SchemaOptions;
  onSubmit?: (data: any) => void;
};

const Form: React.FC<FormProps> = memo(function Form({
  data,
  schema,
  schemaOptions,
  onSubmit,
}) {
  const [formData, setFormData] = useState(data);

  const _schemaObjectPropertyToComponentMapping: SchemaObjectPropertyToComponentMapping =
    useMemo(() => {
      return {
        ...defaultSchemaObjectPropertyToComponentMapping,
        ...schemaOptions?.schemaObjectPropertyToComponentMapping,
      };
    }, [schemaOptions?.schemaObjectPropertyToComponentMapping]);

  const _schemaFieldToComponentMapping: SchemaFieldToComponentMapping =
    useMemo(() => {
      return {
        ...defaultSchemaFieldToComponentMapping,
        ...schemaOptions?.schemaFieldToComponentMapping,
      };
    }, [schemaOptions?.schemaFieldToComponentMapping]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();

      console.log("handleSubmit");

      onSubmit?.(formData);
    },
    [onSubmit, formData]
  );

  const handleChange = useCallback((value: unknown, propertyPath: string[]) => {
    setFormData((prevData) => {
      const clonePrevData = _.cloneDeep(prevData);

      _.set(clonePrevData, propertyPath.join("."), value);

      return clonePrevData;
    });
  }, []);

  const contextValue: FormContextProps = useMemo(() => {
    return {
      data: formData,
      dataPath: [],
      schema,
      schemaOptions: {
        ...schemaOptions,
        schemaObjectPropertyToComponentMapping:
          _schemaObjectPropertyToComponentMapping,
        schemaFieldToComponentMapping: _schemaFieldToComponentMapping,
      },
      onChange: handleChange,
      Form: () => Form,
      FormRenderer: FormRenderer,
    };
  }, [
    formData,
    schema,
    schemaOptions,
    handleChange,
    _schemaObjectPropertyToComponentMapping,
    _schemaFieldToComponentMapping,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={contextValue}>
        <FormRenderer />
      </FormContext.Provider>
      <button type="submit">Сохранить</button>
    </form>
  );
});

export { Form };
export type { SchemaOptions, FormProps };
