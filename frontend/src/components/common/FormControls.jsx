import CreatableSelectControl from './formControls/CreatableSelectControl';
import InputControl from './formControls/InputControl';
import InputGroupControl from './formControls/InputGroup';
import MultiSelectControl from './formControls/MultiSelectControl';
import NumberInputControl from './formControls/NumberInputControl';
import RadioControl from './formControls/RadioControl';
import SelectControl from './formControls/SelectControl';
import TextAreaControl from './formControls/TextAreaControl';
import UploadControl from './formControls/UploadControl';

function FormControls({control, ...rest}) {
  switch (control) {
    case 'text':
        return InputControl(rest)
    case 'radio':
        return RadioControl(rest)
    case 'creatable':
        return CreatableSelectControl(rest)
    case 'select':
        return SelectControl(rest)
    case 'textarea':
        return TextAreaControl(rest)
    case 'upload':
        return UploadControl(rest)
    case 'number':
        return NumberInputControl(rest)
    case 'multi':
        return MultiSelectControl(rest)
    case 'group':
        return InputGroupControl(rest)
    default:
        break;
  }
}

export default FormControls