import React, { memo, useCallback, useContext } from "react";

import {
  Input,
  Select,
  Typography,
  Tooltip,
  Flex,
  Checkbox,
  Button,
} from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";

import { FormContext, SchemaOptions, UiOptions } from "./components/Form";
import { EditableForm } from "./components/EditableForm";

import { JsonSchemaObject } from "./types";

import "./styles.css";

// NOTE 0: Рекомендую забить в поиске редактора "NOTE", все заметки пронумерованны, можно смотреть по порядку

// NOTE 1: Поскольку по задаче нам нужно формировать структуру формы на лету,
// то я решил формировать JSONSchema поскольку это почти стандарт для описания JSON данных,
// подробнее можно почитать тут, https://json-schema.org/

// NOTE 2: В файле "./types" с помощью TypeScript я частично описал JSONSchema формат,
// все поля я не стал описывать иначек задача вырастет в объем,
// поэтому я решил ограничится минимальным набором,
// но при необходимости набор поддерживаемых полем можно будет легко расширить
const jsonSchema: JsonSchemaObject = {
  title: "Пример формы",
  description: "Описание формы",
  type: "object",
  required: ["text"],
  properties: {
    text: {
      title: "Текстовое поле",
      description: "Описание текстовое поле",
      type: "string",
    },
    number: {
      title: "Числовое поле",
      type: "number",
      default: 1,
    },
    checkbox: {
      title: "Чекбокс",
      type: "boolean",
    },
    select: {
      title: "Поле выбора",
      type: "string",
    },
    nestedObject: {
      title: "Вложенный объект",
      description: "Описание вложенного объекта",
      type: "object",
      properties: {
        text: {
          title: "Ещё одно текстовое поле",
          type: "string",
        },
        text2: {
          title: "И ещё одно",
          type: "string",
        },
      },
    },
    number2: {
      title: "Ещё числовое поле",
      type: "number",
      default: 1,
    },
  },
};

// NOTE 3: Это пример того как можно интегрировать какой-либо UI-Kit в мою форму
// NOTE 4: Тут много дублирования потому что это по большей части демо-код интеграции
const antSchemaOptions: SchemaOptions = {
  // NOTE 5: С помощью данного словаря можно настроить внешний вид полей JSONSchema,
  // такой подход в реакте называют render props
  schemaFieldToComponentMapping: {
    title: memo(function AntTitleIntegration({ value }) {
      return <Typography.Title>{value}</Typography.Title>;
    }),
    description: memo(function AntDescriptionIntegration({ value }) {
      return <Typography.Title level={2}>{value}</Typography.Title>;
    }),
  },
  // NOTE 6: С помощью данного словаря можно настроить внешний вид основных типов которые есть в JSONSchema,
  // а именно "string" | "number" | "boolean" | "object"
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
          [onChange],
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
          [onChange],
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
        [onChange],
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
  // NOTE 7: А вот тут уже можно настроить внешний вид каких-то конкретных полей для конкретной формы, в данном случае это поле с именем "select"
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
          [onChange],
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

const antUiOptions: UiOptions = {
  submitButton: (
    <Button type="primary" htmlType="submit">
      Сохранить
    </Button>
  ),
  addFieldButton: (
    <Button type="default" htmlType="submit">
      Добавить
    </Button>
  ),
};

// NOTE 8: Это начальные данные для формы, могут быть пустыми
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

const initialData2 = {};
const jsonSchema2: JsonSchemaObject = {
  title: "Форма с пустой схемой",
  type: "object",
  properties: {},
};

// NOTE 9: Тут примеры работы формы
const App: React.FC = memo(function App() {
  return (
    <>
      {/* NOTE 10: Пример работы формы без настроенных компонентов */}
      <EditableForm data={initialData} schema={jsonSchema} />
      <br />
      {/* NOTE 11: Пример работы формы с настроенными компонентами */}
      <EditableForm
        data={initialData}
        schema={jsonSchema}
        schemaOptions={antSchemaOptions}
        uiOptions={antUiOptions}
      />
      <br />
      {/* NOTE 12: Пример работы формы с настроенными компонентами и пустой схемой */}
      <EditableForm
        data={initialData2}
        schema={jsonSchema2}
        schemaOptions={antSchemaOptions}
        uiOptions={antUiOptions}
      />
    </>
  );
});

export default App;
