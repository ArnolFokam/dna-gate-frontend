import React, { useEffect, useState } from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { ReactComponent as Hero } from 'src/assets/images/security-pana.svg';

// import ImageLight from '../assets/img/login-office.jpeg'
// import ImageDark from '../assets/img/login-office-dark.jpeg'
import { Label, Button, Alert } from '@windmill/react-ui'
import { Field, Form, Formik } from 'formik';
import WindmillInput from 'src/components/input';
import { login } from 'src/reducers/authentication.reducer';
import { useAppDispatch, useAppSelector } from 'src/config/store';
import { toast } from 'react-toastify';

export const Login = (props: RouteComponentProps<any>) => {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const loginError = useAppSelector(state => state.authentication.loginError);
  const loginSuccess = useAppSelector(state => state.authentication.loginSuccess);
  const loading = useAppSelector(state => state.authentication.loading);

  useEffect(() => {
    if (loading) setShowErrorAlert(false);
  }, [loading]);

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
    <div className="bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center min-h-screen p-6 ">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="px-12 p-28 h-32 md:h-auto md:w-1/2 flex flex-col justify-center align-center">
              <Hero className="mx-auto" />
            <h4 className="text-center text-4lg tracking-tight font-extrabold text-gray-900 sm:text-5lg md:text-6lg">
              <span className=" xl:text-3lg text-2xl">Welcome</span>&nbsp;&nbsp;
              <span className="text-purple-700  xl:text-3lg text-2xl">back!</span>
            </h4>
            <p className="mt-1 text-base text-center text-gray-500 sm:mt-3 sm:text-md sm:max-w-sm sm:mx-auto md:mt-3 md:text-sm lg:mx-0">
              We are happy to see you again. Smash that login button, let's see what you've missed!
            </p>
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

                    <Button tag={"button"} block className="mt-4" type="submit" disabled={isSubmitting  || loading}>
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