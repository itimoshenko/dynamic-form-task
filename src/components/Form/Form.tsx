import React, { memo, useCallback, useMemo, useState } from "react";
import _ from "lodash";

import { JsonSchemaObject } from "../../types";

import { FormRenderer } from "./FormRenderer";
import { FormContext, FormContextProps } from "./FormContext";

import {
  SchemaFieldToComponentMapping,
  SchemaObjectPropertyToComponentMapping,
  SchemaOptions,
  UiOptions,
} from "./types";
import { defaultSchemaFieldToComponentMapping } from "./defaultSchemaFieldToComponentMapping";
import { defaultSchemaObjectPropertyToComponentMapping } from "./defaultSchemaObjectPropertyToComponentMapping";

type FormProps = {
  data: object;
  schema: JsonSchemaObject;
  schemaOptions?: SchemaOptions;
  uiOptions?: UiOptions;
  onSubmit?: (data: any) => void;
};

// NOTE 22: Компонент основной формы
const Form: React.FC<FormProps> = memo(function Form({
  data,
  schema,
  schemaOptions,
  uiOptions,
  onSubmit,
}) {
  const [formData, setFormData] = useState(data);

  // NOTE 23: Мержим дефолтные настройки и те что нам передали из пропсов
  const _schemaObjectPropertyToComponentMapping: SchemaObjectPropertyToComponentMapping =
    useMemo(() => {
      return {
        ...defaultSchemaObjectPropertyToComponentMapping,
        ...schemaOptions?.schemaObjectPropertyToComponentMapping,
      };
    }, [schemaOptions?.schemaObjectPropertyToComponentMapping]);

  // NOTE 24: Аналогично мержим дефолтные настройки и те что нам передали из пропсов
  const _schemaFieldToComponentMapping: SchemaFieldToComponentMapping =
    useMemo(() => {
      return {
        ...defaultSchemaFieldToComponentMapping,
        ...schemaOptions?.schemaFieldToComponentMapping,
      };
    }, [schemaOptions?.schemaFieldToComponentMapping]);

  // NOTE 25: Обработчик события подтверждения формы
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      // NOTE 26: Отменяет поведение формы по умолчанию, чтобы форма никуда не редиректила
      event.preventDefault();

      onSubmit?.(formData);
    },
    [onSubmit, formData],
  );

  // NOTE 27: Обработчик изменения данных в различных контролах
  const handleChange = useCallback((value: unknown, propertyPath: string[]) => {
    setFormData((prevData) => {
      const clonePrevData = _.cloneDeep(prevData);

      _.set(clonePrevData, propertyPath.join("."), value);

      return clonePrevData;
    });
  }, []);

  // NOTE 28: Используем контекст чтобы избезать props drilling
  const contextValue: FormContextProps = useMemo(() => {
    return {
      data: formData,
      dataPath: [],
      schema,
      schemaOptions: {
        ...schemaOptions,
        schemaObjectPropertyToComponentMapping:
          _schemaObjectPropertyToComponentMapping,
        schemaFieldToComponentMapping: _schemaFieldToComponentMapping,
      },
      onChange: handleChange,
    };
  }, [
    formData,
    schema,
    schemaOptions,
    handleChange,
    _schemaObjectPropertyToComponentMapping,
    _schemaFieldToComponentMapping,
  ]);

  return (
    // NOTE 29: Обработчик подтверждения формы висит на форме
    // что позволяет также сабмитить форму нажатием на клавишу "enter"
    <form onSubmit={handleSubmit}>
      <FormContext.Provider value={contextValue}>
        <FormRenderer />
      </FormContext.Provider>
      {uiOptions?.submitButton || <button type="submit">Сохранить</button>}
    </form>
  );
});

export { Form };
export type { FormProps };
