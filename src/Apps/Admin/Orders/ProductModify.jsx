import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { SelectorsService } from 'src/Services/master.services';
import { Card, Tab, Tabs } from '@mui/material';
import {
  ProductDeleteService,
  ProductSelectedService,
  VariantDeleteService,
} from 'src/Services/product.services';
import { CustomBackButton } from 'src/components/CustomComponents';
import { useSearchParams } from 'react-router-dom';
import { getDisplayData } from 'src/utils/utils';
import { Stack } from '@mui/system';
import { formatToINR } from 'src/utils/format-number';
import { Avatar, Skeleton, Table } from 'antd';
import { fText } from 'src/utils/format-text';
import { ADMIN_ROUTES } from 'src/routes/routes';
import { useRouter } from 'src/routes/hooks';
import { sweetAlertQuestion, sweetAlerts, sweetAlertSuccess } from 'src/utils/sweet-alerts';
import ProductAddModel from './ProductAddModel';
import { apiURL } from 'src/constance';

export default function ProductModifyForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [searchParams] = useSearchParams();

  const productId = searchParams.get('id') || searchParams.get('productid');

  const [selectors, setSelectors] = useState({});
  const [productDetails, setProductDetails] = useState({});
  const [loadingLoader, setLoadingLoader] = useState(false);
  // const [variantsModifyModel, setVariantsModifyModel] = useState(false);

  const [modifyModel, setModifyModel] = useState(false);
  const [apiFlag, setApiFlag] = useState(false);

  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const DeleteActions = () => {
    sweetAlertQuestion(
      'This Product will be permanently deleted. You won’t be able to recover it.',
      'Delete Product?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            ProductDeleteService({ product_id: productId }, (res) => {
              if (res?.status) {
                router.push(`${ADMIN_ROUTES.PRODUCTS_LIST}`);
                sweetAlertSuccess('Product deleted successfully').then(() => {});
              } else {
                sweetAlerts('error', res?.message);
              }
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const VariantDeleteActions = (id) => {
    sweetAlertQuestion(
      'This Variant will be permanently deleted. You won’t be able to recover it.',
      'Delete Variant?'
    )
      .then((result) => {
        if (result === 'Yes') {
          dispatch(
            VariantDeleteService({ variant_id: id }, (res) => {
              if (res?.status) {
                setApiFlag(!apiFlag);
                sweetAlertSuccess('Variant deleted successfully').then(() => {});
              } else {
                sweetAlerts('error', res?.message);
              }
            })
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      render: (_, record, index) => index + 1,
    },
    {
      title: 'Variant',
      dataIndex: 'variant',
      key: 'variant',
      width: 70,
      render: (_, record, index) => (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Avatar
            shape="square"
            size="large"
            src={
              record?.product_images?.[0]?.image_url
                ? `${apiURL}/${record?.product_images?.[0]?.image_url}`
                : '/assets/images/avatars/avatar_5.jpg'
            }
            style={{ border: 'solid 1px #BBB' }}
          />
        </Box>
      ),
    },
    {
      title: 'Variant Name',
      dataIndex: 'variant_name',
      key: 'variant_name',
      width: 150,
      ellipsis: true,
      render: (item) => fText(item),
    },
    {
      title: 'Variant Value',
      dataIndex: 'variant_value',
      key: 'variant_value',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value) => {
        const data = getDisplayData({
          list: selectors?.products_variants_status || [],
          value,
        });
        return (
          <Chip
            sx={{
              color: data.textColor || '#1b925e',
              backgroundColor: data.bgColor || '#dbf6e5',
              fontWeight: 500,
            }}
            label={data.label}
          />
        );
      },
    },
    {
      title: 'Base Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      ellipsis: true,
      align: 'right',
      render: (item) => formatToINR(item),
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 150,
      ellipsis: true,
      render: (_, item) => item?.inventory?.quantity,
    },
    {
      title: 'Stock In',
      dataIndex: 'stock_in',
      key: 'stock_in',
      width: 150,
      ellipsis: true,
      render: (_, item) => item?.inventory?.stock_in,
    },
    {
      title: 'Stock Out',
      dataIndex: 'stock_out',
      key: 'stock_out',
      width: 150,
      ellipsis: true,
      render: (_, item) => item?.inventory?.stock_out,
    },
    {
      title: 'Sku',
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      ellipsis: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 50,
      render: (_, item) => (
        <Stack spacing={1} direction="row" sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="error"
            className="mui-action-button"
            onClick={(e) => {
              e.stopPropagation();
              VariantDeleteActions(item?.variant_id);
            }}
          >
            <i className="fa-solid fa-trash" />
          </Button>
        </Stack>
      ),
    },
  ];

  useEffect(() => {
    setLoadingLoader(true);
    dispatch(
      SelectorsService(
        { categories: true, brands: true, products_status: true, products_variants_status: true },
        (res) => {
          if (res?.status) {
            setSelectors(res?.data);
          }
        }
      )
    );

    dispatch(
      ProductSelectedService({ product_id: productId }, (res) => {
        if (res?.status) {
          setLoadingLoader(false);
          setProductDetails(res?.data);
        }
      })
    );
  }, [productId, apiFlag]);

  const showDisplayAction = () => {
    setModifyModel(false);
    setApiFlag(!apiFlag);
  };

  const statusResult = getDisplayData({
    list: selectors?.products_status || [],
    value: productDetails?.status,
  });

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 12 }}>
          <Card sx={{ p: 1.5 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
                <CustomBackButton />

                <Stack spacing={0.5}>
                  <Typography variant="normal" color="text.primary">
                    {productDetails?.product_name}
                  </Typography>
                </Stack>
                <Chip
                  label={statusResult?.label}
                  sx={{
                    color: statusResult?.textColor,
                    backgroundColor: statusResult?.bgColor,
                  }}
                />
              </Stack>

              <Stack direction="row" spacing={1} sx={{}}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setModifyModel(true);
                  }}
                >
                  Edit
                </Button>
                <Button variant="contained" color="error" onClick={DeleteActions}>
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 1.5 }}>
            <Stack spacing={1}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Product Name
                </Typography>
                <Typography variant="body2">
                  {productDetails ? productDetails?.product_name : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Slug
                </Typography>
                <Typography variant="body2">
                  {productDetails ? productDetails?.slug : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Base Price
                </Typography>
                <Typography variant="body2">
                  {productDetails ? formatToINR(productDetails?.base_price) : '-'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Description
                </Typography>
                <Typography variant="body2">
                  {productDetails ? productDetails?.description : '-'}
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Card sx={{ p: 2 }}>
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              disableRipple
              value={tabValue}
              onChange={handleChange}
              sx={{ mb: 1 }}
            >
              <Tab value={1} label="Variants" />
              <Tab value={2} label="Orders" />
            </Tabs>

            {tabValue === 1 && (
              <>
                <Stack spacing={1} direction="row" sx={{ mb: 2, justifyContent: 'end' }}>
                  {/* <Button
                    variant="contained"
                    onClick={() => {
                      setVariantsModifyModel(true);
                    }}
                  >
                    Add Variant
                  </Button> */}
                </Stack>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    overflowX: 'auto',
                  }}
                >
                  <Table
                    className="custom-ant-table"
                    showSorterTooltip={false}
                    columns={
                      !loadingLoader
                        ? columns
                        : columns.map((col) => ({
                            ...col,
                            render: () => (
                              <Skeleton
                                variant=""
                                animation="wave"
                                sx={{ width: '100%', height: 25, borderRadius: 0.5 }}
                              />
                            ),
                          }))
                    }
                    dataSource={
                      !loadingLoader
                        ? productDetails?.product_variants
                        : [...Array(5)].map((_, i) => ({
                            key: i,
                          }))
                    }
                    onRow={(record) => ({
                      onClick: () => {
                        router.push(
                          `${ADMIN_ROUTES.PRODUCT_VARIANT_DETAILS}?id=${record.variant_id}`
                        );
                      },
                      style: { cursor: 'pointer' },
                    })}
                    scroll={{ x: 'max-content' }}
                    pagination={false}
                    rowKey="variant_id"
                  />
                </Box>
              </>
            )}
          </Card>
        </Grid>
      </Grid>


      <ProductAddModel
        open={modifyModel}
        productDetails={productDetails}
        handleClose={() => {
          setModifyModel(false);
          // setEditObject(null);
        }}
        editObject={productDetails}
        backAction={showDisplayAction}
      />
    </Box>
  );
}

