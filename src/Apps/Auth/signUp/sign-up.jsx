import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useRouter } from 'src/routes/hooks';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constance';
import { SignupRegisteredServices } from 'src/Services/Auth.Services';

import { TextFieldForm } from 'src/components/inputs';
import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { CustomBackGround } from 'src/components/AuthComponents';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { defaultImageUrl } from 'src/utils/utils';

export default function SignUpView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleSubmitAction = (values) => {
    setFormSubmitLoader(true);

    dispatch(
      SignupRegisteredServices(values, (res) => {
        setFormSubmitLoader(false);
        setErrMsg(null);
        if (res?.success) {
          setOpen(true);
        } else {
          dispatch({ type: 'FETCH_SUCCESS' });
          setErrMsg(res?.message);
        }
      })
    );
    setFormSubmitLoader(false);
  };

  return (
    <Box>
      <CustomBackGround
        imageName="svg1"
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
                  Sign up
                </Typography>

                <Formik
                  enableReinitialize
                  initialValues={{
                    companyName: '',
                    companyRegistrationNumber: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={Yup.object().shape({
                    companyName: Yup.string().trim().required('Company Name is required'),
                    companyRegistrationNumber: Yup.string()
                      .trim()
                      .required('Company Registration Number is required'),
                    phone: Yup.string().nonNullable(),
                    email: Yup.string()
                      .matches(EMAIL_REGEX, 'Please enter a valid email')
                      .required('Email is required'),
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
                  onSubmit={handleSubmitAction}
                >
                  {(props) => (
                    <Form autoComplete="off" noValidate>
                      <Stack spacing={1}>
                        {errMsg && <Alert severity="error">{errMsg}</Alert>}
                        <TextFieldForm formik={props} label="Company Name" field="companyName" />
                        <TextFieldForm
                          formik={props}
                          label="Company Registration Number"
                          field="companyRegistrationNumber"
                        />
                        <TextFieldForm formik={props} label="Email Address" field="email" />
                        <TextFieldForm
                          required={false}
                          formik={props}
                          field="phone"
                          label="Phone Number"
                        />
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
                      >
                        {formSubmitLoader ? (
                          <ButtonLoader />
                        ) : (
                          <Button type="submit" variant="contained">
                            Sign up
                          </Button>
                        )}
                      </Stack>
                    </Form>
                  )}
                </Formik>

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  sx={{ mt: 'auto', pt: 3 }}
                >
                  <Typography variant="subtitle2">Do you already have an account?</Typography>
                  <Button variant="outlined" sx={{ ml: 2 }} onClick={() => router.push('/login')}>
                    Login
                  </Button>
                </Stack>
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
              <img src={defaultImageUrl('/assets/svg/svg4.svg')} alt="icon" />
            </Box>

            <Typography variant="h5" textAlign="center" sx={{ p: 2 }}>
              Thank you for registering!
            </Typography>

            <Button fullWidth variant="contained" onClick={() => router.push('/login')}>
              Login
            </Button>
          </Stack>
        </Card>
      </Dialog>
    </Box>
  );
}
