import { JsonSchemaObject, JsonSchemaObjectProperty } from "../../types";

type SchemaFieldComponentProps<V> = {
  value: V;
  schemaObject: JsonSchemaObject;
};

type SchemaObjectPropertyComponentProps<V> = {
  value: V;
  onChange: (value: V, propertyPath: string[]) => void;
  schemaObject: JsonSchemaObject;
  schemaObjectPropertyName: string;
  schemaObjectProperty: JsonSchemaObjectProperty | JsonSchemaObject;
};

type SchemaFieldToComponentMapping = Record<
  keyof JsonSchemaObject,
  React.FC<SchemaFieldComponentProps<any>>
>;

type SchemaObjectPropertyToComponentMapping = Record<
  "string" | "number" | "boolean" | "object",
  React.FC<SchemaObjectPropertyComponentProps<any>>
>;

type SchemaObjectPropertyNameToComponentMapping = Record<
  string,
  React.FC<SchemaObjectPropertyComponentProps<any>>
>;

type SchemaOptions = {
  schemaFieldToComponentMapping?: Partial<SchemaFieldToComponentMapping>;
  schemaObjectPropertyToComponentMapping?: Partial<SchemaObjectPropertyToComponentMapping>;
  schemaObjectPropertyNameToComponentMapping?: SchemaObjectPropertyNameToComponentMapping;
};

type UiOptions = {
  submitButton?: React.ReactNode;
  addFieldButton?: React.ReactNode;
};

export type {
  SchemaOptions,
  UiOptions,
  SchemaFieldComponentProps,
  SchemaObjectPropertyComponentProps,
  SchemaFieldToComponentMapping,
  SchemaObjectPropertyToComponentMapping,
  SchemaObjectPropertyNameToComponentMapping,
};
