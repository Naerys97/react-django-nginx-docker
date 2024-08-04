import React from "react";
import InputNumber from "rsuite/InputNumber";
import { ErrorMessage, Field } from "formik";

function NumberInputControl(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        // console.log("field", field);
        // console.log("form", form);
        return (
          <>
            <label htmlFor={name} className='rs-form-control-label'>{label}</label>
            {/* <input type="text" inputmode="numeric" pattern="[0-9]*"> */}
            <InputNumber
              id={name}
              name={name}
              onChange={(e) => form.setFieldValue(name, e)}
              onBlur={() => form.setFieldTouched(name, true)}
              value={field.value}
              {...rest}
            />
            <ErrorMessage component='span' name={name} className="error-message" />

          </>
        );
      }}
    </Field>
  );
}

export default NumberInputControl;
