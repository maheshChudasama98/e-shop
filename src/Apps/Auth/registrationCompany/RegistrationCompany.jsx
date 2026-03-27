import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

// import { EMAIL_REGEX } from 'src/constance';
import { CompanyRegistrationServices } from 'src/Services/Auth.Services';
// import {
//   CitiesServices,
//   CountriesServices,
//   IndustriesServices,
// } from 'src/Services/Common.Services';

import { CustomBackGround } from 'src/components/AuthComponents';
import { TextFieldForm, FileUploadField } from 'src/components/inputs';

import { Form, Formik } from 'formik';

import * as Yup from 'yup';
import { defaultImageUrl } from 'src/utils/utils';

export default function RegistrationCompany() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(1);
  const [title, setTitle] = useState('Company Information');

  // const [industriesList, setIndustriesList] = useState([]);
  // const [countriesList, setCountriesList] = useState([]);
  // const [citiesList, setCitiesList] = useState([]);

  // useEffect(() => {
  //   dispatch(
  //     IndustriesServices((res) => {
  //       setIndustriesList(res?.data?.industries || []);
  //     })
  //   );
  //   dispatch(
  //     CountriesServices((res) => {
  //       setCountriesList(res?.data?.countries || []);
  //     })
  //   );
  //   dispatch(
  //     CitiesServices((res) => {
  //       setCitiesList(res?.data?.cities || []);
  //     })
  //   );
  // }, []);

  // const NextStep = () => {
  //   setScreen((prev) => {
  //     if (1 + prev === 1) {
  //       setTitle('Company Information');
  //     } else if (1 + prev === 2) {
  //       setTitle('Submit Formation Documents');
  //     } else if (1 + prev === 3) {
  //       setTitle('Director information & KYC');
  //     } else {
  //       setTitle('Company Information');
  //       return 1;
  //     }
  //     return prev + 1;
  //   });
  // };

  // const PreviousStep = () => {
  //   setScreen((prev) => {
  //     if (prev - 1 === 1) {
  //       setTitle('Company Information');
  //     } else if (prev - 1 === 2) {
  //       setTitle('Submit Formation Documents');
  //     } else if (prev - 1 === 3) {
  //       setTitle('Director information & KYC');
  //     } else {
  //       setTitle('Company Information');
  //       return 1;
  //     }
  //     return prev - 1;
  //   });
  // };

  const steps = [
    { label: 'Company', icon: <i className="fa-solid fa-briefcase fa-lg" /> },
    { label: 'Documents', icon: <i className="fa-solid fa-clipboard fa-lg" /> },
    { label: 'Director', icon: <i className="fa-solid fa-user fa-lg" /> },
  ];

  const DashedLine = styled(Box)(({ theme }) => ({
    width: 1,
    height: 15,
    margin: '0px 40px',
    backgroundImage: `repeating-linear-gradient(
    ${theme.palette.primary.main}, 
    ${theme.palette.primary.main} 2px, 
    transparent 2px, 
    transparent 5px
  )`,
  }));

  const NextStep = () => {
    setScreen((prev) => {
      const next = prev + 1;
      setTitle(stepTitle(next));
      return next;
    });
  };

  const PreviousStep = () => {
    setScreen((prev) => {
      const next = prev - 1;
      setTitle(stepTitle(next));
      return next;
    });
  };

  const stepTitle = (step) => {
    switch (step) {
      case 1:
        return 'Company Information';
      case 2:
        return 'Submit Formation Documents';
      case 3:
        return 'Director information & KYC';
      default:
        return 'Company Information';
    }
  };

  const handleSubmitAction = async (values) => {
    const formData = new FormData();

    formData.append('company_code', id);

    Object.entries(values).forEach(([key, val]) => {
      if (val && val instanceof File) {
        formData.append(key, val);
      } else {
        formData.append(key, val ?? '');
      }
    });

    dispatch(
      CompanyRegistrationServices(formData, (res) => {
        if (res?.success) {
          setOpen(true);
        }
      })
    );
  };
  const StepItem = ({ icon, label, active, completed, onClick, isFirst, index }) => (
    <Box display="flex" alignItems="" flexDirection="column" m={1}>
      <Box
        display="flex"
        alignItems="center"
        onClick={onClick}
        sx={{
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
          ml: !active ? 1.0 : 0,
          // my: !active && 2,
        }}
      >
        <Box
          sx={{
            mr: 2,
          }}
        >
          <Avatar
            sx={{
              bgcolor: (theme) => {
                if (active) return theme.palette.text.light;
                if (completed) return theme.palette.primary.main;
                return theme.palette.text.light;
              },
              color: (theme) => {
                if (active) return theme.palette.text.dark;
                if (completed) return theme.palette.text.light;
                return theme.palette.text.secondary;
              },

              p: 3,

              border: (theme) => `1px dashed ${theme.palette.primary.main}`,
            }}
          >
            {icon}
          </Avatar>
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: (theme) => {
              if (active) return theme.palette.text.dark;
              if (completed) return theme.palette.primary.main;
              return theme.palette.text.secondary;
            },
            p: 0,
            fontWeight: active ? 'bold' : 'normal',
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
  return (
    <Box>
      <CustomBackGround
        imageName={screen === 'step2' ? 'svg2' : 'svg1'}
        rightContent={
          <Stack
            justifyContent="center"
            sx={{ height: 1, alignItems: { xs: 'center', sm: 'center', md: 'end', lg: 'end' } }}
          >
            <Stack width="100%" direction="row" justifyContent="space-between" sx={{}}>
              <Box>
                {steps.map((step, index) => (
                  <Box key={step.label}>
                    {index + 1 === screen ? (
                      <Paper
                        elevation={3}
                        sx={{
                          borderRadius: 1.5,
                          px: 1,
                          py: 0.5,
                          width: 250,
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: 'white',
                          boxShadow: 'none',
                        }}
                      >
                        <StepItem
                          icon={step.icon}
                          label={step.label}
                          active
                          completed={false}
                          onClick={() => setScreen(index + 1)}
                          isFirst={index + 1 === 1}
                          index={index + 1}
                        />
                      </Paper>
                    ) : (
                      <StepItem
                        icon={step.icon}
                        label={step.label}
                        active={false}
                        completed={index + 1 < screen}
                        onClick={() => setScreen(index + 1)}
                        isFirst={index + 1 === 1}
                        index={index + 1}
                      />
                    )}
                    {(index + 1 === 1 || index + 1 === 2) && <DashedLine />}
                  </Box>
                ))}
              </Box>
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
                </Box>

                <Formik
                  enableReinitialize
                  initialValues={{
                    industry_id: '',
                    city_id: '',
                    country_id: '',
                    street_address: '',
                    director_name: '',
                    director_email: '',
                    director_phone: '',

                    company_formation: '',
                    capture_facial_data: '',
                    identification_document: '',
                  }}
                  validationSchema={Yup.object().shape({
                    industry_id: Yup.string().required('Industry is required'),
                    city_id: Yup.string().required('City is required'),
                    country_id: Yup.string().required('Country is required'),
                    street_address: Yup.string().required('Street Address is required'),
                    director_name: Yup.string().required('Full Name  is required'),
                    director_email: Yup.string().required('Email Address is required'),
                    director_phone: Yup.string().required('Phone Number is required'),
                    company_formation: Yup.string().required('Document is required'),
                    capture_facial_data: Yup.string().required('Capture Facial is required'),
                    identification_document: Yup.string().required(
                      'Identification Document is required'
                    ),
                  })}
                  onSubmit={handleSubmitAction}
                >
                  {(props) => {
                    const { validateForm, setTouched } = props;

                    const handleNextScreen = async () => {
                      const screenFields = {
                        1: ['industry_id', 'city_id', 'country_id', 'street_address'],
                        2: ['company_formation'],
                        3: [
                          'director_name',
                          'director_email',
                          'director_phone',
                          'capture_facial_data',
                          'identification_document',
                        ],
                      };

                      const fields = screenFields[screen];
                      setTouched(
                        fields.reduce((acc, key) => ({ ...acc, [key]: true }), {}),
                        true
                      );

                      const validationErrors = await validateForm();
                      const hasError = fields.some((key) => validationErrors[key]);

                      if (!hasError) {
                        NextStep();
                      }
                    };

                    // const getScreenErrors = () => {
                    //   const screenFields = {
                    //     1: ['industry_id', 'city_id', 'country_id', 'street_address'],
                    //     2: ['company_formation'],
                    //     3: [
                    //       'director_name',
                    //       'director_email',
                    //       'director_phone',
                    //       'capture_facial_data',
                    //       'identification_document',
                    //     ],
                    //   };

                    //   return screenFields[screen]
                    //     .map((field) => errors[field])
                    //     .filter(Boolean)
                    //     .join(', ');
                    // };
                    return (
                      <Form autoComplete="off" noValidate>
                        <Stack spacing={1.5}>
                          {/* {getScreenErrors() && (
                            <Typography color="error" fontWeight="bold">
                              {getScreenErrors()}
                            </Typography>
                          )} */}
                          {screen === 1 && (
                            <>
                              {/* <AutoCompleteSelectMenu
                                formik={props}
                                label="Industry"
                                field="industry_id"
                                menuList={industriesList}
                                valueKey="industry_id"
                                labelKey="name"
                              /> */}

                              <TextFieldForm
                                formik={props}
                                label="Street Address"
                                field="street_address"
                              />

                            
                            </>
                          )}

                          {screen === 2 && (
                            <FileUploadField
                              formik={props}
                              label="Upload Document (Company Formation)"
                              field="company_formation"
                            />
                          )}

                          {screen === 3 && (
                            <>
                              <TextFieldForm
                                formik={props}
                                label="Director Full Name"
                                field="director_name"
                              />
                              <TextFieldForm
                                formik={props}
                                label="Director Email Address"
                                field="director_email"
                              />
                              <TextFieldForm
                                formik={props}
                                label="Director Phone Number"
                                field="director_phone"
                              />

                              <FileUploadField
                                formik={props}
                                label="Upload Identification Document"
                                field="identification_document"
                              />

                              <FileUploadField
                                formik={props}
                                isCamera
                                label="Capture Facial Data"
                                field="capture_facial_data"
                              />
                            </>
                          )}
                        </Stack>{' '}
                        <Stack
                          direction="row"
                          justifyContent="end"
                          sx={{ mt: 'auto', pt: 3 }}
                          spacing={1}
                        >
                          {(screen === 2 || screen === 3) && (
                            <Button variant="outlined" onClick={PreviousStep}>
                              Previous
                            </Button>
                          )}

                          {(screen === 1 || screen === 2) && (
                            <Button variant="contained" onClick={handleNextScreen}>
                              Next
                            </Button>
                          )}

                          {screen === 3 && (
                            <Button variant="contained" type="submit">
                              Submit
                            </Button>
                          )}
                        </Stack>
                      </Form>
                    );
                  }}
                </Formik>
              </Card>
            </Stack>
          </Stack>
        }
      />

      <Dialog open={open} sx={{ '& .MuiPaper-root': { borderRadius: 3 } }}>
        <Card
          sx={{
            width: 1,
            minWidth: 400,
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
              Setup Completed
            </Typography>

            <Button fullWidth variant="contained" onClick={() => router.push('/login')}>
              Go To Dashboard
            </Button>
          </Stack>
        </Card>
      </Dialog>
    </Box>
  );
}
