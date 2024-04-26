import React, { memo, useCallback, useState, useMemo } from "react";

import _ from "lodash";

import { Form, FormProps, UiOptions } from "../Form";
import {
  JsonSchemaAddItemForm,
  JsonSchemaAddItemFormData,
} from "./JsonSchemaAddItemForm";

// NOTE 13: Это компонент формы с редактируемой схемой
// NOTE 14: Если обратить внимание то везде используется HOC memo,
// это нужно для того чтобы использовать shallow equal и сравнивать объекты и функции по ссылке,
// для того чтобы ссылки на объекты и функции менялись только в тот когда нам необходимо везде используются useMemo и useCallback,
// по сути это то что раньше называлось PureComponent
const EditableForm: React.FC<FormProps> = memo(function EditableForm(props) {
  const [schema, setSchema] = useState(props.schema);

  const handleSubmit = useCallback((data: JsonSchemaAddItemFormData) => {
    // NOTE 16: Используем колбек чтобы не добавлять в массив зависимостей зависимость от schema и не триггерить лишнии рендеры
    setSchema((prevSchema) => {
      // NOTE 17: Клонируем схему, чтобы не вызывать сайд эффектов
      const prevSchemaClone = _.cloneDeep(prevSchema);

      // NOTE 18: Превращаем данные формы в патч для схемы которую бедем мержить с существующей
      const schemaPatch = data.path
        .split(".")
        .reduceRight((acc, pathPart, i, pathParts) => {
          if (i === pathParts.length - 1) {
            return {
              properties: {
                [pathPart]: {
                  title: pathPart,
                  type: data.type,
                },
              },
            };
          } else {
            return {
              properties: {
                [pathPart]: {
                  ...acc,
                  title: pathPart,
                  type: "object",
                },
              },
            };
          }
        }, {} as any);

      //  NOTE 19: Мержим схемы
      _.merge(prevSchemaClone, schemaPatch);

      return prevSchemaClone;
    });
  }, []);

  const uiOptions: UiOptions = useMemo(() => {
    return {
      ...props.uiOptions,
      submitButton: props.uiOptions?.addFieldButton,
    };
  }, [props.uiOptions]);

  return (
    <>
      {/* NOTE 15: Этот компонет состоит из 2-х форм, формы данных и формы редактирования схемы */}
      <Form {...props} schema={schema} />
      <JsonSchemaAddItemForm
        schemaOptions={props.schemaOptions}
        uiOptions={uiOptions}
        onSubmit={handleSubmit}
      />
    </>
  );
});

export { EditableForm };
