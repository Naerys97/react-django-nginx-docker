import React from "react";
import { ErrorMessage, Field } from "formik";
import { TagPicker } from "rsuite";

function MultiSelectControl(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        return (
          <>
            <label htmlFor={name} className='rs-form-control-label'>{label}</label>
            <TagPicker
              id={name}
              block
              onChange={(e) => form.setFieldValue(name, e)}
              onBlur={() => form.setFieldTouched(name, true)}
              value={field.value}
              {...rest}
            />
            <ErrorMessage
              component="span"
              name={name}
              className="error-message"
            />
          </>
        );
      }}
    </Field>
  );
}

export default MultiSelectControl;
