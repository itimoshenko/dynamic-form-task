import { createContext } from "react";

import { JsonSchemaObject } from "../../types";
import { SchemaOptions } from "./types";
import type { FormProps } from "./Form";

type FormContextProps = {
  data: object;
  dataPath: string[];
  schema: JsonSchemaObject;
  schemaOptions?: SchemaOptions;
  onChange: (value: unknown, propertyPath: string[]) => void;
};

const FormContext = createContext<FormContextProps | null>(null);

export { FormContext };
export type { FormContextProps };
