/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import styles from './RegisterPage.module.scss';
import { register } from '../../Helper/requests';
import { loginReducer } from '../../redux/authSlice';

interface ErrorMessage {
  name: { nameError: boolean; nameErrorMessage: string };
  surname: { surnameError: boolean; surnameErrorMessage: string };
  email: { emailError: boolean; emailErrorMessage: string };
  password: { passwordError: boolean; passwordErrorMessage: string };
}

interface RegisterFormValues {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    name: { nameError: false, nameErrorMessage: '' },
    surname: { surnameError: false, surnameErrorMessage: '' },
    email: { emailError: false, emailErrorMessage: '' },
    password: { passwordError: false, passwordErrorMessage: '' },
  });

  const registerHandler = async (values: RegisterFormValues) => {
    try {
      const response = await register({
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      });

      dispatch(
        loginReducer({
          user: response.user,
          accesToken: response.accesToken,
        }),
      );
      navigate('/');
    } catch (err: any) {
      console.log(err);
    }
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    surname: yup.string().required('Surname is required'),
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Container component="main" maxWidth="xs" className={styles.register}>
      <Typography
        variant="h1"
        gutterBottom
        align="center"
        className={styles.register__title}
      >
        Register
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please fill in the form to create an account
      </Typography>
      <Formik
        validationSchema={schema}
        onSubmit={values => registerHandler(values)}
        initialValues={{
          name: '',
          surname: '',
          email: '',
          password: '',
        }}
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  name="name"
                  fullWidth
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
                  error={touched.name && !!errors.name}
                  helperText={
                    touched.name &&
                    (errors.name || errorMessage.name.nameErrorMessage)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Surname"
                  name="surname"
                  fullWidth
                  variant="outlined"
                  value={values.surname}
                  onChange={e => {
                    if (errorMessage.surname.surnameError) {
                      setErrorMessage(prev => ({
                        ...prev,
                        surname: {
                          surnameError: false,
                          surnameErrorMessage: '',
                        },
                      }));
                    }

                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.surname && !!errors.surname}
                  helperText={
                    touched.surname &&
                    (errors.surname || errorMessage.surname.surnameErrorMessage)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email address"
                  name="email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={values.email}
                  onChange={e => {
                    if (errorMessage.email.emailError) {
                      setErrorMessage(prev => ({
                        ...prev,
                        email: {
                          emailError: false,
                          emailErrorMessage: '',
                        },
                      }));
                    }

                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={
                    touched.email &&
                    (errors.email || errorMessage.email.emailErrorMessage)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  value={values.password}
                  onChange={e => {
                    if (errorMessage.password.passwordError) {
                      setErrorMessage(prev => ({
                        ...prev,
                        password: {
                          passwordError: false,
                          passwordErrorMessage: '',
                        },
                      }));
                    }

                    handleChange(e);
                  }}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={
                    touched.password &&
                    (errors.password ||
                      errorMessage.password.passwordErrorMessage)
                  }
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: '16px' }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};
