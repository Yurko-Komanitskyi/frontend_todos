import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField } from '@mui/material';

interface MyDatePickerProps {
  name: string;
  label?: string;
}

export const MyDatePicker: React.FC<MyDatePickerProps> = ({
  name,
  label = 'Select a date',
}) => {
  const [, meta, helpers] = useField<Date | null>(name);
  const { value } = meta;
  const { setValue, setTouched } = helpers;

  const handleChange = (date: Date | null) => {
    setValue(date);
    setTouched(true);
  };

  return (
    <DatePicker
      selected={value}
      onChange={handleChange}
      onBlur={() => setTouched(true)}
      customInput={
        <TextField
          fullWidth
          label={label}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error ? meta.error : ''}
        />
      }
      dateFormat="MM/dd/yyyy"
    />
  );
};
