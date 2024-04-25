import React, { memo, useCallback, useContext } from "react";

import { Input, Select, Typography, Tooltip, Flex, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { Form, FormContext, SchemaOptions } from "./components/Form";
import { EditableForm } from "./components/EditableForm";

import { JsonSchemaObject } from "./types";

import "./styles.css";

// NOTE 1: Поскольку по задаче нам нужно формировать структуру формы на лету, то я решил формировать JSONSchema поскольку это почти стандарт для описания JSON данных, подробнее можно почитать тут, https://json-schema.org/
// NOTE 2: В файле "./types" с помощью TypeScript я частично описал JSONSchema формат, все поля я не стал описывать иначек задача вырастет в объем, поэтому я решил ограничится минимальным набором, но при необходимости набор поддерживаемых полем можно будет легко расширить
const jsonSchema: JsonSchemaObject = {
  title: "Form name",
  description: "Form description",
  type: "object",
  required: ["text"],
  properties: {
    text: {
      title: "Text",
      description: "Text description",
      type: "string",
    },
    number: {
      title: "Number",
      type: "number",
      default: 1,
    },
    checkbox: {
      title: "Checkbox",
      type: "boolean",
    },
    select: {
      title: "Select",
      type: "string",
    },
    nestedObject: {
      title: "Nested Object",
      type: "object",
      properties: {
        text: {
          title: "Text",
          type: "string",
        },
        text2: {
          title: "Text 2",
          type: "string",
        },
      },
    },
    number2: {
      title: "Number 2",
      type: "number",
      default: 1,
    },
  },
};

const antSchemaOptions: SchemaOptions = {
  schemaFieldToComponentMapping: {
    title: memo(function AntTitleIntegration({ value }) {
      return <Typography.Title>{value}</Typography.Title>;
    }),
    description: memo(function AntDescriptionIntegration({ value }) {
      return <Typography.Title level={2}>{value}</Typography.Title>;
    }),
  },
  schemaObjectPropertyToComponentMapping: {
    string: memo(function AntStringIntegration({
      value,
      onChange,
      schemaObject,
      schemaObjectPropertyName,
      schemaObjectProperty,
    }) {
      const context = useContext(FormContext);

      const handleChange: React.ChangeEventHandler<HTMLInputElement> =
        useCallback(
          (event) => {
            event.preventDefault();

            onChange(event.target.value, [
              ...(context?.dataPath || []),
              schemaObjectPropertyName,
            ]);
          },
          [onChange]
        );

      return (
        <Flex gap="small" align="center">
          <Tooltip title={schemaObjectProperty.description}>
            <label htmlFor={schemaObjectPropertyName}>
              <Typography.Text style={{ display: "block", width: 75 }}>
                {`${schemaObjectProperty.title} ${
                  schemaObject.required?.includes(schemaObjectPropertyName)
                    ? "*"
                    : ""
                }`}
              </Typography.Text>
            </label>
          </Tooltip>
          <Input
            id={schemaObjectPropertyName}
            name={schemaObjectPropertyName}
            value={value}
            onChange={handleChange}
          />
        </Flex>
      );
    }),
    number: memo(function AntNumberIntegration({
      value,
      onChange,
      schemaObject,
      schemaObjectPropertyName,
      schemaObjectProperty,
    }) {
      const context = useContext(FormContext);

      const handleChange: React.ChangeEventHandler<HTMLInputElement> =
        useCallback(
          (event) => {
            event.preventDefault();

            onChange(event.target.value, [
              ...(context?.dataPath || []),
              schemaObjectPropertyName,
            ]);
          },
          [onChange]
        );

      return (
        <Flex gap="small" align="center">
          <Tooltip title={schemaObjectProperty.description}>
            <label htmlFor={schemaObjectPropertyName}>
              <Typography.Text style={{ display: "block", width: 75 }}>
                {`${schemaObjectProperty.title} ${
                  schemaObject.required?.includes(schemaObjectPropertyName)
                    ? "*"
                    : ""
                }`}
              </Typography.Text>
            </label>
          </Tooltip>
          <Input
            type="number"
            id={schemaObjectPropertyName}
            name={schemaObjectPropertyName}
            value={value}
            onChange={handleChange}
          />
        </Flex>
      );
    }),
    boolean: memo(function AntBooleanIntegration({
      value,
      onChange,
      schemaObject,
      schemaObjectPropertyName,
      schemaObjectProperty,
    }) {
      const context = useContext(FormContext);

      const handleChange = useCallback(
        (event: CheckboxChangeEvent) => {
          onChange(event.target.checked, [
            ...(context?.dataPath || []),
            schemaObjectPropertyName,
          ]);
        },
        [onChange]
      );

      return (
        <Flex gap="small" align="center">
          <Tooltip title={schemaObjectProperty.description}>
            <label htmlFor={schemaObjectPropertyName}>
              <Typography.Text style={{ display: "block", width: 75 }}>
                {`${schemaObjectProperty.title} ${
                  schemaObject.required?.includes(schemaObjectPropertyName)
                    ? "*"
                    : ""
                }`}
              </Typography.Text>
            </label>
          </Tooltip>
          <Checkbox
            id={schemaObjectPropertyName}
            name={schemaObjectPropertyName}
            checked={value}
            onChange={handleChange}
          />
        </Flex>
      );
    }),
  },
  schemaObjectPropertyNameToComponentMapping: {
    select: memo(function AntSelectIntegration({
      value,
      onChange,
      schemaObject,
      schemaObjectPropertyName,
      schemaObjectProperty,
    }) {
      const context = useContext(FormContext);

      const handleChange: React.ChangeEventHandler<HTMLInputElement> =
        useCallback(
          (value) => {
            onChange(value, [
              ...(context?.dataPath || []),
              schemaObjectPropertyName,
            ]);
          },
          [onChange]
        );

      return (
        <Flex gap="small" align="center">
          <Tooltip title={schemaObjectProperty.description}>
            <label htmlFor={schemaObjectPropertyName}>
              <Typography.Text style={{ display: "block", width: 75 }}>
                {`${schemaObjectProperty.title} ${
                  schemaObject.required?.includes(schemaObjectPropertyName)
                    ? "*"
                    : ""
                }`}
              </Typography.Text>
            </label>
          </Tooltip>
          <Select
            id={schemaObjectPropertyName}
            value={value}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <Select.Option value="value1">Value 1</Select.Option>
            <Select.Option value="value2">Value 2</Select.Option>
          </Select>
        </Flex>
      );
    }),
  },
};

const App: React.FC = memo(function App() {
  const initialData = {
    text: "text text text",
    number: 123,
    checkbox: true,
    select: "value1",
    nestedObject: {
      text: "text text",
    },
    number2: 1234,
  };

  return (
    <>
      <EditableForm data={initialData} schema={jsonSchema} />
      <br />
      <Form
        data={initialData}
        schema={jsonSchema}
        schemaOptions={antSchemaOptions}
      />
    </>
  );
});

export default App;
