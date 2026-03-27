import jwtAuthAxios, { errorHandler } from './auth/jwtAuth';

export function LoginServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });
    jwtAuthAxios
      .post('/auth/login', data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data);
      });
  };
}

export function SignupRegisteredServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });

    jwtAuthAxios
      .post('/auth/signup', data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        console.log(error, 'error?.response?.data error?.response?.data');

        if (cb) cb(error?.response?.data || error);
        errorHandler(error, dispatch);
      });
  };
}

export function GenerateOtpServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });

    jwtAuthAxios
      .post('/auth/generate-otp', data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data);
        errorHandler(error, dispatch);
      });
  };
}

export function OTPValidationServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });

    jwtAuthAxios
      .post('/auth/otp-validation', data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data);
        errorHandler(error, dispatch);
      });
  };
}
export function VerifyOtpServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });

    jwtAuthAxios
      .post('/auth/verify-otp', data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data || error);
        errorHandler(error, dispatch);
      });
  };
}

export function ResetPasswordServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });

    jwtAuthAxios
      .post('/auth/reset-password', data)
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data);
        errorHandler(error, dispatch);
      });
  };
}

export function CompanyRegistrationServices(data, cb) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_START' });

    jwtAuthAxios
      .post('/company/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch({ type: 'FETCH_SUCCESS' });
        if (cb) cb(res.data);
      })
      .catch((error) => {
        if (cb) cb(error?.response?.data || error);
        errorHandler(error, dispatch);
      });
  };
}
