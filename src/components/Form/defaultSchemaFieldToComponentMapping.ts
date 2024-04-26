import { EmptyRenderer } from "./EmptyRenderer";
import { TextRenderer } from "./TextRenderer";
import { FormObjectPropertiesRenderer } from "./FormObjectPropertiesRenderer";
import { SchemaFieldToComponentMapping } from "./types";

// NOTE 31: Дефолтный маппинг для полей схемы
const defaultSchemaFieldToComponentMapping: SchemaFieldToComponentMapping = {
  title: TextRenderer,
  description: TextRenderer,
  type: EmptyRenderer,
  required: EmptyRenderer,
  properties: FormObjectPropertiesRenderer,
};

export { defaultSchemaFieldToComponentMapping };
