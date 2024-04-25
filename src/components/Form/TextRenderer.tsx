import React, { memo } from "react";
import { SchemaFieldComponentProps } from "./types";

const TextRenderer: React.FC<SchemaFieldComponentProps<string>> = memo(
  function TextRenderer({ value }) {
    return <div>{value}</div>;
  }
);

export { TextRenderer };
