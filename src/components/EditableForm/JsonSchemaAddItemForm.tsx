import React, { memo, useState } from "react";

import { Form } from "../Form";
import { JsonSchemaObject } from "../../types";

const schema: JsonSchemaObject = {
  type: "object",
  required: ["name", "type"],
  properties: {
    path: {
      title: "Property path",
      type: "string",
    },
    type: {
      title: "Property type",
      type: "string",
    },
  },
};

type JsonSchemaAddItemFormData = {
  path: string;
  type: string;
};

type JsonSchemaAddItemFormProps = {
  onSubmit?: (data: JsonSchemaAddItemFormData) => void;
};

const initialData = {};

const JsonSchemaAddItemForm: React.FC<JsonSchemaAddItemFormProps> = memo(
  function JsonSchemaAddItemForm({ onSubmit }) {
    return <Form data={initialData} schema={schema} onSubmit={onSubmit} />;
  }
);

export { JsonSchemaAddItemForm };
export type { JsonSchemaAddItemFormData, JsonSchemaAddItemFormProps };
