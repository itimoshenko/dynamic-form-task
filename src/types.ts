type PrimitiveType = string | number | boolean;

type JsonSchemaObjectProperty = {
  title?: string;
  description?: string;
  type: "string" | "number" | "boolean";
  default?: PrimitiveType;
};

type JsonSchemaObjectProperties = Record<
  string,
  JsonSchemaObjectProperty | JsonSchemaObject
>;

type JsonSchemaObject = {
  title?: string;
  description?: string;
  type: "object";
  required?: string[];
  properties: JsonSchemaObjectProperties;
};

export {
  PrimitiveType,
  JsonSchemaObject,
  JsonSchemaObjectProperties,
  JsonSchemaObjectProperty,
};
