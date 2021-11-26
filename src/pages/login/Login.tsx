import React, { useEffect, useState } from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'

// import ImageLight from '../assets/img/login-office.jpeg'
// import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Button, Alert } from '@windmill/react-ui'
import { Field, Form, Formik } from 'formik';
import WindmillInput from 'src/components/input';
import { login } from 'src/reducers/authentication.reducer';
import { useAppDispatch, useAppSelector } from 'src/config/store';
import { toast } from 'react-toastify';

export const Login = (props: RouteComponentProps<any>) => {
  const [showErrorAlert, setShowErrorAlert]  = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const loginSuccess = useAppSelector(state => state.authentication.loginSuccess);

  const handleLogin = ({
    email,
    password }) => dispatch(login(email, password));

    useEffect(() => {
      if (loginSuccess) {
        toast.success("Successful authentication");
      }
    }, [loginSuccess]);

    useEffect(() => {
      if (loginError) {
        setShowErrorAlert(true);
      }
    }, [loginError]);

  const { location } = props;
  const { from } = (location.state as any) || { from: { pathname: '/', search: location.search } };
  
  if (isAuthenticated) {
    if (from.pathname.startsWith('/app')) {
      return <Redirect to={from} />;
    } else {
      return <Redirect to="/app" />;
    }
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            {/*<img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />*/}
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              {showErrorAlert ? (
                <Alert className="text-sm" type="danger" onClose={() => setShowErrorAlert(false)}>
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </Alert>
              ) : null}
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validate={values => {
                  const errors = {} as any;
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }

                  if (!values.password) {
                    errors.password = 'Required';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) =>
                  <Form>

                    <Label className="mt-4">
                      <span>Email</span>
                      <Field component={WindmillInput} type="email" name="email" placeholder="john@doe.com" autoComplete="true" />
                    </Label>

                    <Label className="mt-4">
                      <span>Password</span>
                      <Field component={WindmillInput} type="password" name="password" placeholder="***************" autoComplete="true" />
                    </Label>

                    <Button tag={"button"} block className="mt-4" type="submit" disabled={isSubmitting}>
                      Login
                    </Button>
                  </Form>}
              </Formik>

              <hr className="my-8" />

              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/register"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login