// export function ProductVariantsForm({ productDetails }) {
//   const dispatch = useDispatch();

//   const steps = ['Variant Info', 'Images'];
//   const [activeStep, setActiveStep] = useState(0);
//   const [primaryImage, setPrimaryImage] = useState(null);

//   const [imagesData, setImagesData] = useState([]);
//   const [removePortfolioImage, setRemovePortfolioImage] = useState([]);

//   const [setFormSubmitLoader] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);

//   // ✅ Step-wise validation
//   const validationSchemas = [
//     // Step 1
//     Yup.object({
//       variant_name: Yup.string().min(2).required('Variant name is required'),
//       variant_value: Yup.string().min(2).required('Variant value is required'),
//       sku: Yup.string().nullable(),
//       stock: Yup.number().positive().integer().nullable(),
//       price: Yup.number().positive().required('Price is required'),
//     }),

//     // Step 2
//     Yup.object({
//       primary_image: Yup.mixed().required('Primary image is required'),
//       product_images: Yup.array()
//         .min(1, 'At least one image required')
//         .required('Product images required'),
//     }),

//     // Step 3
//     Yup.object(),

//     // Step 4
//     Yup.object(),
//   ];

//   const ActionSubmit = (values) => {
//     setErrorMsg(null);

//     const formData = new FormData();

