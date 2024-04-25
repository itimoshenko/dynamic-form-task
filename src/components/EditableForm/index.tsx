import React, { memo, useCallback, useState } from "react";

import _ from "lodash";

import { Form, FormProps } from "../Form";
import { JsonSchemaObject } from "../../types";
import {
  JsonSchemaAddItemForm,
  JsonSchemaAddItemFormData,
} from "./JsonSchemaAddItemForm";

const EditableForm: React.FC<FormProps> = memo(function EditableForm(props) {
  const [schema, setSchema] = useState(props.schema);

  const handleSubmit = useCallback((data: JsonSchemaAddItemFormData) => {
    console.log("handleSubmit", data);
    setSchema((prevSchema) => {
      const prevSchemaClone = _.cloneDeep(prevSchema);

      const schemaPatch = data.path
        .split(".")
        .reduceRight((acc, pathPart, i, pathParts) => {
          if (i === pathParts.length - 1) {
            return {
              properties: {
                [pathPart]: {
                  title: pathPart,
                  type: data.type,
                },
              },
            };
          } else {
            return {
              properties: {
                [pathPart]: {
                  ...acc,
                  title: pathPart,
                  type: "object",
                },
              },
            };
          }
        }, {} as any);

      console.log("-> ", schemaPatch);

      _.merge(prevSchemaClone, schemaPatch);

      console.log(prevSchemaClone);

      return prevSchemaClone;
    });
  }, []);

  return (
    <>
      <Form {...props} schema={schema} />
      <JsonSchemaAddItemForm onSubmit={handleSubmit} />
    </>
  );
});

export { EditableForm };
