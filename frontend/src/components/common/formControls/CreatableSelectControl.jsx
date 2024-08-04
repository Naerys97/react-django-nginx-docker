import React from "react";
import { ErrorMessage, Field } from "formik";
import CreatableSelect from "react-select/creatable";

function CreatableSelectControl(props) {
  const { name, label, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        return (
          <>
            <label htmlFor={name} className='rs-form-control-label'>{label}</label>
            <CreatableSelect
              id={name}
              isMulti
              options={options}
              onChange={(val) => {
                form.setFieldValue(name, val);
              }}
              onBlur={() => form.setFieldTouched(name, true)}
              value={field.value}
              // {...field}
              {...rest}
            />
            <ErrorMessage name={name} className='rs-form-error-message'/>
          </>
        );
      }}
    </Field>
  );
}

export default CreatableSelectControl;
