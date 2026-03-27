import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { useRouter } from 'src/routes/hooks';
import { ADMIN_ROUTES } from 'src/routes/routes';

import { LoginServices } from 'src/Services/Auth.Services';
import { setAuthToken } from 'src/Services/auth/jwtAuth';
import { EMAIL_REGEX } from 'src/constance';

import { TextFieldForm } from 'src/components/inputs';
import ButtonLoader from 'src/components/Loaders/ButtonLoader';
import { CustomBackGround } from 'src/components/AuthComponents';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';

// ----------------------------------------------------------------------

export default function LoginView() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [errMsg, setErrMsg] = useState(null);
  const [showPassword, setShowPassword] = useState(true);
  const [formSubmitLoader, setFormSubmitLoader] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmitAction = (values) => {
    const tempFlag = true;
    setFormSubmitLoader(true);
    setFormSubmitLoader(false);
    if (tempFlag) {
      dispatch(
        LoginServices(values, (res) => {
          setErrMsg(null);
          setFormSubmitLoader(false);
          console.log('res', res);
          if (res?.status) {
            setAuthToken(res?.data.token);
            localStorage.setItem('token', res?.data.token);
            localStorage.setItem('user', JSON.stringify(res?.data.user));
            localStorage.setItem('roleId', JSON.stringify(res?.data.user?.role_id));
            router.push(ADMIN_ROUTES.DASHBOARD);
          } else {
            setErrMsg(res?.message);
          }
        })
      );
    }
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
                  Login
                </Typography>

                <Formik
                  enableReinitialize
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  validationSchema={Yup.object().shape({
                    email: Yup.string()
                      .matches(EMAIL_REGEX, 'Please enter a valid email')
                      .required('Email is required'),
                    password: Yup.string().required('Password is required'),
                  })}
                  onSubmit={handleSubmitAction}
                >
                  {(props) => (
                    <Form autoComplete="off" noValidate>
                      <Stack spacing={1}>
                        {errMsg && <Alert severity="error">{errMsg}</Alert>}
                        <TextFieldForm formik={props} label="Email Address" field="email" />
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
                                  onMouseDown={handleMouseDownPassword}
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
                          onClick={() => router.push('/forgot-password')}
                          sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                        >
                          Forgot Password?
                        </Typography>

                        {formSubmitLoader ? (
                          <ButtonLoader />
                        ) : (
                          <Button type="submit" variant="contained">
                            Login
                          </Button>
                        )}
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 'auto', pt: 3 }}
              >
                <Typography variant="subtitle2">You don’t have an account?</Typography>
                <Button variant="outlined" sx={{ ml: 2 }} onClick={() => router.push('/sign-up')}>
                  Sign Up
                </Button>
              </Stack>
            </Card>
          </Stack>
        }
      />
    </Box>
  );
}
