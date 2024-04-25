import React, { memo, useContext, useMemo } from "react";

import { SchemaObjectPropertyComponentProps } from "./types";
import { JsonSchemaObject } from "../../types";
import { FormContext, FormContextProps } from "./FormContext";
import { FormRenderer } from "./FormRenderer";

const FormObjectRenderer: React.FC<SchemaObjectPropertyComponentProps<object>> =
  memo(function FormObjectRenderer({
    value,
    schemaObjectProperty,
    schemaObjectPropertyName,
  }) {
    const context = useContext(FormContext);

    const newContextValue: FormContextProps | null = useMemo(() => {
      return context
        ? {
            ...context,
            data: value,
            dataPath: [...context.dataPath, schemaObjectPropertyName],
            schema: schemaObjectProperty as JsonSchemaObject,
          }
        : null;
    }, [value, schemaObjectPropertyName, schemaObjectProperty]);

    return (
      <FormContext.Provider value={newContextValue}>
        <FormRenderer />
      </FormContext.Provider>
    );
  });

export { FormObjectRenderer };
