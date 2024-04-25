import { EmptyRenderer } from "./EmptyRenderer";
import { TextRenderer } from "./TextRenderer";
import { FormObjectPropertiesRenderer } from "./FormObjectPropertiesRenderer";
import { SchemaFieldToComponentMapping } from "./types";

const defaultSchemaFieldToComponentMapping: SchemaFieldToComponentMapping = {
  title: TextRenderer,
  description: TextRenderer,
  type: EmptyRenderer,
  required: EmptyRenderer,
  properties: FormObjectPropertiesRenderer,
};

export { defaultSchemaFieldToComponentMapping };
