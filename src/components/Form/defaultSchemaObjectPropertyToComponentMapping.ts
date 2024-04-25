import { FormDefaultControl } from "./FormDefaultControl";
import { FormObjectRenderer } from "./FormObjectRenderer";
import { SchemaObjectPropertyToComponentMapping } from "./types";

const defaultSchemaObjectPropertyToComponentMapping: SchemaObjectPropertyToComponentMapping =
  {
    string: FormDefaultControl,
    number: FormDefaultControl,
    boolean: FormDefaultControl,
    object: FormObjectRenderer,
  };

export { defaultSchemaObjectPropertyToComponentMapping };
