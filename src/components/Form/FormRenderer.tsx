import React, { memo, useContext } from "react";

import { JsonSchemaObject } from "../../types";

import { FormContext } from "./FormContext";
import { EmptyRenderer } from "./EmptyRenderer";

type FormRendererProps = {};

const FormRenderer: React.FC<FormRendererProps> = memo(function FormRenderer() {
  const context = useContext(FormContext);
  const { schemaFieldToComponentMapping } = context?.schemaOptions || {};

  return (
    <>
      {/* NOTE 30: Рендерим поля схемы */}
      {Object.entries(context?.schema || {}).map(
        ([jsonSchemeFieldName, jsonSchemeFieldValue]: [
          string,
          JsonSchemaObject[keyof JsonSchemaObject],
        ]) => {
          const Component =
            schemaFieldToComponentMapping?.[
              jsonSchemeFieldName as keyof JsonSchemaObject
            ] || EmptyRenderer;

          if (!context?.schema) {
            return null;
          }

          return (
            <Component
              key={jsonSchemeFieldName}
              value={jsonSchemeFieldValue}
              schemaObject={context?.schema}
            />
          );
        },
      )}
    </>
  );
});

export { FormRenderer };
export type { FormRendererProps };
