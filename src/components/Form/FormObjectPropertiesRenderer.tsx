import React, { memo, useCallback, useContext } from "react";
import { JsonSchemaObjectProperties } from "../../types";
import { SchemaFieldComponentProps } from "./types";
import { FormContext } from "./FormContext";
import { EmptyRenderer } from "./EmptyRenderer";

// NOTE 37: Компонент для рендеринга поля "properties" из JSONSchema
const FormObjectPropertiesRenderer: React.FC<
  SchemaFieldComponentProps<JsonSchemaObjectProperties>
> = memo(function FormObjectPropertiesRenderer({ value, schemaObject }) {
  const context = useContext(FormContext);

  if (!context) {
    return null;
  }

  const {
    schemaObjectPropertyToComponentMapping,
    schemaObjectPropertyNameToComponentMapping,
  } = context.schemaOptions || {};

  const data: any = context.data;

  return (
    <>
      {Object.entries(value).map(
        ([jsonSchemaObjectPropertyName, jsonSchemaObjectProperty]: [
          string,
          JsonSchemaObjectProperties[keyof JsonSchemaObjectProperties],
        ]) => {
          const Component =
            schemaObjectPropertyNameToComponentMapping?.[
              jsonSchemaObjectPropertyName
            ] ||
            schemaObjectPropertyToComponentMapping?.[
              jsonSchemaObjectProperty.type
            ] ||
            EmptyRenderer;

          return (
            <Component
              key={jsonSchemaObjectPropertyName}
              value={(data || {})[jsonSchemaObjectPropertyName]}
              onChange={context?.onChange}
              schemaObject={schemaObject}
              schemaObjectPropertyName={jsonSchemaObjectPropertyName}
              schemaObjectProperty={jsonSchemaObjectProperty}
            />
          );
        },
      )}
    </>
  );
});

export { FormObjectPropertiesRenderer };
