import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Formik, Form, Field } from 'formik';
import { ReactComponent as Hero } from 'src/assets/images/security-amico.svg';

// import ImageLight from '../assets/img/create-account-office.jpeg'
// import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { Label, Button } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'src/config/store';
import { handleRegister, reset } from './register.reducer';
import WindmillInput from 'src/components/input';

export const Register = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const loading = useAppSelector(state => state.register.loading);
  const registrationFailure = useAppSelector(state => state.register.registrationFailure);
  const errorMessage = useAppSelector(state => state.register.errorMessage);
  const successMessage = useAppSelector(state => state.register.successMessage);
  const registrationSuccess = useAppSelector(state => state.register.registrationSuccess);

  useEffect(
    () => () => {
      dispatch(reset());
    },
    [dispatch]);

  const handleValidSubmit = ({
    first_name,
    last_name,
    email,
    password
  }) => {
    dispatch(handleRegister({
      first_name,
      last_name,
      email,
      password
    }));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  useEffect(() => {
    if (registrationSuccess) {
      push("/login");
    }
  }, [registrationSuccess, push]);

  useEffect(() => {
    if (registrationFailure && errorMessage) {
      toast.error(errorMessage);
    }
  }, [registrationFailure, errorMessage]);

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-purple-500  flex items-center min-h-screen p-6 ">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="px-12 p-28 h-32 md:h-auto md:w-1/2 flex flex-col justify-center align-center">
          <Hero className="mx-auto" />
            <h4 className=" text-center text-4lg tracking-tight font-extrabold text-gray-900 sm:text-5lg md:text-6lg">
              {/*<span className="block xl:inline">Stay confident of your user's data with</span>{' '}*/}
              <span className="block text-purple-700 xl:inline xl:text-3lg text-2xl">DNA Gate SaaS</span>
            </h4>
            <p className="mt-1 text-base text-center text-gray-500 sm:mt-3 sm:text-md sm:max-w-sm sm:mx-auto md:mt-3 md:text-sm lg:mx-0">
              The only saas platform you will ever need for robust biometric authentication. No joke!
            </p>
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
              </h1>
              <Formik
                initialValues={{
                  first_name: '',
                  last_name: '',
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

                  if (!values.first_name) {
                    errors.first_name = 'Required';
                  } else if (
                    !/^[a-zA-Z'-]+$/i.test(values.first_name)
                  ) {
                    errors.first_name = 'First name should be only one word';
                  }

                  if (!values.last_name) {
                    errors.last_name = 'Required';
                  } else if (
                    !/^[a-zA-Z'-]+$/i.test(values.last_name)
                  ) {
                    errors.last_name = 'Last name should be only one word';
                  }

                  if (!values.password) {
                    errors.password = 'Required';
                  }

                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleValidSubmit(values);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) =>
                  <Form>
                    <Label className="mt-4">
                      <span>First Name</span>
                      <Field component={WindmillInput} type="text" name="first_name" placeholder="John" />
                    </Label>

                    <Label className="mt-4">
                      <span>Last Name</span>
                      <Field component={WindmillInput} type="text" name="last_name" placeholder="Doe" />
                    </Label>

                    <Label className="mt-4">
                      <span>Email</span>
                      <Field component={WindmillInput} type="email" name="email" placeholder="john@doe.com" autoComplete="true" />
                    </Label>

                    <Label className="mt-4">
                      <span>Password</span>
                      <Field component={WindmillInput} type="password" name="password" placeholder="***************" autoComplete="true" />
                    </Label>

                    <Button tag={"button"} block className="mt-4" type="submit" disabled={isSubmitting || loading}>
                      Create account
                    </Button>
                  </Form>}
              </Formik>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Register