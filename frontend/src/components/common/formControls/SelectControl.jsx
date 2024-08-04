import React from "react";
import { ErrorMessage, Field } from "formik";
import SelectPicker from "rsuite/SelectPicker";

function SelectControl(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        // console.log("form", form);
        // console.log("field", field);
        return (
          <>
            <label htmlFor={name} className='rs-form-control-label'>{label}</label>
            <SelectPicker
              id={name}
              block
              onChange={(e) => form.setFieldValue(name, e)}
              onBlur={() => form.setFieldTouched(name, true)}
              value={field.value}
              // {...field}
              {...rest}
            />
            <ErrorMessage component='span' name={name} className="error-message" />

          </>
        );
      }}
    </Field>
  );
}

export default SelectControl;
