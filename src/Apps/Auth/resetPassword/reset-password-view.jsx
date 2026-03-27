import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useRouter } from 'src/routes/hooks';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constance';
import {
  GenerateOtpServices,
  VerifyOtpServices,
  ResetPasswordServices,
} from 'src/Services/Auth.Services';

import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { CustomBackGround } from 'src/components/AuthComponents';
import { OTPFieldForm, TextFieldForm } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { defaultImageUrl } from 'src/utils/utils';

export default function LoginView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState(null);
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState('step1');
  const [title, setTitle] = useState('Forgot Password?');

  const [errMsg, setErrMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [timeLeft, setTimeLeft] = useState(2 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  // Step 1: Email Verification
  const handleSubmitAction = (values) => {
    setFormSubmitLoader(true);
    setErrMsg(null);
    dispatch(
      GenerateOtpServices(values, (res) => {
        setFormSubmitLoader(false);
        if (res?.success) {
          setErrMsg(null);
          setScreen('step2');
          setTitle('Email Verification');
          setEmail(values.email);
          startTimer();
        } else {
          setErrMsg(res?.message);
        }
      })
    );
  };

  // Step 2: Otp Verification
  const handleOtpSubmitAction = (values) => {
    setFormSubmitLoader(true);
    setErrMsg(null);
    dispatch(
      VerifyOtpServices({ email, otp: values.optNum }, (res) => {
        setFormSubmitLoader(false);
        if (res?.success) {
          setErrMsg(null);
          setScreen('step3');
          setTitle('Set New Password');
        } else {
          setErrMsg(res?.message);
        }
      })
    );
  };

  // Step 2: new Password
  const handleNewSubmitAction = (values) => {
    setFormSubmitLoader(true);
    setErrMsg(null);
    dispatch(
      ResetPasswordServices(
        { email, confirmPassword: values.confirmPassword, newPassword: values.password },
        (res) => {
          setFormSubmitLoader(false);
          if (res?.success) {
            setErrMsg(null);
            setOpen(true);
          } else {
            setErrMsg(res?.message);
          }
        }
      )
    );
  };

  useEffect(() => {
    if (!isRunning || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [isRunning, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setTimeLeft(2 * 60); // Reset if at 0
    setIsRunning(true);
  };

  return (
    <Box>
      <CustomBackGround
        imageName={screen === 'step2' ? 'svg2' : 'svg1'}
        rightContent={
          <Stack
            justifyContent="center"
            sx={{ height: 1, alignItems: { xs: 'center', sm: 'center', md: 'end', lg: 'end' } }}
          >
            <Card
              sx={{
                p: 4,
                width: 1,
                maxWidth: 450,
                borderRadius: 0,
                minHeight: 650,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ flexGrow: 0 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>
                  {title}
                </Typography>

                {errMsg && (
                  <Alert sx={{ mb: 2 }} severity="error">
                    {errMsg}
                  </Alert>
                )}

                {screen === 'step1' && (
                  <Formik
                    enableReinitialize
                    initialValues={{
                      email: '',
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .matches(EMAIL_REGEX, 'Please enter a valid email')
                        .required('Email is required'),
                    })}
                    onSubmit={handleSubmitAction}
                  >
                    {(props) => (
                      <Form autoComplete="off" noValidate>
                        <Stack spacing={3}>
                          <TextFieldForm formik={props} label="Email Address" field="email" />
                        </Stack>

                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ my: 3 }}
                        >
                          <Typography
                            variant="subtitle2"
                            underline="hover"
                            onClick={() => router.push('/login')}
                            sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Cancel
                          </Typography>

                          {formSubmitLoader ? (
                            <ButtonLoader />
                          ) : (
                            <Button type="submit" variant="contained">
                              Submit
                            </Button>
                          )}
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                )}

                {screen === 'step2' && (
                  <>
                    <Typography variant="light">
                      We have sent the verification code to your mail:
                    </Typography>

                    <Typography variant="subtitle2" sx={{ mb: 4 }}>
                      {email}
                    </Typography>

                    <Formik
                      enableReinitialize
                      initialValues={{
                        optNum: '',
                      }}
                      validationSchema={Yup.object().shape({
                        optNum: Yup.string()
                          .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
                          .required('OTP is required'),
                      })}
                      onSubmit={handleOtpSubmitAction}
                    >
                      {(props) => (
                        <Form autoComplete="off" noValidate>
                          <Stack spacing={3}>
                            <OTPFieldForm length={6} formik={props} label="" field="optNum" />
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ my: 2 }}
                          >
                            <Typography
                              variant="subtitle2"
                              underline="hover"
                              onClick={() => {
                                handleSubmitAction({ email });
                              }}
                              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Resend Code
                            </Typography>

                            <Typography variant="light"> {formatTime(timeLeft)}</Typography>
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="end"
                            spacing={1}
                          >
                            <Button
                              type="submit"
                              variant="outlined"
                              onClick={() => router.push('/login')}
                            >
                              back
                            </Button>

                            {formSubmitLoader ? (
                              <ButtonLoader />
                            ) : (
                              <Button type="submit" variant="contained">
                                Submit
                              </Button>
                            )}
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </>
                )}

                {screen === 'step3' && (
                  <>
                    <Typography variant="light">
                      We have sent the verification code to your mail:
                    </Typography>
                    <Typography variant="subtitle2" sx={{ mb: 4 }}>
                      {email}
                    </Typography>

                    <Formik
                      enableReinitialize
                      initialValues={{
                        password: '',
                        confirmPassword: '',
                      }}
                      validationSchema={Yup.object().shape({
                        password: Yup.string()
                          .matches(
                            PASSWORD_REGEX,
                            'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character'
                          )
                          .required('Password is required'),
                        confirmPassword: Yup.string()
                          .oneOf([Yup.ref('password'), null], 'Passwords must match')
                          .required('Confirm Password is required'),
                      })}
                      onSubmit={handleNewSubmitAction}
                    >
                      {(props) => (
                        <Form autoComplete="off" noValidate>
                          <Stack spacing={3}>
                            <TextFieldForm
                              formik={props}
                              label="Password"
                              field="password"
                              type={!showPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <VisibilityOutlinedIcon fontSize="small" />
                                      ) : (
                                        <VisibilityOffOutlinedIcon fontSize="small" />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />

                            <TextFieldForm
                              formik={props}
                              label="Confirm Password"
                              field="confirmPassword"
                              type={!showConfirmPassword ? 'text' : 'password'}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowConfirmPassword}
                                      edge="end"
                                    >
                                      {showConfirmPassword ? (
                                        <VisibilityOutlinedIcon fontSize="small" />
                                      ) : (
                                        <VisibilityOffOutlinedIcon fontSize="small" />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Stack>

                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="end"
                            sx={{ my: 3 }}
                            spacing={1.5}
                          >
                            <Button variant="outlined" onClick={() => router.push('/login')}>
                              Cancel
                            </Button>
                            {formSubmitLoader ? (
                              <ButtonLoader />
                            ) : (
                              <Button type="submit" variant="contained">
                                Submit
                              </Button>
                            )}
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </>
                )}
              </Box>
            </Card>
          </Stack>
        }
      />

      <Dialog open={open} sx={{ '& .MuiPaper-root': { borderRadius: 3 } }}>
        <Card
          sx={{
            width: 1,
            maxWidth: 400,
            // minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 0,
            p: 3,
            boxShadow: (theme) => theme.customShadows.z20,
            backgroundColor: (theme) => theme.palette.background.default,
            border: (theme) => `4px solid ${theme.palette.primary?.main}`,
          }}
        >
          <Stack justifyContent="center" sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                m: 2,
              }}
            >
              <img src={defaultImageUrl('/assets/svg/svg3.svg')} alt="icon" />
            </Box>

            <Typography variant="h5" textAlign="center" sx={{ p: 2 }}>
              Your password has been successfully updated.
            </Typography>

            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={() => router.push('/login')}
            >
              Login
            </Button>
          </Stack>
        </Card>
      </Dialog>
    </Box>
  );
}
