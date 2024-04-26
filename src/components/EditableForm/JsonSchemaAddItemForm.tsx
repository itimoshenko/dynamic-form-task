import React, { memo, useState } from "react";

import { Form, SchemaOptions, UiOptions } from "../Form";
import { JsonSchemaObject } from "../../types";

// NOTE 20: Определяем схему для схемы:-)
// по сути описываем JSONSchema через JSONSchema, за исключением параметра "path",
// в дальнейшем можно будет расширить, но сейчас чтобы не раздувать задачу ограничился только полем "type"
const schema: JsonSchemaObject = {
  type: "object",
  required: ["path", "type"],
  properties: {
    path: {
      title: "Путь до поля",
      description: 'Путь до конктреного поля через точку "."',
      type: "string",
    },
    type: {
      title: "Тип поля",
      description: 'Может быть только "string", "number", "boolean", "object"',
      type: "string",
    },
  },
};

type JsonSchemaAddItemFormData = {
  path: string;
  type: string;
};

type JsonSchemaAddItemFormProps = {
  schemaOptions?: SchemaOptions;
  uiOptions?: UiOptions;
  onSubmit?: (data: JsonSchemaAddItemFormData) => void;
};

const initialData = {};

const JsonSchemaAddItemForm: React.FC<JsonSchemaAddItemFormProps> = memo(
  function JsonSchemaAddItemForm({ schemaOptions, uiOptions, onSubmit }) {
    return (
      // NOTE 21: Используем компонент основной формы и передаем стилизацию
      <Form
        data={initialData}
        schema={schema}
        schemaOptions={schemaOptions}
        uiOptions={uiOptions}
        onSubmit={onSubmit}
      />
    );
  },
);

export { JsonSchemaAddItemForm };
export type { JsonSchemaAddItemFormData, JsonSchemaAddItemFormProps };
