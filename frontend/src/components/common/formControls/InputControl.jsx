import { ErrorMessage, Field } from "formik";
import Input from "rsuite/Input";

function InputControl(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ form, field }) => {
        // console.log("form", form);
        // console.log("field", field);
        return (
          <>
            <label htmlFor={name} className="rs-form-control-label">
              {label}
            </label>
            <Input
              id={name}
              name={name}
              type="text"
              // className="is-invalid"
              value={field.value}
              onChange={(e) => form.setFieldValue(name, e)}
              onBlur={() => form.setFieldTouched(name, true)}
              {...rest}
            />
            <ErrorMessage
              component="span"
              name={name}
              className="rs-form-help-text error-message"
            />
          </>
        );
      }}
    </Field>
  );
}

export default InputControl;
