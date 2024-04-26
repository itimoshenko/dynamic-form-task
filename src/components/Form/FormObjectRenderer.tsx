import React, { memo, useContext, useMemo } from "react";

import { SchemaObjectPropertyComponentProps } from "./types";
import { JsonSchemaObject } from "../../types";
import { FormContext, FormContextProps } from "./FormContext";
import { FormRenderer } from "./FormRenderer";

// NOTE 33: Компонент который рендерит поле с типом "object"
const FormObjectRenderer: React.FC<SchemaObjectPropertyComponentProps<object>> =
  memo(function FormObjectRenderer({
    value,
    schemaObjectProperty,
    schemaObjectPropertyName,
  }) {
    const context = useContext(FormContext);

    // NOTE 34: Создаем новый контекст для вложенного объекта
    const newContextValue: FormContextProps | null = useMemo(() => {
      return context
        ? {
            ...context,
            data: value,
            // NOTE 35: Склеиваем путь до поля
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
