/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as formik from 'formik';
import * as yup from 'yup';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Grid, Typography, Container } from '@mui/material';
import { login } from '../../Helper/requests';
import { loginReducer } from '../../redux/authSlice';

interface ErrorMessage {
  email: { emailError: boolean; emailErrorMessage: string };
  password: { passwordError: boolean; passwordErrorMessage: string };
}

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    email: { emailError: false, emailErrorMessage: '' },
    password: { passwordError: false, passwordErrorMessage: '' },
  });

  const loginHandler = async (values: LoginFormValues) => {
    try {
      const response = await login({
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
      if (err.response?.data?.message === 'User with this password not found') {
        setErrorMessage(prev => ({
          ...prev,
          password: {
            passwordError: true,
            passwordErrorMessage: 'User with this password not found',
          },
        }));
      }

      if (err.response?.data?.message === 'User with this email not found') {
        setErrorMessage(prev => ({
          ...prev,
          email: {
            emailError: true,
            emailErrorMessage: 'User with this email not found',
          },
        }));
      }
    }
  };

  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  return (
    <Container component="main" maxWidth="xs" className={styles.login}>
      <Typography
        variant="h1"
        gutterBottom
        align="center"
        className={styles.login__title}
      >
        LOGIN
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        Please enter your login and password
      </Typography>
      <Formik
        validationSchema={schema}
        onSubmit={values => loginHandler(values)}
        initialValues={{
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
                  LOGIN
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Container>
  );
};