//     formData.append('product_id', productDetails.product_id);
//     formData.append('variant_name', values.variant_name);
//     formData.append('variant_value', values.variant_value);
//     formData.append('sku', values.sku || '');
//     formData.append('stock', values.stock || '');
//     formData.append('price', values.price);

//     formData.append('product_primary', primaryImage);

//     if (imagesData && imagesData.length > 0) {
//       imagesData.forEach((file, index) => {
//         if (file instanceof File) {
//           const key = `product_${String(index + 1).padStart(2, '0')}`;
//           formData.append(key, file);
//         }
//       });
//     }

//     if (removePortfolioImage.length > 0) {
//       formData.append('remove_images', JSON.stringify(removePortfolioImage));
//     }

//     // for (let pair of formData.entries()) {
//     //   console.log(pair[0], pair[1]);
//     // }

//     // ✅ Dispatch API
//     dispatch(
//       VariantModifyService(formData, (res) => {
//         setFormSubmitLoader(false);

//         if (res?.status) {
//           sweetAlertSuccess(
//             productDetails?.product_id
//               ? 'Product updated successfully'
//               : 'Product added successfully'
//           );
//         } else {
//           setErrorMsg(res?.message);
//         }
//       })
//     );
//   };

//   return (
//     <Card sx={{ p: 3 }}>
//       <Typography variant="h6" sx={{ mb: 2 }}>
//         Product Variants
//       </Typography>

//       <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
//         {steps.map((label) => (
//           <Step key={label}>
//             <StepLabel>{label}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       <Formik
//         enableReinitialize
//         initialValues={{
//           variant_name: '',
//           variant_value: '',
//           sku: '',
//           stock: '',
//           price: productDetails?.base_price || '',
//           primary_image: null,
//           product_images: [],
//         }}
//         validationSchema={validationSchemas[activeStep]}
//         onSubmit={(values) => {
//           if (activeStep === steps.length - 1) {
//             ActionSubmit(values);
//           } else {
//             setActiveStep((prev) => prev + 1);
//           }
//         }}
//       >
//         {(props) => {
//           const { handleSubmit, values, dirty, resetForm } = props;

