import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react';
import style from './form.module.css';

interface FormValues {
  phoneNumber: string;
  address: string;
}



const handleChange = (e:any) => {
    const value = e.target.value;
    dispatch({ type: "SET_ADDRESS", payload: value });

    if (!addressRegex.test(value)) {
        dispatch({ type: "SET_ERROR", payload: "Yanlış adres formatı!" });
        dispatch({ type: "SET_FORMAT_MESSAGE", payload: "Örnək format: Ataturk Ganclik Baku 45" });
  

    } else {
        dispatch({ type: "SET_ERROR", payload: '' });
        dispatch({ type: "SET_FORMAT_MESSAGE", payload: '' });
    }

}


const handleChange1 = (event:any) => {
    let value = event.target.value;

    if (!value.startsWith('+994')) {
        value = '+994' + value.replace(/^\+994/, '');
    }

    const formattedValue = formatPhoneNumber(value);

    dispatch({ type: 'SET_PHONE_NUMBER', payload: formattedValue });

    if (formattedValue === '+994' || formattedValue === '+994-' || azerbaijanPhoneRegex.test(formattedValue)) {
        dispatch({ type: "SET_ERROR_NUMBER", payload: '' });
        dispatch({ type: "SET_FORMAT_NUMBER", payload: '' });
    } else {
        dispatch({ type: "SET_ERROR_NUMBER", payload: "Azerbaycan nömresi girməlisiz!" });
        dispatch({ type: "SET_FORMAT_NUMBER", payload: "Örnək: +994-55-555-55-55" });
    }
};


// Validation Schema
const validationSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .matches(/^\+994\d{9}$/, 'Phone number must start with +994 and have 9 additional digits')
    .required('Phone number is required'),
  address: Yup.string().required('Address is required'),
});

const initialValues: FormValues = {
  phoneNumber: '',
  address: '',
};

const SimpleForm: React.FC = () => {
  const toast = useToast();
  const [state, setState] = useState({
    error: '',
    formatMessage: '',
    errorNumber: '',
    formatNumber: '',
  });

  const onSubmit = (values: FormValues) => {
    // Submit işlemi burada
    console.log('Form submitted:', values);
    toast({
      title: 'Form submitted successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  const { div, inpdiv, button } = style;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, values }) => (
          <Form>
            <div className={div}>
              <div className={inpdiv}>
                <label htmlFor="phoneNumber">Phone Number</label>
                <Field
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="+994"
                  className="w-11/12 h-14 p-5 rounded-md"
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-mainRed" />
              </div>

              <div className={inpdiv}>
                <label htmlFor="address">Address</label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-11/12 h-14 p-5 rounded-md"
                />
                <ErrorMessage name="address" component="div" className="text-mainRed" />
              </div>

              <button
                type="submit"
                className={button}
                style={{ cursor: 'pointer' }}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {state.error && <span className="text-mainRed">{state.error}</span>}
      <br />
      {state.formatMessage && <span className="text-green">{state.formatMessage}</span>}

      <br />
      {state.errorNumber && <span className="text-mainRed">{state.errorNumber}</span>}
      <br />
      {state.formatNumber && <span className="text-green">{state.formatNumber}</span>}
    </div>
  );
};

export default SimpleForm;
