import { FormDefaultControl } from "./FormDefaultControl";
import { FormObjectRenderer } from "./FormObjectRenderer";
import { SchemaObjectPropertyToComponentMapping } from "./types";

// NOTE 32: Дефолтный маппинг для типов полей
const defaultSchemaObjectPropertyToComponentMapping: SchemaObjectPropertyToComponentMapping =
  {
    string: FormDefaultControl,
    number: FormDefaultControl,
    boolean: FormDefaultControl,
    object: FormObjectRenderer,
  };

export { defaultSchemaObjectPropertyToComponentMapping };
