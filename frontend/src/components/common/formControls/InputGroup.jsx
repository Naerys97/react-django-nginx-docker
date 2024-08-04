import { ErrorMessage, Field } from 'formik';
import React from 'react'
import { FiCheck, FiRotateCcw } from 'react-icons/fi';
import { Input, InputGroup } from 'rsuite';

function InputGroupControl(props) {
    const { name, label, ...rest } = props;
    return (
      <Field name={name}>
        {({ form, field }) => {
          return (
            <InputGroup>
              {/* <label htmlFor={name} className="rs-form-control-label">
                {label}
              </label> */}
              <Input
                id={name}
                name={name}
                type="text"
                placeholder={label}
                // className="is-invalid"
                value={field.value}
                onChange={(e) => form.setFieldValue(name, e)}
                onBlur={() => form.setFieldTouched(name, true)}
                {...rest}
              />
              <InputGroup.Button className='button-blue' type='submit' ><FiCheck /></InputGroup.Button>
              <InputGroup.Button className='button-red' type='reset' ><FiRotateCcw /></InputGroup.Button>

              <ErrorMessage
                component="span"
                name={name}
                className="rs-form-help-text error-message"
              />
            </InputGroup>
          );
        }}
      </Field>
    );
}

export default InputGroupControl