import React from "react";
import { ErrorMessage, Field } from "formik";
import Radio from "rsuite/Radio";
import RadioGroup from "rsuite/RadioGroup";

function RadioControl(props) {
  const { name, label, options, ...rest } = props;

  return (
    <Field name={name}>
      {({ form, field }) => {
        return (
          <>
            <label htmlFor={name} className="rs-form-control-label">
              <p>{label}</p>
            </label>
            <div>
              <RadioGroup
                id={name}
                inline
                appearance="picker"
                onChange={(e) => form.setFieldValue(name, e)}
                onBlur={() => form.setFieldTouched(name, true)}
                value={field.value}
                {...rest}
              >
                {options.map((item) => (
                  <Radio key={item.value} value={item.value}>
                    {item.label}
                  </Radio>
                ))}
              </RadioGroup>
            </div>
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

export default RadioControl;
