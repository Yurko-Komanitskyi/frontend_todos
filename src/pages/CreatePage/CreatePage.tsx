/* eslint-disable @typescript-eslint/no-explicit-any */

import { Formik } from 'formik';
import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { postData } from '../../Helper/requests';
import { ToastNotification } from '../../components/Toast/Toast';
import { MyDatePicker } from '../../components/DatePicker';

interface ErrorMessage {
  name: { nameError: boolean; nameErrorMessage: string };
  description: { descriptionError: boolean; descriptionErrorMessage: string };
  deadline: { deadlineError: boolean; deadlineErrorMessage: string };
}

interface FormValues {
  name: string;
  description: string;
  deadline: Date | null;
}

export const CreatePage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    name: { nameError: false, nameErrorMessage: '' },
    description: { descriptionError: false, descriptionErrorMessage: '' },
    deadline: { deadlineError: false, deadlineErrorMessage: '' },
  });

  const handleSubmitForm = async (values: FormValues) => {
    try {
      const req = { ...values };

      await postData(axiosPrivate, req);
      ToastNotification('success', 'Successfully created!');
    } catch (err: any) {
      ToastNotification(
        'error',
        `Something went wrong! (${err.response?.data?.message || err.message})`,
      );
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string(),
    deadline: Yup.date()
      .typeError('Deadline must be a date')
      .required('Deadline is required'),
  });

  return (
    <Box
      sx={{
        maxWidth: 800,
        width: '100%',
        margin: '20px auto',
        padding: 5,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        align="center"
        color="text.primary"
      >
        Add Todo
      </Typography>
      <Formik
        initialValues={{
          name: '',
          description: '',
          deadline: new Date(),
        }}
        validationSchema={schema}
        onSubmit={values => handleSubmitForm(values)}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="Enter todo name"
                name="name"
                variant="outlined"
                value={values.name}
                onChange={e => {
                  if (errorMessage.name.nameError) {
                    setErrorMessage(prev => ({
                      ...prev,
                      name: {
                        nameError: false,
                        nameErrorMessage: '',
                      },
                    }));
                  }

                  handleChange(e);
                }}
                onBlur={handleBlur}
                error={
                  !!(
                    (touched.name && errors.name) ||
                    errorMessage.name.nameError
                  )
                }
                helperText={
                  touched.name && errors.name
                    ? errors.name
                    : errorMessage.name.nameErrorMessage
                }
              />
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <TextField
                fullWidth
                label="Enter todo description"
                name="description"
                variant="outlined"
                value={values.description}
                onChange={e => {
                  if (errorMessage.description.descriptionError) {
                    setErrorMessage(prev => ({
                      ...prev,
                      description: {
                        descriptionError: false,
                        descriptionErrorMessage: '',
                      },
                    }));
                  }

                  handleChange(e);
                }}
                onBlur={handleBlur}
                error={
                  !!(
                    (touched.description && errors.description) ||
                    errorMessage.description.descriptionError
                  )
                }
                helperText={
                  touched.description && errors.description
                    ? errors.description
                    : errorMessage.description.descriptionErrorMessage
                }
              />
            </Box>
            <Box sx={{ marginBottom: 3 }}>
              <MyDatePicker name="deadline" />
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};
