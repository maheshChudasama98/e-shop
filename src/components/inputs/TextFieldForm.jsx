// import React from 'react';
// import PropTypes from 'prop-types';

// import TextField from '@mui/material/TextField';

// export function TextFieldForm({ formik, field, label, ...props }) {
//   return (
//     <TextField
//       required
//       fullWidth
//       id={label}
//       label={label}
//       InputLabelProps={{
//         shrink:
//           formik.values[field] !== undefined &&
//           formik.values[field] !== null &&
//           formik.values[field] !== '',
//       }}
//       name={field}
//       value={formik.values[field]}
//       onChange={formik.handleChange}
//       onBlur={formik.handleBlur}
//       error={Boolean(formik.errors[field]) && formik.touched[field]}
//       helperText={
//         Boolean(formik.errors[field]) && formik.touched[field] ? formik.errors[field] : ''
//       }

//       sx={{
//         '& .MuiInputLabel-asterisk': {
//           color: 'red',
//           fontSize: 14,
//         },
//         '& .MuiInputBase-multiline ': {
//           p: 0,
//           m: 0,
//         },
//       }}
//       {...props}
//     />
//   );
// }

// TextFieldForm.propTypes = {
//   formik: PropTypes.object,
//   field: PropTypes.string,
//   label: PropTypes.string,
// };

import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { InputAdornment } from '@mui/material';

import { getIn } from 'formik'; // ✅ import this

export function TextFieldForm({
  formik,
  field,
  label,
  type = 'text',
  isAmount = false, // show ₹ icon
  isRight = false,
  ...props
}) {
  // const formatNumber = (value) => {
  //   if (!value) return '';
  //   // Remove all non-digit characters
  //   const numericValue = value.toString().replace(/\D/g, '');
  //   // Format with commas
  //   return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // };

  // const handleChange = (e) => {
  //   let value = e.target.value;

  //   if (isAmount) {
  //     // Only digits allowed
  //     value = value.replace(/\D/g, '');
  //     // Format with commas
  //     value = formatNumber(value);
  //   }

  //   // Update Formik value
  //   formik.setFieldValue(field, value);
  // };

  const value = getIn(formik?.values, field);
  const error = getIn(formik?.errors, field);
  const touched = getIn(formik?.touched, field);

  // const handleChange = (e) => {
  //   let value = e.target.value;

  //   // Only digits allowed
  //   value = value.replace(/\D/g, '');

  //   // If phone number formatting
  //   if (field === 'phone' || field === 'mobile' || props.phone) {
  //     if (value.length > 5) {
  //       value = value.slice(0, 5) + '-' + value.slice(5, 10);
  //     }
  //   }

  //   // If amount formatting
  //   if (isAmount) {
  //     value = formatNumber(value);
  //   }

  //   formik.setFieldValue(field, value);
  // };

  return (
    <TextField
      required
      fullWidth
      id={label}
      label={label}
      InputLabelProps={{
        shrink:
          formik.values[field] !== undefined &&
          formik.values[field] !== null &&
          formik.values[field] !== '',
      }}
      name={field}
      // value={formik.values[field]}
      value={value || ''}
      // onChange={handleChange}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      // error={Boolean(formik.errors[field]) && formik.touched[field]}
      error={Boolean(touched && error)}
      helperText={
        // Boolean(formik.errors[field]) && formik.touched[field] ? formik.errors[field] : ''
        Boolean(error) && touched ? error : ''
      }
      type={type}
      onFocus={(e) => {
        if (type === 'date' || type === 'datetime-local') {
          e.target.showPicker?.();
        }
      }}
      sx={{
        '& .MuiInputLabel-asterisk': {
          color: 'red',
          fontSize: 14,
        },
        '& input': {
          textAlign: isAmount || isRight ? 'right' : 'left',
        },
        '& .MuiInputBase-multiline': {
          p: 0,
          m: 0,
        },
      }}
      InputProps={{
        startAdornment: isAmount && (
          <InputAdornment position="start">
            <CurrencyRupeeIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

TextFieldForm.propTypes = {
  formik: PropTypes.object,
  field: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  isAmount: PropTypes.bool,
};