//           return (
//             <Form>
//               {errorMsg && (
//                 <Alert sx={{ mb: 2 }} severity="error">
//                   {errorMsg}
//                 </Alert>
//               )}
//               {/* ✅ STEP 1: Variant Info */}
//               {activeStep === 0 && (
//                 <Grid container spacing={2}>
//                   <Grid size={{ xs: 12, md: 6 }}>
//                     <TextFieldForm formik={props} label="Variant Name" field="variant_name" />
//                   </Grid>

//                   <Grid size={{ xs: 12, md: 6 }}>
//                     <TextFieldForm formik={props} label="Variant Value" field="variant_value" />
//                   </Grid>

//                   <Grid size={{ xs: 12, md: 6 }}>
//                     <TextFieldForm formik={props} label="Sku" field="sku" required={false} />
//                   </Grid>

//                   <Grid size={{ xs: 12, md: 6 }}>
//                     <TextFieldForm
//                       formik={props}
//                       label="Stock"
//                       field="stock"
//                       required={false}
//                       type="number"
//                     />
//                   </Grid>

//                   <Grid size={{ xs: 12 }}>
//                     <TextFieldForm
//                       formik={props}
//                       label="Price"
//                       field="price"
//                       type="number"
//                       isAmount
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* ✅ STEP 2: Images */}
//               {activeStep === 1 && (
//                 <Grid container spacing={2}>
//                   <Grid size={{ xs: 12 }}>
//                     <FileUploadBox
//                       formik={props}
//                       title="Primary Image"
//                       field="primary_image"
//                       defaultImg={defaultImageUrl('/assets/images/document.png')}
//                       bcAction={(event) => {
//                         setPrimaryImage(event);
//                         props.setFieldValue('primary_image', event);
//                       }}
//                     />
//                   </Grid>

//                   <Grid size={{ xs: 12 }}>
//                     <MultiImagePicker
//                       formik={props}
//                       field="product_images"
//                       label="Product Images"
//                       maxImages={10}
//                       imageReturn={(items) => {
//                         props.setFieldValue('portfolio_images', items);
//                         setImagesData(items);
//                       }}
//                       removeAction={(url) => {
//                         setRemovePortfolioImage((prev) => [...prev, url]);
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               )}

//               {/* ✅ STEP 3: Preview */}
//               {activeStep === 2 && (
//                 <Box>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Preview
//                   </Typography>

//                   <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1.5 }}>
//                     <Typography>
//                       <b>Variant:</b> {values.variant_name}
//                     </Typography>
//                     <Typography>
//                       <b>Value:</b> {values.variant_value}
//                     </Typography>
//                     <Typography>
//                       <b>SKU:</b> {values.sku || '-'}
//                     </Typography>
//                     <Typography>
//                       <b>Price:</b> ₹{values.price}
//                     </Typography>
//                     <Typography>
//                       <b>Stock:</b> {values.stock || '-'}
//                     </Typography>

//                     <Typography sx={{ mt: 2 }}>
//                       <b>Primary Image:</b> {values.primary_image?.name || 'Uploaded'}
//                     </Typography>

//                     <Typography>
//                       <b>Gallery Images:</b> {values.product_images?.length || 0} files
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}

//               {/* ✅ STEP 4: Submit */}
//               {activeStep === 3 && (
//                 <Box textAlign="center">
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Ready to Submit 🚀
//                   </Typography>
//                   <Typography variant="body2">Please confirm and submit your variant.</Typography>
//                 </Box>
//               )}

//               {/* 🔥 Buttons */}
//               <Box
//                 sx={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   mt: 3,
//                 }}
//               >
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={() => setActiveStep((prev) => prev - 1)}
//                 >
//                   Back
//                 </Button>

//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   {dirty && activeStep === 0 && (
//                     <Button variant="outlined" onClick={resetForm}>
//                       Cancel
//                     </Button>
//                   )}

//                   <Button variant="contained" onClick={handleSubmit}>
//                     {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                   </Button>
//                 </Box>
//               </Box>
//             </Form>
//           );
//         }}
//       </Formik>
//     </Card>
//   );
// }
