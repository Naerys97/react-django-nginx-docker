import React, { useRef } from "react";
import Button from "rsuite/Button";
import { ErrorMessage, Field } from "formik";
import { Tag } from "rsuite";

function UploadControl(props) {
  const { name, label, ...rest } = props;
  const inputRef = useRef(null);

  return (
    <Field name={name}>
      {({ form, field }) => {
        return (
          <>
            <label htmlFor={name} className="rs-form-control-label">
              {label}
            </label>
            <div>
              <Button appearance="primary" className="button-purple" onClick={() => inputRef.current.click()}>Upload</Button>
              <input
                type="file"
                ref={inputRef}
                id={name}
                name={name}
                onChange={(e) => form.setFieldValue(name, e.target.files[0])}
                {...rest}
                style={{ display: "none" }}
              />
              <Tag size="lg" style={{ marginLeft: "5px" }}>
                {field.value?.name}
              </Tag>
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

export default UploadControl;
