import React from "react";
import { ErrorMessage, Field } from "formik";
import Input from "rsuite/Input";

function TextAreaControl(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        // console.log("field", field);
        return (
          <>
            <label htmlFor={name} className='rs-form-control-label'>{label}</label>
            <Input
              id={name}
              as="textarea"
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

export default TextAreaControl;
